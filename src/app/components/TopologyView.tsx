import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Checkbox } from './ui/checkbox';
import { NetworkCanvas } from './NetworkCanvas';

interface Asset {
  id: string;
  type: string;
  maxRating: string;
  impedance: string;
  busId: string;
  x: number;
  y: number;
  color: string;
}

export function TopologyView() {
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null);
  const [filters, setFilters] = useState({
    thermal: true,
    hydro: true,
    wind: true,
    solar: true,
    factory: true,
    home: true,
    storage: true,
  });

  const assetDetails: Record<string, any> = {
    'G1': { type: 'Thermal Generator', maxRating: '100 MW', impedance: '0.05 p.u.', busId: 'BUS_101' },
    'G2': { type: 'Hydro Generator', maxRating: '75 MW', impedance: '0.04 p.u.', busId: 'BUS_102' },
    'G3': { type: 'Wind Farm', maxRating: '50 MW', impedance: '0.06 p.u.', busId: 'BUS_201' },
    'G4': { type: 'Solar Farm', maxRating: '40 MW', impedance: '0.05 p.u.', busId: 'BUS_202' },
    'G5': { type: 'Thermal Generator', maxRating: '100 MW', impedance: '0.05 p.u.', busId: 'BUS_103' },
    'G6': { type: 'Wind Farm', maxRating: '55 MW', impedance: '0.06 p.u.', busId: 'BUS_203' },
    'G7': { type: 'Solar Farm', maxRating: '45 MW', impedance: '0.05 p.u.', busId: 'BUS_204' },
    'G8': { type: 'Hydro Generator', maxRating: '80 MW', impedance: '0.04 p.u.', busId: 'BUS_104' },
    'B1': { type: 'Battery Storage', maxRating: '25 MW / 100 MWh', impedance: '0.03 p.u.', busId: 'BUS_401' },
    'B2': { type: 'Battery Storage', maxRating: '30 MW / 120 MWh', impedance: '0.03 p.u.', busId: 'BUS_402' },
    'B3': { type: 'Battery Storage', maxRating: '25 MW / 100 MWh', impedance: '0.03 p.u.', busId: 'BUS_403' },
    'B4': { type: 'Battery Storage', maxRating: '35 MW / 140 MWh', impedance: '0.03 p.u.', busId: 'BUS_404' },
    'C1': { type: 'Factory Load', maxRating: '80 MW', impedance: '0.8 p.u.', busId: 'BUS_301' },
    'C2': { type: 'Residential Load', maxRating: '35 MW', impedance: '1.2 p.u.', busId: 'BUS_302' },
  };

  const handleNodeClick = (node: any) => {
    if (assetDetails[node.id]) {
      setSelectedAsset({ ...node, ...assetDetails[node.id] });
    }
  };

  const filterOptions = [
    { key: 'thermal', label: 'Thermal' },
    { key: 'hydro', label: 'Hydro' },
    { key: 'wind', label: 'Wind' },
    { key: 'solar', label: 'Solar' },
    { key: 'factory', label: 'Factory Load' },
    { key: 'home', label: 'Home Load' },
    { key: 'storage', label: 'Storage' },
  ];

  return (
    <div className="flex-1 h-screen overflow-hidden bg-white">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-80 bg-[#f4f4f4] border-r border-[#e0e0e0] p-6 overflow-auto">
          <h3 className="text-[#161616] mb-6">Asset Registry</h3>
          
          <div className="mb-8">
            <h4 className="text-[#525252] text-sm mb-4">Summary Totals</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#525252]">Total Lines:</span>
                <span className="text-[#161616]">7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#525252]">Total Transformers:</span>
                <span className="text-[#161616]">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#525252]">Total Load (Peak):</span>
                <span className="text-[#161616]">115 MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#525252]">Total Generation:</span>
                <span className="text-[#161616]">265 MW</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[#525252] text-sm mb-4">Asset Filter</h4>
            <div className="space-y-3">
              {filterOptions.map((option) => (
                <div key={option.key} className="flex items-center gap-2">
                  <Checkbox
                    id={option.key}
                    checked={filters[option.key as keyof typeof filters]}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, [option.key]: checked })
                    }
                  />
                  <label htmlFor={option.key} className="text-[#161616] text-sm cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 p-8 overflow-auto">
          <h2 className="text-[#161616] mb-6">Topology View - Static Asset Registry</h2>
          <div className="bg-[#f4f4f4] border border-[#e0e0e0] p-6">
            <NetworkCanvas 
              width={900} 
              height={600} 
              showControls={true}
              onNodeClick={handleNodeClick}
            />
          </div>
        </div>
      </div>

      {/* Asset Details Modal */}
      <Dialog open={!!selectedAsset} onOpenChange={() => setSelectedAsset(null)}>
        <DialogContent className="bg-white border-[#e0e0e0] text-[#161616] max-w-2xl">
          <DialogHeader>
            <DialogTitle>Asset ID {selectedAsset?.id} Details</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow className="border-[#e0e0e0]">
                <TableHead className="text-[#525252]">Property</TableHead>
                <TableHead className="text-[#525252]">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-[#e0e0e0]">
                <TableCell className="text-[#525252]">Asset Type</TableCell>
                <TableCell className="text-[#161616]">{selectedAsset?.type}</TableCell>
              </TableRow>
              <TableRow className="border-[#e0e0e0]">
                <TableCell className="text-[#525252]">Max Rating</TableCell>
                <TableCell className="text-[#161616]">{selectedAsset?.maxRating}</TableCell>
              </TableRow>
              <TableRow className="border-[#e0e0e0]">
                <TableCell className="text-[#525252]">Impedance/Capacity</TableCell>
                <TableCell className="text-[#161616]">{selectedAsset?.impedance}</TableCell>
              </TableRow>
              <TableRow className="border-[#e0e0e0]">
                <TableCell className="text-[#525252]">Location Bus ID</TableCell>
                <TableCell className="text-[#161616]">{selectedAsset?.busId}</TableCell>
              </TableRow>
              <TableRow className="border-[#e0e0e0]">
                <TableCell className="text-[#525252]">Operational Schedule</TableCell>
                <TableCell className="text-[#161616]">24/7 Available</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
}
