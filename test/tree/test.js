// test
var mockId = 100;
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
                name: '外旋轮曲线'//mockNodeId
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
        name: '1',
        //size: 100,
        type: 'parent'
    },{
        id: 2,
        name: '2',
        type: 'root'
    },{
        id: 3,
        name: '3',
        type: 'parent'
    },{
        id: 4,
        name: '4',
        type: 'child'
    },{
        id: 5,
        name: '5',
        type: 'child'
    },{
        id: 6,
        name: '6',
        type: 'child'
    },{
        id: 7,
        name: '7',
        type: 'child'
    },{
        id: 8,
        name: '8',
        type: 'child'
    },{
        id: 9,
        name: '9',
        type: 'child'
    },{
        id: 10,
        name: '10',
        type: 'child'
    },{
        id: 11,
        name: '11',
        type: 'child'
    },{
        id: 12,
        name: '12',
        type: 'child'
    },{
        id: 13,
        name: '13',
        type: 'child'
    }],
    links = [
        {
        // color: 'rgba(30, 0, 0, 1)',
        // size: 10,
        from: 1,
        to: 2
    },{
        from: 3,
        to: 2
    },{
        from: 2,
        to: 4
    },{
        from: 2,
        to: 5
    },{
        from: 2,
        to: 6
    },{
        from: 2,
        to: 7
    },{
        from: 2,
        to: 8
    },{
        from: 2,
        to: 9
    },{
        from: 2,
        to: 10
    },{
        from: 2,
        to: 11
    },{
        from: 2,
        to: 12
    },{
        from: 2,
        to: 13
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
