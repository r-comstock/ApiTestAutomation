import { test, expect } from '../test-setup';
import { isValidResponse} from '../helpers/aviation/aviation-sigmets';
import { AviationSigmetsGetParams } from '../helpers/aviation/aviation-sigmets';
import moment from 'moment';

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
    test('Test aviation sigmets with params returns a 200', async ({ request, endpoints }) => {
        const startTime = moment().subtract(10, 'days').format();
        const queryParams: AviationSigmetsGetParams = {
            start: moment().subtract(10, 'days').format().toString(),
            end: moment().format().toString(),
            
        };
        //const query = new URLSearchParams(params.toString());
        
        const aviation = await request.get(`${endpoints.aviation}${sigmets}`, {
            params: queryParams.toString(),
        }); 
        const aviationData = await aviation.json();
        console.log('Aviation Data:', aviationData);       
        expect(aviation.status()).toBe(200);
    });
    test('Test aviation sigmets with invalid params returns a 400', async ({ request, endpoints }) => {
        //400 error is returned when the start date is invalid
        //Invalid date-time "1-1-2025", expected format YYYY-MM-DDThh:mm:ssZ or YYYY-MM-DDThh:mm:ss+hh:mm'
        const aviation = await request.get(`${endpoints.aviation}${sigmets}`, {
            params: {
                'start': '1-1-2025' // Invalid date
            }
        });
        console.log(aviation.url());        
        expect(aviation.status()).toBe(400);
        console.log(await aviation.text());
    });
    test('Test aviation sigmets with invalid parameters returns a 400', async ({ request, endpoints }) => {
        //400 error is returned when the start date is invalid
        //Invalid date-time "1-1-2025", expected format YYYY-MM-DDThh:mm:ssZ or YYYY-MM-DDThh:mm:ss+hh:mm'
        const searchParams = new URLSearchParams();
        searchParams.set('start', '1-1-2025');
        const aviation = await request.get(`${endpoints.aviation}${sigmets}`, { params: searchParams });
        console.log(aviation.url());        
        expect(aviation.status()).toBe(400);
    });
       
});
test.describe('Test aviation cwsus endpoint', () => {
    test('Test getting aviation center weather service unit returns a 200', async ({ request, endpoints }) => {
        const aviation = await request.get(`${endpoints.aviation}/cwsus/ZAB`);        
        expect(aviation.status()).toBe(200);
    });
});