define([], function () {
    /**
     * @author   milan(white gourd angle)
     * @describe 矩阵工具类
     */
     var Matrix = {
        unit: function(matrix){
             /**
              * @describe 矩阵单位化
              * @param    
              * @return   
              */
            var _unit = function(v){
                  var l = Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2) + Math.pow(v[2], 2));
                  return [v[0]/l, v[1]/l, v[2]/l];
                },
                d1 = _unit([matrix[0], matrix[3], matrix[6]]),
                d2 = _unit([matrix[1], matrix[4], matrix[7]]),
                d3 = _unit([matrix[2], matrix[5], matrix[8]]);
            return [d1[0], d2[0], d3[0],
                    d1[1], d2[1], d3[1],
                    d1[2], d2[2], d3[2]];
        },
        toStandardCoordinate: function(matrix, point){
          /**
           * @describe 将matrix下的point转换为标准坐标系下的点
           * @param    
           * @return   
           */
           return {
              x: point.x * matrix[0] + point.y * matrix[1] + point.z * matrix[2],
              y: point.x * matrix[3] + point.y * matrix[4] + point.z * matrix[5],
              z: point.x * matrix[6] + point.y * matrix[7] + point.z * matrix[8]
           };
        },
        coordinateTransform: function(matrix, point){
          /**
           * @describe 将标准坐标系下的点变换为matrix下的点
           * @param    
           * @return   
           */
           var m = matrix,
               replaceM,
               replaceMatrix = function(index){
                  replaceM = [].concat(m);
                  replaceM.splice(index, 1, point.x);
                  replaceM.splice(index + 3, 1, point.y);
                  replaceM.splice(index + 6, 1, point.z);
                  return replaceM;
               },
               D,D1,D2,D3;
           // 克莱姆法则，求出D, D1, D2, D3
           D = Matrix.determinant(m);
           D1 = Matrix.determinant(replaceMatrix(0));
           D2 = Matrix.determinant(replaceMatrix(1));
           D3 = Matrix.determinant(replaceMatrix(2));
           return {
              x: D1/D,
              y: D2/D,
              z: D3/D
           };
        },
        determinant: function(matrix){
            /**
              * @describe 三阶行列式计算
              * @param    matrix 3*3
              * @return   
              */
            var m = matrix;
            return m[0]*(m[4]*m[8]-m[5]*m[7]) - m[3]*(m[1]*m[8]-m[2]*m[7]) + m[6]*(m[1]*m[5]-m[2]*m[4]);
        },
        elimination: function(matrix){
             /**
              * @describe 高斯-若尔当消元
              * @param    matrix 加宽矩阵 4*3
              * @return   
              */
              // TODO
            var m = [];
        }
     };
     return Matrix;
});

