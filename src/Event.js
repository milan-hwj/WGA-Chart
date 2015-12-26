define([
		'./util/utils'
	],
	function (
		utils
		) {
    /**
     * @author   milan(white gourd angle)
     * @describe 事件控制器
     */
    var Event = function(dom, store){
    	var self = this;
    	utils.merge(self, {
    		dom: dom,	     // 容器
    		lastHover: null, // 当前鼠标悬停shape
    		store: store
    	});
    	self._initEvent(dom);
    }
    Event.prototype = {
    	_initEvent: function(dom){
    	     /**
    	      * @describe 为canvas绑定事件
    	      * @param    
    	      * @return   
    	      */
            var self = this,
                eventList = ['click', 'dblclick', 'mousewheel', 'mousemove', 'mousedown', 'mouseup'],
                _bindFun = function(bindHandler){
                    for(var i=0; i<eventList.length; i++){
                        eventHandleName = '_' + eventList[i] + 'Handler';
                        dom[bindHandler](eventList[i], self._eventDitch(self[eventHandleName], self));
                    }
                };
    		if (window.addEventListener) {
                _bindFun('addEventListener');
            }
            else {
                _bindFun('attachEvent');
            }
    	},
        _eventDitch: function(eventHandle, instance){
             /**
              * @describe 全局事件代理
              * @param    
              * @return   
              */
            return function(e){
                return eventHandle.call(instance, e);
            };
        },
    	_clickHandler: function(){
    	     /**
    	      * @describe 
    	      * @param    
    	      * @return   
    	      */
    		var self = this,
                lastHover = self._lastHover;
            if(lastHover){
                lastHover._dispatch('click');
            }	
    	},
    	_dblclickHandler: function(){
    	     /**
    	      * @describe 
    	      * @param    
    	      * @return   
    	      */
    		var self = this,
                lastHover = self._lastHover;
            if(lastHover){
                lastHover._dispatch('dbclick');
            }   	
    	},
    	_mousewheelHandler: function(){
    	     /**
    	      * @describe 
    	      * @param    
    	      * @return   
    	      */
    			
    	},
    	_mousemoveHandler: function(e){
    	     /**
    	      * @describe 
    	      * @param    
    	      * @return   
    	      */
    		var self = this;
            self._lastHover = self._getHoverShape(e.layerX, e.layerY);
            if(self._lastHover){
                self._lastHover._dispatch('mousemove');
            }
    	},
    	_mousedownHandler: function(){
    	     /**
    	      * @describe 
    	      * @param    
    	      * @return   
    	      */
    			
    	},
    	_mouseupHandler: function(){
    	     /**
    	      * @describe 
    	      * @param    
    	      * @return   
    	      */
    			
    	},
        _getHoverShape: function(x, y){
             /**
              * @describe 获取鼠标指针下的shape
              * @param    
              * @return   
              */
            var self = this,
                store = self.store,
                arrayByLevel = store._levels,
                hoverShape;

            // zlevel从高到低遍历
            for(var i=arrayByLevel.length - 1; i>=0; i--){
                hoverShape = self._getHoverInLevel(arrayByLevel[i].shapes, x, y);
                if(hoverShape){
                    break;
                }       
            }
            return hoverShape;
        },
        _getHoverInLevel: function(shapes, x, y){
            /**
              * @describe 获取该画布下的hover shape
              * @param    shapes
              * @return   shape || null
              */
            var hoverShape;
            for(var i=shapes.length - 1; i>=0; i--){
                if(shapes[i].isCover(x, y)){
                    hoverShape = shapes[i];
                    break;
                }
            }
                return hoverShape;
        }
    };
    return Event;
});

