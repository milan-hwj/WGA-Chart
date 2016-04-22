/* global  */
import CONST from './CONST';
class Store {
    constructor(data){
        this.defaultNodeStyleOpt = {
            'root': {
                // 根节点配置
                color: CONST.rootNodeColor,
                borderColor: CONST.rootNodeBorderColor,
                size: CONST.rootSize
            },
            'parent': {
                // 左侧节点配置
                color: CONST.parentNodeColor,
                borderColor: CONST.parentNodeBorderColor,
                size: CONST.nodeSize
            },
            'child': {
                // 右侧节点配置
                color: CONST.childNodeColor,
                borderColor: CONST.childNodeBorderColor,
                size: CONST.nodeSize
            }
        }
        if(data){
            this.setData(data.nodes, data.links);
        }
    }
    setData(nodes, links){
        //数据设置，会清除之前数据
        this.nodeMap = {};
        this.linkMap = {};
        this._dataFormat(nodes, links);
    }
    updateData(nodes, links){
        // 数据更新
        this._dataFormat(nodes, links);
    }
    getNodeById(id){
        this.nodeMap = this.nodeMap || {};
        return this.nodeMap[id];
    }
    addHighLight(node, type){
        // 增加高亮节点
        node.highLight = type;
        if(type === 'this'){
            //node.borderColor = CONST.highLightCurrentColor;
        }
        // else{
        //     node.borderColor = CONST.highLightColor;
        // }
    }
    clearAllHighLight(){
        // 清除所有节点高亮效果
        this.iteratorNode((node) => {
            delete node.highLight;
            // node.borderColor = this.defaultNodeStyleOpt[node.type].borderColor;
        });
    }
    iteratorNode(callback, iteratorDerect){
        if(!this.root){
            return;
        }
        let iterator = (node, direct, index) => {
            if(node.type !== 'root'){
                callback(node, index);
            }
            if(node.isExpend && node[direct]){
                // 递归子结点
                node[direct].forEach((son, i) => {
                    iterator(son, direct, i);
                });
            }
        }
        callback(this.root);
        if(!iteratorDerect || iteratorDerect === 'parents'){
            iterator(this.root, '_parents');
        }
        if(!iteratorDerect || iteratorDerect === 'children'){
            iterator(this.root, '_children');
        }
    }
    getExpendData(){
        // 获取已展开节点的信息(未展开节点不需要显示)
        let nodes = [],
            links = [],
            root = this.root,
            linkMap = this.linkMap,
            iterator = (node, direct, isExceptRoot) => {
                if(!isExceptRoot){
                    nodes.push(node);
                }
                if(node.isExpend && node[direct]){
                    // 递归子结点
                    node[direct].forEach((son) => {
                        links.push(
                            linkMap[node.id + '_' + son.id] ||
                            linkMap[son.id + '_' + node.id]
                        );
                        iterator(son, direct);
                    });
                }
            };
        if(root){
            iterator(root, '_parents');
            iterator(root, '_children', true);
        }
        return {
            nodes: nodes,
            links: links
        }
    }
    _dataFormat(nodes, links){
        // 数据上下级关系绑定
        nodes = nodes || [],
        links = links || [];

        // 保存节点信息
        this.nodeMap = this.nodeMap || {};
        nodes.forEach((node) => {
            if(!this.nodeMap[node.id]){
                // 添加默认属性，如颜色、边框厚度等
                this.nodeMap[node.id] = Object.assign({
                    originData: node
                }, node);
                if(node.type === 'root'){
                    this.root = this.nodeMap[node.id];
                }
            }
        });
        // 解析连线，绑定节点上下级关系
        this.linkMap = this.linkMap || {};
        links.forEach((link) => {
            let from = this.nodeMap[link.from],
                to = this.nodeMap[link.to],
                key = link.from  + '_' + link.to;

            if(!this.linkMap[key]){
                from._children = from._children || [];
                from._children.push(to);
                to._parents = to._parents || [];
                to._parents.push(from);
                this.linkMap[key] = Object.assign({
                    fromNode: from,
                    toNode: to
                },
                link);
                if(from.type === 'parent'){
                    to.isExpend = true;
                }
                else{
                    from.isExpend = true;
                }
            }
        });
        // 节点样式设置
        this._nodeStyleMixin();
        // 线样式设置
        this._linkStyleMixin();
    }
    _nodeStyleMixin(){
        // 节点样式设置(填充色，边框颜色)
        let getParentNode = (node) => {
                if(node.type === 'parent'){
                    return node._children[0]
                }
                else if(node.type === 'child'){
                    return node._parents[0];
                }
            },
            defaultNodeOpt = this.defaultNodeStyleOpt,
            colors = CONST.topLevelColors,
            borderColors = CONST.topLevelBorderColors,
            colorOpt;
        this.iteratorNode((node, i) => {
            colorOpt = {};
            if(node.type !== 'root'){
                let parentNode = getParentNode(node);
                if(parentNode.type !== 'root'){
                    // 节点颜色与父节点相同
                    colorOpt = {
                        color: parentNode.color,
                        borderColor: parentNode.borderColor,
                    }
                }
                else{
                    // 若父节点为root，则从配置里拿初始颜色
                    colorOpt = {
                        color: colors[i % colors.length],
                        borderColor: borderColors[i % borderColors.length]
                    }
                }
            }
            let newAttr = Object.assign({
                borderWidth: CONST.borderWidth
            }, defaultNodeOpt[node.type], colorOpt, node);
            Object.assign(this.nodeMap[node.id], newAttr);
        });
    }
    _linkStyleMixin(){
        // 线条样式设置
        let style;
        for(let i in this.linkMap){
            // 属性设置 线个性化设置优先，否则取关联的非root节点颜色
            let link = this.linkMap[i],
                node = link.toNode.type === 'root' ?
                    link.fromNode : link.toNode;
            style = {
                color: link.color || node.borderColor.replace(/[\d\.]+[ ]*\)/, '0.2)'),
                size: link.size || CONST.linkSize
            };
            Object.assign(link, style);
        }
    }
    getHighLightPath(id){
        let node = this.nodeMap[id],
            linkMap = this.linkMap,
            lightLines = [],
            direction = node.type === 'parent' ?
                '_children' : '_parents';
        if(node.type === 'root'){
            return [];
        }

        let parentNode,
            linkOpt;
        while(node[direction] && node[direction].length > 0){
            // 向父节点追溯
            parentNode = node[direction][0];
            linkOpt = (linkMap[node.id + '_' + parentNode.id] ||
                linkMap[parentNode.id + '_' + node.id]);
            // 沿途线加亮
            lightLines.push(Object.assign({},
                linkOpt,
                {color: linkOpt.color.replace(/[\d\.]+[ ]*\)/, '1)')}
            ));
            node = parentNode;
            if(node.type === 'root'){
                break;
            }
        }
        return lightLines;
    }
}
export default Store;

