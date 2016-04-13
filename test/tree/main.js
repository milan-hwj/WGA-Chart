/* global Angel  */
"use strict";
import Calcu from './src/Calcu';
import Canvas from './src/Canvas';
import Store from './src/Store';
import CONST from './src/CONST';
class Tree {
    constructor(opt = {}, container){
        this.opt = opt;
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
        // 数据重置
        this.store.setData(Object.assign([], nodes), Object.assign([], links));
        this.draw();
    }
    addData(nodes, links){
        // 数据追加,保留之前数据
        this.store.updateData(Object.assign([], nodes), Object.assign([], links));
        this.draw();
    }
    highLight(filter, index = 0){
        // 高亮节点
        this.store.clearAllHighLight();
        let currentIndex = 0;
        this.store.iteratorNode((node) => {
            delete node.hightLight;
            if(filter(node)){
                // 通过过滤, 高亮
                this.store.addHighLight(
                    node,
                    currentIndex === index ? 'this' : 'other'
                );
                currentIndex++;
            }
        });
        // 重绘
        this.draw();
        // 返回高亮节点数
        return currentIndex;
    }
    clearAllHighLight(){
        this.store.clearAllHighLight();
        this.draw();
    }
    draw(){
        let angel = this.canvasInfo.angel,
            cx = this.canvasInfo.centerX,
            cy = this.canvasInfo.centerY,
            data = Calcu.layoutNodeByDagre(this.store.getExpendData()),
            nodes = data.nodes,
            links = data.links;
        // 清空
        angel.clear();

        // 绘制点
        nodes.forEach((node) => {
            let circle = new Angel.Circle({
                zlevel: 2,
                style : Object.assign({
                }, {
                    x: node.x + cx,
                    y: node.y + cy,
                    r: node.data.size/2,
                    brushType : 'both',
                    fillStyle : node.data.color,
                    strokeStyle: node.data.borderColor,
                    lineWidth : node.data.borderWidth
                }),
                data: node.data
            });
            angel.addShape(circle);
            // 绑定点击事件
            this.bindEvent(circle);
        });
        // 绘制线
        links.forEach((link) => {
            let p = link.points;
            let line = new Angel.BezierCurve({
                zlevel: 1,
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
    bindEvent(nodeShape){
        // click事件
        this.bindClickEvent(nodeShape);
        // hover事件
        this.bindHoverEvent(nodeShape);
    }
    bindClickEvent(nodeShape){
        // 节点点击事件
        let originData = nodeShape.data;
        nodeShape.on('click', () => {
            if(originData.type === 'root'){
                // 根节点无点击事件
                return;
            }
            let nodeData = this.store.getNodeById(originData.id);
            nodeData.isExpend = !nodeData.isExpend;
            // 展开
            if(nodeData.isExpend){
                let childNodes = nodeData.type === 'parent' ?
                    nodeData.parents :
                    nodeData.children;
                if(!childNodes){
                    // 第一次展开操作
                    if(this.opt.onExpand){
                        this.opt.onExpand.call(this, originData, (nodes, links) => {
                            this.addData(nodes, links);
                        });
                    }
                }
                else if(childNodes.length > 0){
                    // 展开、重绘
                    this.draw();
                }
            }
            // 收起
            else{
                this.draw();
            }
        });
    }
    bindHoverEvent(nodeShape){
        let originData = nodeShape.data;
        nodeShape.on('mousemove', (e)=>{
            if(this.opt.onNodeMouseEnter){
                this.opt.onNodeMouseEnter.call(
                    this,
                    originData,
                    {
                        x: e.clientX,
                        y: e.clientY
                    }
                );
            }
        });
    }
}

// test
let mockId = 10;
let treeDiagram = new Tree({
    onExpand: (nodeData, callback) => {
        let id = nodeData.id,
            nodes = [],
            links = [],
            mockNodeId;
        let r = Math.ceil(Math.random()*4);
        for(let i=0; i<r; i++){
            mockNodeId = mockId++;
            nodes.push({
                id: mockNodeId,
                name: '',
                type: nodeData.type
            });
            let isParent = nodeData.type === 'parent';
            links.push({
                from: isParent ? mockNodeId : id,
                to: isParent ? id : mockNodeId
            });
        }
        callback(nodes, links);
    },
    onNodeMouseEnter: (nodeData, position) => {
        console.info(position);
    },
    onNodeMouseLeave: (nodeData, position) => {
        console.info(position);
    }
}, document.getElementById("Main"));

// mock data
let nodesMap = {},
    nodes = [{
        id: 1,
        //color: 'rgba(0, 200, 0, 1)',
        //borderColor: 'rgba(0, 240, 0, 1)',
        name: 'a',
        //size: 10,
        type: 'parent'
    },{
        id: 2,
        name: 'a',
        type: 'root'
    },{
        id: 3,
        name: 'a',
        type: 'parent'
    },{
        id: 4,
        name: '',
        type: 'child'
    },{
        id: 5,
        name: '',
        type: 'child'
    }],
    links = [{
        from: 1,
        to: 2
    },{
        from: 3,
        to: 2
    },{
        from: 2,
        to: 4
    },{
        from: 2,
        to: 5
    }];
// 重置数据
treeDiagram.setData(nodes, links);
// 设置高亮
setTimeout(() => {
    treeDiagram.highLight((nodeData) => {
        if(nodeData.name === 'a'){
            return true;
        }
        return false;
    }, 1);
}, 1000);
setTimeout(() => {
    treeDiagram.highLight((nodeData) => {
        if(nodeData.name === 'a'){
            return true;
        }
        return false;
    }, 2);
}, 2000);
// 取消高亮
setTimeout(() => {
    treeDiagram.clearAllHighLight();
}, 3000);

nodes = [{
    id: 6,
    color: 'rgba(0, 200, 0, 1)',
    borderColor: 'rgba(0, 240, 0, 1)',
    name: '',
    size: 10,
    type: 'child'
},{
    id: 7,
    color: 'rgba(0, 200, 0, 1)',
    borderColor: 'rgba(0, 240, 0, 1)',
    name: '',
    size: 10,
    type: 'child'
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
//treeDiagram.addData(nodes, links);
