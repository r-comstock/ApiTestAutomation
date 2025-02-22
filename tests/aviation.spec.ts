import { test, expect } from '../test-setup';
import { isValidResponse} from '../helpers/aviation/aviation-sigmets';

const sigmets = "/sigmets";
test.describe('Test aviation sigmets endpoint', () => {    
    
    test('Test aviation sigmets returns a 200', async ({ request, endpoints }) => {
        const aviation = await request.get(`${endpoints.aviation}${sigmets}`);        
        expect(aviation.status()).toBe(200);
    });
    test('Test aviation sigmets returns correct response', async ({ request, endpoints }) => {
        const aviation = await request.get(`${endpoints.aviation}${sigmets}`);        
        const data = await aviation.json();
        // Check if the response is a valid FeatureCollection
        expect(isValidResponse(data), 'Response validation failed, failing the test.').toBe(true);
    });
});
test.describe('Test aviation cwsus endpoint', () => {
    test('Test getting aviation center weather service unit returns a 200', async ({ request, endpoints }) => {
        const aviation = await request.get(`${endpoints.aviation}/cwsus/ZAB`);        
        expect(aviation.status()).toBe(200);
    });
});