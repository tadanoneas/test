const VueLoaderPlugin = require('vue-loader/lib/plugin');
var nodeExternals = require('webpack-node-externals');
const ManifestPlugin = require('./webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	context: path.resolve(__dirname, 'app/javascript/packs'),
	entry:
	{
		application: './application.js',
		'application-stylesheet': './application.css',
		hello_vue: './hello_vue.js',
	},
	output: {
		path: path.resolve(__dirname, 'public/packs',),
		filename: '[name]-[hash].js'
	},
	target: 'node',
	mode: 'production',
	module: {
	 rules: [
	  {
	     test: /\.(css|sass)$/,
	     use: ['vue-style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
	  },
          {
	     test: /\.vue$/,
             exclude: /node_modules/,
	     loader: "vue-loader",
	     options:{
		extractCSS: true,
	     },
	  },
	  {
	     test: /\.js$/,
	     loader: 'babel-loader',
	     options: {
	        presets: [
	           '@babel/preset-env',
	        ],
	     },
	  },
          {
		  test: /\.node$/,
		  loader: "node-loader"
	  },
	  {
		test: /\.(png|jpg|gif)$/,
		use: [
		   {
			loader: 'file-loader',
			options: {
				outputPath: 'images/',
				name: '[name]-[hash].[ext]',
				 },
		   },
		],
	   },
	 ],
    },
    externals: [nodeExternals()],
    plugins: [
 	new VueLoaderPlugin(),
	    new ManifestPlugin({
		    writeToFileEmit: true
	    }),
	    new MiniCssExtractPlugin({filename: '[name]-[hash].css'}),
    ],
};
