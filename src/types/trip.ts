export interface Trip {
  id: number;
  loadDate: string;
  originZip: string;
  originLocation: string;
  destinationZip: string;
  destinationLocation: string;
  autoMiles: number | null;
  manualMiles: number | null;
}
