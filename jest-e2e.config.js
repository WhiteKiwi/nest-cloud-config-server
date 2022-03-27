module.exports = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: 'test/e2e',
	testEnvironment: 'node',
	testRegex: '.e2e-spec.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	moduleNameMapper: {
		'^@core/(.*)$': '<rootDir>/../../src/core/$1',
		'^@common/(.*)$': '<rootDir>/../../src/common/$1',
		'^@config/(.*)$': '<rootDir>/../../src/config/$1',
		'^@modules/(.*)$': '<rootDir>/../../src/modules/$1',
	},
	testTimeout: 60000,
};
