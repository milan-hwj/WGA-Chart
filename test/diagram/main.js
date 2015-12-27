    require(
        [
            "./node",
            "./line",
            "./move"
        ], 
        function(nodeOpt, lineOpt, move){

            // 初始化angel
            var angel = Angel.init( document.getElementById("Main") );
            move.bindAngel(angel);

            // 自定义图形(节点)构造器
            var Node = angel.createShape(nodeOpt),
                Line = angel.createShape(lineOpt);

            // 数据
            // var data = {},
            //     node;
            // for(var i=0;i<5;i++){
            //     var j = Math.ceil(Math.random()*5) * i;
            //     for(;j>0;j--){
            //         data[i + '_' + j] = {
            //             x: j * 350,
            //             y: i * 200,
            //             to: i + '_' + j + '_1,' + i + '_' + j + '_2'
            //         };
            //         data[i + '_' + j + '_2'] = {
            //             x: j * 350 - 100,
            //             y: i * 200 + 100
            //         };
            //         data[i + '_' + j + '_1'] = {
            //             x: j * 350 + 100,
            //             y: i * 200 + 100
            //         };
            //     }
            // }
            var nodes = {'a':{x: 200, y: 100},
                         'b':{x: 100, y: 200},
                         'c':{x: 300, y: 200}},
                lines = [{from: 'a', to: 'b,c'}];

            // 创建图
            var nodeHeight = 24,
                halfHeight = nodeHeight/2,
                scale = [1, 1],
                nodeMap = {};
            for(var i in nodes){
                // 节点
                nodeMap[i] = new Node({
                    zlevel: 2,
                    scale: scale,
                    style: {
                        brushType: 'stroke',
                        text: '自定义' + i,
                        x: nodes[i].x,
                        y: nodes[i].y
                    }
                });
                move.bindNodeEvent(nodeMap[i], angel);
                angel.addShape(nodeMap[i]);
            }

            var line;
            for(var i in lines){
                // 线
                var form = lines[i].from,
                    to = lines[i].to.split(','),
                    fromNode = nodes[form];
                for(var j in to){
                    toNode = nodes[to[j]];
                    line = new Line({
                        zlevel: 1,
                        scale: scale,
                        halfHeight: halfHeight,
                        style: {
                            brushType: 'stroke',
                            x1: fromNode.x,
                            y1: fromNode.y,
                            x2: toNode.x,
                            y2: toNode.y,
                        }
                    });
                    angel.addShape(line);
                }
            }
            angel.render();
        })