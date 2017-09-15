window.UI = require('../rt-mui/index.js');

var routers = zn.deepEachObject({
		'/':'./view/Index.js',
		'/Dashboard':'./view/Dashboard.js',
}, function (value, index){
	if(zn.is(value, 'string')){
		return require(value);
	}
	return value;
});


var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(<UI.URLRouter home="/index" routers={routers} />, document.getElementById('container'));
