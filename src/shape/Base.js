define([
	'./tool/EventAction',
	'../util/guid',
	'../util/utils',
	'../animation/animation'
	], function(
		EventAction,
		guid,
		utils,
		Animation
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
		draw: function(ctx){
		     /**
		      * @describe 通用形状渲染方法
		      * @param    
		      * @return   
		      */
		    var self = this,
		    	style = self.style;

		    utils.merge(ctx, style, true); //  混合画笔属性
			ctx.beginPath();
            self._buildPath(ctx, style); // 路径绘制

            switch (style.brushType) {
                /* jshint ignore:start */
                case 'both':
                    ctx.fill();
                    style.lineWidth > 0 && ctx.stroke();
                case 'stroke':
                    style.lineWidth > 0 && ctx.stroke();
                    break;
                /* jshint ignore:end */
                default:
                    ctx.fill();
            }
            self._dirty = false;

            // test
            // var r = self._getArroundRect();
            // ctx.rect(r.x, r.y, r.w, r.h);
            // ctx.lineWidth = 1;
            //ctx.stroke();
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