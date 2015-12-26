define([
    './Matrix',
    '../util/utils'
    ], function (
        Matrix,
        utils
    ) {
    /**
     * @author   milan(white gourd angle)
     * @describe 3D绘制工具类
     */
     var Util = {
        calcuPointsByCamera: function(camera, shapeAttr, shapePoints){
             /**
              * @describe 计算对应视角下坐标值
              * @param    camera{
                              position: [x, y, z],
                              derection: [x, y, z],
                              rotate: 0
                          }
                          shapeAttr{
                              derection: [x, y, z],
                              rotate: 0
                          }
                          shapePoints[
                            {x, y, z}
                          ]
              * @return   
              */
            var result = [],
                p;
            for(var i=0; i<shapePoints.length; i++){
              p = Util._calcuPointByCamera(camera, shapeAttr, shapePoints[i]);
              result.push(p);
            }
            return result;
        },
        _calcuPointByCamera: function(camera, shapeAttr, point){
             /**
              * @describe 计算对应视角下坐标值
              * @param    ctx Context
                          camera{
                              position: [x, y, z],
                              derection: [x, y, z],
                              rotate: 0
                          }
                          shapeAttr{
                              position: [x, y, z],
                              derection: [x, y, z],
                              rotate: 0
                          }
                          point{x, y, z}
              * @return   Context ctx
              */
            var newPoint = {},
                shapeMatrix = shapeAttr.matrix,
                cameraMatrix = camera.matrix,
                cameraPoint = camera.relativePosition,
                point = {
                  x: point.x - cameraPoint.x,
                  y: point.y - cameraPoint.y,
                  z: point.z - cameraPoint.z
                },
            // 转化至图形方向坐标系   
            newPoint = Matrix.coordinateTransform(shapeMatrix, point);
            // 转化至视角坐标系
            newPoint = Matrix.coordinateTransform(cameraMatrix, newPoint);
            // 点投影
            newPoint = Util._projection(newPoint, camera);
            return newPoint;
        },
        _projection: function(point, camera){
           /**
              * @describe 计算对应视角下坐标值
              * @param    point 待投影点
                          cameraPoint 视角位置
              * @return   
              */
            var z = camera.distance,
                cameraPoint = camera.relativePosition,
                newPoint = {
                  x: point.x - cameraPoint.x,
                  y: point.y - cameraPoint.y,
                  z: point.z - cameraPoint.z
                };
                newPoint = point;
                deep = newPoint.z + camera.distance; // 待投影点与camera的z坐标距离
            if(deep < 0){
              // 点在视角背面，不显示
              return null;
            }
            return {
              x: camera.eyeWidthBite*(newPoint.x)*z/deep + camera.centerX,
              y: camera.eyeWidthBite*(newPoint.y)*z/deep + camera.centerY
            };
        },
        rotate: function(v, a, m){
          /**
           * @describe 坐标系m绕v轴旋转a度
           * @param    m:当前坐标系
           * @return   
           */
           var _rotate = function(columnIndex, axis, a){
                  var newP = Matrix.pointRotate({
                    x: m[columnIndex],
                    y: m[columnIndex + 3],
                    z: m[columnIndex + 6]
                  }, axis, a);
                  m[columnIndex] = newP.x;
                  m[columnIndex + 3] = newP.y;
                  m[columnIndex + 6] = newP.z;
               };
           if(v === 'x'){
              _rotate(1, {x: m[0], y: m[3], z: m[6]}, a);
              _rotate(2, {x: m[0], y: m[3], z: m[6]}, a);
           }
           else if(v === 'y'){
              _rotate(0, {x: m[1], y: m[4], z: m[7]}, a);
              _rotate(2, {x: m[1], y: m[4], z: m[7]}, a);
           }
           else{
              _rotate(0, {x: m[2], y: m[5], z: m[8]}, a);
              _rotate(1, {x: m[2], y: m[5], z: m[8]}, a);
           }

        }
     };
     return Util;
});

