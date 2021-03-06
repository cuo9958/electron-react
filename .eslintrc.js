module.exports = {
    env: {
        browser: true,
        es2021: true,
        commonjs: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'react-hooks'],
    rules: {
        'react/display-name': 'off',
        eqeqeq: 2, //必须使用 === 和 !==
        'no-unused-vars': 0, //禁止出现未使用过的变量
        'react/prop-types': 0, //防止在react组件定义中缺少props验证
        'react/jsx-key': 0,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
    globals: {
        process: true,
        SERVE_ENV: true,
        REACT_APP_ENV: true,
        BASE_HOST: true,
        BUCKET: true,
        SHARE_URL: true,
        RongIMAPPKEY: true,
    },
};
