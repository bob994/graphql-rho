module.exports = {
  moduleFileExtensions: ['js', 'jx', 'ts', 'tsx'],
  transformIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  collectCoverageFrom: [
    'components/*.{js,jsx,ts,tsx}',
    'containers/*.{js,jsx,ts,tsx}',
    'lib/*.{js,jsx,ts,tsx}',
  ],
};
