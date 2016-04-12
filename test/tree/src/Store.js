/* global  */
class Store {
    constructor(data){
        this.data = {
            nodes: [],
            links: []
        };
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
    _dataFormat(nodes, links){
        // 数据上下级关系绑定
        nodes = nodes || [],
        links = links || [];

        // 保存节点信息
        this.nodeMap = this.nodeMap || {};
        nodes.forEach((node) => {
            if(!this.nodeMap[node.id]){
                this.nodeMap[node.id] = Object.assign({}, node);
                this.data.nodes.push(node);
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
                this.linkMap[key] = true;
                this.data.links.push(link);
            }
        });
    }
}
export default Store;
