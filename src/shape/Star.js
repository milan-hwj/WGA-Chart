define([
	'../util/utils',
	'./Base'
	],function(
		utils, 
		Base
	){
     /**
      * @describe n角星
      * @param    
      * @return   
      */
	var star = function(option){
	     /**
	      * @describe 
	      * @param    
	      * @return   
	      */
		Base.call(this, option);
		this.points = [];
		this.edges = [];
	}
	star.prototype = {
		_buildPath: function(ctx){
		     /**
		      * @describe 渲染
		      * @param    
		      * @return   
		      */
		    var self = this,
				style = self.style,
				x = style.x,
				y = style.y,
				n = style.n,
				r = style.r,
				r0 = style.r0,
				b = 2 * Math.PI/n,
				i = 0, px, py,
				points = self.points,
				edges = self.edges;
			points.push({
				x: x, 
				y: y - r
			});
			for(i=0; i<n; i++){ 
				px = x + r * Math.cos(b * i + Math.PI/2);
				py = y - r * Math.sin(b * i + Math.PI/2);
				points.push({
					x: px, 
					y: py
				});
				edges.push([i, i+1]);

				px = x + r0 * Math.cos(b * (i + 0.5) + Math.PI/2);
				py = y - r0 * Math.sin(b * (i + 0.5) + Math.PI/2);
				points.push({
					x: px, 
					y: py
				});
				edges.push([i+1, i+2]);
			}
			points.push({
				x: x, 
				y: y - r
			});
			edges.push([i+1, i+2]);
			
			if(!ctx){
				return;
			}
			ctx.moveTo(x, y - r);
			for(i=0; i<n; i++){
				ctx.lineTo(points[i+1].x, points[i+1].y);
				ctx.lineTo(points[i+2].x, points[i+2].y);
			}
			ctx.lineTo(x, y - r);
		},
		_getArroundRect: function(){
		     /**
		      * @describe 获得图形包围矩形
		      * @param    
		      * @return   
		      */
			var self = this,
				style = self.style;
			return {
				x: style.x - style.r,
				y: style.y - style.r,
				w: 2 * style.r,
				h: 2 * style.r
			};
		},
		isCover: function(x, y){
		     /**
		      * @describe 判断点是否在图形内
		      * @param    
		      * @return   
		      */
		    var self = this;
		    // 判断是否在包围矩阵中
		    if(self._isInArroundRect(x, y)){
		    	return true;
		    }
		    return false;
		},
		_get3Dinfos: function(){
		     /**
		      * @describe 获取图形3D化信息
		      * @param    
		      * @return   
		      */
			// 返回关键节点，关键连线
			var self = this;
			self._buildPath();
			return {
				points: self.points,
				edges: self.edges
			};
		}
	};

	utils.inherits(star, Base);
	return star;
})