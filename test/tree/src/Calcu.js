/* global d3, dagre  */
import CONST from './CONST';
class Calcu {
    layoutNode(store, config){
        // 布局计算
        if(!config){
            return this._layoutResult;
        }
        else if(config.type === 'static'){
            //return this.layoutNodeByStatic(store, config.node);
            return this.layoutNodeByStaticUserD3(store, config.node);
        }
        else if(config.type === 'center'){
            return this.layoutNodeByCenter(store, config.node);
        }
    }
    layoutNodeByCenter(store, centerNode){
        // 以centerNode为中心点布局
        centerNode.originX = centerNode.originY = 0;
        //return this.layoutNodeByStatic(store, centerNode);
        return this.layoutNodeByStaticUserD3(store, centerNode);
    }
    layoutNodeByStaticUserD3(store, staticNode){
        // d3布局
        let root = store.root,
            linkMap = store.linkMap;
        // 遍历节点，为展开标志的节点添加children属性
        // children: d3算法需要，意为子节点
        store.iteratorNode((node) => {
            // 展开节点才设置children，参与布局
            if(node.isExpend){
                node.children = node._children;
            }
            else{
                delete node.children;
            }
        }, 'children');

        // d3 布局算法
        let tree = d3.layout.tree().
                       nodeSize([CONST.nodeSize, CONST.nodeSize]).
                       separation(function(a, b) {
                           let dis = CONST.nodesep / CONST.nodeSize;
                           return a.parent == b.parent ? dis : 2 * dis;
                       }),
            nodes = tree.nodes(root).reverse();

        nodes.forEach((node) => {
            node.y = node.depth * CONST.ranksep;
        });

        let result = {
            nodes: [],
            links: []
        };
        // 其他节点针对固定节点的偏移值
        let adX = 0,
            adY = 0;
        if(staticNode){
            // staticNode为固定节点，即本次重绘不会改变其坐标
            let sNode = Object.assign({originX: staticNode.x, originY: staticNode.Y}, staticNode);

            adX = sNode.originX - sNode.x;
            adY = sNode.originY - sNode.y;
        }
        nodes.forEach((node) => {
            node.originX = node.x = node.x + adX;
            node.originY = node.y = node.y + adY;
            result.nodes.push(node);
            if(node.children){
                node.children.forEach((n) => {
                    result.links.push(Object.assign({},
                        (linkMap[node.id + '_' + n.id] ||
                        linkMap[n.id + '_' + node.id]),
                        {
                            from: node,
                            to: n
                        }
                    ));
                })
            }
            let x = node.x,
                y = node.y;
            node.x = y;
            node.y = -x;
        });

        this._layoutResult = result;
        console.info(result)
        return result;
    }
    // layoutNodeByStatic(store, staticNode){
    //     // 节点布局计算, staticNode为固定点，即布局过程不会影响该节点原始坐标
    //     // Create a new directed graph 
    //     let data = store.getExpendData(),
    //         g = new dagre.graphlib.Graph(),
    //         nodes = data.nodes,
    //         links = data.links;
    //
    //     // Set an object for the graph label
    //     g.setGraph({
    //         ranksep: CONST.ranksep,
    //         nodesep: CONST.nodesep,
    //         rankdir: CONST.rankdir
    //     });
    //
    //     // Default to assigning a new object as a label for each new edge.
    //     g.setDefaultEdgeLabel(function() { return {}; });
    //
    //     nodes.forEach((node) => {
    //         // 添加点
    //         g.setNode(node.id, {
    //             label: node.name,
    //             width: 1,//node.size,
    //             height: 1,//node.size,
    //             data: node
    //         });
    //     });
    //
    //     links.forEach((link) => {
    //         // 添加线
    //         g.setEdge(link.from, link.to, {data: link});
    //     });
    //
    //     // 布局计算
    //     dagre.layout(g);
    //
    //     let result = {
    //         nodes: [],
    //         links: []
    //     };
    //     let adX = 0, // 其他节点针对固定节点的偏移值
    //         adY = 0;
    //     if(staticNode){
    //         // staticNode为固定节点，即本次重绘不会改变其坐标
    //         let newPosition = g.node(staticNode.id),
    //             sNode = Object.assign({originX: newPosition.x, originY: newPosition.y}, staticNode);
    //
    //         adX = sNode.originX - newPosition.x;
    //         adY = sNode.originY - newPosition.y;
    //     }
    //     g.nodes().forEach(function(v) {
    //         // 记录上一次绘制坐标, 保存本次绘制坐标
    //         g.node(v).data.originX = g.node(v).data.x = g.node(v).x + adX;
    //         g.node(v).data.originY = g.node(v).data.y = g.node(v).y + adY;
    //         result.nodes.push(g.node(v).data);
    //     });
    //
    //     g.edges().forEach(function(e) {
    //         // 线坐标保存
    //         result.links.push(Object.assign({}, g.edge(e), {
    //             from: g.node(e.v).data,
    //             to: g.node(e.w).data
    //         }));
    //     });
    //     this._layoutResult = result;
    //     return result;
    // }
    layoutLine(from, to, adjust){
        // 贝塞尔曲线
        let x1 = from.x,
            y1 = from.y,
            x2 = to.x,
            y2 = to.y;
        return [
            x1 + adjust.x,
            y1 + adjust.y,
            (x1 + x2)/2 + adjust.x,
            y1 + adjust.y,
            (x1 + x2)/2 + adjust.x,
            y2 + adjust.y,
            x2 + adjust.x,
            y2 + adjust.y
        ];
    }
    calcuText(text, fontSize, fontFamily/* , maxLength */){
        // 计算文字长度(px)，超过最大长度(maxLength)的用...结尾表示
        text = text || '';
        text = text.toString();
        let tempCanvas = document.createElement('canvas'),
            ctx = tempCanvas.getContext("2d");
        ctx.font = fontSize + 'px ' + fontFamily;
        return {
            text: text,
            width: Math.ceil(ctx.measureText(text).width)
        }
    }
    calcuMoveDistance(node, canvas){
        // 计算将node移动到屏幕中心所对应的画布的translate值
        let isInBound = (screenNum) => {
                if(
                    Math.abs(node.x + canvas.centerX - canvas.width/2) > screenNum * canvas.screenWidth ||
                    Math.abs(node.y + canvas.centerY - canvas.height/2) > screenNum * canvas.screenHeight
                ){
                    return false;
                }
                return true;
            },
            moveX = 0,
            moveY = 0,
            redraw = false;

        if(isInBound(2)){
            let {x, y} = canvas.getMoveXY(),
                translateX = canvas.getTranslateX(),
                translateY = canvas.getTranslateY();
            moveX = translateX - node.x - canvas.centerX + canvas.width/2 - x;
            moveY = translateY - node.y - canvas.centerY + canvas.height/2 - y;
            // 焦点在缓存区之内(离缓存区中心2屏幕之内)
            if(isInBound(1)){
                // 焦点距离缓存中心1屏幕之内，无需重绘，直接移动
                redraw = false;
            }
            else{
                // 焦点距离缓存中心1-2.0屏幕,
                // 先移动，再重绘(以防下次拖动画布超出缓存区显示空白)
                redraw = true;
            }
        }
        else{
            // 焦点在缓存区之外
        }
        return {
            moveX,
            moveY,
            redraw
        };
    }
}
export default new Calcu();
