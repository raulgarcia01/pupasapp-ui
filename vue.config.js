const { defineConfig } = require("@vue/cli-service");
const Dotenv = require('dotenv-webpack');

module.exports = defineConfig({
	publicPath: '/',
	transpileDependencies: true,
	outputDir: "./static",
	configureWebpack: {
		experiments: {
			topLevelAwait: true,
		},
		plugins: [
			new Dotenv()
		]
	}
});