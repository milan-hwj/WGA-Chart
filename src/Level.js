define([
    './util/utils'
  ], function (
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
});