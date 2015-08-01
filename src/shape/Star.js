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
				i = 0;
			ctx.moveTo(x, y - r);
			for(i=0; i<n; i++){ 
				ctx.lineTo(x + r * Math.cos(b * i + Math.PI/2), y - r * Math.sin(b * i + Math.PI/2));
				ctx.lineTo(x + r0 * Math.cos(b * (i + 0.5) + Math.PI/2), y - r0 * Math.sin(b * (i + 0.5) + Math.PI/2));
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
		}
	};

	utils.inherits(star, Base);
	return star;
})