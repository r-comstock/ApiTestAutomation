import { ZoneParams, types } from '../helpers/zones/zones';
import {expect, test} from '../test-setup';

test.describe('Test zones', () => {
    test('Test getting zones returns a 200', async ({request, endpoints}) => {
        const zones = await request.get(endpoints.zones);        
        expect(zones.status()).toBe(200);
    });
    test('Test getting zones by marine type query params returns a 200', async ({request, endpoints}) => {
        const queryParams: ZoneParams = {
            type: ['marine']
        }
        const zones = await request.get(`${endpoints.zones}?${queryParams}`);
        expect(zones.status()).toBe(200);
        const data = await zones.json();
        console.log('Marine zones:', data);
    });
    test('Test getting zones by marine type returns a 200', async ({request, endpoints}) => {
        const zones = await request.get(`${endpoints.zones}/marine`);
        const data = await zones.json();
        console.log('Marine zones:', data);        
        expect(zones.status()).toBe(200);
    });
    test('Test getting zones by type and id returns a 200', async ({request, endpoints}) => {
        const zones = await request.get(`${endpoints.zones}/marine`);
        const data = await zones.json();
        const id = data.features[0].id.split("/").pop();     
        const zoneByTypeAndId = await request.get(`${endpoints.zones}/marine/${id}`);
        expect(zoneByTypeAndId.status()).toBe(200);
        const zoneData = await zoneByTypeAndId.json();
        console.log('Zone by type and id:', zoneData);
    });
    test('Test getting zones forecast by marine type and zone id returns a 404', async ({request, endpoints}) => {
        const zones = await request.get(`${endpoints.zones}/marine`);
        const data = await zones.json();
        const id = data.features[0].id.split("/").pop();     
        const zoneByTypeAndId = await request.get(`${endpoints.zones}/marine/${id}/forecast`);
        const zoneData = await zoneByTypeAndId.json();
        console.log('Zone forecast:', zoneData);
        expect(zoneByTypeAndId.status(), `Test failed: ${zoneData.detail}`).toBe(404);    
    });
    test('test getting zones by different types', async ({request, endpoints}) => {
        const type = types;
        for (const value of type) {
            const zones = await request.get(`${endpoints.zones}/${value}`);
            expect(zones.status()).toBe(200);
        }
    });
});