define([
    './util/utils',
    './Event',
    './Store',
    './Painter',
    './animation/AnimateCenter'
    ], function (
        utils,
        Event,
        Store,
        Painter,
        AnimateCenter
    ) {
    /**
     * @author   milan(white gourd angel)
     * @describe 视角类, 通过位置、方向控制视角
     */
     var Camera = function(opt){
     	/**
     	 * @describe Angel实例生成
     	 */
         var self = this;

         utils.merge(self, {
            position: [0, 0, -50],
            rotate: 0,
            derection: [0, 0, 1]
         });
         utils.merge(self, opt);
     }

     Camera.prototype = {
        setDerection: function(){
             /**
              * @describe 设置镜头方向向量
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
                
        },
        zoomOut: function(z){
             /**
              * @describe 缩小,镜头拉远z
              * @param    
              * @return   
              */
                
        }
     };

     return Camera;
});