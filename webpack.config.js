const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', //development,product,none表示最原始的打包方式
    entry: './test/app.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        // publicPath: 'dist/' //指定静态资源的加载路径，如果使用这个，html中的静态资源前都会加上这个路径再去加载
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'] //解析es6语法为es5语法，实现兼容操作
                    }
                }
            },
            {
                test: /.css$/,
                //loader是从下到上依次进行解析，所以需要把先进行加载的loader放到后面
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /.png$/,
                //url-loader基于file-loader,所以使用url-loader时必须安装file-loader
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024 //10kb
                    }
                }
            },
            {
                test: /.html$/,
                use: ['html-loader']
                // use: {
                //     loader: 'html-loader',
                //     // options: {
                //     //     attrs: ['img:src', 'a:href']
                //     // }
                // }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), //清除上一次打包文件
        new HtmlWebpackPlugin(), //将整合了bundle.js（动态引入）的html输出到dist中，这样实现了打包就可以发布而无需再手动将html放入dist中
    ]
}