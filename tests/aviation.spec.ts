import { test, expect } from '../test-setup';

test.describe('Test aviation', () => {    
    test('Test getting aviation center weather service unit returns a 200', async ({ request, endpoints }) => {
        const aviation = await request.get(`${endpoints.aviation}/cwsus/ZAB`);        
        expect(aviation.status()).toBe(200);
    });
    test('Test aviation sigmets returns a 200', async ({ request, endpoints }) => {
        const aviation = await request.get(`${endpoints.aviation}/sigmets`);        
        expect(aviation.status()).toBe(200);
    });
});