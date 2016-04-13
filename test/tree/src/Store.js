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
            node.borderColor = CONST.highLightCurrentColor;
        }
        else{
            node.borderColor = CONST.highLightColor;
        }
    }
    clearAllHighLight(){
        // 清除所有节点高亮效果
        this.iteratorNode((node) => {
            delete node.hightLight;
            node.borderColor = this.defaultNodeStyleOpt[node.type].borderColor;
        });
    }
    iteratorNode(callback){
        let iterator = (node, direct, isExceptRoot) => {
            if(!isExceptRoot){
                callback(node);
            }
            if(node.isExpend && node[direct]){
                // 递归子结点
                node[direct].forEach((son) => {
                    iterator(son, direct);
                });
            }
        }
        iterator(this.root, 'parents');
        iterator(this.root, 'children', true);
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
            iterator(root, 'parents');
            iterator(root, 'children', true);
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

        // 默认配置
        let defaultNodeOpt = this.defaultNodeStyleOpt,
            defaultLinkOpt = {
                'child': {
                    color: CONST.childLinkColor,
                    size: CONST.linkSize
                },
                'parent': {
                    color: CONST.parentLinkColor,
                    size: CONST.linkSize
                }
            };
        // 保存节点信息
        this.nodeMap = this.nodeMap || {};
        nodes.forEach((node) => {
            if(!this.nodeMap[node.id]){
                // 添加默认属性，如颜色、边框厚度等
                this.nodeMap[node.id] = Object.assign({
                    originData: node,
                    borderWidth: CONST.borderWidth
                }, defaultNodeOpt[node.type], node);
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
                from.children = from.children || [];
                from.children.push(to);
                to.parents = to.parents || [];
                to.parents.push(from);
                this.linkMap[key] = Object.assign({},
                    (to.type === 'parent' || from.type === 'parent') ?
                        defaultLinkOpt.parent :
                        defaultLinkOpt.child
                , link);
                if(from.type === 'parent'){
                    to.isExpend = true;
                }
                else{
                    from.isExpend = true;
                }
            }
        });
    }
}
export default Store;

