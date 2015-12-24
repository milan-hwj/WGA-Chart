define([
	'../util/utils',
	'./Base'
	],function(
		utils, 
		Base
	){
     /**
      * @describe 线
      * @param    
      * @return   
      */
	var Line = function(option){
	     /**
	      * @describe 
	      * @param    
	      * @return   
	      */
		Base.call(this, option);
	}
	Line.prototype = {
		_buildPath: function(ctx){
		     /**
		      * @describe 渲染
		      * @param    
		      * @return   
		      */
			var self = this,
				style = self.style,
				path = style.path;
			ctx.moveTo(path[0].x, path[0].y);
			for(var i = 1; i < path.length; i++){
				ctx.lineTo(path[i].x, path[i].y);
			}
		},
		_getArroundRect: function(){
		     /**
		      * @describe 获得图形包围矩形
		      * @param    
		      * @return   
		      */
		    return null;
		},
		isCover: function(x, y){
		     /**
		      * @describe 判断点是否在图形内
		      * @param    
		      * @return   
		      */
		    return false;
		},
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
		    	path = style.path,
		    	z = style.z,
		    	points = [];
		    for(var i = 0; i < path.length; i++){
				points.push(utils.merge(path[i], {
					z: z + (path[i].z || 0)
				}));
			}
			return points;
		},
		_getEdges: function(){
		     /**
		      * @describe 返回关键连线
		      * @param    
		      * @return   
		      */
			var style = this.style,
		    	path = style.path,
		    	z = style.z,
		    	edges = [];
		    for(var i = 0; i < path.length - 1; i++){
				edges.push([i, i + 1]);
			}
			return edges;
		}
	};

	utils.inherits(Line, Base);
	Angel.Line = Line;
	return Line;
})