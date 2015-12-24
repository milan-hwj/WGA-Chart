define([
	'../util/utils',
	'./Base'
	],function(
		utils, 
		Base
	){
     /**
      * @describe cardioidHeard
      *   			水平方向： r=a(1-cosθ) 或 r=a(1+cosθ) (a>0)
	  *			    垂直方向： r=a(1-sinθ) 或 r=a(1+sinθ) (a>0)
      * @param    
      * @return   
      */
	var cardioidHeard = function(option){
	     /**
	      * @describe 
	      * @param    
	      * @return   
	      */
		Base.call(this, option);
	}
	cardioidHeard.prototype = {
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
				rx,
				ry,
				i = 0;
			ctx.moveTo(x + a, y);
			for(i=0; i<=n; i++){ 
				b = i/180 * Math.PI;
				rx = a * (1 + Math.sin(b));
				ry = a * (1 + Math.sin(b));
				
				ctx.lineTo(x + rx * Math.cos(b), y + ry * Math.sin(b));
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

	utils.inherits(cardioidHeard, Base);
	Angel.CardioidHeard = cardioidHeard;
	return cardioidHeard;
})