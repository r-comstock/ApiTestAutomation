import { Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon, Geometry, GeoJSON } from 'geojson';

interface FeatureProperties {
  id: string;
  issueTime: string;
  fir: string | null; // fir can be null
  atsu: string;
  sequence: string | null; // sequence can be null
  phenomenon: string | null; // phenomenon can be null
  start: string;
  end: string;
}

interface Feature {
  id: string,
  type: "Feature";
  geometry: Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon;
  properties: FeatureProperties;
}

interface FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
}

export default FeatureCollection;

/**
 * Helper function to validate the response from the aviation sigmets endpoint
 * @param data 
 * @returns 
 */
export function isValidResponse(data:FeatureCollection): boolean {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    console.error("Invalid data type. Expected object, got:", typeof data);
    return false;
  }
  if (data.type !== "FeatureCollection" || !Array.isArray(data.features) || data["@context"] === undefined) {
    console.error("Invalid FeatureCollection structure. Check 'type', 'features', and '@context'. Data:", data);
    return false;
  }
  for (const feature of data.features) {
      if (feature.type !== "Feature" || (typeof feature.geometry !== 'object' && feature.geometry !== null) || typeof feature.properties !== 'object' || feature.properties === null) {
        console.error("Invalid Feature structure. Check 'type', 'geometry', and 'properties'. Feature:", feature);
        return false;
      }

      // Check the properties inside each feature
      const properties = feature.properties;
      if (typeof properties.id !== 'string' || typeof properties.issueTime !== 'string' || typeof properties.fir !== 'string' && properties.fir !== null || typeof properties.atsu !== 'string' || typeof properties.sequence !== 'string' && properties.sequence !== null || typeof properties.phenomenon !== 'string' && properties.phenomenon !== null || typeof properties.start !== 'string' || typeof properties.end !== 'string') {
        console.error("Invalid Feature properties. Check types. Properties:", properties);
        return false;
      }

      if (feature.geometry !== null) {
          const geometry = feature.geometry;
          if (geometry.type !== 'Point' && geometry.type !== 'LineString' && geometry.type !== 'Polygon' && geometry.type !== 'MultiPoint'
            && geometry.type !== 'MultiLineString' && geometry.type !== 'MultiPolygon' ||  !Array.isArray(geometry.coordinates)) {
            console.error("Invalid geometry. Check 'type' and 'coordinates'. Geometry:", geometry);
            return false;
          }
          for (const coordinateSet of geometry.coordinates) {
              if (!Array.isArray(coordinateSet)) {
                console.error("Invalid coordinate set. Expected array. Set:", coordinateSet);
                return false;
              }
              for (const coordinatePair of coordinateSet) {
                  if (!Array.isArray(coordinatePair) || coordinatePair.length !== 2 || typeof coordinatePair[0] !== 'number' || typeof coordinatePair[1] !== 'number') {
                    console.error("Invalid coordinate pair. Expected [number, number]. Pair:", coordinatePair);
                    return false;
                  }
              }
          }
      }

  }        
  return true;
};