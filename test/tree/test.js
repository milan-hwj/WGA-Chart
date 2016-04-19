// test
var mockId = 10;
var treeDiagram = window.treeDiagram = new TreeDiagram({
    onExpand: function(nodeData, callback) {
        var id = nodeData.id,
            nodes = [],
            links = [],
            mockNodeId;
        var r = Math.ceil(Math.random()*10);
        for(var i=0; i<r; i++){
            mockNodeId = mockId++;
            nodes.push({
                id: mockNodeId,
                name: Math.ceil(Math.random()*1000)
            });
            var isParent = nodeData.type === 'parent';
            links.push({
                from: isParent ? mockNodeId : id,
                to: isParent ? id : mockNodeId
            });
        }
        callback(nodes, links);
    },
    onNodeMouseEnter: function(e, nodeData) {
        //console.info(e);
    },
    onNodeMouseLeave: function(e, nodeData) {
        //console.info(e);
    },
    onContextMenu: function(e, nodeData){
        console.info(nodeData);
    }
}, document.getElementById("Main"));

// mock data
var nodesMap = {},
    nodes = [{
        id: 1,
        // color: 'rgba(290, 290, 0, 1)',
        // borderColor: 'rgba(0, 240, 0, 1)',
        name: 'a',
        //size: 100,
        type: 'parent'
    },{
        id: 2,
        name: 'a',
        type: 'root'
    },{
        id: 3,
        name: 'a',
        type: 'parent'
    },{
        id: 4,
        name: 'b',
        type: 'child'
    },{
        id: 5,
        name: 'b',
        type: 'child'
    }],
    links = [
        {
        // color: 'rgba(30, 0, 0, 1)',
        // size: 10,
        from: 1,
        to: 2,
    },{
        from: 3,
        to: 2
    },
    {
        from: 2,
        to: 4
    },{
        from: 2,
        to: 5
    }];
// 重置数据
treeDiagram.setData(nodes, links);
// 设置高亮
// treeDiagram.highLight(function(nodeData) {
//     if(nodeData.name === 'a'){
//         return true;
//     }
//     return false;
// }, 2);
// // 取消高亮
// setTimeout(function() {
//     treeDiagram.clearAllHighLight();
// }, 3000);

// //treeDiagram.addData(nodes, links);
//
//
window.light = (name) => {
    treeDiagram.highLight(function(nodeData) {
        if(nodeData.name === name){
            return true;
        }
        return false;
    }, 0);
}
