export class Endpoints {
    readonly alerts: string;
    readonly activeAlertsCount: string;
    readonly activeZoneAlerts: string;
    readonly activeAreaAlerts: string;
    readonly activeRegionAlerts: string;
    readonly alertTypes: string;
    readonly activeAlerts: string;

    readonly aviation: string;
    
    readonly glossary: string; 

    readonly radarServers: string;
    readonly radarStations: string;
    readonly radarQueues: string;
    readonly radarProfilers: string;

    readonly zones: string;

    constructor(){
        this.alerts = '/alerts';
        this.alertTypes = '/alerts/types';
        this.activeAlerts = '/alerts/active';
        this.activeAlertsCount = '/alerts/active/count';
        this.activeZoneAlerts = '/alerts/active/zone';
        this.activeAreaAlerts = '/alerts/active/area';
        this.activeRegionAlerts = '/alerts/active/region';

        this.aviation = '/aviation';

        this.glossary = '/glossary';

        this.radarServers = '/radar/servers';
        this.radarStations = '/radar/stations';

        this.zones = '/zones';
       
        
    }

}