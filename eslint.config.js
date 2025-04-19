import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default tseslint.config(
	{ ignores: ['dist'] },
	...pluginQuery.configs['flat/recommended'],
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'simple-import-sort': simpleImportSort,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
			semi: ['error', 'always'],
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
		},
	},
);
