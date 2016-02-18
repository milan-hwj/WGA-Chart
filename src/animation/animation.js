define([
    '../util/utils',
    './easing'
  ],function (
    utils,
    easing
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
                prevTime,
                easingType = attrs.easing || 'Linear',
                attr;
            delete attrs.easing;
            for(var i in attrs){
              attr = attrs[i];
              if(!queue[i]){
                // 插入第一帧
                queue[i] = {
                  startTime: new Date().getTime(),
                  step: 1,
                  time: 0,
                  queue: [{time: 0, attr: utils.merge({}, self[i])}]
                };
              }
              // 插入动画队列
              prevTime = queue[i].queue[queue[i].queue.length - 1].time;
              queue[i].queue.push({
                time: prevTime + time,
                attr: attr,
                easingType: easingType
              });
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
            var frameAttr = self._attrOnFrame(attr, i, stepIndex, time);
            utils.merge(self[i], frameAttr.attr, true);
            if(frameAttr.isEnd){
              delete queue[i];
            }
            self.cacheLevel._dirty = self.cacheLevel._clear = true;
          }
      },
      _attrOnFrame: function(attr, key, step, time){
        // 单个attr属性逐帧计算
        var self = this,
            queue = attr.queue,
            prevFrame = queue[step - 1],
            nextFrame = queue[step],
            easingType = nextFrame.easingType,
            percent = (time - prevFrame.time)/(nextFrame.time - prevFrame.time),
            result;
        // 比例计算
        percent = Math.min(percent, 1);
        percent = easing[easingType](percent);
        // 动画新片段开始
        if(attr.step !== step){
          // 拷贝当前shape的属性，避免下一帧属性没有对照值
          utils.merge(prevFrame.attr, self[key]);
          attr.step = step;
        }
        result = {attr: self._attrCalcuByType(prevFrame.attr, nextFrame.attr, percent)};
        // 动画结束
        if(percent === 1 && step === queue.length - 1){
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
              result.push(self._attrCalcuByType(from[i], to[i], percent));
              //result.push(self._attrCalcuByInt(from[i], to[i], percent));
            }
            return result;
      },
      _attrCalcuByInt: function(from, to, percent){
          /**
            * @describe 数字计算
            * @param    
            * @return   
            */
            return from + (to - from) * percent;
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
                c,
                result = [];
            for(var i = 0; i < fromColors.length - 1; i++){
              c = self._attrCalcuByInt(parseInt(fromColors[i]), parseInt(toColors[i]), percent);
              result.push(Math.floor(c));
            }
            result.push(parseFloat(self._attrCalcuByInt(parseFloat(fromColors[3]), parseFloat(toColors[3])  , percent)));
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

