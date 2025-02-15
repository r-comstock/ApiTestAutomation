import { test, expect } from '../test-setup';
import FeatureCollection from '../helpers/Aviation/AviationSigmets';

test.describe('Test aviation sigmets endpoint', () => {    
    
    test('Test aviation sigmets returns a 200', async ({ request, endpoints }) => {
        const aviation = await request.get(`${endpoints.aviation}/sigmets`);        
        expect(aviation.status()).toBe(200);
    });
    test('Test aviation sigmets returns correct response', async ({ request, endpoints }) => {
        const aviation = await request.get(`${endpoints.aviation}/sigmets`);        
        const data = await aviation.json();
        const isValidResponse = (data): data is FeatureCollection => {
            if (typeof data !== 'object' || data === null || Array.isArray(data)) {
                return false;
            }
            if (data.type !== "FeatureCollection" || !Array.isArray(data.features) || data["@context"] === undefined) {
                return false;
            }
            for (const feature of data.features) {
                if (feature.type !== "Feature" || (typeof feature.geometry !== 'object' && feature.geometry !== null) || typeof feature.properties !== 'object' || feature.properties === null) {
                    return false;
                }
        
                // Check the properties inside each feature
                const properties = feature.properties;
                if (typeof properties.id !== 'string' || typeof properties.issueTime !== 'string' || typeof properties.fir !== 'string' || typeof properties.atsu !== 'string' || typeof properties.sequence !== 'string' && properties.sequence !== null || typeof properties.phenomenon !== 'string' && properties.phenomenon !== null || typeof properties.start !== 'string' || typeof properties.end !== 'string') {
                    return false;
                }
        
                if (feature.geometry !== null) {
                    const geometry = feature.geometry;
                    if (geometry.type !== "Polygon" || !Array.isArray(geometry.coordinates)) {
                        return false;
                    }
        
                    for (const coordinateSet of geometry.coordinates) {
                        if (!Array.isArray(coordinateSet)) {
                            return false;
                        }
                        for (const coordinatePair of coordinateSet) {
                            if (!Array.isArray(coordinatePair) || coordinatePair.length !== 2 || typeof coordinatePair[0] !== 'number' || typeof coordinatePair[1] !== 'number') {
                                return false;
                            }
                        }
                    }
                }
        
            }        
            return true;
        };
        expect(isValidResponse(data)).toBe(true);

        if (isValidResponse(data)) {
            expect(data.type).toBe('FeatureCollection');
            expect(Array.isArray(data.features)).toBe(true);
            expect(data.features.length).toBeGreaterThan(0);
            data.features.forEach(feature => {
                expect(feature.type).toBe('Feature');
                expect(typeof feature.properties.id).toBe('string');
                expect(typeof feature.properties.issueTime).toBe('string');
                expect(typeof feature.properties.fir).toBe('string');
                expect(typeof feature.properties.atsu).toBe('string');
                expect(typeof feature.properties.sequence).toBe('string');
                expect(typeof feature.properties.phenomenon).toBe('string');
                expect(typeof feature.properties.start).toBe('string');
                expect(typeof feature.properties.end).toBe('string');
                if (feature.geometry !== null) {
                    expect(feature.geometry.type).toBe('Polygon');
                    expect(Array.isArray(feature.geometry.coordinates)).toBe(true);
                    feature.geometry.coordinates.forEach(coordinateSet => {
                        expect(Array.isArray(coordinateSet)).toBe(true);
                        coordinateSet.forEach(coordinatePair => {
                            expect(Array.isArray(coordinatePair)).toBe(true);
                            expect(coordinatePair.length).toBe(2);
                            expect(typeof coordinatePair[0]).toBe('number');
                            expect(typeof coordinatePair[1]).toBe('number');
                        });
                    });
                }
            });
        }
    });
});
test.describe('Test aviation cwsus endpoint', () => {
    test('Test getting aviation center weather service unit returns a 200', async ({ request, endpoints }) => {
        const aviation = await request.get(`${endpoints.aviation}/cwsus/ZAB`);        
        expect(aviation.status()).toBe(200);
    });
});