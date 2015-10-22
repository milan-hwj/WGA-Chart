define([
	'../../util/utils',
	'../Base'
	],function(
		utils, 
		Base
	){
     /**
      * @describe 立方体
      * @param    
      * @return   
      */
	var cube = function(option){
	     /**
	      * @describe 
	      * @param    
	      * @return   
	      */
		Base.call(this, option);
	}
	cube.prototype = {
		_get3Dinfos: function(){
		     /**
		      * @describe 获取图形3D化信息
		      * @param    
		      * @return   
		      */
			// 返回关键节点，关键连线
			var self = this;
			return {
				points: self._getPoints(),
				edges: self._getEdges()
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
		    	d = style.d,
		    	z = style.z;
			return [{
				x: x,
				y: y,
				z: z
			},{
				x: x + d,
				y: y,
				z: z
			},{
				x: x + d,
				y: y + d,
				z: z
			},{
				x: x,
				y: y + d,
				z: z
			},{
				x: x,
				y: y,
				z: z + d
			},{
				x: x + d,
				y: y,
				z: z + d
			},{
				x: x + d,
				y: y + d,
				z: z + d
			},{
				x: x,
				y: y + d,
				z: z + d
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
				[3, 0],
				[4, 5],
				[5, 6],
				[6, 7],
				[7, 4],
				[0, 4],
				[1, 5],
				[2, 6],
				[3, 7]
			];
		}
	};

	utils.inherits(cube, Base);
	return cube;
})