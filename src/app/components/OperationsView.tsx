import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Download, Upload } from 'lucide-react';
import { NetworkCanvas } from './NetworkCanvas';

export function OperationsView() {
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const fileInputRef = useState<HTMLInputElement | null>(null)[0];

  const handleNodeClick = (node: any) => {
    setSelectedNode(node);
  };

  const handleDownload = (type: string) => {
    // Mock download functionality
    const data = {
      timestamp: new Date().toISOString(),
      type: type,
      data: type === 'consumption' 
        ? 'Predicted consumption data...' 
        : type === 'optimization'
        ? 'Optimization decisions...'
        : 'Full simulation data...'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.json,.xlsx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Uploaded file:', file.name);
        // Handle file upload logic here
      }
    };
    input.click();
  };

  // Generate mock historical and prediction data
  const generateChartData = () => {
    const data = [];
    const now = new Date();
    
    // Past 24 hours
    for (let i = -24; i < 0; i++) {
      data.push({
        time: i,
        value: 0.95 + Math.random() * 0.1,
        type: 'historical'
      });
    }
    
    // Future 4 hours (prediction)
    for (let i = 0; i <= 4; i++) {
      data.push({
        time: i,
        value: 0.93 + Math.random() * 0.08,
        type: 'prediction'
      });
    }
    
    return data;
  };

  const dispatchData = [
    { timeStep: '12:00', assetId: 'BESS_1', command: 'Charge 5 MW' },
    { timeStep: '12:15', assetId: 'BESS_1', command: 'Charge 5 MW' },
    { timeStep: '12:30', assetId: 'HYDRO_1', command: 'Output 20 MW' },
    { timeStep: '12:45', assetId: 'BESS_1', command: 'Discharge 3 MW' },
    { timeStep: '13:00', assetId: 'BESS_1', command: 'Discharge 3 MW' },
  ];

  return (
    <div className="flex-1 h-screen overflow-auto bg-white">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#161616]">Operations View - Real-Time State & Prediction</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUpload}
              className="border-[#0f62fe] text-[#0f62fe] hover:bg-[#0f62fe] hover:text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Planned Downtimes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload('consumption')}
              className="border-[#0f62fe] text-[#0f62fe] hover:bg-[#0f62fe] hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Consumption
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload('optimization')}
              className="border-[#0f62fe] text-[#0f62fe] hover:bg-[#0f62fe] hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Optimization
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload('simulation')}
              className="border-[#0f62fe] text-[#0f62fe] hover:bg-[#0f62fe] hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Full Simulation
            </Button>
          </div>
        </div>
        
        {/* Top 60% - Network Map */}
        <div className="bg-[#f4f4f4] border border-[#e0e0e0] p-6 mb-6" style={{ height: '55vh' }}>
          <h3 className="text-[#161616] mb-4">Operational Network Map</h3>
          <div className="flex items-center justify-center">
            <NetworkCanvas 
              width={900} 
              height={450} 
              showControls={true}
              onNodeClick={handleNodeClick}
            />
          </div>
        </div>

        {/* Bottom 40% - Prediction and Dispatch */}
        <div className="grid grid-cols-2 gap-6" style={{ minHeight: '35vh' }}>
          {/* Prediction Summary */}
          <div className="bg-[#f4f4f4] border border-[#e0e0e0] p-6">
            <h3 className="text-[#161616] mb-6">Prediction Summary</h3>
            <div className="space-y-4">
              <div>
                <div className="text-[#525252] text-sm mb-1">Predicted V-min (p.u.)</div>
                <div className="text-[#161616] text-2xl">0.93</div>
              </div>
              <div>
                <div className="text-[#525252] text-sm mb-1">Forecasted Max Losses (MW)</div>
                <div className="text-[#161616] text-2xl">4.2</div>
              </div>
              <div>
                <div className="text-[#525252] text-sm mb-1">Predicted Peak Load (MW)</div>
                <div className="text-[#161616] text-2xl">98.5</div>
              </div>
            </div>
          </div>

          {/* Optimal Dispatch Decisions */}
          <div className="bg-[#f4f4f4] border border-[#e0e0e0] p-6 overflow-auto">
            <h3 className="text-[#161616] mb-4">Optimal Dispatch Decisions (Next 4 Hours)</h3>
            <Table>
              <TableHeader>
                <TableRow className="border-[#e0e0e0]">
                  <TableHead className="text-[#525252]">Time Step</TableHead>
                  <TableHead className="text-[#525252]">Asset ID</TableHead>
                  <TableHead className="text-[#525252]">Command</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dispatchData.map((row, idx) => (
                  <TableRow key={idx} className="border-[#e0e0e0]">
                    <TableCell className="text-[#161616]">{row.timeStep}</TableCell>
                    <TableCell className="text-[#161616]">{row.assetId}</TableCell>
                    <TableCell className="text-[#161616]">{row.command}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Node History Modal */}
      <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <DialogContent className="bg-white border-[#e0e0e0] text-[#161616] max-w-4xl">
          <DialogHeader>
            <DialogTitle>Node History: {selectedNode?.id}</DialogTitle>
          </DialogHeader>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generateChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="time" 
                  stroke="#525252"
                  label={{ value: 'Time (hours)', position: 'insideBottom', offset: -5, fill: '#525252' }}
                />
                <YAxis 
                  stroke="#525252"
                  label={{ value: 'Voltage (p.u.)', angle: -90, position: 'insideLeft', fill: '#525252' }}
                  domain={[0.9, 1.05]}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0' }}
                  labelStyle={{ color: '#161616' }}
                />
                <Legend wrapperStyle={{ color: '#525252' }} />
                <ReferenceLine x={0} stroke="#da1e28" strokeWidth={2} label={{ value: 'Now', fill: '#da1e28' }} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0f62fe" 
                  strokeWidth={2}
                  dot={false}
                  name="Voltage"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[#525252] text-sm mt-4">
            <span className="text-[#161616]">Historical data (past 24 hours)</span> | 
            <span className="text-[#0f62fe]"> Predicted data (next 4 hours)</span> | 
            <span className="text-[#da1e28]"> Current time marker</span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
