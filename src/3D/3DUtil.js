define([
    './Matrix'
    ], function (
        Matrix
    ) {
    /**
     * @author   milan(white gourd angle)
     * @describe 3D绘制工具类
     */
     var 3DUtil = {
        calcuCtx: function(ctx, camera, shapeAttr){
             /**
              * @describe 计算对应视角下ctx对象的transform属性
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
              * @return   Context ctx
              */
            return ctx;
        }
     };
     return 3DUtil;
});

