module.exports = (api) => {
  const config = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            esmodules: true,
          },
          loose: true,
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
      [
        'babel-plugin-direct-import',
        {
          modules: ['@mui/lab', '@mui/material'],
        },
      ],
    ],
  };
  if (!api.env('test')) {
    config.presets[0][1].modules = false;
  }
  return config;
};
