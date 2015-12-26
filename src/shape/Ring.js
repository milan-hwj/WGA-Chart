define([
	'../util/utils',
	'./Base'
	],function(
		utils, 
		Base
	){
     /**
      * @describe 环
      * @param    
      * @return   
      */
	var ring = function(option){
	     /**
	      * @describe 
	      * @param    
	      * @return   
	      */
		Base.call(this, option);
	}
	ring.prototype = {
		_buildPath: function(ctx){
		     /**
		      * @describe 渲染
		      * @param    
		      * @return   
		      */
		    var self = this,
				style = self.style;
            ctx.arc(style.x, style.y, style.r0, 0, Math.PI * 2, false);
            ctx.moveTo(style.x + style.r, style.y);
			ctx.arc(style.x, style.y, style.r, 0, Math.PI * 2, true);
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

	utils.inherits(ring, Base);
	return ring;
})