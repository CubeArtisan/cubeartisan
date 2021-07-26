module.exports = (api) => {
  const config = {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
          exclude: ['es.promise'],
          targets: {
            node: 'current',
          },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-syntax-top-level-await',
    ],
  };
  if (!api.env('test')) {
    config.presets[0][1].modules = false;
  }
  return config;
};
