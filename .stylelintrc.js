module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-recommended', 'stylelint-a11y/recommended', 'stylelint-config-css-modules'],
	plugins: ['stylelint-scss', 'stylelint-a11y', 'stylelint-css-modules', 'stylelint-high-performance-animation'],
	rules: {
		'declaration-colon-newline-after': null,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin', 'extend'],
			},
		],
		'plugin/no-low-performance-animation-properties': true,

		'block-no-empty': null,
		'color-no-invalid-hex': true,
		'comment-empty-line-before': [
			'always',
			{
				ignore: ['stylelint-commands', 'after-comment'],
			},
		],
		'declaration-colon-space-after': 'always-single-line',
		'max-empty-lines': 2,
		'rule-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
				ignore: ['after-comment'],
			},
		],
		'unit-whitelist': ['rem', 'em', 'vh', 'vw', '%', 'px', 's', 'deg'],
	},
};
