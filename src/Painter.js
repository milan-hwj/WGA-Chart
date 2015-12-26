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

     		self._updateLevelStatus(); // 更新画布重绘标志

            self.store.is3D ? self._render3D() : self._render(isPaintAll); // 渲染
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
                // 图层shape数目、属性变化
                else if(levelChildrenMap[i]._dirty){
                    levels[i].load(levelChildrenMap[i]);
                }
            }
        },
        _render: function(isPaintAll){
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
});

