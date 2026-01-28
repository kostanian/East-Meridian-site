import React, { useState, useEffect, useCallback } from 'react';
import { Trip } from '@/types/trip';
import { useZipCodeLookup } from '@/hooks/useZipCodeLookup';
import { useDistanceCalculator } from '@/hooks/useDistanceCalculator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Truck } from 'lucide-react';

const createEmptyTrip = (id: number): Trip => ({
  id,
  loadDate: '',
  originZip: '',
  originLocation: '',
  destinationZip: '',
  destinationLocation: '',
  autoMiles: null,
  manualMiles: null,
});

const MileageTable: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>(() =>
    Array.from({ length: 5 }, (_, i) => createEmptyTrip(i + 1))
  );
  const { lookupZipCode } = useZipCodeLookup();
  const { calculateDistance } = useDistanceCalculator();

  const updateTrip = useCallback((id: number, field: keyof Trip, value: string | number | null) => {
    setTrips((prev) =>
      prev.map((trip) => (trip.id === id ? { ...trip, [field]: value } : trip))
    );
  }, []);

  const handleZipChange = useCallback(
    async (id: number, field: 'originZip' | 'destinationZip', value: string) => {
      const locationField = field === 'originZip' ? 'originLocation' : 'destinationLocation';
      updateTrip(id, field, value);

      if (value.length >= 5) {
        const location = await lookupZipCode(value);
        updateTrip(id, locationField, location);
      } else {
        updateTrip(id, locationField, '');
      }
    },
    [lookupZipCode, updateTrip]
  );

  // Auto-calculate distance when both zips are entered
  useEffect(() => {
    const calculateDistances = async () => {
      for (const trip of trips) {
        if (trip.originZip.length >= 5 && trip.destinationZip.length >= 5) {
          const distance = await calculateDistance(trip.originZip, trip.destinationZip);
          if (distance !== trip.autoMiles) {
            updateTrip(trip.id, 'autoMiles', distance);
          }
        }
      }
    };
    calculateDistances();
  }, [trips, calculateDistance, updateTrip]);

  const addRow = () => {
    const newId = Math.max(...trips.map((t) => t.id)) + 1;
    setTrips((prev) => [...prev, createEmptyTrip(newId)]);
  };

  const removeRow = (id: number) => {
    if (trips.length > 1) {
      setTrips((prev) => {
        const filtered = prev.filter((t) => t.id !== id);
        return filtered.map((trip, index) => ({ ...trip, id: index + 1 }));
      });
    }
  };

  const totalAutoMiles = trips.reduce((sum, trip) => sum + (trip.autoMiles || 0), 0);
  const totalManualMiles = trips.reduce((sum, trip) => sum + (trip.manualMiles || 0), 0);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1100px]">
        {/* Header */}
        <div className="grid grid-cols-[60px_120px_1fr_1fr_130px_130px_50px] bg-table-header text-table-header-foreground font-semibold text-sm">
          <div className="table-cell">#</div>
          <div className="table-cell">Load Date</div>
          <div className="table-cell">Origin (ZIP → Location)</div>
          <div className="table-cell">Destination (ZIP → Location)</div>
          <div className="table-cell text-center">Auto Miles</div>
          <div className="table-cell text-center">Manual Miles</div>
          <div className="table-cell"></div>
        </div>

        {/* Body */}
        <div className="bg-table-row">
          {trips.map((trip, index) => (
            <div
              key={trip.id}
              className={`grid grid-cols-[60px_120px_1fr_1fr_130px_130px_50px] ${
                index % 2 === 1 ? 'bg-table-row-alt' : ''
              } hover:bg-table-row-hover transition-colors`}
            >
              <div className="table-cell font-medium text-muted-foreground">{index + 1}</div>
              <div className="table-cell p-1">
                <Input
                  type="date"
                  value={trip.loadDate}
                  onChange={(e) => updateTrip(trip.id, 'loadDate', e.target.value)}
                  className="table-input h-8 text-sm"
                />
              </div>
              <div className="table-cell p-1">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="ZIP"
                    maxLength={5}
                    value={trip.originZip}
                    onChange={(e) => handleZipChange(trip.id, 'originZip', e.target.value.replace(/\D/g, ''))}
                    className="table-input h-8 w-20 text-sm"
                  />
                  <Input
                    type="text"
                    placeholder="Location will appear here..."
                    value={trip.originLocation}
                    onChange={(e) => updateTrip(trip.id, 'originLocation', e.target.value)}
                    className="table-input h-8 flex-1 text-sm"
                  />
                </div>
              </div>
              <div className="table-cell p-1">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="ZIP"
                    maxLength={5}
                    value={trip.destinationZip}
                    onChange={(e) => handleZipChange(trip.id, 'destinationZip', e.target.value.replace(/\D/g, ''))}
                    className="table-input h-8 w-20 text-sm"
                  />
                  <Input
                    type="text"
                    placeholder="Location will appear here..."
                    value={trip.destinationLocation}
                    onChange={(e) => updateTrip(trip.id, 'destinationLocation', e.target.value)}
                    className="table-input h-8 flex-1 text-sm"
                  />
                </div>
              </div>
              <div className="table-cell p-1">
                <Input
                  type="text"
                  value={trip.autoMiles !== null ? trip.autoMiles.toLocaleString() : '—'}
                  readOnly
                  className="table-input h-8 text-sm text-center bg-muted/50 cursor-not-allowed"
                />
              </div>
              <div className="table-cell p-1">
                <Input
                  type="number"
                  placeholder="0"
                  value={trip.manualMiles ?? ''}
                  onChange={(e) =>
                    updateTrip(trip.id, 'manualMiles', e.target.value ? Number(e.target.value) : null)
                  }
                  className="table-input h-8 text-sm text-center"
                />
              </div>
              <div className="table-cell p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRow(trip.id)}
                  disabled={trips.length === 1}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer with totals */}
        <div className="grid grid-cols-[60px_120px_1fr_1fr_130px_130px_50px] bg-table-footer text-table-footer-foreground font-bold">
          <div className="table-cell"></div>
          <div className="table-cell"></div>
          <div className="table-cell"></div>
          <div className="table-cell text-right pr-4">TOTAL:</div>
          <div className="table-cell text-center text-lg">{totalAutoMiles.toLocaleString()}</div>
          <div className="table-cell text-center text-lg">{totalManualMiles.toLocaleString()}</div>
          <div className="table-cell"></div>
        </div>

        {/* Add Row Button */}
        <div className="mt-4">
          <Button onClick={addRow} variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Row
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MileageTable;
