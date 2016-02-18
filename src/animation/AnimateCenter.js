define([
    '../util/utils'
  ],function (
    utils
  ) {
    /**
     * @author   milan(white gourd angle)
     * @describe 动画控制中心
     */
    var Center = function(store, painter){
    	 this.store = store;
       this.painter = painter;
    }
    Center.prototype = {
    	start: function(){
           /**
            * @describe 记录动画信息、分类存储
            * @param    
            * @return   
            */
          var self = this;
          function step() {
              //if (self._running) {
                  self._update();
                  self.painter.refresh();
                  requestAnimationFrame(step);
              //}
          }
          requestAnimationFrame(step);
      },
      _update: function () {
        var shapes = this.store.getShapes();
        for(var i in shapes){
          shapes[i].onFrame();
        }
      }


    }

    return Center;
});

