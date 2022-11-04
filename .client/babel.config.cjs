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
          modules: isTest ? 'cjs' : false,
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
    ],
    plugins: [
      !isTest && [
        'babel-plugin-direct-import',
        {
          modules: ['@mui/lab', '@mui/material', '@mui/icons-material'],
        },
      ],
      isDevelopment && require.resolve('react-refresh/babel'),
    ].filter(Boolean),
  };
  return config;
};
