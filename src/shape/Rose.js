define([
	'../util/utils',
	'./Base'
	],function(
		utils, 
		Base
	){
     /**
      * @describe 玫瑰线 r = sin ( k θ )　或　r = cos ( k θ )
      * @param    
      * @return   
      */
	var Rose = function(option){
	     /**
	      * @describe 
	      * @param    
	      * @return   
	      */
		Base.call(this, option);
	}
	Rose.prototype = {
		_buildPath: function(ctx){
		     /**
		      * @describe 渲染
		      * @param    
		      * @return   
		      */
		    var self = this,
				style = self.style,
				x = style.x,
				y = style.y,
				n = style.n || (2 - style.k % 2) * 180, // 奇数180度 偶数花瓣360度
				k = style.k % 2 === 0 ? style.k/2 : style.k,
				r = style.r,
				roseR,
				b;
				k = style.k;
			ctx.moveTo(x, y);
			for(var i=0; i<=n; i++){ 
				b = i/180 * Math.PI;
				roseR = r * Math.sin(k * b);
				ctx.lineTo(x + roseR * Math.cos(b), y - roseR * Math.sin(b));
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
				x: style.x,
				y: style.y,
				w: style.w,
				h: style.h
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

	utils.inherits(Rose, Base);
	return Rose;
})