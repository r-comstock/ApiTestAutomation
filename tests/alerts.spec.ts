import { test, expect } from '../test-setup';

test.describe('Test alerts', () => {
    
    test('Test getting alerts returns a 200', async ({ request, endpoints }) => {
        const allerts = await request.get(`${endpoints.alerts}?limit=500`);        
        expect(allerts.status()).toBe(200);
    });
    test('Test getting active alerts returns a 200', async ({ request, endpoints }) => {
        const allerts = await request.get(`${endpoints.alerts}/active?limit=500`);        
        expect(allerts.status()).toBe(200);
    });
});