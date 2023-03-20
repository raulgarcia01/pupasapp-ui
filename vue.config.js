const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	publicPath: '/',
	transpileDependencies: true,
	outputDir: "./static",
	configureWebpack: {
		experiments: {
			topLevelAwait: true,
		}
	}
});