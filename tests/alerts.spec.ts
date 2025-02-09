import { test, expect } from '../test-setup';
import { ActiveAlertsCountResponse } from '../helpers/Alerts/Alerts';

test.describe('Test alerts', () => {    
    test('Test getting alerts returns a 200', async ({ request, endpoints }) => {
        const alerts = await request.get(`${endpoints.alerts}?limit=500`);        
        expect(alerts.status()).toBe(200);
    });
    test('Test getting alerts returns a 400 bad request', async ({ request, endpoints }) => {
        const alerts = await request.get(`${endpoints.alerts}?limit=abc`);
        //abc should generate a bad request 400 error
        expect(alerts.status()).toBe(400);
        expect(alerts.statusText()).toBe('Bad Request');
    });
    test('Test getting alerts using a large limit', async ({ request, endpoints }) => {
        //documentation does not specify a limit, so we will use a large number
        const alerts = await request.get(`${endpoints.alerts}?limit=10000`);  //10000 causes a 400 error    
        expect(alerts.status()).toBe(400);
    });
    test('Test getting active alerts returns a 200', async ({ request, endpoints }) => {
        const allerts = await request.get(`${endpoints.alerts}/active?limit=500`);        
        expect(allerts.status()).toBe(200);
    });
});
test.describe('Test alerts using the alerts api helper', () => {
    test('Test getting active alerts without params returns a 200', async ({ alertsApiHelper }) => {
        const response = await alertsApiHelper.getAlerts();
        expect(response.status()).toBe(200);
    });
    test('Test alerts using the alerts api helper', async ({ alertsApiHelper }) => {
        const response = await alertsApiHelper.getAlerts();
        expect(response.status()).toBe(200);
    });
    test('Test active alerts count response', async ({ alertsApiHelper }) => {
        const response = await alertsApiHelper.getActiveAlertsCount();
        const data = await response.json();
        expect(response.status()).toBe(200);
        expect(response).toBeDefined();
       

        const isValidResponse = (data): data is ActiveAlertsCountResponse => {
            return (
                typeof data === 'object' &&
                data !== null &&
                typeof data.total === 'number' &&
                typeof data.land === 'number' &&
                typeof data.marine === 'number' &&
                verifyCountsMap(data.regions) &&
                verifyCountsMap(data.areas) &&
                verifyCountsMap(data.zones)
            );
        };
    
        const verifyCountsMap = (map: any): map is { [key: string]: number } => {
            if (typeof map !== 'object' || map === null || Array.isArray(map)) {
                return false;
            }
    
            for (const key in map) {
                if (map.hasOwnProperty(key)) {
                    if (typeof map[key] !== 'number') {
                        return false;
                    }
                }
            }
    
            return true;
        }
    
        expect(isValidResponse(data)).toBe(true);
        if(isValidResponse(data)){
            expect(typeof data.total).toBe('number');
            expect(typeof data.land).toBe('number');
            expect(typeof data.marine).toBe('number');
            expect(typeof data.regions).toBe('object');
            expect(typeof data.areas).toBe('object');
            expect(typeof data.zones).toBe('object');
        }
    });
});