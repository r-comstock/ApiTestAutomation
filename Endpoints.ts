export class Endpoints {
    readonly alerts: string;
    readonly aviation: string;
    readonly glossary: string;
    readonly activeAlerts: string;
    readonly activeAlertsCount: string;
    readonly activeZoneAlerts: string;
    readonly activeAreaAlerts: string;
    readonly activeRegionAlerts: string;
    readonly alertTypes: string;

    constructor(){
        this.alerts = '/alerts';
        this.aviation = '/aviation';
        this.glossary = '/glossary';
        this.activeAlerts = '/alerts/active';
        this.activeAlertsCount = '/alerts/active/count';
        this.activeZoneAlerts = '/alerts/active/zone';
        this.activeAreaAlerts = '/alerts/active/area';
        this.activeRegionAlerts = '/alerts/active/region';
        this.alertTypes = '/alerts/types';
    }

}