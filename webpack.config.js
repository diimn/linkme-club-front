const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const rootWebpackConfig = require('../../../.storybook/webpack.config');
// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
    config = await rootWebpackConfig({ config, mode });

    const tsPaths = new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
    });

    config.resolve.plugins
        ? config.resolve.plugins.push(tsPaths)
        : (config.resolve.plugins = [tsPaths]);

    config.resolve.extensions.push('.tsx');
    config.resolve.extensions.push('.ts');
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
            presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
            ],
            "plugins": [
                ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                ["@babel/plugin-proposal-decorators", { "legacy": true }]
            ],
        },

    });
    // This is needed for "@storybook/addon-storysource.
    // Without this story source code won't show in storybook.
    config.module.rules.push({
        test: /\.stories\.(ts|tsx)?$/,
        loaders: [
            require.resolve('@storybook/source-loader'),
        ],
        enforce: 'pre',
    });

    return config;
};