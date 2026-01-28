import { useCallback } from 'react';

// Approximate coordinates for major US cities by ZIP code prefix
const zipCoordinates: Record<string, { lat: number; lng: number }> = {
  // California
  '90001': { lat: 33.9425, lng: -118.2551 },
  '90210': { lat: 34.0901, lng: -118.4065 },
  '94102': { lat: 37.7815, lng: -122.4117 },
  '92101': { lat: 32.7195, lng: -117.1628 },
  '95814': { lat: 38.5816, lng: -121.4944 },
  
  // Texas
  '75201': { lat: 32.7887, lng: -96.7986 },
  '77001': { lat: 29.7604, lng: -95.3698 },
  '78201': { lat: 29.4684, lng: -98.5257 },
  '79901': { lat: 31.7619, lng: -106.4850 },
  '76101': { lat: 32.7555, lng: -97.3308 },
  
  // New York
  '10001': { lat: 40.7506, lng: -73.9971 },
  '10101': { lat: 40.7128, lng: -74.0060 },
  '14201': { lat: 42.8864, lng: -78.8784 },
  
  // Florida
  '33101': { lat: 25.7617, lng: -80.1918 },
  '32801': { lat: 28.5383, lng: -81.3792 },
  '33602': { lat: 27.9506, lng: -82.4572 },
  '32301': { lat: 30.4383, lng: -84.2807 },
  
  // Illinois
  '60601': { lat: 41.8819, lng: -87.6278 },
  '60007': { lat: 42.0072, lng: -87.9706 },
  
  // Pennsylvania
  '19101': { lat: 39.9526, lng: -75.1652 },
  '15201': { lat: 40.4680, lng: -79.9522 },
  
  // Arizona
  '85001': { lat: 33.4484, lng: -112.0740 },
  '85701': { lat: 32.2226, lng: -110.9747 },
  
  // Georgia
  '30301': { lat: 33.7490, lng: -84.3880 },
  '31401': { lat: 32.0809, lng: -81.0912 },
  
  // Ohio
  '44101': { lat: 41.4993, lng: -81.6944 },
  '43201': { lat: 39.9829, lng: -83.0029 },
  '45201': { lat: 39.1031, lng: -84.5120 },
  
  // Michigan
  '48201': { lat: 42.3314, lng: -83.0458 },
  '49501': { lat: 42.9634, lng: -85.6681 },
  
  // Washington
  '98101': { lat: 47.6062, lng: -122.3321 },
  '99201': { lat: 47.6588, lng: -117.4260 },
  
  // Nevada
  '89101': { lat: 36.1699, lng: -115.1398 },
  '89501': { lat: 39.5296, lng: -119.8138 },
  
  // Colorado
  '80201': { lat: 39.7392, lng: -104.9903 },
  '80901': { lat: 38.8339, lng: -104.8214 },
  
  // Tennessee
  '37201': { lat: 36.1627, lng: -86.7816 },
  '38101': { lat: 35.1495, lng: -90.0490 },
  
  // Missouri
  '63101': { lat: 38.6270, lng: -90.1994 },
  '64101': { lat: 39.0997, lng: -94.5786 },
  
  // New Jersey
  '07101': { lat: 40.7357, lng: -74.1724 },
  '08601': { lat: 40.2206, lng: -74.7597 },
  
  // North Carolina
  '28201': { lat: 35.2271, lng: -80.8431 },
  '27601': { lat: 35.7796, lng: -78.6382 },
  
  // Oregon
  '97201': { lat: 45.5152, lng: -122.6784 },
  
  // Indiana
  '46201': { lat: 39.7684, lng: -86.1581 },
  
  // Massachusetts
  '02101': { lat: 42.3601, lng: -71.0589 },
  
  // Louisiana
  '70112': { lat: 29.9511, lng: -90.0715 },
  
  // Oklahoma
  '73101': { lat: 35.4676, lng: -97.5164 },
  
  // Utah
  '84101': { lat: 40.7608, lng: -111.8910 },
  
  // Kentucky
  '40201': { lat: 38.2527, lng: -85.7585 },
  
  // Maryland
  '21201': { lat: 39.2904, lng: -76.6122 },
  
  // Wisconsin
  '53201': { lat: 43.0389, lng: -87.9065 },
  
  // Minnesota
  '55401': { lat: 44.9778, lng: -93.2650 },
  
  // Alabama
  '35201': { lat: 33.5207, lng: -86.8025 },
  
  // South Carolina
  '29401': { lat: 32.7765, lng: -79.9311 },
  
  // Arkansas
  '72201': { lat: 34.7465, lng: -92.2896 },
  
  // Kansas
  '67201': { lat: 37.6872, lng: -97.3301 },
  
  // Nebraska
  '68101': { lat: 41.2565, lng: -95.9345 },
  
  // Iowa
  '50301': { lat: 41.5868, lng: -93.6250 },
  
  // New Mexico
  '87101': { lat: 35.0844, lng: -106.6504 },
  
  // Idaho
  '83701': { lat: 43.6150, lng: -116.2023 },
  
  // Montana
  '59601': { lat: 46.5891, lng: -112.0391 },
  
  // Wyoming
  '82001': { lat: 41.1400, lng: -104.8197 },
  
  // North Dakota
  '58501': { lat: 46.8083, lng: -100.7837 },
  
  // South Dakota
  '57501': { lat: 44.3683, lng: -100.3510 },
};

// Haversine formula to calculate distance between two points
const calculateHaversineDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const useDistanceCalculator = () => {
  const calculateDistance = useCallback(
    async (originZip: string, destinationZip: string): Promise<number | null> => {
      if (!originZip || !destinationZip || originZip.length < 5 || destinationZip.length < 5) {
        return null;
      }

      const cleanOrigin = originZip.trim().substring(0, 5);
      const cleanDest = destinationZip.trim().substring(0, 5);

      const originCoords = zipCoordinates[cleanOrigin];
      const destCoords = zipCoordinates[cleanDest];

      if (!originCoords || !destCoords) {
        return null;
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 200));

      const directDistance = calculateHaversineDistance(
        originCoords.lat,
        originCoords.lng,
        destCoords.lat,
        destCoords.lng
      );

      // Add ~15% for road routing (roads aren't straight lines)
      const roadDistance = directDistance * 1.15;

      return Math.round(roadDistance);
    },
    []
  );

  return { calculateDistance };
};
