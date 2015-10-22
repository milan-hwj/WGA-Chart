define([
    './util/utils',
    './3D/3DUtil',
    './Event',
    './Store',
    './Painter',
    './animation/AnimateCenter'
    ], function (
        utils,
        dimentionUtil,
        Event,
        Store,
        Painter,
        AnimateCenter
    ) {
    /**
     * @author   milan(white gourd angel)
     * @describe 视角类, 通过位置、方向控制视角
     */
     var Camera = function(opt, container){
     	/**
     	 * @describe Angel实例生成
     	 */
         var self = this,
             centerX = container.clientWidth/2,
             centerY = container.clientHeight/2;
         opt = utils.merge({
            position: [0, 0, 0],
            rotate: 0,
            derection: [0, 0, 1],
            distance: 100, // 图像接收器相对于投影屏的距离
            centerX: centerX,
            centerY: centerY
         }, opt, true);

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
          this._initMatrix();
        },
        _initMatrix: function(){
             /**
              * @describe 设置镜头方向向量
              * @param    
              * @return   
              */
            var self = this;
            self.matrix = dimentionUtil.createMatrixByDerection(self.derection);  
        },
        setDerection: function(derection){
             /**
              * @describe 设置镜头方向向量
              * @param    
              * @return   
              */
            var self = this;
            self.derection = derection;
            // 重置视角坐标系
            self.matrix = dimentionUtil.createMatrixByDerection(self.derection);  
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