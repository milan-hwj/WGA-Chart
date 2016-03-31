/* global Angel  */
"use strict";
import Calcu from './src/Calcu';
import Canvas from './src/Canvas';
class Tree {
    constructor(data, container){
        this.data = data;
        this.canvasInfo = Canvas.init(container, {
            repaint: (centerX, centerY) => {
                // 画布拖动引发重绘
                this.canvasInfo.centerX = centerX;
                this.canvasInfo.centerY = centerY;
                this.draw();
            }
        });
        this.draw();
    }
    draw(){
        let angel = this.canvasInfo.angel,
            cx = this.canvasInfo.centerX,
            cy = this.canvasInfo.centerY,
            r = 6,// 半径
            wd = 100,// 横向间距
            hd = 20, // 纵向间距
            data = Calcu.layout(this.data);
        let iterateNode = (node, parentNode) => {
            let circle = new Angel.Circle({
                zlevel: 2,
                style : {
                    x: node.x + cx,
                    y: node.y + cy,
                    r: r,
                    brushType : 'fill',
                    lineWidth : 1
                },
                data: node
            });
            angel.addShape(circle);
            if(parentNode){
                let line = new Angel.Line({
                    zlevel: 1,
                    style: {
                        brushType : 'stroke',
                        lineWidth : 1,
                        path: [{
                            x: node.x + cx,
                            y: node.y + cy
                        }, {
                            x: parentNode.x + cx,
                            y: parentNode.y + cy
                        }]
                    }
                })
                angel.addShape(line);
            }
            circle.on('click', () => {
                if(node.childrend){
                    delete node.children;
                    this.draw();
                    return;
                }
                node.children = [];
                var n = Math.ceil(Math.random()*2 + 1);
                for(var i=0; i<n; i++){
                    node.children.push({
                        name: 'a'
                    });
                }
                this.draw();
            });
            if(node.children){
                for(var i=0; i<node.children.length; i++){
                    iterateNode(node.children[i], node);
                }
            }
        }

        angel.clear();
        iterateNode(data);
        angel.render();
    }
}

new Tree({
    name: 'a',
    children: [
        {name: 'b'},
        {name: 'c'},
        {name: 'd',
            children: [
                {name: 'd1'},
                {name: 'd2'}
            ]
        }
    ]
}, document.getElementById("Main"));
