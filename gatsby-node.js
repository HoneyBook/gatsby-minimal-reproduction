/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

// eslint-disable-next-line import/extensions
exports.createPages = require('./create-pages.ts').default;

exports.onCreateWebpackConfig = ({ actions, stage, getConfig, plugins }) => {
	actions.setWebpackConfig({
		resolve: {
			alias: {
				'@honeybook-ui': path.resolve(__dirname, 'src/components/honeybook-ui'),
			},
		},
	});

	// Silence mini css extract order errors
	if (stage === 'build-javascript' || stage === 'develop') {
		const config = getConfig();

		const miniCss = config.plugins.find((plugin) => plugin.constructor.name === 'MiniCssExtractPlugin');

		if (miniCss) {
			miniCss.options.ignoreOrder = true;
		}

		actions.replaceWebpackConfig(config);

		// actions.setWebpackConfig({
		// 	plugins: [plugins.provide({ process: 'process/browser' })],
		// });
	}
};
