define([
	'../util/utils',
	'./Base'
	],function(
		utils, 
		Base
	){
     /**
      * @describe 矩形
      * @param    
      * @return   
      */
	var rect = function(option){
	     /**
	      * @describe 
	      * @param    
	      * @return   
	      */
		Base.call(this, option);
	}
	rect.prototype = {
		_buildPath: function(ctx){
		     /**
		      * @describe 渲染
		      * @param    
		      * @return   
		      */
			var self = this,
				style = self.style;
			ctx.rect(style.x, style.y, style.w, style.h);
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
				x: style.x,
				y: style.y,
				w: style.w,
				h: style.h
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
			return {
				points: rect._getPoints(),
				edges: rect._getEdges()
			};
		},
		_getPoints: function(){
		     /**
		      * @describe 返回关键节点
		      * @param    
		      * @return   
		      */
		    var style = this.style,
		    	x = style.x,
		    	y = style.y,
		    	w = style.w,
		    	h = style.h;
			return [{
				x: x,
				y: y
			},{
				x: x + w,
				y: y
			},{
				x: x,
				y: y + h
			},{
				x: x + w,
				y: y + h
			}];
		},
		_getEdges: function(){
		     /**
		      * @describe 返回关键连线
		      * @param    
		      * @return   
		      */
			return [
				[0, 1],
				[1, 2],
				[2, 3],
				[3, 0]
			];
		},
		_build3DPath: function(ctx){
		     /**
		      * @describe 3D渲染
		      * @param    
		      * @return   
		      */
			var self = this,
				style = self.style;


				b = 2 * Math.PI/n,
			
			ctx.rect(style.x, style.y, style.w, style.h);
		}
	};

	utils.inherits(rect, Base);
	return rect;
})