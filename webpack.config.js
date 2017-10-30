var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');
module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        output: ['./app.entry.js']
    },
    devtool: 'eval',
    output: {
        path: path.join(__dirname, 'www', 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        // Disable handling of unknown requires
        unknownContextRegExp: /$^/,
        unknownContextCritical: false,

        // Disable handling of requires with a single expression
        //exprContextRegExp: /$^/,
        exprContextCritical: false,

        // Warn for every expression in require
        wrappedContextCritical: false,
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                //include: path.join(__dirname, '.'),
                loader: 'babel',
                query: {
                    presets: ['es2015','react']
                }
                //loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
			{
				test:/\.less$/,
				loader:ExtractTextPlugin.extract('style-loader','raw-loader!less-loader')
			}
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].bundle.css"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        })
    ]
};
