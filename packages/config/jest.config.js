module.exports = {
  transform: {
    '^.+\\.ts(x)?$': 'ts-jest'
  },
  setupFiles: ['./test/setup-tests.ts'],
  testRegex: '(src/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  coverageDirectory: "coverage",
  coverageReporters: [
    'lcov', // html report
    'text' // report in console
  ],
  collectCoverageFrom: [
    'src/**/*.(jsx|tsx|js|ts)',
    '!**/*._story.*',
    '!**/*.story.*',
    '!**/*.d.ts',
  ],
  // uncomment the following to make tests fail if coverage goals are not met
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     statements: 80,
  //     line: 80
  //   }
  // },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  // static files are actually mocked
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/../../test/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/../../test/__mocks__/styleMock.js'
  }
};
