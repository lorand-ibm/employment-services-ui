module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    //'plugin:jest/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['react-hooks', '@typescript-eslint'], //'jest'],
  env: {
    browser: true,
    // es6: true,
    node: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    // 'linebreak-style': 'off',
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     endOfLine: 'auto',
    //   },
    // ]
    'prettier/prettier': 0,
    'prefer-destructuring': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [1, { 'extensions': ['.tsx'] }],
    'react/prop-types': 0,
    'import/extensions': [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "no-underscore-dangle": ["error", { "allow": ["__DEV__"] }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "curly": ["error", "all"],
    "react-hooks/rules-of-hooks": "error",
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        assert: 'either',
      },
    ],
    'jsx-a11y/label-has-for': [0, {}],
    'react-hooks/exhaustive-deps': 'warn'
  },
};
