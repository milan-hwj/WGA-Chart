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
                console.info('redraw');
            }
        });
        this.store = new Store(Object.assign({}, opt.data));
        this.draw();
    }
    setData(nodes = [], links = []){
        if(nodes.length === 0){
            this.canvasInfo.angel.clear();
            return;
        }
        // 数据重置
        this.store.setData(Object.assign([], nodes), Object.assign([], links));
        this.draw();
    }
    addData(nodes = [], links = [], centerNode){
        // 数据追加,保留之前数据
        this.store.updateData(Object.assign([], nodes), Object.assign([], links));
        this.animation(centerNode);
        //this.draw(centerNode);
    }
    highLight(filter, index = 0){
        // 高亮节点
        this.store.clearAllHighLight();
        let currentIndex = 0,
            currentNode;
        this.store.iteratorNode((node) => {
            delete node.hightLight;
            if(filter(node)){
                // 通过过滤, 高亮
                // 高亮节点分为当前焦点与其他符合条件的节点，分不同样式显示
                this.store.addHighLight(
                    node,
                    currentIndex === index ? 'this' : 'other'
                );
                if(currentIndex === index){
                    currentNode = node;
                }
                currentIndex++;
            }
        });
        if(currentIndex === 0){
            // 无节点
            return 0;
        }
        this.draw(currentNode);
        if(!currentNode){
            // 找到对应节点，但index不在匹配数量之内
            // 则符合条件节点加亮，但不移动定位
            return currentIndex;
        }
        // 高亮节点居中
        let canvasInfo = this.canvasInfo,
            // 坐标运算
            moveOpe = Calcu.calcuMoveDistance(currentNode, canvasInfo),
            // 当前xy
            nowX = canvasInfo.getTranslateX(),
            nowY = canvasInfo.getTranslateY(),
            canvas = canvasInfo.canvas;
        // 此节点移动居中
        $(canvas).animate({
            a:0
        }, 0).animate({
            a:1
        }, {
            step: function(n/* , fx */) {
                let newX = nowX + (moveOpe.moveX - nowX) * n,
                    newY = nowY + (moveOpe.moveY - nowY) * n;
                canvasInfo.setTranslate(newX, newY);
            },
            duration: 500
        });

        if(moveOpe.redraw){
            this.draw(currentNode);
            console.info('redraw');
        }
        // 返回高亮节点数
        return currentIndex;
    }
    clearAllHighLight(){
        this.store.clearAllHighLight();
        this.draw();
    }
    animation(staticNode){
        // 动画方法, 未优化，全部重绘
        if(!this.store.root){
            return;
        }
        let originPosition = {},
            parentNode;
        this.store.iteratorNode((node) => {
            if(node.type !== 'root'){
                parentNode = node.type === 'parent' ? node.children[0] : node.parents[0];
            }
            originPosition[node.id] = {
                x: node.x === undefined ? parentNode.x : node.x,
                y: node.y === undefined ? parentNode.y : node.y
            };
        });
        let angel = this.canvasInfo.angel,
            cx = this.canvasInfo.centerX,
            cy = this.canvasInfo.centerY,
            data = staticNode ?
                Calcu.layoutNodeByStatic(this.store.getExpendData(), staticNode) :
                Calcu.layoutNodeByCenter(this.store.getExpendData(), this.store.root),
            nodes = data.nodes,
            links = data.links,
            animationSpend = 200,
            now = new Date().getTime(),
            numberCalcu = (start, end, time) => {
                return start + (end - start) * (Math.min(time - now, animationSpend)) / animationSpend;
            },
            draw = () => {
                let time = new Date().getTime();
                // 清空
                angel.clear();

                nodes.forEach((node) => {
                    // 绘制点
                    let nodeX = numberCalcu(originPosition[node.id].x, node.x, time) + cx,//node.x + cx
                        nodeY = numberCalcu(originPosition[node.id].y, node.y, time) + cy;//node.y + cy
                    let circle = new Angel.Circle({
                        zlevel: 2,
                        style : {
                            cursor: node.type === 'root' ? 'default' : 'pointer',
                            x: nodeX,
                            y: nodeY,
                            r: node.size/2,
                            brushType : 'both',
                            fillStyle : node.color,
                            strokeStyle: node.borderColor,
                            lineWidth : node.borderWidth
                        },
                        data: node
                    });
                    angel.addShape(circle);
                    // 绑定点击事件
                    this.bindEvent(circle);
                    // 绘制文字
                    let textInfo = Calcu.calcuText(node.name, CONST.fontSize, CONST.fontMaxLength),
                        textX = node.type === 'parent' ?
                            nodeX - node.size/2 - CONST.fontMargin - textInfo.length:
                            nodeX + node.size/2 + CONST.fontMargin;
                    let textShape = new Angel.Text({
                        zlevel: 2,
                        style: {
                            brushType: 'fill',
                            fillStyle: CONST.fontColor,
                            font: CONST.fontSize + 'px ' + CONST.fontFamily,
                            x: textX,
                            y: nodeY + (CONST.fontSize/4),
                            text: node.type === 'root' ? '' : textInfo.text
                        }
                    });
                    angel.addShape(textShape);
                });
                // 绘制线
                links.forEach((link) => {
                    let line = new Angel.BezierCurve({
                        zlevel: 1,
                        style: {
                            brushType : 'stroke',
                            lineWidth : link.data.size,
                            strokeStyle: link.data.color,
                            points: Calcu.layoutLine(
                            {
                                x: numberCalcu(originPosition[link.from.id].x, link.from.x, time),//node.x + cx,
                                y: numberCalcu(originPosition[link.from.id].y, link.from.y, time),//node.y + cy,
                            },
                            {
                                x: numberCalcu(originPosition[link.to.id].x, link.to.x, time),//node.x + cx,
                                y: numberCalcu(originPosition[link.to.id].y, link.to.y, time),//node.y + cy,
                            },
                            {
                                x: cx,
                                y: cy
                            }
                            )
                        }
                    });
                    angel.addShape(line);
                });
                angel.render();
                return (time - now) >= animationSpend;
            };
        let isEnd = false;;
        function step() {
            if(!isEnd){
                isEnd = draw();
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
        draw();
    }
    draw(staticNode){
        // 无根节点,不绘制
        if(!this.store.root){
            return;
        }
        let angel = this.canvasInfo.angel,
            cx = this.canvasInfo.centerX,
            cy = this.canvasInfo.centerY,
            data = staticNode ?
                Calcu.layoutNodeByStatic(this.store.getExpendData(), staticNode) :
                Calcu.layoutNodeByCenter(this.store.getExpendData(), this.store.root),
            nodes = data.nodes,
            links = data.links;
        // 清空
        angel.clear();

        // 绘制点
        nodes.forEach((node) => {
            let circle = new Angel.Circle({
                zlevel: 2,
                style : {
                    cursor: node.type === 'root' ? 'default' : 'pointer',
                    x: node.x + cx,
                    y: node.y + cy,
                    r: node.size/2,
                    brushType : 'both',
                    fillStyle : node.color,
                    strokeStyle: node.borderColor,
                    lineWidth : node.borderWidth
                },
                data: node
            });
            angel.addShape(circle);
            // 绑定点击事件
            this.bindEvent(circle);
            // 绘制文字
            let textInfo = Calcu.calcuText(node.name, CONST.fontSize, CONST.fontMaxLength),
                textX = node.type === 'parent' ?
                    node.x + cx - node.size/2 - CONST.fontMargin - textInfo.length:
                    node.x + cx + node.size/2 + CONST.fontMargin;

            let textShape = new Angel.Text({
                zlevel: 2,
                style: {
                    brushType: 'fill',
                    fillStyle: CONST.fontColor,
                    font: CONST.fontSize + 'px ' + CONST.fontFamily,
                    x: textX,
                    y: node.y + cy + (CONST.fontSize/4),
                    text: node.type === 'root' ? '' : textInfo.text
                }
            });
            angel.addShape(textShape);
        });
        // 绘制线
        links.forEach((link) => {
            let line = new Angel.BezierCurve({
                zlevel: 1,
                style: {
                    brushType : 'stroke',
                    lineWidth : link.data.size,
                    strokeStyle: link.data.color,
                    points: Calcu.layoutLine(
                        link.from,
                        link.to,
                    {
                        x: cx,
                        y: cy
                    }
                    )
                }
            });
            angel.addShape(line);
        });
        angel.render();
    }
    bindEvent(nodeShape){
        // click事件
        this.bindClickEvent(nodeShape);
        // 右键事件
        this.bindContextMenuEvent(nodeShape);
        // hover事件
        this.bindHoverEvent(nodeShape);
    }
    bindClickEvent(nodeShape){
        // 节点点击事件
        let originData = nodeShape.data.originData;
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
                        this.opt.onExpand.call(this, originData, (nodes = [], links) => {
                            nodes.forEach((node) => {
                                node.type = nodeData.type;
                            });
                            this.addData(nodes, links, nodeShape.data);
                        });
                    }
                }
                else if(childNodes.length > 0){
                    // 展开、重绘
                    this.draw(nodeShape.data);
                }
            }
            // 收起
            else{
                this.draw(nodeShape.data);
            }
        });
    }
    bindHoverEvent(nodeShape){
        // hover事件
        let originData = nodeShape.data.originData,
            mouseHandle = (e, callback) => {
                if(callback){
                    callback.call(
                        this,
                        e,
                        originData
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
    bindContextMenuEvent(nodeShape){
        // 右键事件
        nodeShape.on('contextmenu', (e)=>{
            if(this.opt.onContextMenu){
                this.opt.onContextMenu.call(this, e, nodeShape.data.originData);
            }
        });
    }
}

window.TreeDiagram = TreeDiagram;
export default TreeDiagram;

