define([
    '../util/utils'
  ],function (
    utils
  ) {
    /**
     * @author   milan(white gourd angle)
     * @describe 动画类
     */
    var Animation = function(){
    	var self = this;
      utils.merge(self, {
        queue: {} // 动画队列
      });
    }
    Animation.prototype = {
    	animate: function(attrs, time, callback){
           /**
            * @describe 记录动画信息、分类存储
            * @param    
            * @return   
            */
            var self = this,
                queue = self.queue,
                attr;
            for(var i in attrs){
              attr = attrs[i];
              if(!queue[i]){
                // 插入第一帧
                queue[i] = {
                  startTime: new Date().getTime(),
                  time: 0,
                  currentStep: 0,
                  queue: [{time: 0, attr: utils.merge({}, self[i])}]
                };
              }
              // 插入动画队列
              queue[i].queue.push({time: time, attr: attr});
            }
            return self;
      },
      onFrame: function(){
           /**
            * @describe 计算每一帧的属性
            * @param    
            * @return   
            */
          var self = this,
              queue = self.queue,
              time,
              stepIndex,
              attr;
          for(var i in queue){
            attr = queue[i];
            time = new Date().getTime() - attr.startTime;
            if(time === 0){
              continue;
            }
            // 获取当前动画阶段
            stepIndex = self._getStep(attr, time);
            // 新属性合并
            var frameAttr = self._attrOnFrame(attr.queue, stepIndex, time);
            utils.merge(self[i], frameAttr.attr, true);
            if(frameAttr.isEnd){
              delete queue[i];
            }
          }
      },
      _attrOnFrame: function(queue, index, time){
        // 单个attr属性逐帧计算
        var self = this,
            prevFrame = queue[index - 1],
            nextFrame = queue[index],
            percent = (time - prevFrame.time)/(nextFrame.time - prevFrame.time),
            result;
        percent = Math.min(percent, 1);
        result = {attr: self._attrCalcuByType(prevFrame.attr, nextFrame.attr, percent)};
        if(percent === 1){
          result.isEnd = true;
        }
        return result;
      },
      _attrCalcuByType: function(from, to, percent){
           /**
            * @describe 根据属性类型分发计算
            * @param    
            * @return   
            */
          var self = this;
          if(to instanceof Array){
            return self._attrCalcuByArray(from, to, percent);
          }
          else if(to instanceof Object){
            return self._attrCalcuByObject(from, to, percent);
          }
          else if(!isNaN(to)){
            return self._attrCalcuByInt(from, to, percent);
          }
          else if(Object.prototype.toString.call(to) === "[object String]" && to.match(/rgba/).length > 0){
            // 颜色属性，形如rgba(23,45,64,0.1)
            return self._attrCalcuByColor(from, to, percent);
          }
      },
      _attrCalcuByObject: function(from, to, percent){
          /**
            * @describe 复杂对象计算
            * @param    
            * @return   
            */
            var self = this,
                newAttr = {};
            for(var i in to){
              // 拆解对象，分类计算
              newAttr[i] = self._attrCalcuByType(from[i], to[i], percent);
            }
            return utils.merge(newAttr, from);
      },
      _attrCalcuByArray: function(from, to, percent){
          /**
            * @describe 数组计算
            * @param    
            * @return   
            */
            var self = this,
                result = [];
            for(var i = 0; i < to.length; i++){
              result.push(self._attrCalcuByInt(from[i], to[i], percent));
            }
            return result;
      },
      _attrCalcuByInt: function(from, to, percent){
          /**
            * @describe 数字计算
            * @param    
            * @return   
            */
            return (to - from) * percent + from;
      },
      _attrCalcuByColor: function(from, to, percent){
          /**
            * @describe 颜色计算
            * @param    
            * @return   
            */
            var self = this,
                fromColors = from.match(/[\d\.]+/g),
                toColors = to.match(/[\d\.]+/g),
                result = [];
            for(var i = 0; i < fromColors.length; i++){
              result.push(self._attrCalcuByInt(fromColors[i], toColors[i], percent));
            }
            return 'rgba(' + result.join(',') + ')';
      },
      _getStep: function(attr, time){
        // 获取当前动画阶段
        var queue = attr.queue,
            currentStep = queue.length - 1;
        for(var i = 0; i < queue.length; i++){
          if(time <= queue[i].time){
            currentStep = i;
            break;
          }
        }
        return currentStep;
      }


    }

    return Animation;
});

