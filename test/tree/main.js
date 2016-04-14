/* global Angel  */
"use strict";
import Calcu from './src/Calcu';
import Canvas from './src/Canvas';
import Store from './src/Store';
import CONST from './src/CONST';
class TreeDiagram {
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
        // hover事件
        let originData = nodeShape.data,
            mouseHandle = (e, callback) => {
                if(callback){
                    callback.call(
                        this,
                        originData,
                        {
                            x: e.clientX,
                            y: e.clientY
                        }
                    );
                }
            };
        nodeShape.on('mouseover', (e)=>{
            mouseHandle(e, this.opt.onNodeMouseEnter);
        });
        nodeShape.on('mouseout', (e)=>{
            mouseHandle(e, this.opt.onNodeMouseLeave);
        });
    }
}

window.TreeDiagram = TreeDiagram;
export default TreeDiagram;
