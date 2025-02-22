export interface ZoneParams {
    id?: string[];
    aread?: [];
    region?: [];
    type?: typeof types;
    point?: string;
    includeGeometry?: boolean;
    limit?: number;
    effective?: string;
}

export const types: string[] = ['land', 'marine', 'forecast', 'public', 'coastal', 'offshore', 'fire', 'county'];