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
			ctx.arc(style.x, style.y, style.r, 0, 2*Math.PI);
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
		    var self = this,
		    	style = self.style;
		    // 判断是否在包围矩阵中
		    if(self._isInArroundRect(x, y)){
		    	if(Math.pow(Math.abs(x - style.x), 2) + Math.pow(Math.abs(y - style.y), 2) <= Math.pow(style.r, 2)){
		    		return true;
		    	}
		    }
		    return false;
		}
	};

	utils.inherits(rect, Base);
	return rect;
})