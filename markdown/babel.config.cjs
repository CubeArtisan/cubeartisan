module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            esmodules: true,
          },
          loose: true,
          modules: false,
          useBuiltIns: 'entry',
          corejs: {
            version: '3.15.2',
            proposals: true,
          },
          shippedProposals: true,
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      [
        'babel-plugin-styled-components',
        {
          pure: true,
        },
      ],
    ],
  };
};
