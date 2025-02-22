export interface WeatherRadarResponse {
    "@context": {
      "@version": string;
    };
    "@graph": RadarServer[];
  }
  
  export interface RadarServer {
    "@id": string;
    "@type": string;
    id: string;
    type: string;
    active: boolean;
    primary: boolean;
    aggregate: boolean;
    locked: boolean;
    radarNetworkUp: boolean;
    collectionTime: string; // ISO 8601 date string
    reportingHost: string;
    ping: PingData;
    command?: CommandData;
    hardware?: HardwareData;
    ldm?: LdmData;
    network?: NetworkData;
  }
  
  export interface PingData {
    targets: {
      client?: Record<string, boolean>;
      ldm?: Record<string, boolean>;
      radar?: Record<string, boolean>;
      server?: Record<string, boolean>;
      misc?: Record<string, boolean>;
    };
    timestamp: string;
  }
  
  export interface CommandData {
    lastExecuted: string;
    lastExecutedTime: string;
    lastNexradDataTime: string;
    lastReceived: string;
    lastReceivedTime: string;
    timestamp: string;
  }
  
  export interface HardwareData {
    timestamp: string;
    cpuIdle: number;
    ioUtilization: number;
    disk: number;
    load1: number;
    load5: number;
    load15: number;
    memory: number;
    uptime: string; // ISO 8601 date string
  }
  
  export interface LdmData {
    timestamp: string;
    latestProduct: string;
    oldestProduct: string;
    storageSize: number;
    count: number;
    active: boolean;
  }
  
  export interface NetworkData {
    timestamp: string;
    eth0?: NetworkInterface;
    eth1?: NetworkInterface;
  }
  
  export interface NetworkInterface {
    interface: string;
    active: boolean;
    transNoError: number;
    transError: number;
    transDropped: number;
    transOverrun: number;
    recvNoError: number;
    recvError: number;
    recvDropped: number;
    recvOverrun: number;
  }
  