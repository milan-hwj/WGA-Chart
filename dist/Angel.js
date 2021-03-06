/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @author   milan(white gourd angel)
	 * @describe 打包入口
	 */
	__webpack_require__(1);
	Angel.BaseShape = __webpack_require__(11);
	Angel.BezierCurve = __webpack_require__(17);
	Angel.CardioidHeard = __webpack_require__(18);
	Angel.Circle = __webpack_require__(19);
	Angel.DescartesHeard = __webpack_require__(20);
	Angel.Isogon = __webpack_require__(21);
	Angel.Line = __webpack_require__(22);
	Angel.Rect = __webpack_require__(23);
	Angel.Ring = __webpack_require__(24);
	Angel.Rose = __webpack_require__(25);
	Angel.Star = __webpack_require__(26);
	Angel.Text = __webpack_require__(27);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(2),
	    __webpack_require__(4),
	    __webpack_require__(5),
	    __webpack_require__(7),
	    __webpack_require__(10),
	    __webpack_require__(16)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	        Event,
	        Store,
	        Painter,
	        Camera,
	        CustomShape,
	        AnimateCenter
	    ) {
	    /**
	     * @author   milan(white gourd angel)
	     * @describe 
	     */
	     var Angel = window.Angel = {
	        version: '2.0.0.',
	        author: 'milan(white gourd angel)',
	        describe: '一个怀抱冬瓜的夜晚下的灵感之作--"冬瓜天使"'
	     };

	     Angel.init = function(container){
	     	/**
	     	 * @describe Angel初始化 
	     	 * @param    {HTMLElement} dom容器
	     	 * @return   Angel实例
	     	 */
	     	 var instance = new AngelFactory(container);
	     	 return instance;	
	     }

	     var AngelFactory = function(container){
	     	/**
	     	 * @describe Angel实例生成
	     	 */
	         var self = this;
	         self.dom = container;
	     	 self.store = new Store(self);
	         self.event = new Event(container, self.store);
	         self.painter = new Painter(self);
	         new AnimateCenter(self.store, self.painter).start();
	     }

	     AngelFactory.prototype = {
	        createCamera: function(opt){
	             /**
	              * @describe 创建视角对象(3D 绘制时使用)
	              * @param    
	              * @return   
	              */
	            var self = this;
	            if(!self.camera){
	                self.camera = new Camera(opt || {}, self.dom);
	                self.store.setType('3D');
	            }
	            return self.camera;
	        },
	        createShape: function(opt){
	            /**
	              * @describe 创建形状
	              * @param    buildPath: 绘制方法  
	              *           getArroundRect: 返回形状的包围矩形
	              * @return   shape类对象
	              */
	            return CustomShape(opt);
	        },
	     	addShape: function(shape){
	     	     /**
	     	      * @describe 添加形状
	     	      * @param    shpae.base/circle/ring... 各类shape对象
	     	      * @return   Angel
	     	      */
	            var self = this;
	            self.store.addShape(shape);
	     	    return this;
	     	},
	     	removeShape: function(shape){
	     	     /**
	     	      * @describe 销毁形状
	     	      * @param    shpae.base/circle/ring... 各类shape对象
	     	      * @return   Angel
	     	      */
	            var self = this;
	            self.store.removeShape(shape);
	     		return self;
	     	},
	        modShape: function(shape){
	             /**
	              * @describe 保存修改状态
	              * @param    shpae.base/circle/ring... 各类shape对象
	              * @return   
	              */
	            var self = this;
	            self.store.modShape(shape);
	            return this;   
	        },
	     	addGroup: function(){
	     	     /**
	     	      * @describe 添加组
	     	      * @param    group对象
	     	      * @return   Angel
	     	      */
	            self.store.addGroup(shape);
	     		return this;
	     	},
	     	removeGroup: function(){
	     	     /**
	     	      * @describe 销毁组
	     	      * @param    group对象
	     	      * @return   Angel
	     	      */
	            self.store.removeGroup(shape);
	     		return this;
	     	},
	     	refresh: function(){
	     	     /**
	     	      * @describe 刷新canvas(仅刷新有数据变化的canvas层)
	     	      * @param    
	     	      * @return   Angel
	     	      */
	            var self = this;
	            self.painter.refresh();
	     		return this;
	     	},
	     	render: function(){
	     	     /**
	     	      * @describe 全局渲染
	     	      * @param    
	     	      * @return   Angel
	     	      */
	            var self = this;
	            self.painter.paintAll();
	     		return this;
	     	},
	        clear: function(zIndex){
	            this.painter.clear(zIndex);
	            return this;
	        },
	   		dispose: function(){
	   		     /**
	   		      * @describe 销毁实例
	   		      * @param    
	   		      * @return   
	   		      */

	   		}
	     };

	     return Angel;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
			__webpack_require__(3)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function (
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));




/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
	     /**
	      * @describe 所有形状的基类
	      * @param    
	      * @return   
	      */
		var utils = {
		    inherits : function(clazz, baseClazz){
		         /**
		          * @describe 继承
		          * @param    {function} clazz 源类
		          * @param   {function} baseClazz 基类
		          */
		    	var clazzPrototype = clazz.prototype;
	            function F() {}
	            F.prototype = baseClazz.prototype;
	            clazz.prototype = new F();

	            for (var prop in clazzPrototype) {
	                clazz.prototype[prop] = clazzPrototype[prop];
	            }
	            clazz.constructor = clazz;
		    },
	      isArray: function(obj){
	          return Object.prototype.toString.call(obj) === '[object Array]'; 
	      },
	      mergeItem: function(target, source, key, overwrite) {
	            if (source.hasOwnProperty(key)) {
	                var targetProp = target[key];
	                if (typeof targetProp == 'object'
	                    //&& !BUILTIN_OBJECT[objToString.call(targetProp)]
	                    // 是否为 dom 对象
	                    // && !isDom(targetProp)
	                ) {
	                    // 如果需要递归覆盖，就递归调用merge
	                    this.merge(
	                        target[key],
	                        source[key],
	                        overwrite
	                    );
	                }
	                else if (overwrite || !(key in target)) {
	                    // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
	                    target[key] = source[key];
	                }
	            }
	        },
	        merge: function(target, source, overwrite) {
	           /**
	            * @describe 将source的属性合并至target
	            * @param    {function} clazz 源类
	            * @param   {function} baseClazz 基类
	            */
	            for (var i in source) {
	                this.mergeItem(target, source, i, overwrite);
	            }
	            
	            return target;
	        },
	        indexOf: function(array, value) {
	             /**
	              * @describe 从数组中找出所有项
	              */
	            if (array.indexOf) {
	                return array.indexOf(value);
	            }
	            for (var i = 0, len = array.length; i < len; i++) {
	                if (array[i] === value) {
	                    return i;
	                }
	            }
	            return -1;
	        }
		}

		return utils;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(3)
	  ], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	    utils
	  ) {
	    /**
	     * @author   milan(white gourd angle)
	     * @describe 存储器
	     */
	    var Store = function(angel){
	         /**
	          * @describe 
	          * @param    
	          * @return   
	          */
	        var self = this;
	        self.angel = angel;
	        self.clear();
	    }

	    Store.prototype = {
	      	addShape: function(shape){
	      	     /**
	      	      * @describe 添加形状到缓存队列
	      	      * @param    shape.base/circle/ring... 各类shape对象
	      	      * @return   
	      	      */
	        		var self = this,
	        			  shapeMap = self._shapeMap,
	                zlevel = self.is3D ? 1 : (shape.zlevel || 0), // 3D状态下所有图形绘制于一块画布上
	                levelMap = self._levelChildrenMap;
	            shape.zlevel = zlevel;

	        		if(!shapeMap[shape.id]){
	        			  shapeMap[shape.id] = shape;
	                if(!levelMap[zlevel]){
	                    levelMap[zlevel] = {
	                        shapes: [],
	                        _dirty: false
	                    };
	                }
	                shape._dirty = true;
	                levelMap[zlevel].shapes.push(shape);
	                levelMap[zlevel]._dirty = true; //  重绘
	                // if(levelMap[zlevel]._clear === undefined){// 仅有添加操作时可以不重绘
	                //     levelMap[zlevel]._clear = false; // 无需清空当前图形
	                // }
	                shape.cacheLevel = levelMap[zlevel];
	            }
	      	},
	        removeShape: function(shape){
	             /**
	              * @describe 移除shape
	              * @param    shape.base/circle/ring... 各类shape对象
	              * @return   
	              */
	            var self = this,
	                zlevel = shape.zlevel,
	                _shapeMap = self._shapeMap,
	                levelMap = self._levelChildrenMap,
	                index;

	            if(_shapeMap[shape.id]){
	                delete _shapeMap[shape.id];
	                index = utils.indexOf(levelMap[zlevel].shapes, shape);
	                levelMap[zlevel].shapes.splice(index, 1);
	                levelMap[zlevel]._dirty = true;
	                levelMap[zlevel]._clear = true;
	            }
	        },
	        modShape: function(shape){
	             /**
	              * @describe 修改shape属性
	              * @param    shape.base/circle/ring... 各类shape对象
	              * @return   
	              */
	            var self = this,
	                zlevel = shape.zlevel,
	                _shapeMap = self._shapeMap,
	                levelMap = self._levelChildrenMap,
	                shapeId = shape.id;

	            if(_shapeMap[shapeId]){
	                shape._dirty = true;
	                levelMap[zlevel]._dirty = true;
	                levelMap[zlevel]._clear = true;
	                /*_shapeMap[shapeId].cacheLevel._dirty = true;
	                _shapeMap[shapeId].cacheLevel._clear = true;*/
	            }
	        },
	      	addGroup: function(group){
	      	     /**
	      	      * @describe 添加组
	      	      * @param    Group 组容器
	      	      * @return   
	      	      */
	        		var self = this,
	        			  groupMap = self._groupMap;
	        		if(!groupMap[group.id]){
	          			groupMap[shape.id] = shape;
	          			// 存储容器内shape对象
	          			for(var i = 0; i < group.children.length; i++){
	            				// 形状
	            				if(group[i] instanceof baseShape){
	            					addShape(group[i]);
	            				}
	            				// 组
	            				else{
	            					addGroup(group[i]);
	            				}
	      		    	}
	        		}
	      	},
	        recoverStatus: function(){
	             /**
	              * @describe 画布状态恢复
	              * @param    
	              * @return   
	              */
	            var self = this,
	                levelChildrenMap = self._levelChildrenMap,
	                tempLevels = [];
	            self._levels = [];

	            // 画布层级排序
	            for(var i in levelChildrenMap){
	                levelChildrenMap[i]._dirty = levelChildrenMap[i]._clear =  false;
	                tempLevels[i] = levelChildrenMap[i];
	            }
	            for(var i=0; i<tempLevels.length; i++){
	                if(tempLevels[i]){
	                    self._levels.push(tempLevels[i]);
	                }
	            }
	        },
	        clear: function(){
	            var self = this;
	            self._shapeMap = {}; // 形状MAP {shapeId: shape}
	            self._levels = []; // 画板层级，zlevel升序排列
	            self._levelChildrenMap = {}; // 各画布内shape {zlevel: {shapes:[], _dirty: boolean}}
	            self._groupMap = {}; // 组MAP
	        },
	        getShapes: function(){
	             /**
	              * @describe 
	              * @param    
	              * @return   
	              */
	            return this._shapeMap; 
	        },
	        setType: function(type){
	            this.is3D = type === '3D';
	        }
	    };

	    return Store;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define  */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(6)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	        Level
	    ) {
	    /**
	     * @author   milan(white gourd angle)
	     * @describe 画笔控制器
	     */
	    var Painter = function(angel){
	         /**
	          * @describe 
	          * @param    
	          * @return   
	          */
	        var self = this;
	        self.angel = angel;
	        self.store = angel.store;
	        self.levels = {}; // 画布集合
	    }

	    Painter.prototype = {
	        paintAll: function(){
	             /**
	              * @describe 全部重绘
	              * @param    
	              * @return   
	              */
	            this.refresh(true);
	        },
	        refresh: function(isPaintAll){
	             /**
	              * @describe 重绘内容产生变化的level
	              * @param    
	              * @return   
	              */
	            var self = this;

	            self._updateLevelStatus(); // 更新画布重绘标志

	            self.store.is3D ? self._render3D() : self._render(isPaintAll); // 渲染
	        },
	        clear: function(zIndex){
	            var self = this;
	            if(zIndex === undefined){
	                // 全部清空
	                for(var i in self.levels){
	                    self.levels[i].dom.remove();
	                }
	                self.levels = {};
	                self.store.clear();
	            }
	            else if(self.levels[zIndex]){
	                // 清空单层画布
	                self.levels[zIndex].destroy(self.store);
	                delete self.levels[zIndex];
	            }
	        },
	        _updateLevelStatus: function(){
	             /**
	              * @describe 更新画布重绘状态、shape队列
	              * @param    
	              * @return   
	              */
	            var self = this,
	                dom = self.angel.dom,
	                store = self.store,
	                levels = self.levels,
	                levelChildrenMap = store._levelChildrenMap;
	        
	            for(var i in levelChildrenMap){
	                // 创建图层
	                if(!levels[i]){
	                    levels[i] = new Level({dom: dom, zlevel: i});
	                    // 添加所有子节点
	                    levels[i].load(levelChildrenMap[i]);
	                }
	                // 添加所有子节点 更新画布状态(是否清空, 是否重绘)
	                levels[i].load(levelChildrenMap[i]);
	            }
	        },
	        _render: function(/* isPaintAll */){
	             /**
	              * @describe 渲染
	              * @param    
	              * @return   
	              */
	            var self = this,
	                store = self.store,
	                levels = self.levels;
	        
	            for(var i in levels){
	                // 逐个画布绘制
	                levels[i].render();
	            }   
	            store.recoverStatus();
	        },
	        _render3D: function(){
	            /**
	              * @describe 渲染3D 因3D为全部重新绘制、且只有一个画布，故不判断各个画布状态
	              * @param    
	              * @return   
	              */
	            var self = this,
	                levels = self.levels,
	                level = levels[1],
	                shapes,
	                ctx;
	        
	            // 逐个按顺序渲染
	            shapes = level.get('children');
	            ctx = level.ctx;
	            level.clear(); // 清空画板
	            for(var j=0; j<shapes.length; j++){
	                shapes[j].draw(ctx, self.angel.camera);
	            }
	        }
	    };
	    return Painter;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(3)
	  ], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	    utils
	  ) {
	    /**
	     * @author   milan(white gourd angle)
	     * @describe 画布层级控制器
	     */
	    var Level = function(option){
	         /**
	          * @describe 
	          * @param    
	          * @return   
	          */
	      	var self = this;
	        self.option = option;
	      	self._dirty = true; // 画布重绘表标志
	        self._children = [];
	        self._level = option.level || 0; // 画布层级
	        self.dpr = Math.max(window.devicePixelRatio || 1, 1);// 适应retina高分屏
	        self.ctx;

	        self.createLevel();
	    }
	    Level.prototype = {
	    	createLevel: function(){
	    	     /**
	    	      * @describe 创建画布层
	    	      * @param    
	    	      * @return   
	    	      */
	    		var self = this,
	            option = self.option,
	            canvas = document.createElement('canvas');
	    		canvas.style.zIndex = option.zlevel || 0;
	    		canvas.style.width = option.dom.offsetWidth + 'px';
	    		canvas.style.height = option.dom.offsetHeight + 'px';
	        canvas.width = option.dom.offsetWidth * self.dpr;
	        canvas.height = option.dom.offsetHeight * self.dpr;
	        canvas.style.position = 'absolute';
	    		
	    		option.dom.appendChild(canvas);

	        self.ctx = canvas.getContext('2d');
	        if (self.dpr != 1) {
	            self.ctx.scale(self.dpr, self.dpr);
	        }
	        self.dom = canvas;
	    	},
	      addChild: function(shape/* or shapes*/){
	           /**
	            * @describe 添加画布内shape/shapes
	            * @param    
	            * @return   
	            */
	          var self = this,
	              children = self._children;
	          // 数组
	          if(utils.isArray(shape)){
	              Array.prototype.push.apply(children, shape);
	          }
	          // shape
	          else{
	              children.push(shape);
	          }
	          self._dirty = true;
	      },
	      load: function(shapesData){
	           /**
	            * @describe 更新level层数据
	            * @param    shapesData{shapes: array, _dirty: boolean, _clear: boolean}
	            * @return   
	            */
	          var self = this;
	          self.set('children', [].concat(shapesData.shapes));
	          self.set('dirty', shapesData._dirty);
	          self.set('clear', shapesData._clear);
	      },
	      set: function(key, value){
	          this['_' + key] = value;
	      },
	      get: function(key){
	          return this['_' + key];
	      },
	      clear: function(){
	           /**
	            * @describe 清空该层画布
	            * @param    
	            * @return   
	            */
	          var self = this,
	              dom = self.dom,
	              width = dom.width,
	              height = dom.height,
	              ctx = self.ctx;

	          ctx.clearRect(0, 0, width * self.dpr, height * self.dpr);
	      },
	      destroy: function(store){
	          // 销毁画布层
	          var self = this,
	              shapes = self._children;
	          self.dom.remove();
	          for(var i=0; i<shapes.length; i++){
	              store.removeShape(shapes[i]);
	          }
	          self._children = [];
	      },
	      render: function(){
	           /**
	            * @describe 绘制本画布内的内容
	            * @param    
	            * @return   
	            */
	          var level = this,
	              shapes,
	              ctx;
	          if(!level._dirty){ // 无需重绘
	              return;
	          }
	          // 逐个按顺序渲染
	          shapes = level.get('children');
	          ctx = level.ctx;
	          if(level._clear){ // 重绘
	              level.clear(); // 清空画板
	          }
	          for(var j=0; j<shapes.length; j++){
	              if(shapes[j] && shapes[j].draw){
	                  // 1 画板清空，全部shape重绘
	                  // 2 画板未清空，则只有dirty标志的重画(如只进行add操作的画板)
	                  if(level._clear || shapes[j]._dirty){
	                      shapes[j].draw(ctx);
	                  }
	              }
	          }
	      }
	    };

	    return Level;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(3),
	    __webpack_require__(8),
	    __webpack_require__(9)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	        utils,
	        Matrix,
	        dimentionUtil
	    ) {
	    /**
	     * @author   milan(white gourd angel)
	     * @describe 视角类, 通过位置、方向控制视角
	     */
	     var Camera = function(opt, container){
	     	/**
	     	 * @describe 视角对象生成(3D使用)
	     	 */
	         var self = this,
	             centerX = container.clientWidth/2,
	             centerY = container.clientHeight/2;
	         opt = utils.merge({
	            position: {
	              x: 0,
	              y: 0,
	              z: 0
	            },// 视角位置(相对于当前视角坐标系坐标,不随视角转动而变化)
	            matrix: [1, 0, 0,
	                     0, 1, 0,
	                     0, 0, 1], // 视角坐标系(角度)
	            distance: 10, // 图像接收器相对于投影屏的距离
	            eyeAngle: Math.PI*2/3, // 视角宽度, 120度
	            centerX: centerX,
	            centerY: centerY
	         }, opt, true);
	         opt.relativePosition = Matrix.coordinateTransform(opt.matrix, opt.position);
	         opt.eyeWidthBite = Math.min(centerX, centerY)/(Math.tan(opt.eyeAngle/2) * opt.distance);// 实际画布宽度/视野宽度
	         utils.merge(self, opt, true);
	         self.init();
	     }

	     Camera.prototype = {
	        init: function(){
	          /**
	            * @describe 初始化视角
	            * @param    
	            * @return   
	            */
	          // 初始化视角坐标系
	          // this._initMatrix();
	        },
	        rotate: function(axis, a){
	             /**
	              * @describe 沿X/Y/Z轴旋转
	              * @param    
	              * @return   
	              */
	            dimentionUtil.rotate(axis, a, this.matrix);
	        },
	        rotateTo: function(axis, a){
	            /**
	              * @describe 沿X/Y/Z轴旋转至a度
	              * @param    
	              * @return   
	              */
	        },
	        setZ: function(){
	             /**
	              * @describe 设置Z坐标
	              * @param    
	              * @return   
	              */
	                
	        },
	        zoomIn: function(z){
	             /**
	              * @describe 放大,镜头拉近z
	              * @param    
	              * @return   
	              */
	            this.position.z += z;
	            this.relativePosition = Matrix.coordinateTransform(this.matrix, this.position);
	        },
	        zoomOut: function(z){
	             /**
	              * @describe 缩小,镜头拉远z
	              * @param    
	              * @return   
	              */
	            this.position.z -= z;
	            this.relativePosition = Matrix.coordinateTransform(this.matrix, this.position);
	        },
	        move: function(axis, d){
	             /**
	              * @describe 沿X/Y/Z轴横向移动d距离
	              * @param    
	              * @return   
	              */
	            var point = {x:0, y:0, z:0};
	            point[axis] = d;
	            point = Matrix.toStandardCoordinate(this.matrix, point);
	            this.relativePosition = {
	              x: this.relativePosition.x + point.x,
	              y: this.relativePosition.y + point.y,
	              z: this.relativePosition.z + point.z,
	            };
	            //this.position[axis] += d;
	            //this.relativePosition = Matrix.toStandardCoordinate(this.matrix, this.position);
	        },
	        aim: function(x, y, z){
	             /**
	              * @describe 瞄准某一点
	              * @param    
	              * @return   
	              */
	            if(z === undefined){
	              // z不存在时，根据x, y直接做旋转操作
	              var aX = Math.PI/2 * (x/this.centerX);
	              var aY = Math.PI/2 * (y/this.centerY);
	              this.rotate('x', aY);
	              this.rotate('y', aX);
	            }
	        }
	     };

	     return Camera;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    /**
	     * @author   milan(white gourd angle)
	     * @describe 矩阵工具类
	     */
	     var Matrix = {
	        unit: function(matrix){
	             /**
	              * @describe 矩阵单位化
	              * @param    
	              * @return   
	              */
	            var _unit = function(v){
	                  var l = Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2) + Math.pow(v[2], 2));
	                  return [v[0]/l, v[1]/l, v[2]/l];
	                },
	                d1 = _unit([matrix[0], matrix[3], matrix[6]]),
	                d2 = _unit([matrix[1], matrix[4], matrix[7]]),
	                d3 = _unit([matrix[2], matrix[5], matrix[8]]);
	            return [d1[0], d2[0], d3[0],
	                    d1[1], d2[1], d3[1],
	                    d1[2], d2[2], d3[2]];
	        },
	        toStandardCoordinate: function(matrix, point){
	          /**
	           * @describe 将matrix下的point转换为标准坐标系下的点
	           * @param    
	           * @return   
	           */
	           return {
	              x: point.x * matrix[0] + point.y * matrix[1] + point.z * matrix[2],
	              y: point.x * matrix[3] + point.y * matrix[4] + point.z * matrix[5],
	              z: point.x * matrix[6] + point.y * matrix[7] + point.z * matrix[8]
	           };
	        }, 
	        coordinateTransform: function(matrix, point){
	          /**
	           * @describe 将标准坐标系下的点变换为matrix下的点
	           * @param    
	           * @return   
	           */
	           var m = matrix,
	               replaceM,
	               replaceMatrix = function(index){
	                  replaceM = [].concat(m);
	                  replaceM.splice(index, 1, point.x);
	                  replaceM.splice(index + 3, 1, point.y);
	                  replaceM.splice(index + 6, 1, point.z);
	                  return replaceM;
	               },
	               D,D1,D2,D3;
	           // 克莱姆法则，求出D, D1, D2, D3
	           D = Matrix.determinant(m);
	           D1 = Matrix.determinant(replaceMatrix(0));
	           D2 = Matrix.determinant(replaceMatrix(1));
	           D3 = Matrix.determinant(replaceMatrix(2));
	           return {
	              x: D1/D,
	              y: D2/D,
	              z: D3/D
	           };
	        },
	        determinant: function(matrix){
	            /**
	              * @describe 三阶行列式计算
	              * @param    matrix 3*3
	              * @return   
	              */
	            var m = matrix;
	            return m[0]*(m[4]*m[8]-m[5]*m[7]) - m[3]*(m[1]*m[8]-m[2]*m[7]) + m[6]*(m[1]*m[5]-m[2]*m[4]);
	        },
	        pointRotate: function(p, v, a){
	             /**
	              * @describe 点p绕单位向量v旋转a度后，得到的新向量
	              * @param    
	              * @return   
	              */
	            var x = v.x,
	                y = v.y,
	                z = v.z,
	                s = Math.sin(a),
	                c = Math.cos(a),
	                // 变换矩阵
	                m = [x*x*(1-c)+c, x*y*(1-c)-z*s, x*z*(1-c)+y*s,
	                          y*x*(1-c)+z*s, y*y*(1-c)+c, y*z*(1-c)-x*s,
	                          x*z*(1-c)-y*s, z*y*(1-c)+x*s, z*z*(1-c)+c];
	            return Matrix.toStandardCoordinate(m, p);
	        },
	        moveByMatrix: function(matrix, point, vector){
	             /**
	              * @describe 标准坐标系下的点point,在基于matrix的坐标系下做vector平移
	              * @param    
	              * @return   matrix 坐标系矩阵
	                          point  待移动的点
	                          vector 平移向量
	              */
	            return {
	              x: point.x - vector.x * matrix[0] - vector.y * matrix[1] - vector.z * matrix[2],
	              y: point.y - vector.x * matrix[3] - vector.y * matrix[4] - vector.z * matrix[5],
	              z: point.z - vector.x * matrix[6] - vector.y * matrix[7] - vector.z * matrix[8]
	            };
	        },
	        elimination: function(matrix){
	             /**
	              * @describe 高斯-若尔当消元
	              * @param    matrix 加宽矩阵 4*3
	              * @return   
	              */
	              // TODO
	            var m = [];
	        }
	     };
	     return Matrix;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(8),
	    __webpack_require__(3)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	        Matrix,
	        utils
	    ) {
	    /**
	     * @author   milan(white gourd angle)
	     * @describe 3D绘制工具类
	     */
	     var Util = {
	        calcuPointsByCamera: function(camera, shapeAttr, shapePoints){
	             /**
	              * @describe 计算对应视角下坐标值
	              * @param    camera{
	                              position: [x, y, z],
	                              derection: [x, y, z],
	                              rotate: 0
	                          }
	                          shapeAttr{
	                              derection: [x, y, z],
	                              rotate: 0
	                          }
	                          shapePoints[
	                            {x, y, z}
	                          ]
	              * @return   
	              */
	            var result = [],
	                p;
	            for(var i=0; i<shapePoints.length; i++){
	              p = Util._calcuPointByCamera(camera, shapeAttr, shapePoints[i]);
	              result.push(p);
	            }
	            return result;
	        },
	        _calcuPointByCamera: function(camera, shapeAttr, point){
	             /**
	              * @describe 计算对应视角下坐标值
	              * @param    ctx Context
	                          camera{
	                              position: [x, y, z],
	                              derection: [x, y, z],
	                              rotate: 0
	                          }
	                          shapeAttr{
	                              position: [x, y, z],
	                              derection: [x, y, z],
	                              rotate: 0
	                          }
	                          point{x, y, z}
	              * @return   Context ctx
	              */
	            var newPoint = {},
	                shapeMatrix = shapeAttr.matrix,
	                cameraMatrix = camera.matrix,
	                cameraPoint = camera.relativePosition,
	                point = {
	                  x: point.x - cameraPoint.x,
	                  y: point.y - cameraPoint.y,
	                  z: point.z - cameraPoint.z
	                },
	            // 转化至图形方向坐标系   
	            newPoint = Matrix.coordinateTransform(shapeMatrix, point);
	            // 转化至视角坐标系
	            newPoint = Matrix.coordinateTransform(cameraMatrix, newPoint);
	            // 点投影
	            newPoint = Util._projection(newPoint, camera);
	            return newPoint;
	        },
	        _projection: function(point, camera){
	           /**
	              * @describe 计算对应视角下坐标值
	              * @param    point 待投影点
	                          cameraPoint 视角位置
	              * @return   
	              */
	            var z = camera.distance,
	                cameraPoint = camera.relativePosition,
	                newPoint = {
	                  x: point.x - cameraPoint.x,
	                  y: point.y - cameraPoint.y,
	                  z: point.z - cameraPoint.z
	                };
	                newPoint = point;
	                deep = newPoint.z + camera.distance; // 待投影点与camera的z坐标距离
	            if(deep < 0){
	              // 点在视角背面，不显示
	              return null;
	            }
	            return {
	              x: camera.eyeWidthBite*(newPoint.x)*z/deep + camera.centerX,
	              y: camera.eyeWidthBite*(newPoint.y)*z/deep + camera.centerY
	            };
	        },
	        rotate: function(v, a, m){
	          /**
	           * @describe 坐标系m绕v轴旋转a度
	           * @param    m:当前坐标系
	           * @return   
	           */
	           var _rotate = function(columnIndex, axis, a){
	                  var newP = Matrix.pointRotate({
	                    x: m[columnIndex],
	                    y: m[columnIndex + 3],
	                    z: m[columnIndex + 6]
	                  }, axis, a);
	                  m[columnIndex] = newP.x;
	                  m[columnIndex + 3] = newP.y;
	                  m[columnIndex + 6] = newP.z;
	               };
	           if(v === 'x'){
	              _rotate(1, {x: m[0], y: m[3], z: m[6]}, a);
	              _rotate(2, {x: m[0], y: m[3], z: m[6]}, a);
	           }
	           else if(v === 'y'){
	              _rotate(0, {x: m[1], y: m[4], z: m[7]}, a);
	              _rotate(2, {x: m[1], y: m[4], z: m[7]}, a);
	           }
	           else{
	              _rotate(0, {x: m[2], y: m[5], z: m[8]}, a);
	              _rotate(1, {x: m[2], y: m[5], z: m[8]}, a);
	           }

	        }
	     };
	     return Util;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(3),
		__webpack_require__(11)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(12),
		__webpack_require__(13),
		__webpack_require__(3),
		__webpack_require__(14),
	    __webpack_require__(9)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(3)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(
			utils
		){
	     /**
	      * @describe shpae事件动作
	      * @param    
	      * @return   
	      */
		var EventAction = function(option){
		     /**
		      * @describe 
		      * @param    
		      * @return   
		      */
			this._handlers = {};
		}
		
		EventAction.prototype = {
			on: function(event, handler, context){
			     /**
			      * @describe 事件绑定
			      * @param    
			      * @return   
			      */
			    var _h = this._handlers;

		        if (!handler || !event) {
		            return this;
		        }

		        if (!_h[event]) {
		            _h[event] = [];
		        }

		        _h[event].push({
		            h : handler,
		            one : false,
		            ctx: context || this
		        });

		        return this;
			},
			off: function(event){
			     /**
			      * @describe 事件解绑
			      * @param    
			      * @return   
			      */
				var _h = this._handlers;

		        if (!event) {
		            this._handlers = {};
		            return this;
		        }

		        if (handler) {
		            if (_h[event]) {
		                var newList = [];
		                for (var i = 0, l = _h[event].length; i < l; i++) {
		                    if (_h[event][i]['h'] != handler) {
		                        newList.push(_h[event][i]);
		                    }
		                }
		                _h[event] = newList;
		            }

		            if (_h[event] && _h[event].length === 0) {
		                delete _h[event];
		            }
		        }
		        else {
		            delete _h[event];
		        }

		        return this;
			},
			_dispatch: function (type) {
				/**
			      * @describe 事件分发
			      * @param    
			      * @return   
			      */
		        if (this._handlers[type]) {
		            var args = arguments;
		            var argLen = args.length;

		            if (argLen > 3) {
		                args = Array.prototype.slice.call(args, 1);
		            }
		            
		            var _h = this._handlers[type];
		            var len = _h.length;
		            for (var i = 0; i < len;) {
		                // Optimize advise from backbone
		                switch (argLen) {
		                    case 1:
		                        _h[i]['h'].call(_h[i]['ctx']);
		                        break;
		                    case 2:
		                        _h[i]['h'].call(_h[i]['ctx'], args[1]);
		                        break;
		                    case 3:
		                        _h[i]['h'].call(_h[i]['ctx'], args[1], args[2]);
		                        break;
		                    default:
		                        // have more than 2 given arguments
		                        _h[i]['h'].apply(_h[i]['ctx'], args);
		                        break;
		                }
		                
		                if (_h[i]['one']) {
		                    _h.splice(i, 1);
		                    len--;
		                }
		                else {
		                    i++;
		                }
		            }
		        }
		        return this;
	    	}
		};

		return EventAction;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * zrender: 生成唯一id
	 *
	 * @author errorrik (errorrik@gmail.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	        var idStart = 0x0907;

	        return function () {
	            return 'angel__' + (idStart++);
	        };
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(3),
	    __webpack_require__(15)
	  ], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	    utils,
	    easing
	  ) {
	    /**
	     * @author   milan(white gourd angle)
	     * @describe 动画类
	     */
	    var Animation = function(){
	    	var self = this;
	      utils.merge(self, {
	        queue: {} // 动画队列
	      });
	    }
	    Animation.prototype = {
	    	animate: function(attrs, time, callback){
	           /**
	            * @describe 记录动画信息、分类存储
	            * @param    
	            * @return   
	            */
	            var self = this,
	                queue = self.queue,
	                prevTime,
	                easingType = attrs.easing || 'Linear',
	                attr;
	            delete attrs.easing;
	            for(var i in attrs){
	              attr = attrs[i];
	              if(!queue[i]){
	                // 插入第一帧
	                queue[i] = {
	                  startTime: new Date().getTime(),
	                  step: 1,
	                  time: 0,
	                  queue: [{time: 0, attr: utils.merge({}, self[i])}]
	                };
	              }
	              // 插入动画队列
	              prevTime = queue[i].queue[queue[i].queue.length - 1].time;
	              queue[i].queue.push({
	                time: prevTime + time,
	                attr: attr,
	                easingType: easingType
	              });
	            }
	            return self;
	      },
	      onFrame: function(){
	           /**
	            * @describe 计算每一帧的属性
	            * @param    
	            * @return   
	            */
	          var self = this,
	              queue = self.queue,
	              time,
	              stepIndex,
	              attr;
	          for(var i in queue){
	            attr = queue[i];
	            time = new Date().getTime() - attr.startTime;
	            if(time === 0){
	              continue;
	            }
	            // 获取当前动画阶段
	            stepIndex = self._getStep(attr, time);
	            // 新属性合并
	            var frameAttr = self._attrOnFrame(attr, i, stepIndex, time);
	            utils.merge(self[i], frameAttr.attr, true);
	            if(frameAttr.isEnd){
	              delete queue[i];
	            }
	            self.cacheLevel._dirty = self.cacheLevel._clear = true;
	          }
	      },
	      _attrOnFrame: function(attr, key, step, time){
	        // 单个attr属性逐帧计算
	        var self = this,
	            queue = attr.queue,
	            prevFrame = queue[step - 1],
	            nextFrame = queue[step],
	            easingType = nextFrame.easingType,
	            percent = (time - prevFrame.time)/(nextFrame.time - prevFrame.time),
	            result;
	        // 比例计算
	        percent = Math.min(percent, 1);
	        percent = easing[easingType](percent);
	        // 动画新片段开始
	        if(attr.step !== step){
	          // 拷贝当前shape的属性，避免下一帧属性没有对照值
	          utils.merge(prevFrame.attr, self[key]);
	          attr.step = step;
	        }
	        result = {attr: self._attrCalcuByType(prevFrame.attr, nextFrame.attr, percent)};
	        // 动画结束
	        if(percent === 1 && step === queue.length - 1){
	          result.isEnd = true;
	        }
	        return result;
	      },
	      _attrCalcuByType: function(from, to, percent){
	           /**
	            * @describe 根据属性类型分发计算
	            * @param    
	            * @return   
	            */
	          var self = this;
	          if(to instanceof Array){
	            return self._attrCalcuByArray(from, to, percent);
	          }
	          else if(to instanceof Object){
	            return self._attrCalcuByObject(from, to, percent);
	          }
	          else if(!isNaN(to)){
	            return self._attrCalcuByInt(from, to, percent);
	          }
	          else if(Object.prototype.toString.call(to) === "[object String]" && to.match(/rgba/).length > 0){
	            // 颜色属性，形如rgba(23,45,64,0.1)
	            return self._attrCalcuByColor(from, to, percent);
	          }
	      },
	      _attrCalcuByObject: function(from, to, percent){
	          /**
	            * @describe 复杂对象计算
	            * @param    
	            * @return   
	            */
	            var self = this,
	                newAttr = {};
	            for(var i in to){
	              // 拆解对象，分类计算
	              newAttr[i] = self._attrCalcuByType(from[i], to[i], percent);
	            }
	            return utils.merge(newAttr, from);
	      },
	      _attrCalcuByArray: function(from, to, percent){
	          /**
	            * @describe 数组计算
	            * @param    
	            * @return   
	            */
	            var self = this,
	                result = [];
	            for(var i = 0; i < to.length; i++){
	              result.push(self._attrCalcuByType(from[i], to[i], percent));
	              //result.push(self._attrCalcuByInt(from[i], to[i], percent));
	            }
	            return result;
	      },
	      _attrCalcuByInt: function(from, to, percent){
	          /**
	            * @describe 数字计算
	            * @param    
	            * @return   
	            */
	            return from + (to - from) * percent;
	      },
	      _attrCalcuByColor: function(from, to, percent){
	          /**
	            * @describe 颜色计算
	            * @param    
	            * @return   
	            */
	            var self = this,
	                fromColors = from.match(/[\d\.]+/g),
	                toColors = to.match(/[\d\.]+/g),
	                c,
	                result = [];
	            for(var i = 0; i < fromColors.length - 1; i++){
	              c = self._attrCalcuByInt(parseInt(fromColors[i]), parseInt(toColors[i]), percent);
	              result.push(Math.floor(c));
	            }
	            result.push(parseFloat(self._attrCalcuByInt(parseFloat(fromColors[3]), parseFloat(toColors[3])  , percent)));
	            return 'rgba(' + result.join(',') + ')';
	      },
	      _getStep: function(attr, time){
	        // 获取当前动画阶段
	        var queue = attr.queue,
	            currentStep = queue.length - 1;
	        for(var i = 0; i < queue.length; i++){
	          if(time <= queue[i].time){
	            currentStep = i;
	            break;
	          }
	        }
	        return currentStep;
	      }


	    }

	    return Animation;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	        /**
	         * 缓动代码来自 https://github.com/sole/tween.js/blob/master/src/Tween.js
	         * @see http://sole.github.io/tween.js/examples/03_graphs.html
	         * @exports zrender/animation/easing
	         */
	        var easing = {
	            // 线性
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            Linear: function (k) {
	                return k;
	            },

	            // 二次方的缓动（t^2）
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            QuadraticIn: function (k) {
	                return k * k;
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            QuadraticOut: function (k) {
	                return k * (2 - k);
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            QuadraticInOut: function (k) {
	                if ((k *= 2) < 1) {
	                    return 0.5 * k * k;
	                }
	                return -0.5 * (--k * (k - 2) - 1);
	            },

	            // 三次方的缓动（t^3）
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            CubicIn: function (k) {
	                return k * k * k;
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            CubicOut: function (k) {
	                return --k * k * k + 1;
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            CubicInOut: function (k) {
	                if ((k *= 2) < 1) {
	                    return 0.5 * k * k * k;
	                }
	                return 0.5 * ((k -= 2) * k * k + 2);
	            },

	            // 四次方的缓动（t^4）
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            QuarticIn: function (k) {
	                return k * k * k * k;
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            QuarticOut: function (k) {
	                return 1 - (--k * k * k * k);
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            QuarticInOut: function (k) {
	                if ((k *= 2) < 1) {
	                    return 0.5 * k * k * k * k;
	                }
	                return -0.5 * ((k -= 2) * k * k * k - 2);
	            },

	            // 五次方的缓动（t^5）
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            QuinticIn: function (k) {
	                return k * k * k * k * k;
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            QuinticOut: function (k) {
	                return --k * k * k * k * k + 1;
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            QuinticInOut: function (k) {
	                if ((k *= 2) < 1) {
	                    return 0.5 * k * k * k * k * k;
	                }
	                return 0.5 * ((k -= 2) * k * k * k * k + 2);
	            },

	            // 正弦曲线的缓动（sin(t)）
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            SinusoidalIn: function (k) {
	                return 1 - Math.cos(k * Math.PI / 2);
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            SinusoidalOut: function (k) {
	                return Math.sin(k * Math.PI / 2);
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            SinusoidalInOut: function (k) {
	                return 0.5 * (1 - Math.cos(Math.PI * k));
	            },

	            // 指数曲线的缓动（2^t）
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            ExponentialIn: function (k) {
	                return k === 0 ? 0 : Math.pow(1024, k - 1);
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            ExponentialOut: function (k) {
	                return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            ExponentialInOut: function (k) {
	                if (k === 0) {
	                    return 0;
	                }
	                if (k === 1) {
	                    return 1;
	                }
	                if ((k *= 2) < 1) {
	                    return 0.5 * Math.pow(1024, k - 1);
	                }
	                return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
	            },

	            // 圆形曲线的缓动（sqrt(1-t^2)）
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            CircularIn: function (k) {
	                return 1 - Math.sqrt(1 - k * k);
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            CircularOut: function (k) {
	                return Math.sqrt(1 - (--k * k));
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            CircularInOut: function (k) {
	                if ((k *= 2) < 1) {
	                    return -0.5 * (Math.sqrt(1 - k * k) - 1);
	                }
	                return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
	            },

	            // 创建类似于弹簧在停止前来回振荡的动画
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            ElasticIn: function (k) {
	                var s; 
	                var a = 0.1;
	                var p = 0.4;
	                if (k === 0) {
	                    return 0;
	                }
	                if (k === 1) {
	                    return 1;
	                }
	                if (!a || a < 1) {
	                    a = 1; s = p / 4;
	                }
	                else {
	                    s = p * Math.asin(1 / a) / (2 * Math.PI);
	                }
	                return -(a * Math.pow(2, 10 * (k -= 1)) *
	                            Math.sin((k - s) * (2 * Math.PI) / p));
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            ElasticOut: function (k) {
	                var s;
	                var a = 0.1;
	                var p = 0.4;
	                if (k === 0) {
	                    return 0;
	                }
	                if (k === 1) {
	                    return 1;
	                }
	                if (!a || a < 1) {
	                    a = 1; s = p / 4;
	                }
	                else {
	                    s = p * Math.asin(1 / a) / (2 * Math.PI);
	                }
	                return (a * Math.pow(2, -10 * k) *
	                        Math.sin((k - s) * (2 * Math.PI) / p) + 1);
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            ElasticInOut: function (k) {
	                var s;
	                var a = 0.1;
	                var p = 0.4;
	                if (k === 0) {
	                    return 0;
	                }
	                if (k === 1) {
	                    return 1;
	                }
	                if (!a || a < 1) {
	                    a = 1; s = p / 4;
	                }
	                else {
	                    s = p * Math.asin(1 / a) / (2 * Math.PI);
	                }
	                if ((k *= 2) < 1) {
	                    return -0.5 * (a * Math.pow(2, 10 * (k -= 1))
	                        * Math.sin((k - s) * (2 * Math.PI) / p));
	                }
	                return a * Math.pow(2, -10 * (k -= 1))
	                        * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

	            },

	            // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            BackIn: function (k) {
	                var s = 1.70158;
	                return k * k * ((s + 1) * k - s);
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            BackOut: function (k) {
	                var s = 1.70158;
	                return --k * k * ((s + 1) * k + s) + 1;
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            BackInOut: function (k) {
	                var s = 1.70158 * 1.525;
	                if ((k *= 2) < 1) {
	                    return 0.5 * (k * k * ((s + 1) * k - s));
	                }
	                return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
	            },

	            // 创建弹跳效果
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            BounceIn: function (k) {
	                return 1 - easing.BounceOut(1 - k);
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            BounceOut: function (k) {
	                if (k < (1 / 2.75)) {
	                    return 7.5625 * k * k;
	                }
	                else if (k < (2 / 2.75)) {
	                    return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
	                }
	                else if (k < (2.5 / 2.75)) {
	                    return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
	                }
	                else {
	                    return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
	                }
	            },
	            /**
	             * @param {number} k
	             * @return {number}
	             */
	            BounceInOut: function (k) {
	                if (k < 0.5) {
	                    return easing.BounceIn(k * 2) * 0.5;
	                }
	                return easing.BounceOut(k * 2 - 1) * 0.5 + 0.5;
	            }
	        };

	        return easing;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(3)
	  ], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	    utils
	  ) {
	    /**
	     * @author   milan(white gourd angle)
	     * @describe 动画控制中心
	     */
	    var Center = function(store, painter){
	    	 this.store = store;
	       this.painter = painter;
	    }
	    Center.prototype = {
	    	start: function(){
	           /**
	            * @describe 记录动画信息、分类存储
	            * @param    
	            * @return   
	            */
	          var self = this;
	          function step() {
	              //if (self._running) {
	                  self._update();
	                  self.painter.refresh();
	                  requestAnimationFrame(step);
	              //}
	          }
	          requestAnimationFrame(step);
	      },
	      _update: function () {
	        var shapes = this.store.getShapes();
	        for(var i in shapes){
	          shapes[i].onFrame();
	        }
	      }


	    }

	    return Center;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(3),
		__webpack_require__(11)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(3),
		__webpack_require__(11)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(
			utils, 
			Base
		){
	     /**
	      * @describe cardioidHeard
	      *   			水平方向： r=a(1-cosθ) 或 r=a(1+cosθ) (a>0)
		  *			    垂直方向： r=a(1-sinθ) 或 r=a(1+sinθ) (a>0)
	      * @param    
	      * @return   
	      */
		var cardioidHeard = function(option){
		     /**
		      * @describe 
		      * @param    
		      * @return   
		      */
			Base.call(this, option);
		}
		cardioidHeard.prototype = {
			_buildPath: function(ctx){
			     /**
			      * @describe 渲染
			      * @param    
			      * @return   
			      */
			    var self = this,
					style = self.style,
					a = style.a,
					x = style.x,
					y = style.y,
					n = style.n || 360,
					b,
					rx,
					ry,
					i = 0;
				ctx.moveTo(x + a, y);
				for(i=0; i<=n; i++){ 
					b = i/180 * Math.PI;
					rx = a * (1 + Math.sin(b));
					ry = a * (1 + Math.sin(b));
					
					ctx.lineTo(x + rx * Math.cos(b), y + ry * Math.sin(b));
				}
				
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
			}
		};

		utils.inherits(cardioidHeard, Base);
		return cardioidHeard;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(3),
		__webpack_require__(11)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(
			utils, 
			Base
		){
	     /**
	      * @describe 圆形
	      * @param    
	      * @return   
	      */
		var Circle = function(option){
		     /**
		      * @describe 
		      * @param    
		      * @return   
		      */
			Base.call(this, option);
		}
		Circle.prototype = {
			_buildPath: function(ctx){
			     /**
			      * @describe 渲染
			      * @param    
			      * @return   
			      */
				var self = this,
					style = self.style;
				ctx.arc(style.x, style.y, style.r, style.startAngle || 0, style.endAngle || 2*Math.PI);
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
					x: style.x - style.r,
					y: style.y - style.r,
					w: 2 * style.r,
					h: 2 * style.r
				};
			},
			isCover: function(x, y){
			     /**
			      * @describe 判断点是否在图形内
			      * @param    
			      * @return   
			      */
			    var self = this,
			    	style = self.style;
			    // 判断是否在包围矩阵中
			    if(self._isInArroundRect(x, y)){
			    	if(Math.pow(Math.abs(x - style.x), 2) + Math.pow(Math.abs(y - style.y), 2) <= Math.pow(style.r, 2)){
			    		return true;
			    	}
			    }
			    return false;
			}
		};

		utils.inherits(Circle, Base);
		return Circle;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(3),
		__webpack_require__(11)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(
			utils, 
			Base
		){
	     /**
	      * @describe 笛卡尔星形线 r=a(1-sinθ)
	      * @param    
	      * @return   
	      */
		var descartesHeard = function(option){
		     /**
		      * @describe 
		      * @param    
		      * @return   
		      */
			Base.call(this, option);
		}
		descartesHeard.prototype = {
			_buildPath: function(ctx){
			     /**
			      * @describe 渲染
			      * @param    
			      * @return   
			      */
			    var self = this,
					style = self.style,
					a = style.a,
					x = style.x,
					y = style.y,
					n = style.n || 360,
					b,
					r,
					i = 0;
				ctx.moveTo(x + r, y);
				for(i=0; i<=n; i++){ 
					b = i/180 * Math.PI;
					r = a * (1 - Math.sin(b));
					ctx.lineTo(x + r * Math.cos(b), y - r * Math.sin(b));
				}
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
					x: style.x - style.a,
					y: style.y - style.a/4,
					w: 2 * style.a,
					h: 2.25 * style.a
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
			}
		};

		utils.inherits(descartesHeard, Base);
		return descartesHeard;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(3),
		__webpack_require__(11)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(
			utils, 
			Base
		){
	     /**
	      * @describe 等角n边形
	      * @param    
	      * @return   
	      */
		var isogon = function(option){
		     /**
		      * @describe 
		      * @param    
		      * @return   
		      */
			Base.call(this, option);
		}
		isogon.prototype = {
			_buildPath: function(ctx){
			     /**
			      * @describe 渲染
			      * @param    
			      * @return   
			      */
			    var self = this,
					style = self.style,
					x = style.x,
					y = style.y,
					n = style.n,
					r = style.r,
					b = 2 * Math.PI/n,
					i = 0;
				ctx.moveTo(x, y - r);
				for(i=0; i<=n; i++){ 
					ctx.lineTo(x + r * Math.cos(b * i + Math.PI/2), y - r * Math.sin(b * i + Math.PI/2));
				}
				
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
					x: style.x - style.r,
					y: style.y - style.r,
					w: 2 * style.r,
					h: 2 * style.r
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
			}
		};

		utils.inherits(isogon, Base);
		return isogon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(3),
		__webpack_require__(11)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(
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
			    	edges = [];
			    for(var i = 0; i < path.length - 1; i++){
					edges.push([i, i + 1]);
				}
				return edges;
			}
		};

		utils.inherits(Line, Base);
		return Line;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(3),
		__webpack_require__(11)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(3),
		__webpack_require__(11)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(
			utils, 
			Base
		){
	     /**
	      * @describe 环
	      * @param    
	      * @return   
	      */
		var ring = function(option){
		     /**
		      * @describe 
		      * @param    
		      * @return   
		      */
			Base.call(this, option);
		}
		ring.prototype = {
			_buildPath: function(ctx){
			     /**
			      * @describe 渲染
			      * @param    
			      * @return   
			      */
			    var self = this,
					style = self.style;
	            ctx.arc(style.x, style.y, style.r0, 0, Math.PI * 2, false);
	            ctx.moveTo(style.x + style.r, style.y);
				ctx.arc(style.x, style.y, style.r, 0, Math.PI * 2, true);
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
					x: style.x - style.r,
					y: style.y - style.r,
					w: 2 * style.r,
					h: 2 * style.r
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
			}
		};

		utils.inherits(ring, Base);
		return ring;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(3),
		__webpack_require__(11)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(
			utils, 
			Base
		){
	     /**
	      * @describe 玫瑰线 r = sin ( k θ )　或　r = cos ( k θ )
	      * @param    
	      * @return   
	      */
		var Rose = function(option){
		     /**
		      * @describe 
		      * @param    
		      * @return   
		      */
			Base.call(this, option);
		}
		Rose.prototype = {
			_buildPath: function(ctx){
			     /**
			      * @describe 渲染
			      * @param    
			      * @return   
			      */
			    var self = this,
					style = self.style,
					x = style.x,
					y = style.y,
					n = style.n || (2 - style.k % 2) * 180, // 奇数180度 偶数花瓣360度
					k = style.k % 2 === 0 ? style.k/2 : style.k,
					r = style.r,
					roseR,
					b;
					k = style.k;
				ctx.moveTo(x, y);
				for(var i=0; i<=n; i++){ 
					b = i/180 * Math.PI;
					roseR = r * Math.sin(k * b);
					ctx.lineTo(x + roseR * Math.cos(b), y - roseR * Math.sin(b));
				}
				
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
			}
		};

		utils.inherits(Rose, Base);
		return Rose;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(3),
		__webpack_require__(11)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(
			utils, 
			Base
		){
	     /**
	      * @describe n角星
	      * @param    
	      * @return   
	      */
		var star = function(option){
		     /**
		      * @describe 
		      * @param    
		      * @return   
		      */
			Base.call(this, option);
			this.points = [];
			this.edges = [];
		}
		star.prototype = {
			_buildPath: function(ctx){
			     /**
			      * @describe 渲染
			      * @param    
			      * @return   
			      */
			    var self = this,
					style = self.style,
					x = style.x,
					y = style.y,
					n = style.n,
					r = style.r,
					r0 = style.r0,
					b = 2 * Math.PI/n,
					i = 0, px, py,
					points = self.points,
					edges = self.edges;
				points.push({
					x: x, 
					y: y - r
				});
				for(i=0; i<n; i++){ 
					px = x + r * Math.cos(b * i + Math.PI/2);
					py = y - r * Math.sin(b * i + Math.PI/2);
					points.push({
						x: px, 
						y: py
					});
					edges.push([i, i+1]);

					px = x + r0 * Math.cos(b * (i + 0.5) + Math.PI/2);
					py = y - r0 * Math.sin(b * (i + 0.5) + Math.PI/2);
					points.push({
						x: px, 
						y: py
					});
					edges.push([i+1, i+2]);
				}
				points.push({
					x: x, 
					y: y - r
				});
				edges.push([i+1, i+2]);
				
				if(!ctx){
					return;
				}
				ctx.moveTo(x, y - r);
				for(i=0; i<2*n; i+=2){
					ctx.lineTo(points[i+1].x, points[i+1].y);
					ctx.lineTo(points[i+2].x, points[i+2].y);
				}
				ctx.lineTo(x, y - r);
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
					x: style.x - style.r,
					y: style.y - style.r,
					w: 2 * style.r,
					h: 2 * style.r
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
				self._buildPath();
				return {
					points: self.points,
					edges: self.edges
				};
			}
		};

		utils.inherits(star, Base);
		return star;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(3),
		__webpack_require__(11)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(
			utils, 
			Base
		){
	     /**
	      * @describe 文字
	      * @param    
	      * @return   
	      */
		var text = function(option){
		     /**
		      * @describe 
		      * @param    
		      * @return   
		      */
			Base.call(this, option);
		}
		text.prototype = {
			_buildPath: function(ctx){
			     /**
			      * @describe 渲染
			      * @param    
			      * @return   
			      */
				var self = this,
					style = self.style,
					fillText = function(){
						if(style.maxWidth){
							ctx.fillText(style.text, style.x, style.y, style.maxWidth);
						}
						else{
							ctx.fillText(style.text, style.x, style.y);
						}
					},
					strokeText = function(){
						if(style.maxWidth){
							ctx.strokeText(style.text, style.x, style.y, style.maxWidth);
						}
						else{
							ctx.strokeText(style.text, style.x, style.y);
						}
					};
				utils.merge(ctx, style, true);
				switch (style.brushType) {
		            case 'both':
		                fillText();
		                style.lineWidth > 0 && strokeText();
		            case 'stroke':
		                style.lineWidth > 0 && strokeText();
		                break;
		            default:
		                fillText();
		        }
			},
			draw: function(ctx){
				/**
			      * @describe text特殊的渲染方法,覆盖父类方法
			      * @param    
			      * @return   
			      */
			    var self = this;

				self._buildPath(ctx);
	            self._dirty = false;
			}
		};

		utils.inherits(text, Base);
		return text;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ]);