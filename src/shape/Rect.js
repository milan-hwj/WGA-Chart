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
		    	x = style.x,
		    	y = style.y,
		    	w = style.w,
		    	h = style.h,
		    	z = style.z;
			return [{
				x: x,
				y: y,
				z: z
			},{
				x: x + w,
				y: y,
				z: z
			},{
				x: x,
				y: y + h,
				z: z
			},{
				x: x + w,
				y: y + h,
				z: z
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
				[1, 3],
				[2, 0],
				[3, 2]
			];
		}
	};

	utils.inherits(rect, Base);
	return rect;
})