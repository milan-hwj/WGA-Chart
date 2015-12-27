define(function () {
    return {
        buildPath: function(ctx){
            // 自定义绘制方式
            var self = this,
                x = self.style.x,
                y = self.style.y,
                w = self.w = 80,
                h = self.h = 24,
                opt = {
                  brushType : 'stroke',
                  lineWidth : 2,
                  strokeStyle : 'rgba(0, 0, 255, 1)'
                };
            // 上下两条线
            opt.path = [{x: x - w/2, y: y - h/2}, {x: x + w/2, y: y - h/2}];
            new Angel.Line({
              style: opt
            }).draw(ctx);

            opt.path = [{x: x - w/2, y: y + h/2}, {x: x + w/2, y: y + h/2}];
            new Angel.Line({
              style: opt
            }).draw(ctx);
            
            // 左右两个半圆
            opt = {
                style: {
                  brushType : 'stroke',
                  lineWidth : 2,
                  x: x - w/2, 
                  y: y,
                  r: h/2,
                  startAngle: Math.PI*0.5,
                  endAngle: Math.PI*1.5
                }
              };
            new Angel.Circle(opt).draw(ctx);
            opt.style.x = x + w/2;
            opt.style.startAngle = Math.PI*1.5;
            opt.style.endAngle = Math.PI*0.5;
            new Angel.Circle(opt).draw(ctx);

            // 类型
            new Angel.Circle({
              style: {
                brushType : 'stroke',
                lineWidth : 1,
                x: x - w/2, 
                y: y,
                r: h/2 - 4
              }
            }).draw(ctx);

            // 类型图标
            new Angel.Star({
              style: {
                x: x - w/2,
                y: y,
                r: h/2 - 4,
                r0: h/4 - 2,
                n: Math.ceil(Math.random()*5 + 3),
                lineWidth : 1,
                brushType : 'fill',
                fillStyle : 'rgba(' + (Math.ceil(Math.random()*55) + 200) + ', 0, 0, 1)'
              }
            }).draw(ctx);

            // 名称
            new Angel.Text({
              style: {
                x: x - w/2 + h/2,
                y: y + (ctx.measureText('测').width - 2)/2,
                brushType: 'fill',
                fillStyle: '#999',
                font: '12px',
                text: self.style.text
              }
            }).draw(ctx);
        },
        isCover: function(x, y){
            /**
              * @describe 自定义包围矩形,若不绑定事件，可以不设定
              * @param    
              * @return   
              */
            var self = this,
                h = self.h,
                w = self.w + h,
                style = self.style;
          // 判断是否在包围矩阵中
          if(x >= style.x - w/2  && x <= style.x + w/2 && y >= style.y - h/2 && y <= style.y + h/2){
            return true;
          }
          return false;
        }
    };
});