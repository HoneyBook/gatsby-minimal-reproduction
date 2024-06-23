/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// eslint-disable-next-line import/extensions
exports.createPages = require('./create-pages.ts').default;

exports.onCreateWebpackConfig = ({ actions, stage, getConfig }) => {
	// Silence mini css extract order errors
	if (stage === 'build-javascript' || stage === 'develop') {
		const config = getConfig();

		const miniCss = config.plugins.find((plugin) => plugin.constructor.name === 'MiniCssExtractPlugin');

		if (miniCss) {
			miniCss.options.ignoreOrder = true;
		}

		actions.replaceWebpackConfig(config);
	}
};
