
import { APIResponse, APIRequestContext } from '@playwright/test';
import { Endpoints } from '../../endpoints';
import { AlertsParams, ActiveAlertsParams } from './alerts';
import { paramUtils } from '../../utils/params-utils';  

export class AlertsClient {
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
}