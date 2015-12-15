require.config({
        packages: [
            {
                name: 'angel',
                location: '../../src',
                main: 'angel'
            }
        ]
    });
    require(
        [
            "angel/angel",
            "./node",
            "angel/shape/BezierCurve",
            "./move"
        ], 
        function(Angel, nodeOpt, Curve){

            // 初始化angel
            var angel = Angel.init( document.getElementById("Main") );

            // 节点构造器
            var Node = angel.createShape(nodeOpt);

            // 数据
            var data = {},
                node;
            for(var i=0;i<5;i++){
                var j = Math.ceil(Math.random()*5) * i;
                for(;j>0;j--){
                    data[i + '_' + j] = {
                        x: j * 350,
                        y: i * 200,
                        to: i + '_' + j + '_1,' + i + '_' + j + '_2'
                    };
                    data[i + '_' + j + '_2'] = {
                        x: j * 350 - 100,
                        y: i * 200 + 100
                    };
                    data[i + '_' + j + '_1'] = {
                        x: j * 350 + 100,
                        y: i * 200 + 100
                    };
                }
            }
            console.info(i);
            /*var data = {
                a: {x: 300, y: 100, to: 'b,c'},
                b: {x: 200, y: 200},
                c: {x: 400, y: 200}
            }, node;*/

            // 创建图
            var nodeHeight = 24,
                halfHeight = nodeHeight/2,
                scale = [1, 1];
            for(var i in data){
                // 节点
                node = new Node({
                    zlevel: 2,
                    scale: scale,
                    style: {
                        brushType: 'stroke',
                        text: '自定义',
                        x: data[i].x,
                        y: data[i].y
                    }
                });
                // 线
                var tos = data[i].to,
                    to;
                if(tos){
                    tos = tos.split(',');
                    for(var j=0; j<tos.length; j++){
                        to = tos[j];
                        // 创建连线
                        var toNode = data[to],
                            h1 = data[i].y,
                            h2 = toNode.y - data[i].y;
                        angel.addShape(new Curve({
                            zlevel: 1,
                            scale: scale,
                            style: {
                                points: [toNode.x, toNode.y - halfHeight,
                                         toNode.x, h1 + h2/3, 
                                         data[i].x, h1 + h2*2/3, 
                                         data[i].x, data[i].y + halfHeight],
                                lineWidth: 1,
                                brushType: 'stroke'
                            }
                        }));
                    }
                } 
                angel.addShape(node);
            }
            angel.render();
        })