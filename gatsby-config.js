/* eslint-env node */

require('source-map-support').install();
/* ts-node is required for *.ts and *.tsx imports support create-pages.ts in gatsby-node.js */
require('ts-node').register();

const path = require('path');

const { languages, defaultLanguage } = require('./languages');

const localesPath = path.join(__dirname, 'locales');

const breakPoints = {
	medium: 768,
	large: 992,
	xlarge: 1200,
};

if (process.env.STAGING) {
	require('dotenv').config({
		path: `.env.${process.env.NODE_ENV}.staging`,
	});
} else {
	require('dotenv').config({
		path: `.env.${process.env.NODE_ENV}`,
	});
}

module.exports = {
	siteMetadata: {
		title: `HoneyBook`,
		description: `HoneyBook Marketing website`,
		author: ``,
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: localesPath,
				name: `locale`,
			},
		},
		{
			resolve: `gatsby-plugin-react-i18next`,
			options: {
				localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
				languages,
				defaultLanguage,
				// if you are using Helmet, you must include siteUrl, and make sure you add http:https
				siteUrl: `https://honeybook.com/`,
				// you can pass any i18next options
				// pass following options to allow message content as a key
				i18nextOptions: {
					interpolation: {
						escapeValue: false, // not needed for react as it escapes by default
					},
					// DO NOT CHANGE keySeparator or nsSeparator unless you know what you are doing!
					keySeparator: '.',
					nsSeparator: '.',
				},
				pages: [
					// {
					//   matchPath: "/:lang?/blog/:uid",
					//   getLanguageFromPath: true,
					//   excludeLanguages: ["es"],
					// },
					// {
					//   matchPath: "/preview",
					//   languages: ["en"],
					// },
				],
			},
		},
		`gatsby-plugin-react-helmet`,
		{
			resolve: 'gatsby-plugin-sass',
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: path.join(__dirname, '/src/images'), // `${__dirname}/src/images`,
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `HoneyBook: Client Management Software for Small Businesses`,
				short_name: `honeybook`,
				start_url: `/`,
				background_color: `#000021`,
				theme_color: `#000021`,
				display: `standalone`,
				icon: `src/images/favicon.png`, // This path is relative to the root of the site.
			},
		},
		`gatsby-plugin-typescript`,
		{
			resolve: 'gatsby-plugin-web-font-loader',
			options: {
				google: {
					families: ['Montserrat:400,600,700,800&display=swap'],
				},
			},
		},
		`gatsby-plugin-split-css`,
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /\.inline\.svg$/,
				},
			},
		},
		{
			resolve: 'gatsby-plugin-breakpoints',
			options: {
				queries: {
					medium: `(max-width: ${breakPoints.medium}px)`,
					large: `(max-width: ${breakPoints.large}px)`,
					xlarge: `(max-width: ${breakPoints.xlarge}px)`,
					largeUp: `(min-width: ${breakPoints.large}px)`,
					mediumUp: `(min-width: ${breakPoints.medium}px)`,
					// For some reason, business personality test has this query
					bptestQuery: `(min-width: 800px)`,
				},
			},
		},
	],
};
