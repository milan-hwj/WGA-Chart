define([
	'../../util/utils'
	], function(
		utils
	){
     /**
      * @describe shpae事件动作
      * @param    
      * @return   
      */
	var EventAction = function(option){
	     /**
	      * @describe 
	      * @param    
	      * @return   
	      */
		this._handlers = {};
	}
	
	EventAction.prototype = {
		on: function(event, handler, context){
		     /**
		      * @describe 事件绑定
		      * @param    
		      * @return   
		      */
		    var _h = this._handlers;

	        if (!handler || !event) {
	            return this;
	        }

	        if (!_h[event]) {
	            _h[event] = [];
	        }

	        _h[event].push({
	            h : handler,
	            one : false,
	            ctx: context || this
	        });

	        return this;
		},
		off: function(event){
		     /**
		      * @describe 事件解绑
		      * @param    
		      * @return   
		      */
			var _h = this._handlers;

	        if (!event) {
	            this._handlers = {};
	            return this;
	        }

	        if (handler) {
	            if (_h[event]) {
	                var newList = [];
	                for (var i = 0, l = _h[event].length; i < l; i++) {
	                    if (_h[event][i]['h'] != handler) {
	                        newList.push(_h[event][i]);
	                    }
	                }
	                _h[event] = newList;
	            }

	            if (_h[event] && _h[event].length === 0) {
	                delete _h[event];
	            }
	        }
	        else {
	            delete _h[event];
	        }

	        return this;
		},
		_dispatch: function (type) {
			/**
		      * @describe 事件分发
		      * @param    
		      * @return   
		      */
	        if (this._handlers[type]) {
	            var args = arguments;
	            var argLen = args.length;

	            if (argLen > 3) {
	                args = Array.prototype.slice.call(args, 1);
	            }
	            
	            var _h = this._handlers[type];
	            var len = _h.length;
	            for (var i = 0; i < len;) {
	                // Optimize advise from backbone
	                switch (argLen) {
	                    case 1:
	                        _h[i]['h'].call(_h[i]['ctx']);
	                        break;
	                    case 2:
	                        _h[i]['h'].call(_h[i]['ctx'], args[1]);
	                        break;
	                    case 3:
	                        _h[i]['h'].call(_h[i]['ctx'], args[1], args[2]);
	                        break;
	                    default:
	                        // have more than 2 given arguments
	                        _h[i]['h'].apply(_h[i]['ctx'], args);
	                        break;
	                }
	                
	                if (_h[i]['one']) {
	                    _h.splice(i, 1);
	                    len--;
	                }
	                else {
	                    i++;
	                }
	            }
	        }
	        return this;
    	}
	};

	return EventAction;
})