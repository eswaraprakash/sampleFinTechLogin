var HOST = 'http://0.0.0.0:8080/';
function Request(url, data, method, headers) {
    this._className = "Request";
    this._url = url;
    this._data = data;
    this._method = method;
    this._headers = headers;
}

Request.prototype.exec = function (url, data, method, headers){
    var _url = url || this._url,
        _data = data || this._data,
        _method = method || this._method || 'POST',
        _headers = headers || {};

    var _result = this._onExec && this._onExec(this);
    if(_result===false){
        return false;
    }

    if(_headers.dataType=='json'){
        _headers.Accept = 'application/json, text/javascript, */*; q=0.01';
    }

    //console.log(_data);
    return zn['$' + _method.toLowerCase()]({
        url: Store.fixURL(_url),
        data: _data,
        success: this._success,
        error: function (sender, xhr){
            if(sender._XMLHttpRequest.status==401){
                /*
                if(window.Popup){
                    window.Popup.message({
                        content: sender._XMLHttpRequest.responseText || 'Session Timeout.',
                        type: 'warning'
                    });
                } else {
                    alert(sender._XMLHttpRequest.responseText || 'Session Timeout.');
                }*/

                return Session.doHome();
            }
        },
        timeout: this._timeout,
        headers: _headers
    });
}

Request.prototype.refresh = function (){
    this.exec();
}

Request.prototype.copyAndExt = function (data){
    var _data = this._data;
    if(typeof _data === 'object'){
        _data = JSON.parse(JSON.stringify(_data));
        for(var key in data){
            _data[key] = data[key];
        }
    }else {
        _data = data;
    }

    return new Request(this._url, _data, this._method);
}

Request.prototype.ext = function (data){
    var _data = this._data;
    for(var key in data){
        _data[key] = data[key];
    }

    return this;
}

function DataSource(data, argv) {
	this.reset(data, argv);
}

DataSource.prototype.exec = function (){
	var _data = this._data;
	if(!_data){ return; }
    var _temp = this._argv.onSubmitBefore && this._argv.onSubmitBefore(_data);
    if(_temp===false){
        return;
    }
    if(_temp!==undefined){
        _data = _temp;
    }
	if(_data._className=="Request"){
        if(!_data._onExec){
            _data._onExec = this._argv.onExec;
        }
        _data._success = function (sender, data){
			this._argv.onSuccess && this._argv.onSuccess(data);
		}.bind(this);
        _data._error = function (sender, data){
            Popup.message({
                content: 'Load Error, Message: ' + data.result + ', Status: ' + data.status,
                type: 'danger'
            });
			this._argv.onError && this._argv.onError(data);
		}.bind(this);
		_data.exec();
	} else {
        var _result = this._argv.onExec && this._argv.onExec(_data);
        if(_result===false){
            return false;
        }
		this._argv.onSuccess && this._argv.onSuccess(_data);
	}
}

DataSource.prototype.reset = function (data, argv){
    this._data = data;
	this._argv = argv || this._argv || {};
    if(this._argv.autoLoad!==false){
        this.exec();
    }
}

DataSource.prototype.setArgv = function (argv){
    if(this._data && this._data._className=="Request"){
        zn.extend(this._data._data,  argv||{});
        this._data.refresh();
    }
}

DataSource.prototype.refresh = function (){
	return this.exec();
}

function APILoader(config) {
    return this.reload(config), this;
}

APILoader.prototype.parse = function (prefix, config){
    var _prefix = prefix || '',
        _key = null,
        _value = null;
    for(var key in config){
        _key = _prefix + '/' + key;
        _value = config[key];
        if(key.indexOf('$')!=-1){
            this._vars[key.slice(1)] = _value;
            continue;
        }
        switch (typeof _value) {
            case 'string':
                this._apis[_key] = this.format(_value);
                break;
            case 'object':
                this.parse(_key, _value);
                break;
        }
    }
}

APILoader.prototype.format = function (path){
    var _value = null;
    path = path.replace(/\$/g, '');
    for(var _key in this._vars){
        _value = this._vars[_key];
        if(_value !== undefined){
            path = path.replace(new RegExp('{' + _key + '}', 'gi'), _value);
        }
    }

    return _value = null, path;
}

APILoader.prototype.get = function (key){
    return this._apis[key];
}

APILoader.prototype.reload = function (config){
    this._apis = {};
    this._vars = {};
    this.parse('', config);
}

module.exports = {
    init: function (url, data, method){
        return new Request(url, data, method);
    },
    post: function (url, data, headers){
        return new Request(url, data, "POST", headers);
    },
    delete: function (url, data, headers){
        return new Request(url, data, "DELETE", headers);
    },
    put: function (url, data, headers){
        return new Request(url, data, "PUT", headers);
    },
    get: function (url, data, headers){
        return new Request(this.formatURL(url, data), data, "GET", headers);
    },
    setHost: function (value){
        HOST = value;
    },
    getHost: function (){
        return HOST;
    },
    fixApi: function (api){
        if(this._apiLoader){
            api = this._apiLoader.get(api) || api;
        }

        return api;
    },
    fixURL: function (url) {
        if(url.indexOf('http://') === -1){
            url = HOST + url;
        }
        return url;
    },
    formatURL: function (url, data){
        for(var key in data){
            url = url.replace(new RegExp('{' + key + '}', 'gi'), data[key]||'');
        }

        return url;
    },
    dataSource: function (data, argv) {
        return new DataSource(data, argv);
    },
    loadApi: function (api){
        this._apiLoader = new APILoader(api);
    }
}
