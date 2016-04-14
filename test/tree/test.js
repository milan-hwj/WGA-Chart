// test
var mockId = 10;
var treeDiagram = new TreeDiagram({
    onExpand: function(nodeData, callback) {
        var id = nodeData.id,
            nodes = [],
            links = [],
            mockNodeId;
        var r = Math.ceil(Math.random()*4);
        r = 2;
        for(var i=0; i<r; i++){
            mockNodeId = mockId++;
            nodes.push({
                id: mockNodeId,
                name: ''
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
    }
}, document.getElementById("Main"));

// mock data
var nodesMap = {},
    nodes = [{
        id: 1,
        //color: 'rgba(0, 200, 0, 1)',
        //borderColor: 'rgba(0, 240, 0, 1)',
        name: 'a',
        //size: 10,
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
        name: '',
        type: 'child'
    },{
        id: 5,
        name: '',
        type: 'child'
    }],
    links = [
        {
        from: 1,
        to: 2
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
// setTimeout(function(){
//     treeDiagram.highLight(function(nodeData) {
//         if(nodeData.name === 'a'){
//             return true;
//         }
//         return false;
//     }, 1);
// }, 1000);
// setTimeout(function() {
//     treeDiagram.highLight(function(nodeData) {
//         if(nodeData.name === 'a'){
//             return true;
//         }
//         return false;
//     }, 2);
// }, 2000);
// // 取消高亮
// setTimeout(function() {
//     treeDiagram.clearAllHighLight();
// }, 3000);
//
// nodes = [{
//     id: 6,
//     color: 'rgba(0, 200, 0, 1)',
//     borderColor: 'rgba(0, 240, 0, 1)',
//     name: 'b',
//     size: 30,
//     type: 'child'
// },{
//     id: 7,
//     color: 'rgba(0, 200, 0, 1)',
//     borderColor: 'rgba(0, 240, 0, 1)',
//     name: 'b',
//     size: 30,
//     type: 'child'
// }];
// links = [{
//     from: 5,
//     to: 6,
//     size: 1,
//     color: 'rgba(200, 0, 0, 1)'
// },{
//     from: 5,
//     to: 7,
//     size: 1,
//     color: 'rgba(0, 0, 0, 1)'
// }];
// //treeDiagram.addData(nodes, links);
