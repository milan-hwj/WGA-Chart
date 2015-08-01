define(function () {
    /**
     * @author   milan(white gourd angle)
     * @describe 容器类
     */
    var Group = function(){
         /**
          * @describe 
          * @param    
          * @return   
          */
    	var self = this;
    	self._children = {};
    }
    Group.prototype = {
    	addShape: function(shape){
    	     /**
    	      * @describe 添加或Group到组
    	      * @param    Group/shpae.base/circle/ring... 各类shape/Group对象
    	      * @return   
    	      */
    		var self = this;
    		self._children[shape.id] = shape;
    	}
    }

    return Group;
});

