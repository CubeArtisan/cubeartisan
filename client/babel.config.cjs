const isProduction = process.env.NODE_ENV === 'production';

module.exports = (api) => {
  const isTest = api.env('test');
  const isDevelopment = !isProduction && !isTest;
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
          modules: 'cjs',
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
      !isTest && [
        'babel-plugin-direct-import',
        {
          modules: ['@mui/lab', '@mui/material', '@mui/styles', '@mui/icons-material'],
        },
      ],
      isDevelopment && require.resolve('react-refresh/babel'),
    ].filter(Boolean),
  };
  if (!isTest) {
    config.presets[0][1].modules = false;
  }
  return config;
};
