module.exports = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: 'test/e2e',
	testEnvironment: 'node',
	testRegex: '.e2e-spec.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	testTimeout: 60000,
};
