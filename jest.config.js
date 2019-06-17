module.exports = {
  collectCoverage: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'test-results',
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/src/lib/api-response',
    '/node_modules/'
  ],
  // The test environment that will be used for testing
  testEnvironment: 'node',
  // Whether to use watchman for file crawling
  watchman: true,
  // Automatically clear mock calls and instances between every test.
  // Will reset jest.fn().mock.calls and jest.fn().mock.instances.
  clearMocks: true,
  // This is useful to isolate modules for every test so that
  // local module state doesn't conflict between tests.
  resetModules: true,
  // Automatically restore mock state between every test. This
  // will lead to any mocks having their fake implementations
  // removed and restores their initial implementation
  restoreMocks: true
}
