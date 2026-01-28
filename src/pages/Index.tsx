import MileageTable from '@/components/MileageTable';
import { Truck } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-4 shadow-lg">
        <div className="container mx-auto flex items-center gap-4">
          <div className="p-3 bg-accent rounded-xl">
            <Truck className="h-8 w-8 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">TruckMiles Pro</h1>
            <p className="text-primary-foreground/80 text-sm md:text-base">
              Mileage Tracker for Professional Drivers
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        {/* Instructions */}
        <div className="mb-6 p-4 bg-card rounded-lg border border-border shadow-sm">
          <h2 className="font-semibold text-card-foreground mb-2">Quick Guide</h2>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Enter a 5-digit ZIP code and the location will auto-fill</li>
            <li>• Miles are automatically calculated when both ZIP codes are entered</li>
            <li>• Use "Manual Miles" column to enter your own distance if needed</li>
            <li>• Totals are calculated automatically at the bottom</li>
          </ul>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border shadow-md overflow-hidden">
          <MileageTable />
        </div>

        {/* Sample ZIP Codes */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-2">Sample ZIP Codes to Try:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm">
            <span className="bg-background px-2 py-1 rounded border">90001 - Los Angeles</span>
            <span className="bg-background px-2 py-1 rounded border">10001 - New York</span>
            <span className="bg-background px-2 py-1 rounded border">60601 - Chicago</span>
            <span className="bg-background px-2 py-1 rounded border">77001 - Houston</span>
            <span className="bg-background px-2 py-1 rounded border">85001 - Phoenix</span>
            <span className="bg-background px-2 py-1 rounded border">33101 - Miami</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 text-center text-sm text-muted-foreground border-t border-border">
        <p>© 2025 TruckMiles Pro • Keep on truckin' 🚚</p>
      </footer>
    </div>
  );
};

export default Index;
