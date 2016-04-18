/* global dagre  */
import CONST from './CONST';
class Calcu {
    layoutNode(data, centerNode){
        // 以centerNode为中心点布局
        centerNode.originX = centerNode.originY = 0;
        return this.layoutNodeByDagre(data, centerNode);
    }
    layoutNodeByDagre(data, staticNode){
        // 节点布局计算
        // Create a new directed graph 
        let g = new dagre.graphlib.Graph(),
            nodes = data.nodes,
            links = data.links;

        // Set an object for the graph label
        g.setGraph({
            ranksep: CONST.ranksep,
            nodesep: CONST.nodesep,
            rankdir: CONST.rankdir
        });

        // Default to assigning a new object as a label for each new edge.
        g.setDefaultEdgeLabel(function() { return {}; });

        nodes.forEach((node) => {
            // 添加点
            g.setNode(node.id, {
                label: node.name,
                width: 1,//node.size,
                height: 1,//node.size,
                data: node
            });
        });

        links.forEach((link) => {
            // 添加线
            g.setEdge(link.from, link.to, {data: link});
        });

        // 布局计算
        dagre.layout(g);

        let result = {
            nodes: [],
            links: []
        };
        let adX = 0, // 其他节点针对固定节点的偏移值
            adY = 0;
        if(staticNode){
            // staticNode为固定节点，即本次重绘不会改变其坐标
            let newPosition = g.node(staticNode.id),
                sNode = Object.assign({originX: newPosition.x, originY: newPosition.x}, staticNode);

            adX = sNode.originX - newPosition.x;
            adY = sNode.originY - newPosition.y;
        }
        g.nodes().forEach(function(v) {
            // 记录上一次绘制坐标, 保存本次绘制坐标
            g.node(v).data.originX = g.node(v).data.x = g.node(v).x + adX;
            g.node(v).data.originY = g.node(v).data.y = g.node(v).y + adY;
            result.nodes.push(g.node(v).data);
        });

        g.edges().forEach(function(e) {
            // 线坐标保存
            result.links.push(Object.assign({}, g.edge(e), {
                from: g.node(e.v).data,
                to: g.node(e.w).data
            }));
        });
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
            (2 * x1 + x2)/3 + adjust.x,
            y1 + adjust.y,
            (x1 + 2 * x2)/3 + adjust.x,
            y2 + adjust.y,
            x2 + adjust.x,
            y2 + adjust.y
        ];
    }
    calcuText(text, fontSize, maxLength){
        // 计算文字长度(px)，超过最大长度(maxLength)的用...结尾表示
        text = text || '';
        let length = 0.63 * fontSize * text.length;
        if(text.length > maxLength){
            text = text.substring(0, maxLength) + '...';
            length = 0.63 * fontSize * (text.length - 3) +
                    0.35 * fontSize * 3;
        }
        return {
            text: text,
            length: length
        }
    }
    calcuMoveDistance(node, canvas){
        // 计算将node移动到屏幕中心所对应的画布的translate值
        let isInBound = (screenNum) => {
                if(
                    node.x > screenNum * canvas.width ||
                    node.x < -screenNum * canvas.width ||
                    node.y < -screenNum * canvas.height ||
                    node.y > screenNum * canvas.height
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
            moveX = translateX - x - node.x;
            moveY = translateY - y - node.y;
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
