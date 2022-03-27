module.exports = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: 'test/e2e',
	testEnvironment: 'node',
	testRegex: '.e2e-spec.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	moduleNameMapper: {
		'^@core/(.*)$': '<rootDir>/core/$1',
		'^@common/(.*)$': '<rootDir>/common/$1',
		'^@config/(.*)$': '<rootDir>/config/$1',
		'^@modules/(.*)$': '<rootDir>/modules/$1',
	},
	testTimeout: 60000,
};
