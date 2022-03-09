//configure path where output files will be saved
const path = require("path");
//plugin for processing html
const HtmlWebpackPlugin = require('html-webpack-plugin');
//plugin for cleanup
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  //file where webpack will enter the app to gather all dependencies(and its dependencies' dependencies), 
  //and concat them into one file
  entry: './src/js/index.js',
  output: {
    //call that concatinated file and store them in the dist directory
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: 'eval-source-map', //source maps trace errors in conosle back to original code, not in bundled code. eval-source-map is meant for development and slower than other source maps
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    //for cleaing up dist folder when we add new assets- whatever that means
    new CleanWebpackPlugin(),

    //bundle HTML and output to dist folder(via creating new html template)
    new HtmlWebpackPlugin({
      title: 'Shape Tracker',//title of bundled html file
      template: './src/index.html',//html file for webpack to bundle
      inject: 'body' //inject script at end of body tag(aka load all html first then js). Allows us to get rid of $(document).ready() in index.js(entry point) since they are same thing
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/, //tells webpack where to look for files that use specified loaders - loaders proccess code before its actually loaded
        //we need loaders because webpack only understands js. not other assets such as css. loaders actually transform css into js so webpack can bundle it
        
        use: [
          'style-loader',
          'css-loader'
        ] 
      },
      {//eslint-loader must be added last in rules array so it runs on original files, not concatinated ones. 
        test: /\.js$/,
        exclude: /node_modules/, //lint all js files except node_modules  
        loader: "eslint-loader" //loaders are applied last to first so this will ensure it executes before other loaders
      }
    ]
  }
};
