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
                nodeMap[i].startLines = [];
                nodeMap[i].endLines = [];
                move.bindNodeEvent(nodeMap[i], angel);
                angel.addShape(nodeMap[i]);
            }

            var line;
            for(var i in lines){
                // 线
                var from = lines[i].from,
                    to = lines[i].to.split(','),
                    fromNode = nodes[from];
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
                    // 关联起始结束节点
                    nodeMap[from].startLines.push(line);
                    nodeMap[to[j]].endLines.push(line);
                }
            }
            angel.render();
        })