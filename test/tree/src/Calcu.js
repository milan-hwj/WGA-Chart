/* global d3, dagre  */
import CONST from './CONST';
class Calcu {
    layoutNode(store, config){
        // 布局计算
        if(!config){
            return this._layoutResult;
        }
        else if(config.type === 'static'){
            return this.layoutNodeByStaticUserD3(store, config.node);
        }
        else if(config.type === 'center'){
            return this.layoutNodeByCenter(store, config.node);
        }
    }
    layoutNodeByCenter(store, centerNode){
        // 以centerNode为中心点布局
        centerNode.originX = centerNode.originY = 0;
        return this.layoutNodeByStaticUserD3(store, centerNode);
    }
    layoutNodeByStaticUserD3(store, staticNode){
        // d3布局
        let result = {
                nodes: [],
                links: []
            },
            adX = 0,
            adY = 0,
            layout = (direction, isExceptRoot) => {
                let root = store.root,
                    linkMap = store.linkMap;
                // 遍历节点，为展开标志的节点添加children属性
                // children: d3算法需要，意为子节点
                store.iteratorNode((node) => {
                    // 展开节点才设置children，参与布局
                    if(node.isExpend){
                        node.children = direction === 'right' ?
                            node._children :
                            node._parents;
                    }
                    else{
                        delete node.children;
                    }
                }, direction === 'right' ? 'children' : 'parents');

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
                    // 其他节点针对固定节点的偏移值
                    if(staticNode && staticNode.id === node.id){
                        // staticNode为固定节点，即本次重绘不会改变其坐标
                        let sNode = Object.assign({originX: staticNode.x, originY: staticNode.Y}, staticNode),
                            n = direction === 'right' ? 1 : -1;
                        if(sNode.originX || sNode.originY){
                            adX = sNode.originX - n * sNode.y;
                            adY = sNode.originY + n * sNode.x;
                        }
                    }
                });

                nodes.forEach((node) => {
                    // node.originX = node.x = node.x + adX;
                    // node.originY = node.y = node.y + adY;
                    if(!isExceptRoot || node.type !== 'root'){
                        node.originX = node.x;
                        node.originY = node.y;
                        let x = node.x,
                            y = node.y,
                            n = direction === 'right' ? 1 : -1;
                        node.x = n * y;
                        node.y = -n * x;
                        result.nodes.push(node);
                    }
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
                });
            };
        
        // d3树算法只支持树形布局，所以这里把图形拆成里两棵树分别布局
        layout('right');
        layout('left', true);
        result.nodes.forEach((node) => {
            node.originX = node.x = node.x + adX;
            node.originY = node.y = node.y + adY;
        })
        this._layoutResult = result;
        return result;
    }
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
            width: Math.ceil(ctx.measureText(text).width),
            height: Math.ceil(ctx.measureText(text).height)
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
