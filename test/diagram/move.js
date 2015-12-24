define([
], function (
) {
  // 绑定画布简易拖动行为
  var isDown = false,
      startX,
      startY,
      domX,
      domY,
      main = $('#Main');
  $('.container').on('mousedown', function(e){
    isDown = true;
    startX = e.pageX;
    startY = e.pageY;
    domX = main.position().left;
    domY = main.position().top;
  }).on('mousemove', function(e){
    if(!isDown){
      return;
    }
    // 移动画布容器
    main.css('left', domX + e.pageX - startX);
    main.css('top', domY + e.pageY - startY);
  }).on('mouseup', function(){
    isDown = false;
  }).on('mouseout', function(){
    isDown = false;
  });

});