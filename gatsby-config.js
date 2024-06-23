/* eslint-env node */

require('source-map-support').install();
/* ts-node is required for *.ts and *.tsx imports support create-pages.ts in gatsby-node.js */
require('ts-node').register();

const path = require('path');

const { languages, defaultLanguage } = require('./languages');

const localesPath = path.join(__dirname, 'locales');

//Config the relavent environment variables file
require('dotenv').config({
	path: `.env.${process.env.HB_ENV}`,
});

module.exports = {
	siteMetadata: {
		title: `HoneyBook`,
		description: `HoneyBook Marketing website`,
		siteUrl: `https://www.honeybook.com`,
		author: ``,
	},
	trailingSlash: 'never',
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
				pages: [],
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
				name: `HoneyBook: Clientflow Management for Independent Businesses`,
				short_name: `HoneyBook`,
				start_url: `/`,
				background_color: `#131416FF`,
				theme_color: `#131416FF`,
				display: `standalone`,
				icon: `src/images/favicon.hb.png`,
				icon_options: {
					purpose: `any maskable`,
				},
				cache_busting_mode: `name`,
			},
		},
		`gatsby-plugin-typescript`,
		{
			resolve: 'gatsby-plugin-webfonts',
			options: {
				fonts: {
					google: [
						{
							family: 'Montserrat',
							variants: ['400', '600', '700', '800'],
							fontDisplay: 'swap',
							strategy: 'cdn', // 'base64' || 'selfHosted'
						},
					],
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
		`gatsby-transformer-gitinfo`,
	],
};
