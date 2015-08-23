define([
    './Level'
    ], function (
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

     		self._updateLevelStatus(isPaintAll); // 更新画布重绘标志

            self._render(); // 渲染
     	},
        _updateLevelStatus: function(isPaintAll){
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
                // 图层shape数目变化
                else if(levelChildrenMap[i]._dirty){
                    levels[i].load(levelChildrenMap[i]);
                }
            }
            /*for(var i in levels){
                levels[i].updateStatus();
            }*/
        },
        _render: function(){
             /**
              * @describe 渲染
              * @param    
              * @return   
              */
            var self = this,
                store = self.store,
                levelChildrenMap = store._levelChildrenMap,
                levels = self.levels,
                level,
                shapes,
                ctx;

            for(var i in levels){
                level = levels[i];
                if(!level._dirty){ // 无需重绘
                    continue;
                }
                // 逐个按顺序渲染
                shapes = level.get('children');
                ctx = level.ctx;
                if(level._clear){ // 重绘
                    level.clear(); // 清空画板
                    //console.info(i + '  clear');
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
                // 关闭重绘标志
                level.initState();
            }   
            store.recoverStatus();
        }
     };
     return Painter;
});

