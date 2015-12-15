define([
	'../util/utils',
	'./Base'
	],function(
		utils, 
		Base
	){
     /**
      * @describe 文字
      * @param    
      * @return   
      */
	var text = function(option){
	     /**
	      * @describe 
	      * @param    
	      * @return   
	      */
		Base.call(this, option);
	}
	text.prototype = {
		_buildPath: function(ctx){
		     /**
		      * @describe 渲染
		      * @param    
		      * @return   
		      */
			var self = this,
				style = self.style,
				fillText = function(){
					if(style.maxWidth){
						ctx.fillText(style.text, style.x, style.y, style.maxWidth);
					}
					else{
						ctx.fillText(style.text, style.x, style.y);
					}
				},
				strokeText = function(){
					if(style.maxWidth){
						ctx.strokeText(style.text, style.x, style.y, style.maxWidth);
					}
					else{
						ctx.strokeText(style.text, style.x, style.y);
					}
				};
			utils.merge(ctx, style, true);
			switch (style.brushType) {
	            case 'both':
	                fillText();
	                style.lineWidth > 0 && strokeText();
	            case 'stroke':
	                style.lineWidth > 0 && strokeText();
	                break;
	            default:
	                fillText();
	        }
		},
		draw: function(ctx){
			/**
		      * @describe text特殊的渲染方法,覆盖父类方法
		      * @param    
		      * @return   
		      */
		    var self = this;

			self._buildPath(ctx);
            self._dirty = false;
		}
	};

	utils.inherits(text, Base);
	return text;
})