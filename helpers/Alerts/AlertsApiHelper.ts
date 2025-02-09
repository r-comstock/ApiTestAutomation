
import { APIResponse, APIRequestContext } from '@playwright/test';
import { Endpoints } from '../../Endpoints';
import { AlertsParams, ActiveAlertsParams, ActiveAlertsCountResponse } from './Alerts';
import { paramUtils } from '../../utils/paramsUtils';
import { expect } from '../../test-setup';
  

export class AlertsApiHelper {
    private apiClient: APIRequestContext;
    private endpoints: Endpoints;

    constructor(apiContext: APIRequestContext){
        this.apiClient = apiContext;
        this.endpoints = new Endpoints();
    }
    async getAlerts(params?: AlertsParams): Promise<APIResponse> {
        const queryParams = params ? paramUtils(params) : undefined; 
        const url = this.endpoints.alerts;
        try {
            const response = await this.apiClient.get(url, { params: queryParams });
            return response;
        } catch (error) {
            console.error(`Failed to get alerts: ${error}`);
            throw error;
        }
    }
    async getActiveAlerts(params?: ActiveAlertsParams): Promise<APIResponse> {
        const queryParams = params ? paramUtils(params) : undefined;
        const url = this.endpoints.activeAlerts;
        try {
            const response = await this.apiClient.get(url, { params: queryParams });
            return response;
        } catch (error) {
            console.error(`Failed to get active alerts: ${error}`);
            throw error;
        }
    }
    async getActiveAlertsCount(): Promise<APIResponse> {
        const url = this.endpoints.activeAlertsCount;
        try {
            const response = await this.apiClient.get(url);
            return response;
        } catch (error) {
            console.error(`Failed to get active alerts count: ${error}`);
            throw error;
        }
    }
    async getActiveZoneAlerts(zoneId: string): Promise<APIResponse> {
        const url = this.endpoints.activeZoneAlerts + `/${zoneId}`;
        try {
            const response = await this.apiClient.get(url);
            return response;
        } catch (error) {
            console.error(`Failed to get active alerts for zone ${zoneId}: ${error}`);
            throw error;
        }
    }
    async getActiveAreaAlerts(area: string): Promise<APIResponse> {
        const url = this.endpoints.activeAreaAlerts + `/${area}`;
        try {
            const response = await this.apiClient.get(url);
            return response;
        } catch (error) {
            console.error(`Failed to get active alerts for area ${area}: ${error}`);
            throw error;
        }
    }
    async getActiveRegionAlerts(region: string): Promise<APIResponse> {
        const url = this.endpoints.activeRegionAlerts + `/${region}`;
        try {
            const response = await this.apiClient.get(url);
            return response;
        } catch (error) {
            console.error(`Failed to get active alerts for region ${region}: ${error}`);
            throw error;
        }
    }
    async getAlertTypes(): Promise<APIResponse> {
        const url = this.endpoints.alertTypes;
        try {
            const response = await this.apiClient.get(url);
            return response;
        } catch (error) {
            console.error(`Failed to get alert types: ${error}`);
            throw error;
        }
    }
    async getAlertsById(alertId: string): Promise<APIResponse> {
        const url = this.endpoints.alerts + `/${alertId}`;
        try {
            const response = await this.apiClient.get(url);
            return response;
        } catch (error) {
            console.error(`Failed to get alert by id ${alertId}: ${error}`);
            throw error;
        }
    }

    async validateActiveAlertsResponse(response: APIResponse): Promise<void> {
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
  }