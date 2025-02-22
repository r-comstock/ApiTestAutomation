import {expect} from '@playwright/test';
import {APIResponse} from '@playwright/test';
import {ActiveAlertsCountResponse} from './alerts';

export async function validateActiveAlertsResponse(response: APIResponse): Promise<void> {
    expect(response.status()).toBe(200);

    const data: ActiveAlertsCountResponse = await response.json();

    expect(data.total).toBeDefined();
    expect(typeof data.total).toBe('number');
    expect(data.total).toBeGreaterThanOrEqual(0); // Add more specific checks if needed

    expect(data.land).toBeDefined();
    expect(typeof data.land).toBe('number');
    expect(data.land).toBeGreaterThanOrEqual(0);

    expect(data.marine).toBeDefined();
    expect(typeof data.marine).toBe('number');
    expect(data.marine).toBeGreaterThanOrEqual(0);

    expect(data.regions).toBeDefined();
    expect(typeof data.regions).toBe('object'); // Or 'object' if you prefer
    expect(Object.keys(data.regions).length).toBeGreaterThan(0); // Check if regions are present

    // Validate regions (example - adapt as needed):
    for (const regionCode in data.regions) {
      expect(typeof regionCode).toBe('string');
      expect(typeof data.regions[regionCode]).toBe('number');
      expect(data.regions[regionCode]).toBeGreaterThanOrEqual(0);
    }

    expect(data.areas).toBeDefined();
    expect(typeof data.areas).toBe('object');
    expect(Object.keys(data.areas).length).toBeGreaterThan(0);

    // Validate areas (example - adapt as needed):
    for (const areaCode in data.areas) {
      expect(typeof areaCode).toBe('string');
      expect(typeof data.areas[areaCode]).toBe('number');
      expect(data.areas[areaCode]).toBeGreaterThanOrEqual(0);
    }


    expect(data.zones).toBeDefined();
    expect(typeof data.zones).toBe('object');
    expect(Object.keys(data.zones).length).toBeGreaterThan(0);

    // Validate zones (example - adapt as needed):
    for (const zoneCode in data.zones) {
      expect(typeof zoneCode).toBe('string');
      expect(typeof data.zones[zoneCode]).toBe('number');
      expect(data.zones[zoneCode]).toBeGreaterThanOrEqual(0);
    }

    expect(data.total).toBe(data.land + data.marine); // Very important check!
  }