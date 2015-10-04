define([
    './Matrix'
    ], function (
        Matrix
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
                              position: [x, y, z],
                              derection: [x, y, z],
                              rotate: 0
                          }
                          shapePoints[
                            {x, y, z}
                          ]
              * @return   
              */
            var result = [];
            for(var i=0; i<shapePoints.length; i++){
              result.push(utils._calcuPointByCamera(camera, shapeAttr, shapePoints[i]));
            }
            return result;
        },
        _createMatrixByDerection: function(derection){
             /**
              * @describe 根据方向向量创建矩阵坐标系，
                          存在无数个这样的坐标系，任取两个向量，使其与方向向量两两垂直并单位化
              * @param    derection: [x, y, z]
              * @return   martrix array 3*3 
              */
            var matrix = [];
            return matrix;
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
            var newPoint = {};
            return newPoint;
        }
     };
     return Util;
});

