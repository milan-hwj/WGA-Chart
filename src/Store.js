define([
  './util/utils'
  ],function (
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
    	  self._shapeMap = {}; // 形状MAP {shapeId: shape}
        self._levels = []; // 画板层级，zlevel升序排列
        self._levelChildrenMap = {}; // 各画布内shape {zlevel: {shapes:[], _dirty: boolean}}
    	  self._groupMap = {}; // 组MAP
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
});

