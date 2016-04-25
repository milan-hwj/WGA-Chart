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
            repaint: () => {
                // 画布拖动引发重绘
                this.draw();
                console.info('redraw');
            }
        });
        this.store = new Store(_.extend({}, opt.data));
        this.draw({
            type: 'center',
            node: this.store.root
        });
    }
    setData(nodes = [], links = []){
        if(nodes.length === 0){
            this.canvasInfo.angel.clear();
            return;
        }
        // 数据重置
        this.store.setData(_.extend([], nodes), _.extend([], links));
        this.draw({
            type: 'center',
            node: this.store.root
        });
    }
    addData(nodes = [], links = [], centerNode){
        // 数据追加,保留之前数据
        this.store.updateData(_.extend([], nodes), _.extend([], links));
        //this.animation(centerNode);
        this.draw({
            type: 'static',
            node: centerNode
        });
    }
    highLight(filter, index = 0){
        // 高亮节点
        this.store.clearAllHighLight();
        let currentIndex = 0,
            currentNode;
        // 过滤出需要高亮的节点
        this.store.iteratorNode((node) => {
            delete node.highLight;
            if(filter(node)){
                // 通过过滤, 高亮
                // 高亮节点分为当前焦点与其他符合条件的节点，分不同样式显示(暂不支持)
                if(currentIndex === index){
                    currentNode = node;
                    this.store.addHighLight(
                        node,
                        currentIndex === index ? 'this' : 'other'
                    );
                }
                currentIndex++;
            }
        });
        this.draw();
        if(currentIndex === 0){
            // 无节点
            return 0;
        }
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
            this.draw();
            console.info('redraw');
        }
        // 返回高亮节点数
        return currentIndex;
    }
    clearAllHighLight(){
        this.store.clearAllHighLight();
        this.draw();
    }
    // animation(staticNode){
    //     // 动画方法, 未优化，全部重绘
    //     if(!this.store.root){
    //         return;
    //     }
    //     let originPosition = {},
    //         parentNode;
    //     this.store.iteratorNode((node) => {
    //         if(node.type !== 'root'){
    //             parentNode = node.type === 'parent' ? node.children[0] : node.parents[0];
    //         }
    //         originPosition[node.id] = {
    //             x: node.x === undefined ? parentNode.x : node.x,
    //             y: node.y === undefined ? parentNode.y : node.y
    //         };
    //     });
    //     let angel = this.canvasInfo.angel,
    //         cx = this.canvasInfo.centerX,
    //         cy = this.canvasInfo.centerY,
    //         data = staticNode ?
    //             Calcu.layoutNodeByStatic(this.store.getExpendData(), staticNode) :
    //             Calcu.layoutNodeByCenter(this.store.getExpendData(), this.store.root),
    //         nodes = data.nodes,
    //         links = data.links,
    //         animationSpend = 200,
    //         now = new Date().getTime(),
    //         numberCalcu = (start, end, time) => {
    //             return start + (end - start) * (Math.min(time - now, animationSpend)) / animationSpend;
    //         },
    //         draw = () => {
    //             let time = new Date().getTime();
    //             // 清空
    //             angel.clear();
    //
    //             nodes.forEach((node) => {
    //                 // 绘制点
    //                 let nodeX = numberCalcu(originPosition[node.id].x, node.x, time) + cx,//node.x + cx
    //                     nodeY = numberCalcu(originPosition[node.id].y, node.y, time) + cy;//node.y + cy
    //                 let circle = new Angel.Circle({
    //                     zlevel: 2,
    //                     style : {
    //                         cursor: node.type === 'root' ? 'default' : 'pointer',
    //                         x: nodeX,
    //                         y: nodeY,
    //                         r: node.size/2,
    //                         brushType : 'both',
    //                         fillStyle : node.color,
    //                         strokeStyle: node.borderColor,
    //                         lineWidth : node.borderWidth
    //                     },
    //                     data: node
    //                 });
    //                 angel.addShape(circle);
    //                 // 绑定点击事件
    //                 this.bindEvent(circle);
    //                 // 绘制文字
    //                 let textInfo = Calcu.calcuText(node.name, CONST.fontSize, CONST.fontMaxLength),
    //                     textX = node.type === 'parent' ?
    //                         nodeX - node.size/2 - CONST.fontMargin - textInfo.length:
    //                         nodeX + node.size/2 + CONST.fontMargin;
    //                 let textShape = new Angel.Text({
    //                     zlevel: 2,
    //                     style: {
    //                         brushType: 'fill',
    //                         fillStyle: CONST.fontColor,
    //                         font: CONST.fontSize + 'px ' + CONST.fontFamily,
    //                         x: textX,
    //                         y: nodeY + (CONST.fontSize/4),
    //                         text: node.type === 'root' ? '' : textInfo.text
    //                     }
    //                 });
    //                 angel.addShape(textShape);
    //             });
    //             // 绘制线
    //             links.forEach((link) => {
    //                 let line = new Angel.BezierCurve({
    //                     zlevel: 1,
    //                     style: {
    //                         brushType : 'stroke',
    //                         lineWidth : link.data.size,
    //                         strokeStyle: link.data.color,
    //                         points: Calcu.layoutLine(
    //                         {
    //                             x: numberCalcu(originPosition[link.from.id].x, link.from.x, time),//node.x + cx,
    //                             y: numberCalcu(originPosition[link.from.id].y, link.from.y, time),//node.y + cy,
    //                         },
    //                         {
    //                             x: numberCalcu(originPosition[link.to.id].x, link.to.x, time),//node.x + cx,
    //                             y: numberCalcu(originPosition[link.to.id].y, link.to.y, time),//node.y + cy,
    //                         },
    //                         {
    //                             x: cx,
    //                             y: cy
    //                         }
    //                         )
    //                     }
    //                 });
    //                 angel.addShape(line);
    //             });
    //             angel.render();
    //             return (time - now) >= animationSpend;
    //         };
    //     let isEnd = false;;
    //     function step() {
    //         if(!isEnd){
    //             isEnd = draw();
    //             requestAnimationFrame(step);
    //         }
    //     }
    //     requestAnimationFrame(step);
    //     draw();
    // }
    draw(config){
        // 无根节点,不绘制
        if(!this.store.root){
            return;
        }
        let angel = this.canvasInfo.angel,
            cx = this.canvasInfo.centerX,
            cy = this.canvasInfo.centerY,
            data = Calcu.layoutNode(this.store, config),
            nodes = data.nodes,
            links = data.links;
        // 清空
        angel.clear();

        // 绘制点
        nodes.forEach((node) => {
            let circle = new Angel.Circle({
                zlevel: 3,
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
            let textInfo = Calcu.calcuText(node.name, CONST.fontSize, CONST.fontFamily),
                textX = node.type === 'parent' ?
                    node.x + cx - node.size/2 - CONST.fontMargin - textInfo.width:
                    node.x + cx + node.size/2 + CONST.fontMargin;

            if(node.highLight && node.type !== 'root'){
                // 高亮文字背景
                let margin = CONST.highLightLabelMargin,
                    fontW = textInfo.width,
                    fontH = (3 * CONST.fontSize/4),
                    rectW = textInfo.width,
                    rectH = 2 * margin + CONST.fontSize * 0.75,
                    circleR = fontH / 2 + margin;

                // 包裹高亮边框后，margin值要适当增大，避免与节点重叠
                textX = node.type === 'parent' ?
                    textX - circleR : textX + circleR;

                let shape = new Angel.Rect({
                    zlevel: 3,
                    style: {
                        brushType: 'both',
                        fillStyle: CONST.highLightLabelBackgroud,
                        strokeStyle: CONST.highLightLabelBorder,
                        lineWidth: CONST.highLightLineWidth,
                        x: textX,
                        y: node.y + cy - fontH/2 - margin,
                        w: rectW,
                        h: rectH
                    }
                });
                angel.addShape(shape);

                shape = new Angel.Circle({
                    zlevel: 3,
                    style : {
                        x: textX,
                        y: node.y + cy,
                        r: fontH / 2 + margin,
                        brushType : 'both',
                        fillStyle: CONST.highLightLabelBackgroud,
                        strokeStyle: CONST.highLightLabelBorder,
                        lineWidth : CONST.highLightLineWidth,
                        startAngle: Math.PI/2,
                        endAngle: 3 * Math.PI/2
                    },
                    data: node
                });
                angel.addShape(shape);

                shape = new Angel.Circle({
                    zlevel: 3,
                    style : {
                        x: textX + fontW,
                        y: node.y + cy,
                        r: fontH / 2 + margin,
                        brushType : 'both',
                        fillStyle: CONST.highLightLabelBackgroud,
                        strokeStyle: CONST.highLightLabelBorder,
                        lineWidth : CONST.highLightLineWidth,
                        startAngle:  -Math.PI/2,
                        endAngle: Math.PI/2
                    },
                    data: node
                });
                angel.addShape(shape);

                shape = new Angel.Rect({
                    zlevel: 3,
                    style: {
                        brushType: 'fill',
                        fillStyle: CONST.highLightLabelBackgroud,
                        x: textX - CONST.highLightLineWidth,
                        y: node.y + cy - fontH/2 - margin + CONST.highLightLineWidth - 1,
                        w: rectW + 2 * CONST.highLightLineWidth,
                        h: rectH - 2 * CONST.highLightLineWidth + 2
                    }
                });
                angel.addShape(shape);
            }
            // 绘制文字
            let textShape = new Angel.Text({
                zlevel: 3,
                style: {
                    brushType: 'fill',
                    fillStyle: CONST.fontColor,
                    font: CONST.fontSize + 'px ' + CONST.fontFamily,
                    x: textX,
                    y: node.y + cy + (3 * CONST.fontSize/8),
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
                    lineWidth : link.size,
                    strokeStyle: link.color,
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
    _drawPathHighLight(links){
        // 绘制高亮线段
        let angel = this.canvasInfo.angel,
            cx = this.canvasInfo.centerX,
            cy = this.canvasInfo.centerY;

        // 绘制线
        links.forEach((link) => {
            let line = new Angel.BezierCurve({
                zlevel: 2,
                style: {
                    brushType : 'stroke',
                    lineWidth : link.size,
                    strokeStyle: link.color,
                    points: Calcu.layoutLine(
                        link.fromNode,
                        link.toNode,
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
    _clearPathHighLight(){
        // 清除路径高亮
        this.canvasInfo.angel.clear(2);
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
                    nodeData._parents :
                    nodeData._children;
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
                    this.draw({
                        type: 'static',
                        node: nodeShape.data
                    });
                }
            }
            // 收起
            else{
                this.draw({
                    type: 'static',
                    node: nodeShape.data
                });
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
            },
            showPathTimeout = null;
        nodeShape.on('mouseover', (e)=>{
            clearTimeout(showPathTimeout);
            showPathTimeout = setTimeout(() => {
                this._clearPathHighLight();
                // 获取高亮线段
                let lightLines = this.store.getHighLightPath(originData.id);
                this._drawPathHighLight(lightLines);
            }, 500);
            mouseHandle(e, this.opt.onNodeMouseEnter);
        });
        nodeShape.on('mouseout', (e)=>{
            // 清除高亮路径
            clearTimeout(showPathTimeout);
            this._clearPathHighLight();
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

