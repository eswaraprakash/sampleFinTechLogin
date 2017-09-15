module.exports = zn.arrayValueToObject([
    'Layout',
    'URLRouter'
], function (value){
    return require('./' + value + '.js');
});
