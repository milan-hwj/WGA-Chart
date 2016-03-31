/* global Angel  */
class Calcu {
    layout(data){
        let r = 6,// 半径
            wd = 100,// 横向间距
            hd = 20, // 纵向间距
            leafNodes = [],// 储存叶子节点
            d = Object.assign({x: 0, y: 0}, data);

        let iterateNode = (node, parentNode, level) => {
            level = level || 0;
            node.level = level || 0;
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
        console.info(d);

        return d;
    }
}
export default new Calcu();
