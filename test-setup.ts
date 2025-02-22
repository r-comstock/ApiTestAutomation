import { test as base } from '@playwright/test';
import { Endpoints } from './endpoints';
import { AlertsClient } from './helpers/alerts/alerts-client';

type Fixtures = {
    endpoints: Endpoints;
    alertsClient: AlertsClient;
};

export const test = base.extend<Fixtures>({
    endpoints: async ({}, use) => {
        await use(new Endpoints());
    },
    alertsClient: async ({ request }, use) => {
        await use(new AlertsClient(request));
    }
});

export { expect, request } from '@playwright/test';