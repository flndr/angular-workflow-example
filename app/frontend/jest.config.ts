import type { Config } from 'jest';

const config : Config = {
    preset             : 'jest-preset-angular',
    globalSetup        : 'jest-preset-angular/global-setup',
    setupFilesAfterEnv : [ '<rootDir>/jest.setup.ts' ],
};

export default config;

