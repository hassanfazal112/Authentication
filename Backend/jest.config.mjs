// jest.config.mjs
import { createRequire } from 'module';
import { pathsToModuleNameMapper } from 'ts-jest';

// Needed so we can import JSON using ESM
const require = createRequire(import.meta.url);

// Read the "compilerOptions" from your tsconfig.json
const { compilerOptions } = require('./tsconfig.json');

export default {
  // Tell Jest to use ts-jest for TypeScript
  preset: 'ts-jest',

  // Set Node as the test environment
  testEnvironment: 'node',

  // Where Jest will look for test files
  roots: ['<rootDir>/src/tests'],

  // Transform TypeScript test files using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Regex pattern for test files
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  // Recognize these file extensions
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  // Use baseUrl from tsconfig to simplify import paths
  modulePaths: [compilerOptions.baseUrl],

  // Map TypeScript path aliases to Jest module names
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),

  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary'],

  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/index.ts',
    '!src/**/types.ts',
  ],
};
