define([
    './Event',
    './Store',
    './Painter',
    './Camera',
    './animation/AnimateCenter'
    ], function (
        Event,
        Store,
        Painter,
        Camera,
        AnimateCenter
    ) {
    /**
     * @author   milan(white gourd angel)
     * @describe 
     */
     var angel = {};

     angel.version = '2.0.0';

     angel.init = function(container){
     	/**
     	 * @describe Angel初始化 
     	 * @param    {HTMLElement} dom容器
     	 * @return   Angel实例
     	 */
     	 var instance = new Angel(container);
     	 return instance;	
     }

     var Angel = function(container){
     	/**
     	 * @describe Angel实例生成
     	 */
         var self = this;
         self.dom = container;
     	 self.store = new Store(self);
         self.event = new Event(container, self.store);
         self.painter = new Painter(self);
         //new AnimateCenter(self.store, self.painter).start();
     }

     Angel.prototype = {
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
     		return this;
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
   		dispose: function(){
   		     /**
   		      * @describe 销毁实例
   		      * @param    
   		      * @return   
   		      */

   		}
     };

     return angel;
});

