define(function () {
    return {
        buildPath: function(ctx){
            // 自定义绘制方式
            var self = this,
                x1 = self.style.x1,
                y1 = self.style.y1,
                x2 = self.style.x2,
                y2 = self.style.y2,
                halfHeight = self.halfHeight,
                h0 = Math.min(y1, y2),
                h1 = Math.max(y1, y2),
                h2 = h0 + halfHeight + (h1 - h0 - 2*halfHeight) * 1/3,
                h3 = h0 + halfHeight + (h1 - h0 - 2*halfHeight) * 2/3;
                // 创建连线
                new Angel.BezierCurve({
                    style: {
                        points: [x1, y1 + halfHeight,
                                 x1, h3, 
                                 x2, h2, 
                                 x2, y2 - halfHeight],
                        lineWidth: 1,
                        brushType: 'stroke'
                    }
                }).draw(ctx);
        }
    };
});