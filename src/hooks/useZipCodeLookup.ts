import { useState, useCallback } from 'react';

interface ZipCodeResult {
  city: string;
  state: string;
  fullLocation: string;
}

// US ZIP code database (common zip codes for trucking routes)
const zipCodeDatabase: Record<string, ZipCodeResult> = {
  // California
  '90001': { city: 'Los Angeles', state: 'CA', fullLocation: 'Los Angeles, CA' },
  '90210': { city: 'Beverly Hills', state: 'CA', fullLocation: 'Beverly Hills, CA' },
  '94102': { city: 'San Francisco', state: 'CA', fullLocation: 'San Francisco, CA' },
  '92101': { city: 'San Diego', state: 'CA', fullLocation: 'San Diego, CA' },
  '95814': { city: 'Sacramento', state: 'CA', fullLocation: 'Sacramento, CA' },
  
  // Texas
  '75201': { city: 'Dallas', state: 'TX', fullLocation: 'Dallas, TX' },
  '77001': { city: 'Houston', state: 'TX', fullLocation: 'Houston, TX' },
  '78201': { city: 'San Antonio', state: 'TX', fullLocation: 'San Antonio, TX' },
  '79901': { city: 'El Paso', state: 'TX', fullLocation: 'El Paso, TX' },
  '76101': { city: 'Fort Worth', state: 'TX', fullLocation: 'Fort Worth, TX' },
  
  // New York
  '10001': { city: 'New York', state: 'NY', fullLocation: 'New York, NY' },
  '10101': { city: 'New York', state: 'NY', fullLocation: 'New York, NY' },
  '14201': { city: 'Buffalo', state: 'NY', fullLocation: 'Buffalo, NY' },
  
  // Florida
  '33101': { city: 'Miami', state: 'FL', fullLocation: 'Miami, FL' },
  '32801': { city: 'Orlando', state: 'FL', fullLocation: 'Orlando, FL' },
  '33602': { city: 'Tampa', state: 'FL', fullLocation: 'Tampa, FL' },
  '32301': { city: 'Tallahassee', state: 'FL', fullLocation: 'Tallahassee, FL' },
  
  // Illinois
  '60601': { city: 'Chicago', state: 'IL', fullLocation: 'Chicago, IL' },
  '60007': { city: 'Elk Grove Village', state: 'IL', fullLocation: 'Elk Grove Village, IL' },
  
  // Pennsylvania
  '19101': { city: 'Philadelphia', state: 'PA', fullLocation: 'Philadelphia, PA' },
  '15201': { city: 'Pittsburgh', state: 'PA', fullLocation: 'Pittsburgh, PA' },
  
  // Arizona
  '85001': { city: 'Phoenix', state: 'AZ', fullLocation: 'Phoenix, AZ' },
  '85701': { city: 'Tucson', state: 'AZ', fullLocation: 'Tucson, AZ' },
  
  // Georgia
  '30301': { city: 'Atlanta', state: 'GA', fullLocation: 'Atlanta, GA' },
  '31401': { city: 'Savannah', state: 'GA', fullLocation: 'Savannah, GA' },
  
  // Ohio
  '44101': { city: 'Cleveland', state: 'OH', fullLocation: 'Cleveland, OH' },
  '43201': { city: 'Columbus', state: 'OH', fullLocation: 'Columbus, OH' },
  '45201': { city: 'Cincinnati', state: 'OH', fullLocation: 'Cincinnati, OH' },
  
  // Michigan
  '48201': { city: 'Detroit', state: 'MI', fullLocation: 'Detroit, MI' },
  '49501': { city: 'Grand Rapids', state: 'MI', fullLocation: 'Grand Rapids, MI' },
  
  // Washington
  '98101': { city: 'Seattle', state: 'WA', fullLocation: 'Seattle, WA' },
  '99201': { city: 'Spokane', state: 'WA', fullLocation: 'Spokane, WA' },
  
  // Nevada
  '89101': { city: 'Las Vegas', state: 'NV', fullLocation: 'Las Vegas, NV' },
  '89501': { city: 'Reno', state: 'NV', fullLocation: 'Reno, NV' },
  
  // Colorado
  '80201': { city: 'Denver', state: 'CO', fullLocation: 'Denver, CO' },
  '80901': { city: 'Colorado Springs', state: 'CO', fullLocation: 'Colorado Springs, CO' },
  
  // Tennessee
  '37201': { city: 'Nashville', state: 'TN', fullLocation: 'Nashville, TN' },
  '38101': { city: 'Memphis', state: 'TN', fullLocation: 'Memphis, TN' },
  
  // Missouri
  '63101': { city: 'St. Louis', state: 'MO', fullLocation: 'St. Louis, MO' },
  '64101': { city: 'Kansas City', state: 'MO', fullLocation: 'Kansas City, MO' },
  
  // New Jersey
  '07101': { city: 'Newark', state: 'NJ', fullLocation: 'Newark, NJ' },
  '08601': { city: 'Trenton', state: 'NJ', fullLocation: 'Trenton, NJ' },
  
  // North Carolina
  '28201': { city: 'Charlotte', state: 'NC', fullLocation: 'Charlotte, NC' },
  '27601': { city: 'Raleigh', state: 'NC', fullLocation: 'Raleigh, NC' },
  
  // Oregon
  '97201': { city: 'Portland', state: 'OR', fullLocation: 'Portland, OR' },
  
  // Indiana
  '46201': { city: 'Indianapolis', state: 'IN', fullLocation: 'Indianapolis, IN' },
  
  // Massachusetts
  '02101': { city: 'Boston', state: 'MA', fullLocation: 'Boston, MA' },
  
  // Louisiana
  '70112': { city: 'New Orleans', state: 'LA', fullLocation: 'New Orleans, LA' },
  
  // Oklahoma
  '73101': { city: 'Oklahoma City', state: 'OK', fullLocation: 'Oklahoma City, OK' },
  
  // Utah
  '84101': { city: 'Salt Lake City', state: 'UT', fullLocation: 'Salt Lake City, UT' },
  
  // Kentucky
  '40201': { city: 'Louisville', state: 'KY', fullLocation: 'Louisville, KY' },
  
  // Maryland
  '21201': { city: 'Baltimore', state: 'MD', fullLocation: 'Baltimore, MD' },
  
  // Wisconsin
  '53201': { city: 'Milwaukee', state: 'WI', fullLocation: 'Milwaukee, WI' },
  
  // Minnesota
  '55401': { city: 'Minneapolis', state: 'MN', fullLocation: 'Minneapolis, MN' },
  
  // Alabama
  '35201': { city: 'Birmingham', state: 'AL', fullLocation: 'Birmingham, AL' },
  
  // South Carolina
  '29401': { city: 'Charleston', state: 'SC', fullLocation: 'Charleston, SC' },
  
  // Arkansas
  '72201': { city: 'Little Rock', state: 'AR', fullLocation: 'Little Rock, AR' },
  
  // Kansas
  '67201': { city: 'Wichita', state: 'KS', fullLocation: 'Wichita, KS' },
  
  // Nebraska
  '68101': { city: 'Omaha', state: 'NE', fullLocation: 'Omaha, NE' },
  
  // Iowa
  '50301': { city: 'Des Moines', state: 'IA', fullLocation: 'Des Moines, IA' },
  
  // New Mexico
  '87101': { city: 'Albuquerque', state: 'NM', fullLocation: 'Albuquerque, NM' },
  
  // Idaho
  '83701': { city: 'Boise', state: 'ID', fullLocation: 'Boise, ID' },
  
  // Montana
  '59601': { city: 'Helena', state: 'MT', fullLocation: 'Helena, MT' },
  
  // Wyoming
  '82001': { city: 'Cheyenne', state: 'WY', fullLocation: 'Cheyenne, WY' },
  
  // North Dakota
  '58501': { city: 'Bismarck', state: 'ND', fullLocation: 'Bismarck, ND' },
  
  // South Dakota
  '57501': { city: 'Pierre', state: 'SD', fullLocation: 'Pierre, SD' },
};

export const useZipCodeLookup = () => {
  const [loading, setLoading] = useState(false);

  const lookupZipCode = useCallback(async (zipCode: string): Promise<string> => {
    if (!zipCode || zipCode.length < 5) return '';
    
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const cleanZip = zipCode.trim().substring(0, 5);
    const result = zipCodeDatabase[cleanZip];
    
    setLoading(false);
    
    if (result) {
      return result.fullLocation;
    }
    
    // If not in database, return a generic format
    return `ZIP ${cleanZip}`;
  }, []);

  return { lookupZipCode, loading };
};
