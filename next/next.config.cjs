/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  '@mui/material',
  '@mui/system',
  '@mui/icons-material', // If @mui/icons-material is being used
]);

module.exports = withTM({
 webpack: (config) => {
   config.resolve.alias = {
     ...config.resolve.alias,
    '@mui/styled-engine': '@mui/styled-engine-sc',
    };
    return config;
  },
  experimental: {
    appDir: true,
  },
});
