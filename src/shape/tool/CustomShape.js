define([
	'../util/utils',
	'./Base'
	],function(
		utils, 
		Base
	){
     /**
      * @describe 自定义图形
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
		}
	};

	utils.inherits(rect, Base);
	return rect;
})