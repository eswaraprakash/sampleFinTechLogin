var Router = function (argv){
    this._search = new URLSearchParams(location.search.slice(1));
    this._hash = location.hash;
    var _argv = argv || {},
        _self = this,
        _onLoaded = _argv.onLoaded || function (){},
        _onHashChange = _argv.onHashChange || function (){},
        _onPopState = _argv.onPopState || function (){};

    window.addEventListener('DOMContentLoaded', function(event){
        if(_onLoaded(event, _self)===false){
            return false;
        }
    }, false);
    window.addEventListener('hashchange', function(event){
        if(_onHashChange(event, _self)===false){
            return false;
        }
    }, false);
    window.addEventListener('popstate', function (){
        if(_onPopState(event, _self)===false){
            return false;
        }
    }, false);
    return this;
}

Router.prototype.setSearch = function (value){
    var _obj = value||{};
    for(var key in _obj){
        this._search.set(key, _obj[key]);
    }

    return this.refresh(), this;
}

Router.prototype.setHash = function (value){
    this._hash = value;
    return location.hash = value, this;
}

Router.prototype.getSearch = function (name){
    if(name){
        return this._search.get(name);
    }
    var _data = {};
    for(var key of this._search.keys()){
        _data[key] = this._search.get(key);
    }

    return _data;
}

Router.prototype.getURL = function (value){
    return location.pathname + '?' + this._search.toString() + '#' + this._hash;
}

Router.prototype.refresh = function (value){
    return window.history.pushState(null, null, this.getURL()), this;
}

Router.prototype.pushState = function (state, title, url){
    return window.history.pushState(state, title, url), this;
}

module.exports = Router;
