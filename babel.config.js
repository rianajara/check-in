module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@Components': './src/components',
            '@Screens': './src/screens',
            '@Navigations': './src/navigations',
            '@Styles': './src/styles',
            '@Assets': './assets',
            '@Images': './src/images',
            '@Constants': './src/constants',
            '@Config': './src/config',
            '@Firebase': './src/config/Firebase',
            '@Services': './src/services',
          },
        },
      ],
    ],
  };
};
