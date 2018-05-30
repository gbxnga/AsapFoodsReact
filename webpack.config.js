//const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var path = require('path');
const dist = 'dist'
//const workboxPlugin = require('workbox-webpack-plugin');
module.exports = {
    entry: './app/main.js',
    //entry: './index-client.js',
    output: {
       path: path.resolve(__dirname,""),
        //path: path.join(dist,"/assets/js/"),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.css/,
                loader:[ 'style-loader', 'css-loader' ]
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    /*devServer: {
        port: 7090
    },*/
    plugins: [
        /*new UglifyJsPlugin({
            sourceMap: true
        }),
       /* new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery",
            "window.jQuery": "jquery",
            jQuery:"jquery"
          }),*/

    ]
};