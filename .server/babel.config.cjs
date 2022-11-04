module.exports = (api) => {
  const config = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
          useBuiltIns: 'usage',
          corejs: {
            version: '3.21',
            proposals: true,
          },
          shippedProposals: true,
          modules: api.env('test') ? 'cjs' : false,
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
    ],
    plugins: ['@babel/plugin-syntax-top-level-await'],
    sourceMaps: 'both',
  };
  return config;
};
