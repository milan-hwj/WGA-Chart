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
    		/*canvas.style.width = '100%';
    		canvas.style.height = '100%';*/
        canvas.width = option.dom.offsetWidth;
        canvas.height = option.dom.offsetHeight;;
        canvas.style.position = 'absolute';
    		
    		option.dom.appendChild(canvas);

        self.ctx = canvas.getContext('2d');
        self.dom = canvas;
    	},
      updateStatus: function(isPaintAll){
           /**
            * @describe 根据画布内shape状态更新自身状态
            * @param    
            * @return   
            */
          var self = this;
              children = self._children;
          if(self._dirty){
              return;
          }
          if(isPaintAll){ // 强制重绘
              self._dirty = true;
              return;
          }
          for(var i in children){
              // 置为重绘
              if(children[i]._dirty){
                  self._dirty = true;
                  break;
              }
          }
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
      setChild: function(shapes){
           /**
            * @describe 
            * @param    
            * @return   
            */
          var self = this;
          self._dirty = true;
          self._children = shapes;
      },
      load: function(shapesData){
           /**
            * @describe 更新level层数据
            * @param    shapesData{shapes: array, _dirty: boolean, _clear: boolean}
            * @return   
            */
          var self = this;
          self.setChild(shapesData.shapes);
          self.set('dirty', shapesData._dirty);
          self.set('clear', shapesData._clear);   
          self.set('shapeData', shapesData); // 记录形状信息，包括_clear._dirty属性
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

          ctx.clearRect(0, 0, width, height);
      },
      initState: function(){
           /**
            * @describe 状态初始化  
            * @param    
            * @return   
            */
          var self = this,
              shapes = this.get('shapeData');
          self.set('dirty', false);
          self.set('clear', false);
          shapes._dirty = shapes._clear = false;
      }
    };

    return Level;
});

