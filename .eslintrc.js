module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'airbnb-typescript',
		'prettier',
		// "eslint:recommended",
		// "plugin:@typescript-eslint/eslint-recommended",
		// "plugin:@typescript-eslint/recommended",
		// "plugin:import/typescript",
		// "plugin:jest/recommended",
		// "plugin:json/recommended",
		// "plugin:jsx-a11y/recommended",
		// "plugin:optimize-regex/all",
		// "plugin:promise/recommended",
		// "plugin:react/recommended",
		// "plugin:react-hooks/recommended",
		// "plugin:react-perf/all",
		// "plugin:i18n-json/recommended",
		// "standard",
		// "standard-react",
		// "stylelint",
		// // Prettier always last
		// "prettier",
		// "plugin:prettier/recommended",
	],
	plugins: [
		'import', // connects in extends
		'@typescript-eslint', // connects in extends
		'react', // connects in extends
		'jsx-a11y', // connects in extends
		'react-hooks', // connects in extends
		// 'i18n',
		'prettier', // connects in extends
		// "react-perf", // connects in extends
		// "jest", // connects in extends
		// "optimize-regex", // connects in extends
		// "promise", // connects in extends
		// "markdown",
		// "json", // connects in extends
		// "xss", // unused
		// "perf-standard",
		// "es",
		// "babel", // unused
		// "tree-shaking", // unused
	],
	settings: {
		react: {
			version: 'detect',
		},
		node: {
			allowModules: ['src'],
			resolvePaths: [__dirname],
			tryExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
		},
		// Imports
		'import/parsers': {
			'@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {},
			alias: {
				map: [['@honeybook-ui', './src/components/honeybook-ui']],
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		createDefaultProgram: true,
		extraFileExtensions: ['.json'],
		project: './tsconfig.json',
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
	},
	ignorePatterns: ['!.github', '.github/*', '!.github/workflows'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/jsx-filename-extension': [1, { extensions: ['.jsx', 'tsx'] }], // should add ".ts" if typescript project
		'react/prop-types': 'off',
		camelcase: 'off',
		'no-useless-return': 'off',
		'node/no-missing-import': 'off',
		'node/no-missing-require': 'off',
		'node/no-unsupported-features/es-syntax': 'off',
		'sort-requires/sort-requires': 'off',
		'no-console': ['error', { allow: ['warn', 'error', 'info', 'table'] }],
		'no-unused-vars': 'off',
		'no-restricted-globals': [
			'error',
			{
				name: 'name',
				message: 'Use local parameter instead.',
			},
			{
				name: 'event',
				message: 'Use local parameter instead.',
			},
			{
				name: 'fdescribe',
				message: 'Do not commit fdescribe. Use describe instead.',
			},
		],
		'@typescript-eslint/explicit-function-return-type': ['off'],
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, typedefs: false }],
		'@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'eslint-comments/no-unlimited-disable': 'off',
		'react/no-unescaped-entities': 'off',
		'jsx-a11y/click-events-have-key-events': 'warn',
		'jsx-a11y/no-static-element-interactions': 'warn',
		'i18n/no-chinese-character': 1,
		'i18n/no-greek-character': 1,
		'i18n/no-japanese-character': 1,
		'i18n/no-korean-character': 1,
		'i18n/no-russian-character': 1,
		'i18n/no-thai-character': 1,
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'react/require-default-props': 0,
		'react/jsx-props-no-spreading': 0,
		'react/button-has-type': 0,
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'no-undef': 'off',
				'react/no-unused-prop-types': 'off',
				'react/static-property-placement': 'off',
				'@typescript-eslint/naming-convention': [
					'error',
					{
						leadingUnderscore: 'allowSingleOrDouble',
					},
				],
			},
		},
		// Override some TypeScript rules just for .js files
		{
			files: ['*.js'],
			rules: {
				'jsx-quotes': ['error', 'prefer-single'],
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
			},
		},
	],
};
