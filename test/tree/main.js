/* global Angel  */
"use strict";
import Calcu from './src/Calcu';
import Canvas from './src/Canvas';
import Store from './src/Store';
class Tree {
    constructor(opt, container){
        this.canvasInfo = Canvas.init(container, {
            repaint: (centerX, centerY) => {
                // 画布拖动引发重绘
                this.canvasInfo.centerX = centerX;
                this.canvasInfo.centerY = centerY;
                this.draw();
            }
        });
        this.store = new Store(Object.assign({}, opt.data));
        this.draw();
    }
    setData(nodes, links){
        this.store.setData(Object.assign([], nodes), Object.assign([], links));
        this.draw();
    }
    addData(nodes, links){
        this.store.updateData(Object.assign([], nodes), Object.assign([], links));
        this.draw();
    }
    draw(){
        let angel = this.canvasInfo.angel,
            cx = this.canvasInfo.centerX,
            cy = this.canvasInfo.centerY,
            data = Calcu.layoutNodeByDagre(this.store.data),
            nodes = data.nodes,
            links = data.links;
        // 清空
        angel.clear();

        // 绘制点
        nodes.forEach((node) => {
            let circle = new Angel.Circle({
                zlevel: 2,
                style : {
                    x: node.x + cx,
                    y: node.y + cy,
                    r: node.data.size/2,
                    brushType : 'both',
                    fillStyle : node.data.color,
                    strokeStyle: node.data.borderColor,
                    lineWidth : 1
                },
                data: node.data
            });
            angel.addShape(circle);
            // 绑定点击事件
            this.bindClickEvent(circle);
        });
        // 绘制线
        links.forEach((link) => {
            let p = link.points;
            let line = new Angel.BezierCurve({
                zlevel: 2,
                style: {
                    brushType : 'stroke',
                    lineWidth : link.data.size,
                    strokeStyle: link.data.color,
                    points: Calcu.layoutLine(p[0], p[p.length - 1], {
                        x: cx,
                        y: cy
                    })
                }
            })
            angel.addShape(line);
        });
        angel.render();
    }
    bindClickEvent(nodeShape){
        let nodeData = nodeShape.data;
        nodeShape.on('click', () => {
            console.info(nodeData);
            console.info(this.store.nodeMap[nodeData.id]);
            //this.draw();
        });
    }
}

// test
let treeDiagram = new Tree({
    onExpand: (nodeData) => {},
    onNodeMouseEnter: (nodeData, position) => {},
    onNodeMouseLeave: (nodeData, position) => {}
}, document.getElementById("Main"));

// mock data
let nodesMap = {},
    nodes = [{
        id: 1,
        color: 'rgba(0, 200, 0, 1)',
        borderColor: 'rgba(0, 240, 0, 1)',
        name: '',
        size: 10
    },{
        id: 2,
        color: 'rgba(0, 200, 0, 1)',
        borderColor: 'rgba(0, 240, 0, 1)',
        name: '',
        size: 10,
        type: 'root'
    },{
        id: 3,
        color: 'rgba(0, 200, 0, 1)',
        borderColor: 'rgba(0, 240, 0, 1)',
        name: '',
        size: 20
    },{
        id: 4,
        color: 'rgba(0, 200, 0, 1)',
        borderColor: 'rgba(0, 240, 0, 1)',
        name: '',
        size: 10
    },{
        id: 5,
        color: 'rgba(0, 200, 0, 1)',
        borderColor: 'rgba(0, 240, 0, 1)',
        name: '',
        size: 20
    }],
    links = [{
        from: 1,
        to: 2,
        size: 1,
        color: 'rgba(200, 0, 0, 1)'
    },{
        from: 3,
        to: 2,
        size: 1,
        color: 'rgba(0, 0, 0, 1)'
    },{
        from: 2,
        to: 4,
        size: 2,
        color: 'rgba(0, 0, 0, 1)'
    },{
        from: 2,
        to: 5,
        size: 3,
        color: 'rgba(0, 0, 0, 1)'
    }];

treeDiagram.setData(nodes, links);

nodes = [{
        id: 6,
        color: 'rgba(0, 200, 0, 1)',
        borderColor: 'rgba(0, 240, 0, 1)',
        name: '',
        size: 10
    },{
        id: 7,
        color: 'rgba(0, 200, 0, 1)',
        borderColor: 'rgba(0, 240, 0, 1)',
        name: '',
        size: 10
    }];
links = [{
        from: 5,
        to: 6,
        size: 1,
        color: 'rgba(200, 0, 0, 1)'
    },{
        from: 5,
        to: 7,
        size: 1,
        color: 'rgba(0, 0, 0, 1)'
    }];
treeDiagram.addData(nodes, links);
