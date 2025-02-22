import { WeatherRadarResponse } from '../helpers/radar/radar';
import {test, expect} from '../test-setup';

test.describe('Radar servers tests', () => {
    test('Test radar servers returns a 200', async ({request, endpoints}) => {
        const radar = await request.get(endpoints.radarServers);        
        expect(radar.status()).toBe(200);
    });
    test('Test getting radar servers by reporting host returns a 200', async ({request, endpoints}) => {
        const queryParams = new URLSearchParams({reportingHost: 'rdss'});
        const radar = await request.get(`${endpoints.radarServers}?${queryParams}`);
        expect(radar.status()).toBe(200);
    });
    test('Test getting radar servers by invalid reporting host returns a 503', async ({request, endpoints}) => {
        const queryParams = new URLSearchParams({reportingHost: 'invalid'});
        const radar = await request.get(`${endpoints.radarServers}?${queryParams}`);
        expect(radar.status()).toBe(503);
    });
    test('Test getting radar servers by id returns a 200', async ({request, endpoints}) => {
        const radarServers = await request.get(endpoints.radarServers);
        const data = await radarServers.json();
        const id = data['@graph'][0].id;
        const radar = await request.get(`${endpoints.radarServers}/${id}`);
        expect(radar.status()).toBe(200);
    });
});
test.describe('Radar stations tests', () => {
    test('Test radar stations returns a 200', async ({request, endpoints}) => {
        const radar = await request.get(endpoints.radarStations);        
        expect(radar.status()).toBe(200);
    });
    test('Test getting radar stations by id returns a 200', async ({request, endpoints}) => {
        const radarStations = await request.get(endpoints.radarStations);
        const data = await radarStations.json();
        const id = data['features'][0].properties.id;
        const radar = await request.get(`${endpoints.radarStations}/${id}`);
        expect(radar.status()).toBe(200);
    });
    test('Test getting radar stations alarms returns a 200', async ({request, endpoints}) => {
        const radarStations = await request.get(endpoints.radarStations);
        const data = await radarStations.json();
        const id = data['features'][0].properties.id;
        const radar = await request.get(`${endpoints.radarStations}/${id}/alarms`);
        expect(radar.status()).toBe(200);
    });
});