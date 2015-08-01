define(function(){
     /**
      * @describe 所有形状的基类
      * @param    
      * @return   
      */
	var utils = {
	    inherits : function(clazz, baseClazz){
	         /**
	          * @describe 继承
	          * @param    {function} clazz 源类
	          * @param   {function} baseClazz 基类
	          */
	    	var clazzPrototype = clazz.prototype;
            function F() {}
            F.prototype = baseClazz.prototype;
            clazz.prototype = new F();

            for (var prop in clazzPrototype) {
                clazz.prototype[prop] = clazzPrototype[prop];
            }
            clazz.constructor = clazz;
	    },
      isArray: function(obj){
          return Object.prototype.toString.call(obj) === '[object Array]'; 
      },
      mergeItem: function(target, source, key, overwrite) {
            if (source.hasOwnProperty(key)) {
                var targetProp = target[key];
                if (typeof targetProp == 'object'
                    && !BUILTIN_OBJECT[objToString.call(targetProp)]
                    // 是否为 dom 对象
                    && !isDom(targetProp)
                ) {
                    // 如果需要递归覆盖，就递归调用merge
                    this.merge(
                        target[key],
                        source[key],
                        overwrite
                    );
                }
                else if (overwrite || !(key in target)) {
                    // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
                    target[key] = source[key];
                }
            }
        },
        merge: function(target, source, overwrite) {
           /**
            * @describe 将source的属性合并至target
            * @param    {function} clazz 源类
            * @param   {function} baseClazz 基类
            */
            for (var i in source) {
                this.mergeItem(target, source, i, overwrite);
            }
            
            return target;
        },
        indexOf: function(array, value) {
             /**
              * @describe 从数组中找出所有项
              */
            if (array.indexOf) {
                return array.indexOf(value);
            }
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
            return -1;
        }
	}

	return utils;
})