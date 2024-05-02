module.exports = {
  // ts-jest 사용
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  preset: "ts-jest",
  rootDir: '..',
  testMatch: [
    "**/?(*)+(test).ts"
  ],
  testEnvironment: "node",
  resetMocks: true,
  clearMocks: true,

}
