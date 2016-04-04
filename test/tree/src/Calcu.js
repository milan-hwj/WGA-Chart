/* global Angel  */
class Calcu {
    layoutNode_backup(data){
        let wd = 100,// 横向间距
            hd = 15, // 纵向间距
            nodesByLevel = [],
            d = Object.assign({x: 0, y: 0, move: 0}, data);

        // 深度遍历，设置节点parent属性
        let iterateNode = (node, parentNode, level) => {
            level = level || 0;
            node.level = level;
            node.move = 0;
            node._parentNode = parentNode;
            nodesByLevel[level] = nodesByLevel[level] || [];
            nodesByLevel[level].push(node);
            node.index = nodesByLevel[level].length - 1;
            if(node.children){
                level++;
                node.children.forEach((n) => {
                    iterateNode(n, node, level);
                });
            }
        }
        iterateNode(d);

        let checkNodesPosition = (node1, node2) => {
            // 检查节点是否重合、连线是否交叉
            if(node1.y - node2.y < 1){
                let move1 = 0,
                    move2 = 0,
                    parent1 = node1._parentNode,
                    parent2 = node2._parentNode,
                    parent;
                while(parent1 !== parent2){
                    parent = parent2;
                    move1 += parent1.move;
                    move2 += parent2.move;
                    parent1 = parent1._parentNode;
                    parent2 = parent2._parentNode;
                }
                // 算上之前的矫正值后再次计算距离
                let distance = node1.y - node2.y - move1 + move2;
                if(distance < 2){
                    // 仍然重合、交叉, 再次矫正
                    distance = 2 - distance;
                    for (let i=0; i<parent1.children.length; i++) {
                        parent1.children[i].move += distance;
                        if(parent1.children[i] === parent){
                            break;
                        }
                    }
                    // 
                    let nodes = nodesByLevel[parent1.level]
                                .slice(0, parent1.index);
                    nodes.forEach((n) => {
                        n.move += distance;
                    });
                    return distance;
                }
            }
            return null;
        }
        // 广度遍历
        let array = d.children,
            level = 1;
        while(array.length > 0){
            let next = [],
                currentParent,
                childIndex = 0;
            array.forEach((node) => {
                node.y = node._parentNode.y + (childIndex - (node._parentNode.children.length - 1)/2);
                node.x = node.level;
                node.move = 0; // 矫正值
                childIndex++;
                if(childIndex === node._parentNode.children.length){
                    childIndex = 0;
                }

                if(currentParent !== node._parentNode){
                    if(currentParent && currentParent.children.length > 0){
                        let lastNode = currentParent.children[currentParent.children.length - 1];
                        checkNodesPosition(node, lastNode);
                    }
                    currentParent = node._parentNode;
                }
                
                if(node.children){
                    next = next.concat(node.children);
                }
            });
            array = next;
        }
        // 遍历，坐标设定
        let setMove = (node) => {
            if(node._parentNode){
                node.move += node._parentNode.move;
            }
            node.y = (node.y - node.move);
            if(node.children){
                node.children.forEach((n) => {
                    setMove(n);
                });
            }
        }
        setMove(d);
        // 父节点居中
        nodesByLevel.pop();
        let nodes = nodesByLevel.pop(),
            treeMove = 0;
        while(nodes && nodes.length > 0){
            nodes.forEach((node) => {
                if(node.children && node.children.length > 0){
                    let y = 0,
                        index = 0;
                    node.children.forEach((n) => {
                        y += n.y;
                        index++;
                    });
                    node.y = y/index;
                }
            });
            // 根节点Y坐标偏移量记录，用于拉回到原点
            if(!nodes[0]._parentNode){
                treeMove = nodes[0].y;
            }
            nodes = nodesByLevel.pop();
        }
        
        // 遍历，实际坐标设定
        let calcuAbsolutePosition = (node) => {
            if(node._parentNode){
                node.move += node._parentNode.move;
            }
            node.y = (node.y - treeMove) * hd;
            node.x *= wd;
            if(node.children){
                node.children.forEach((n) => {
                    calcuAbsolutePosition(n);
                });
            }
        }
        calcuAbsolutePosition(d);

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
