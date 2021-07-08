module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/public/', '<rootDir>/__tests__/helpers/', '<rootDir>/__tests__/fixtures/'],
  transform: {
    '^.+\\.jsx?$': require.resolve('babel-jest'),
  },
  // transformIgnorePatterns: ['node_modules/(?!(react-dnd|dnd-core|react-syntax-highlighter)/)'],
};
