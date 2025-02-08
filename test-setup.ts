import { test as base } from '@playwright/test';
import { Endpoints } from './Endpoints';

type Fixtures = {
    endpoints: Endpoints;
};

export const test = base.extend<Fixtures>({
    endpoints: async ({}, use) => {
        await use(new Endpoints());
    },
});

export { expect } from '@playwright/test';