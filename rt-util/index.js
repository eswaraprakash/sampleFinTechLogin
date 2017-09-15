require('./zn.core.minx.js');
module.exports = zn.arrayValueToObject([
    'Session',
    'Store',
    'Router',
    'RestfulRouter',
    'RouterMapping'
], function (value){
    var _value = window[value] = require('./' + value + '.js');
    return _value;
});
