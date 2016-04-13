/* global dagre  */
import CONST from './CONST';
class Calcu {
    layoutNodeByDagre(data){
        // 节点布局计算
        // Create a new directed graph 
        let g = new dagre.graphlib.Graph(),
            nodes = data.nodes,
            links = data.links;

        // Set an object for the graph label
        g.setGraph({
            ranksep: CONST.ranksep,
            nodesep: CONST.nodesep,
            rankdir: CONST.rankdir,
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
        g.nodes().forEach(function(v) {
            result.nodes.push(Object.assign({
                id: v
            }, g.node(v)));
        });
        g.edges().forEach(function(e) {
            result.links.push(Object.assign({
                from: e.v,
                to: e.w
            }, g.edge(e)));
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
}
export default new Calcu();
