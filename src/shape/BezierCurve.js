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
		},
		_build3DPath: function(ctx, camera){
		     /**
		      * @describe 3D形状渲染, 默认实现
		      * @param    Canvas Context, Camera camera
		      * @return   
		      */
		    var self = this,
		    	p = self.style.points,
		    	z = self.style.z,
		    	basePoints = [{
		    		x: p[0],
		    		y: p[1],
		    		z: z
		    	},{
		    		x: p[2],
		    		y: p[3],
		    		z: z
		    	},{
		    		x: p[4],
		    		y: p[5],
		    		z: z
		    	},{
		    		x: p[6],
		    		y: p[7],
		    		z: z
		    	}],
		    	points = dimensionUtil.calcuPointsByCamera(camera, {
		    		//derection: self.derection || [0, 0, 1],
		    		matrix: self.matrix || [1, 0, 0, 0, 1, 0, 0, 0, 1],
		    		z: self.z || 0
		    	}, basePoints);
		    // 逐个连线
		    if(points.length > 0){
				for(i=0; i<edges.length; i++){ 
					p1 = points[edges[i][0]]; // line from
					p2 = points[edges[i][1]]; // line to
					// draw
					if(p1 && p2){
						ctx.moveTo(p1.x, p1.y);
						ctx.lineTo(p2.x, p2.y);
					}
				}
		    }
		}
	};

	utils.inherits(Bezier, Base);
	return Bezier;
})