import { test as base } from '@playwright/test';
import { Endpoints } from './Endpoints';
import { AlertsApiHelper } from './helpers/Alerts/AlertsApiHelper';

type Fixtures = {
    endpoints: Endpoints;
    alertsApiHelper: AlertsApiHelper;
};

export const test = base.extend<Fixtures>({
    endpoints: async ({}, use) => {
        await use(new Endpoints());
    },
    alertsApiHelper: async ({ request }, use) => {
        await use(new AlertsApiHelper(request));
    }
});

export { expect, request } from '@playwright/test';