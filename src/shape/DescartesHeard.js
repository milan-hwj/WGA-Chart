define([
	'../util/utils',
	'./Base'
	],function(
		utils, 
		Base
	){
     /**
      * @describe 笛卡尔星形线 r=a(1-sinθ)
      * @param    
      * @return   
      */
	var descartesHeard = function(option){
	     /**
	      * @describe 
	      * @param    
	      * @return   
	      */
		Base.call(this, option);
	}
	descartesHeard.prototype = {
		_buildPath: function(ctx){
		     /**
		      * @describe 渲染
		      * @param    
		      * @return   
		      */
		    var self = this,
				style = self.style,
				a = style.a,
				x = style.x,
				y = style.y,
				n = style.n || 360,
				b,
				r,
				i = 0;
			ctx.moveTo(x + r, y);
			for(i=0; i<=n; i++){ 
				b = i/180 * Math.PI;
				r = a * (1 - Math.sin(b));
				ctx.lineTo(x + r * Math.cos(b), y - r * Math.sin(b));
			}
		},
		_getArroundRect: function(){
		     /**
		      * @describe 获得图形包围矩形
		      * @param    
		      * @return   
		      */
			var self = this,
				style = self.style;
			
			return {
				x: style.x - style.a,
				y: style.y - style.a/4,
				w: 2 * style.a,
				h: 2.25 * style.a
			};
		},
		isCover: function(x, y){
		     /**
		      * @describe 判断点是否在图形内
		      * @param    
		      * @return   
		      */
		    var self = this;
		    // 判断是否在包围矩阵中
		    if(self._isInArroundRect(x, y)){
		    	return true;
		    }
		    return false;
		}
	};

	utils.inherits(descartesHeard, Base);
	Angel.DescartesHeard = descartesHeard;
	return descartesHeard;
})