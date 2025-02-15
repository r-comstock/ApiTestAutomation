interface GeoJsonContext {
  "@context": {
    "@version": "1.1";
  };
}

interface PolygonGeometry {
  type: "Polygon";
  coordinates: number[][][];
}

interface FeatureProperties {
  id: string;
  issueTime: string;
  fir: string;
  atsu: string;
  sequence: string | null; // sequence can be null
  phenomenon: string | null; // phenomenon can be null
  start: string;
  end: string;
}

interface Feature {
  type: "Feature";
  geometry: PolygonGeometry | null; // geometry can be null
  properties: FeatureProperties;
}

interface FeatureCollection extends GeoJsonContext {
  type: "FeatureCollection";
  features: Feature[];
}

export default FeatureCollection; // Or export { FeatureCollection, Feature, FeatureProperties, PolygonGeometry, GeoJsonContext }; if you want to export all interfaces