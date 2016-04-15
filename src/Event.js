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
                    dom[bindHandler]('contextmenu', function(event){
                        event.preventDefault();
                    }, false );
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
    	_clickHandler: function(e){
    	     /**
    	      * @describe 
    	      * @param    
    	      * @return   
    	      */
    		var self = this,
                lastHover = self._lastHover;
            if(lastHover){
                lastHover._dispatch('click', e);
            }	
    	},
    	_dblclickHandler: function(e){
    	     /**
    	      * @describe 
    	      * @param    
    	      * @return   
    	      */
    		var self = this,
                lastHover = self._lastHover;
            if(lastHover){
                lastHover._dispatch('dbclick', e);
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
    		var self = this,
                lastHover;
            lastHover = self._getHoverShape(e.offsetX, e.offsetY);
            if(lastHover){
                var cursor = lastHover.style.cursor || 'default';
                lastHover._dispatch('mousemove', e);
                if(self._lastHover !== lastHover){
                    lastHover._dispatch('mouseover', e);
                    this.dom.style.cursor = cursor;
                }
                self._lastHover = lastHover;
            }
            else if(self._lastHover){
                self._lastHover._dispatch('mouseout', e);
                this.dom.style.cursor = 'default';
                delete self._lastHover;
            }
    	},
    	_mousedownHandler: function(e){
    	     /**
    	      * @describe 
    	      * @param    
    	      * @return   
    	      */
    		var self = this;
            self._lastHover = self._getHoverShape(e.offsetX, e.offsetY);
            if(self._lastHover){
                if(e.button==2){
                    self._lastHover._dispatch('contextmenu', e);
                }
                else{
                    self._lastHover._dispatch('mousedown', e);
                }
            }	
    	},
    	_mouseupHandler: function(e){
    	     /**
    	      * @describe 
    	      * @param    
    	      * @return   
    	      */
    		var self = this;
            self._lastHover = self._getHoverShape(e.offsetX, e.offsetY);
            if(self._lastHover){
                self._lastHover._dispatch('mouseup', e);
            }	
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


