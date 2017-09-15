module.exports = {
    jump: function (path, search){
        var _search = [],
            _value = null;
        if(search){
            this._search = this._search || '';
        }else {
            this._search = '';
        }

        if(search){
            for(var key in search){
                _value = search[key];
                if(typeof _value != 'string'){
                    _value = JSON.stringify(_value);
                }
                _search.push(key + '=' + _value);
            }
            this._search = '?' + _search.join('&');
        }

		return location.hash = path + this._search, this;
	},
    setHome: function (value){
        this._home = value;
    },
    doHome: function (){
        if(this._home){
            this.jump(this._home);
        }
    },
    getPath: function (){
        return location.hash.slice(1);
    },
    clear: function (){
        return this.getEngine().clear(), this;
    },
    setEngine: function (engine){
        this._engine = engine;
    },
    getEngine: function (){
        var _engine = this._engine || 'localStorage';   // Cookie, sessionStorage, localStorage
        if(_engine&&typeof _engine == 'string'){
            _engine = window[_engine];
        }

        return _engine;
    },
    setKey: function (key){
        this._key = key;
    },
    getKey: function (){
        return this._key || 'LOGIN_SESSION';
    },
    setKeyValue: function (key, value, timeout){
        var _value = (typeof value=='object') ? JSON.stringify(value) : value;
        return this.getEngine().setItem(key, _value, timeout), this;
    },
    getKeyValue: function (key){
        return this.getEngine().getItem(key);
    },
    jsonKeyValue: function (value){
        var _value = this.getKeyValue(value);
        if(_value){
            try {
                _value = JSON.parse(_value);
            }catch(e){
                _value = {};
                console.log(e.stack);
            }
        }

        return _value;
    },
    set: function (value, timeout) {
        return this.setKeyValue(this.getKey(), value, timeout);
    },
    get: function () {
        return this.getKeyValue(this.getKey());
    },
    json: function (name){
        var _value = this.get();
        if(_value){
            try {
                _value = JSON.parse(_value);
            }catch(e){
                _value = {};
                console.log(e.stack);
            }
        }

        return _value;
    },
    validate: function (){

    }
}
