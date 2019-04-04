var path=require('path');
var webpack=require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'./dist'),
        // publicPath:'/dist/',
        filename:'build.js'
    },
    devServer:{
        historyApiFallback:true,
        overlay:true
    },
    resolve:{
        alias:{
            'vue$':'vue/dist/vue.esm.js'
        },
    },
    module: {
        rules: [
          // ... 其它规则
          {
            test: /\.vue$/,
            use: 'vue-loader'    
          },
          { test: /\.css$/,  
            
          loader: 'style-loader!css-loader'
            
          },
          {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        },
          { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
          // {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
        ]
      },
      plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
          template:path.join(__dirname,'./index.html'),
          filename:'index.html'
        })
      ]
}