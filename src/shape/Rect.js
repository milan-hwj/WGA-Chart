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
		}
	};

	utils.inherits(rect, Base);
	return rect;
})