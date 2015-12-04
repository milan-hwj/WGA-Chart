define([
    './util/utils',
    './3D/Matrix',
    './3D/3DUtil'
    ], function (
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
     	 * @describe Angel实例生成
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
});