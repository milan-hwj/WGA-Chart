/* global Angel  */
class Calcu {
    layoutNode_backup(data){
        let wd = 100,// 横向间距
            hd = 15, // 纵向间距
            leafNodes = [],// 储存叶子节点
            d = Object.assign({x: 0, y: 0}, data);

        let nodesByLevel = {},
            firstLeaf = false;
        let iterateNode = (node, parentNode, level) => {
            level = level || 0;
            node.level = level;
            if(!nodesByLevel[level]){
                nodesByLevel[level] = [];
            }
            nodesByLevel[level].push(node);

            if(node.children){
                level++;
                for(var i=0; i<node.children.length; i++){
                    iterateNode(node.children[i], node, level);
                }
            }
            else{
                // 叶子节点
                if(!firstLeaf){
                    // 第一个叶子节点坐标定位(0, 0)
                    firstLeaf = true;
                    node.x = node.y = 0;
                }
                else{
                    let levelNodes = nodesByLevel[level];
                    if(levelNodes.length === 1){
                        // 该节点为level第一个节点
                        let lastNode = nodesByLevel[level][nodesByLevel[level].length - 2],
                            lasParentNode = nodesByLevel[level - 1][nodesByLevel[level - 1].length - 2];
                    }
                    else{
                        let lastNode = nodesByLevel[level][nodesByLevel[level].length - 2];
                        node.x = lastNode.x;
                        node.y = lastNode.y + hd;
                    }

                }
            }
            if(parentNode){
                node._parentNode = parentNode;
            }
        }

        return d;
    }
    layoutNode(data){
        let wd = 100,// 横向间距
            hd = 15, // 纵向间距
            leafNodes = [],// 储存叶子节点
            d = Object.assign({x: 0, y: 0}, data);

        let iterateNode = (node, parentNode, level) => {
            level = level || 0;
            node.level = level;
            if(node.children){
                level++;
                for(var i=0; i<node.children.length; i++){
                    iterateNode(node.children[i], node, level);
                }
            }
            else{
                // 叶子节点
                leafNodes.push(node);
            }
            if(parentNode){
                node._parentNode = parentNode;
            }
        }
        iterateNode(d);

        let iterateFromBottom = (nodes) => {
            for(var i=0; i<nodes.length; i++){
                nodes[i].y = (i - (nodes.length - 1)/2) * hd;
                nodes[i].x = nodes[i].level * wd;

                let parentNode = nodes[i]._parentNode;
                if(parentNode){
                    parentNode._childLayerNum = parentNode._childLayerNum ?
                    parentNode._childLayerNum + 1 : 1;
                    while(parentNode._childLayerNum === parentNode.children.length){
                        parentNode.y = (parentNode.children[0].y + parentNode.children[parentNode.children.length -1].y)/2;
                        parentNode.x = parentNode.level * wd;
                        parentNode._childLayerNum = 0;

                        parentNode = parentNode._parentNode;
                        if(!parentNode){
                            break;
                        }
                        else{
                            parentNode._childLayerNum = parentNode._childLayerNum ?
                            parentNode._childLayerNum + 1 : 1;
                        }
                    }
                }
            }
        }
        iterateFromBottom(leafNodes);

        return d;
    }
    layoutLine(from, to, adjust){
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
