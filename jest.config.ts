import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const config: Config = {
  setupFiles: ['jest-canvas-mock'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/support/setup-tests.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/file-mock.ts',
    '\\.(css|scss)$': '<rootDir>/src/__mocks__/style-mock.ts',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
};

export default config;
