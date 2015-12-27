define([
], function (
) {
  // 绑定画布简易拖动行为
  var isDown = false,
      angel,
      startX,
      startY,
      domX,
      domY,
      nodeMove = {
        hoverNode: null,
        x: null,
        y: null
      },
      main = $('#Main');
  $('.container').on('mousedown', function(e){
    isDown = true;
    startX = e.pageX;
    startY = e.pageY;
    domX = main.position().left;
    domY = main.position().top;
  }).on('mousemove', function(e){
    if(nodeMove.hoverNode){
      // 节点拖动
      nodeMove.hoverNode.style.x = e.pageX + nodeMove.x - startX;
      nodeMove.hoverNode.style.y = e.pageY + nodeMove.y - startY;
      angel.modShape(nodeMove.hoverNode);
      angel.refresh();
    }
    else if(isDown){
      // 画布拖动
      main.css('left', domX + e.pageX - startX);
      main.css('top', domY + e.pageY - startY);
    }
  }).on('mouseup', function(){
    isDown = false;
  }).on('mouseout', function(){
    isDown = false;
  });

  return {
    bindAngel: function(angelInstance){
      angel = angelInstance;
    },
    bindNodeEvent: function(node){
      // 绑定节点移动事件
      var style = node.style;
      node.on('mouseup', function(){
        nodeMove.hoverNode = null;
      }).on('mousedown', function(e){
        nodeMove.x = style.x, 
        nodeMove.y = style.y
        nodeMove.hoverNode = node;
      }).on('mouseout', function(){
        nodeMove.hoverNode = null;
      });
    }
  }
});