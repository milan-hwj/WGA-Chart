define([
	'../../util/utils',
	'../Base'
	],function(
		utils, 
		Base
	){
     /**
      * @describe 网格
      * @param    
      * @return   
      */
	var grid = function(option){
	     /**
	      * @describe 
	      * @param    
	      * @return   
	      */
		Base.call(this, option);
	}
	grid.prototype = {
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
		    	n = style.n,
		    	z = style.z,
		    	points = [];
		    for(var i=0; i<n; i++){
		    	points.push({
		    		x: x + i*d,
		    		y: y,
		    		z: z
		    	});
		    }
		    for(var i=0; i<n; i++){
		    	points.push({
		    		x: x + i*d,
		    		y: y,
		    		z: z + d*(n - 1)
		    	});
		    }
		    for(var i=1; i<n-1; i++){
		    	points.push({
		    		x: x,
		    		y: y,
		    		z: z + i*d
		    	});
		    }
		    for(var i=1; i<n-1; i++){
		    	points.push({
		    		x: x + (n - 1)*d,
		    		y: y,
		    		z: z + i*d
		    	});
		    }
		    self.points = points;
			return points;
		},
		_getEdges: function(){
		     /**
		      * @describe 返回关键连线
		      * @param    
		      * @return   
		      */
		    var edges = [],
		    	points = self.points,
		    	n = this.style.n;
		    for(var i=0;i<n;i++){
		    	edges.push([i, n + i]);
		    }
		    for(var i=n*2;i<n*2+n-2;i++){
		    	edges.push([i, n + i - 2]);
		    }
			return edges;
		}
	};

	utils.inherits(grid, Base);
	return grid;
})