define([
	'../util/utils',
	'./Base'
	],function(
		utils, 
		Base
	){
     /**
      * @describe 三次贝塞尔曲线
      * @param    
      * @return   
      */
	var Bezier = function(option){
	     /**
	      * @describe 
	      * @param    
	      * @return   
	      */
		Base.call(this, option);
	}
	Bezier.prototype = {
		_buildPath: function(ctx){
		     /**
		      * @describe 渲染
		      * @param    
		      * @return   
		      */
			var self = this,
				p = self.style.points;
			ctx.moveTo(p[0], p[1]);
			ctx.bezierCurveTo(p[2], p[3], p[4], p[5], p[6], p[7]);
		}
	};

	utils.inherits(Bezier, Base);
	return Bezier;
})