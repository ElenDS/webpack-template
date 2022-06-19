const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name][fullhash].js',
        clean: true,
        publicPath: './',
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime']
              }
            }
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              //"style-loader",
              MiniCssExtractPlugin.loader,
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
          },         
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
          },
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
          filename: '[name]-[fullhash].css'
        }),
        
      ],

      devServer: {
        static: {
          directory: path.join(__dirname, 'src'),
        },
        compress: true,
        port: 3000,
      },
};