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
            r = 5,// 半径
            data = Calcu.layoutNode_backup(this.data);

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
                let line = new Angel.BezierCurve({
                    zlevel: 1,
                    style: {
                        brushType : 'stroke',
                        lineWidth : 1,
                        points: Calcu.layoutLine(node, parentNode, {
                            x: cx,
                            y: cy
                        })
                    }
                })
                angel.addShape(line);
            }
            circle.on('click', () => {
                if(node.children){
                    delete node.children;
                    this.draw();
                    return;
                }
                node.children = [];
                var n = Math.ceil(Math.random()*5+4);
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
        {name: 'c', 
            children: [
                {name: 'c1', children: [
                    {name: 'c11'}
                ]}
            ]},
        {name: 'd',
            children: [
                {name: 'd1', 
                children: [
                    {name: 'd11'}
                ]},
                {name: 'd2',
                children: [
                    {name: 'd21'},
                    {name: 'd22'}
                ]}
            ]
        }
    ]
}, document.getElementById("Main"));
