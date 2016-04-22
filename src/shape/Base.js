define([
	'./tool/EventAction',
	'../util/guid',
	'../util/utils',
	'../animation/animation',
    '../3D/3DUtil'
	], function(
		EventAction,
		guid,
		utils,
		Animation,
		dimensionUtil
	){
     /**
      * @describe 所有形状的基类
      * @param    
      * @return   
      */
	var base = function(option){
	     /**
	      * @describe 
	      * @param    
	      * @return   
	      */
		var self = this;
		Animation.call(this);
		utils.merge(self, option);
		self.id = option.id || guid();
		self._dirty = true; // 重绘标志
		self.parent = null; // 父容器
		self.cacheLevel = null; // store中的父容器缓存对象 {shape: array, _dirty: boolean}
		EventAction.call(this); // 事件动作扩展
	}
	
	base.prototype = {
		_buildPath: function(ctx, style){
		     /**
		      * @describe 形状渲染,无默认实现，所有shape需要覆盖该方法
		      * @param    Canvas Context
		      * @return   
		      */
		},
		_build3DPath: function(ctx, camera){
		     /**
		      * @describe 3D形状渲染, 默认实现
		      * @param    Canvas Context, Camera camera
		      * @return   
		      */
		    var self = this,
		    	shapeInfo = self._get3Dinfos(),
		    	points = dimensionUtil.calcuPointsByCamera(camera, {
		    		//derection: self.derection || [0, 0, 1],
		    		matrix: self.matrix || [1, 0, 0, 0, 1, 0, 0, 0, 1],
		    		z: self.z || 0
		    	}, shapeInfo.points),
		    	edges = shapeInfo.edges,
		    	p1,
		    	p2;
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
		},
		_isInArroundRect: function(x, y){
		     /**
		      * @describe 判断点是否落在包围矩形内
		      * @param    
		      * @return   
		      */
			var self = this,
				getArroundRect = self._getArroundRect,
				rect;
			if(getArroundRect){
				rect = getArroundRect.call(self);
				if(x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h){
					return true;
				}
			}
			return false;
		},
		draw: function(ctx, camera){
		     /**
		      * @describe 通用形状渲染方法
		      * @param    
		      * @return   
		      */
		    var self = this,
		    	style = self.style;
		    	
		    utils.merge(ctx, style, true); //  混合画笔属性
		    ctx.save();
		    if(self.scale){
		    	ctx.scale(self.scale[0], self.scale[1]);
		    }
			ctx.beginPath();
			if(camera){
				// 3D 绘制，默认使用连接shape关键点的方式绘制
                self._build3DPath(ctx, camera);
			}
			else{
				self._buildPath(ctx, style); // 平面路径绘制
			}

			if(style){
				switch (style.brushType) {
	                case 'both':
	                    ctx.fill();
	                    style.lineWidth > 0 && ctx.stroke();
	                case 'stroke':
	                    style.lineWidth > 0 && ctx.stroke();
	                    break;
	                default:
	                    ctx.fill();
	            }
			}
			ctx.restore();
            self._dirty = false;
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
		get: function(key){
			return this['_' + key];
		},
		set: function(key, value){
			this['_' + key] = value;
			this._dirty = true;
		}
	};
	utils.inherits(base, EventAction);
	utils.inherits(base, Animation);
	return base;
})
