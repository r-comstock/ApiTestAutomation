export interface ActiveAlertsParams {
    status?: string[];
    message_type?: string[];
    event?: string[];
    code?: string[];
    area?: string[];
    point?: string;
    region?: string[];
    region_type?: string;
    zone?: string[];
    urgency?: string[];
    severity?: string[];
    certainty?: string[];
    limit?: number;
  }  

export interface AlertsParams {
    active?: boolean; // Deprecated, but included for completeness
    start?: string;
    end?: string;
    status?: string[];
    message_type?: string[];
    event?: string[];
    code?: string[];
    area?: string[];
    point?: string;
    region?: string[];
    region_type?: string;
    zone?: string[];
    urgency?: string[];
    severity?: string[];
    certainty?: string[];
    limit?: number;
    cursor?: string;
  }

export interface ActiveAlertsCountResponse {
  total: number;
  land: number;
  marine: number;
  regions: {
    [key: string]: number;
  };
  areas: {
    [key: string]: number;
  };
  zones: {
    [key: string]: number;
  };
}

export interface ActiveAlertsAreaResponse {
  "@context": {
    "@version": "1.1";
  };
  type: "FeatureCollection";
  features: []; // Empty array, but still typed
  title: string;
  updated: string;
}

