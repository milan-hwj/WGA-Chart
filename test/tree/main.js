"use strict";
class Tree {
	constructor(data, container){
        this.data = data;
        this.createCanvas(container);
        this.dragEvent();
        this.draw();
        return;
		let angel = this.angel = Angel.init(container);
		let line = new Angel.Line({
            zlevel: 1,
            style : {
                brushType : 'stroke',
                strokeStyle : 'rgba(200, 0, 0, 1)',
                lineWidth : 1,
                path: [{x: 0, y:0},{x: 100, y:50},{x: 200, y:25}]
            }
        });
        let circle = new Angel.Circle({
            zlevel: 1,
            style : {
            	x: 100,
            	y: 100,
            	r: 30,
                brushType : 'stroke',
                lineWidth : 1
            }
        });
        let bezier = new Angel.BezierCurve({
        	zlevel: 1,
            style : {
            	points: [100, 20, 200, 400, 300, 200, 500, 200],
                brushType : 'stroke',
                lineWidth : 1
            }
        });
        angel.addShape(line);
        angel.addShape(circle);
        angel.addShape(bezier);
        angel.render();

        setInterval(function(){
                bezier.style.points = [
                	100 + Math.random()*10,
                	100 + Math.random()*10,
                	300 + Math.random()*10,
                	200 + Math.random()*10,
                	350 + Math.random()*10,
                	0 + Math.random()*10,
                	500 + Math.random()*10,
                	100 + Math.random()*10
                ];
                angel.modShape(bezier);
                angel.refresh();
            }, 100);
	}
    createCanvas(container){
        // 初始化画布size
        let canvas = this.canvasDiv = document.createElement('div');
        container.appendChild(canvas);
        canvas.style.position = "relative";
        canvas.style.width = 5 * container.offsetWidth + 'px';
        canvas.style.height = 5 * container.offsetHeight + 'px';
        canvas.style.left = -0.4 * canvas.offsetWidth + 'px';
        canvas.style.top = -0.4 * canvas.offsetHeight + 'px';
        this.centerX = 2.5 * container.offsetWidth;
        this.centerY = 2.5 * container.offsetHeight;   
        this.angel = Angel.init(canvas);
    }
    dragEvent(){
        // 绑定画布拖动状态
      var dom = this.canvasDiv,
          isDown = false,
          startX,
          startY,
          domX,
          domY;
      this.canvasDiv.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX;
        startY = e.pageY;
        domX = dom.offsetLeft;
        domY = dom.offsetTop;
      });
      this.canvasDiv.addEventListener('mousemove', (e) => {
        if(isDown){
          // 画布拖动
          dom.style.left = domX + e.pageX - startX + 'px';
          dom.style.top = domY + e.pageY - startY + 'px';
        }
      });
      this.canvasDiv.addEventListener('mouseup', (e) => {
        isDown = false;
      });
      this.canvasDiv.addEventListener('mouseout', (e) => {
        isDown = false;
      });
    }
    draw(){
        let angel = this.angel,
            cx = this.centerX,
            cy = this.centerY,
            r = 6,// 半径
            wd = 150,// 横向间距
            hd = 10, // 纵向间距
            data = this.data;
        data.x = 0; 
        data.y = 0;
        let iterateNode = (node) => {
            let circle = new Angel.Circle({
                zlevel: 1,
                style : {
                    x: node.x + cx,
                    y: node.y + cy,
                    r: r,
                    brushType : 'stroke',
                    lineWidth : 1
                },
                data: node
            });
            circle.on('click', () => {
                if(node.child){
                    delete node.child;
                    this.draw();
                    return;
                }
                node.child = [];
                var n = Math.ceil(Math.random()*10);
                for(var i=0; i<n; i++){
                    node.child.push({
                        x: node.x + cx + Math.cos((i + 1) * Math.PI * 2 / n) * wd,
                        y: node.y + cy + Math.sin((i + 1) * Math.PI * 2 / n) * wd
                    });
                }   
                this.draw();
            });
            angel.addShape(circle);
            if(node.child){
                for(var i=0; i<node.child.length; i++){
                    iterateNode(node.child[i]);
                }
            }
        }

        angel.clear();
        iterateNode(data);
        
        angel.render();
        return;
        // let angel = this.angel;
        // let line = new Angel.Line({
        //     zlevel: 1,
        //     style : {
        //         brushType : 'stroke',
        //         strokeStyle : 'rgba(200, 0, 0, 1)',
        //         lineWidth : 1,
        //         path: [{x: 0, y:0},{x: 100, y:50},{x: 200, y:25}]
        //     }
        // });
        // let circle = new Angel.Circle({
        //     zlevel: 1,
        //     style : {
        //         x: 100,
        //         y: 100,
        //         r: 30,
        //         brushType : 'stroke',
        //         lineWidth : 1
        //     }
        // });
        // let bezier = new Angel.BezierCurve({
        //     zlevel: 1,
        //     style : {
        //         points: [100, 20, 200, 400, 300, 200, 500, 200],
        //         brushType : 'stroke',
        //         lineWidth : 1
        //     }
        // });
        // angel.addShape(line);
        // angel.addShape(circle);
        // angel.addShape(bezier);
        // angel.render();
        // return;
        // let r = 20,// 半径
        //     wd = 50,// 横向间距
        //     hd = 10, // 纵向间距
        //     shapeDatas = [{
        //         x: x,
        //         y: y
        //     }];
        // let node = data;
        // while(node.parent){
        //     node = node.parent;
        //     shapeDatas.push({
                 
        //     });
        // }
    }
}

new Tree({
	name: 'a',
    child: [{name: 'b', x: 100, y: 10}]
}, document.getElementById("Main"));