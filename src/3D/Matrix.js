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
        elimination: function(matrix){
             /**
              * @describe 高斯-若尔当消元
              * @param    matrix 3*3
              * @return   
              */
            var m = [];
        }
     };
     return Matrix;
});

