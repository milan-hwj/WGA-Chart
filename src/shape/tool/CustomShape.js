define([
	'../../util/utils',
	'../Base'
	],function(
		utils, 
		Base
	){
     /**
      * @describe 自定义图形
      * @param    
      * @return   
      */
	return function(prototypes){
		var newShape = function(option){
			Base.call(this, option);
		};
		newShape.prototype = {
			_buildPath: prototypes.buildPath,
			isCover: prototypes.isCover || function(){return false;}
		};
		utils.inherits(newShape, Base);
		return newShape;
	};
})