import { test, expect } from '../test-setup';

test.describe('Test glossary', () => {    
    test('Test getting glossary returns a 200', async ({ request, endpoints }) => {
        const glossary = await request.get(`${endpoints.glossary}`);        
        expect(glossary.status()).toBe(200);
    });
});