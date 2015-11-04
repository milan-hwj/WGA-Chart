define([
    './util/utils',
    './3D/3DUtil'
    ], function (
        utils,
        dimentionUtil
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
            position: [0, 0, 0],// 视角位置
            matrix: [1, 0, 0,
                     0, 1, 0,
                     0, 0, 1], // 视角坐标系(角度)
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
          // this._initMatrix();
        },
        // _initMatrix: function(){
        //      /**
        //       * @describe 设置镜头方向向量
        //       * @param    
        //       * @return   
        //       */
        //     var self = this;
        //     self.matrix = dimentionUtil.createMatrixByDerection(self.derection);  
        // },
        // setDerection: function(derection){
        //      /**
        //       * @describe 设置镜头方向向量
        //       * @param    
        //       * @return   
        //       */
        //     var self = this;
        //     self.derection = derection;
        //     // 重置视角坐标系
        //     self.matrix = dimentionUtil.createMatrixByDerection(self.derection);  
        // },
        rotate: function(axis, a){
             /**
              * @describe 沿X/Y/Z轴旋转
              * @param    
              * @return   
              */
            dimentionUtil.rotate(axis, a, this.matrix);
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
            this.position[2] += z;
        },
        zoomOut: function(z){
             /**
              * @describe 缩小,镜头拉远z
              * @param    
              * @return   
              */
            this.position[2] -= z;
        },
        move: function(axis, d){
             /**
              * @describe 沿X/Y/Z轴横向移动d距离
              * @param    
              * @return   
              */
            var v = ['x', 'y', 'z'],
                index = v.indexOf(axis);
            this.position[index] += d;   
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
              this.rotate('x', aX);
              this.rotate('y', aY);
            }
        }
     };

     return Camera;
});