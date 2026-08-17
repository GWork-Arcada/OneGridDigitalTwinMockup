import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface SavedProject {
  id: string;
  name: string;
  projectType: string;
  affectedAssets: string[];
  rating: string;
  cost: number;
  projection: string;
  roi: number;
  lossReduction: number;
  violationReduction: { before: number; after: number };
  status: 'Completed' | 'In Progress' | 'Approved';
}

export function InfrastructurePlanning() {
  const [projectType, setProjectType] = useState('');
  const [busId, setBusId] = useState('');
  const [rating, setRating] = useState('');
  const [cost, setCost] = useState('');
  const [projection, setProjection] = useState('');
  const [results, setResults] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<SavedProject | null>(null);

  const savedProjects: SavedProject[] = [
    {
      id: 'P001',
      name: 'BUS_301 Battery Storage Expansion',
      projectType: 'Add New BESS',
      affectedAssets: ['BUS_301', 'DIST_9', 'DIST_10'],
      rating: '35 MW / 140 MWh',
      cost: 3500000,
      projection: '10 Years EV Integration',
      roi: 22.5,
      lossReduction: 3200,
      violationReduction: { before: 52, after: 3 },
      status: 'Completed',
    },
    {
      id: 'P002',
      name: 'Solar Farm District 7 Installation',
      projectType: 'New Solar Farm',
      affectedAssets: ['BUS_201', 'DIST_7', 'DIST_8'],
      rating: '60 MW',
      cost: 4200000,
      projection: 'Renewable Energy Expansion',
      roi: 18.3,
      lossReduction: 2800,
      violationReduction: { before: 38, after: 8 },
      status: 'Approved',
    },
    {
      id: 'P003',
      name: 'Line B Transmission Upgrade',
      projectType: 'Replace Line',
      affectedAssets: ['LINE_B', 'DIST_3', 'DIST_4', 'DIST_9'],
      rating: '150 MVA',
      cost: 5800000,
      projection: '5 Years Load Growth',
      roi: 15.7,
      lossReduction: 4100,
      violationReduction: { before: 67, after: 12 },
      status: 'In Progress',
    },
    {
      id: 'P004',
      name: 'Transformer T3 Capacity Enhancement',
      projectType: 'Upgrade Transformer',
      affectedAssets: ['TRANSFORMER_T3', 'BUS_401', 'DIST_11', 'DIST_12'],
      rating: '100 MVA',
      cost: 2900000,
      projection: '5 Years Load Growth',
      roi: 20.1,
      lossReduction: 2400,
      violationReduction: { before: 43, after: 6 },
      status: 'Completed',
    },
    {
      id: 'P005',
      name: 'Wind Farm Northern Grid Expansion',
      projectType: 'New Wind Farm',
      affectedAssets: ['BUS_203', 'DIST_1', 'DIST_2'],
      rating: '75 MW',
      cost: 6200000,
      projection: 'Renewable Energy Expansion',
      roi: 16.8,
      lossReduction: 3600,
      violationReduction: { before: 48, after: 7 },
      status: 'Approved',
    },
  ];

  const runSimulation = () => {
    // Mock simulation results
    setResults({
      lossReduction: 2850,
      violationReduction: { before: 45, after: 5 },
      projectCost: parseFloat(cost) || 2500000,
      roi: 18.5,
    });
  };

  return (
    <div className="flex-1 h-screen overflow-auto bg-white">
      <div className="p-8">
        <h2 className="text-[#161616] mb-6">Infrastructure Planning - ROI Sandbox</h2>

        {/* Saved Projects Section */}
        <div className="mb-8">
          <h3 className="text-[#161616] mb-4">Saved Infrastructure Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-[#f4f4f4] border border-[#e0e0e0] hover:border-[#0f62fe] p-4 text-left transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-[#161616] pr-2">{project.name}</h4>
                  <Badge 
                    className={
                      project.status === 'Completed' 
                        ? 'bg-[#42be65] text-white hover:bg-[#42be65]'
                        : project.status === 'Approved'
                        ? 'bg-[#0f62fe] text-white hover:bg-[#0f62fe]'
                        : 'bg-[#f1c21b] text-[#161616] hover:bg-[#f1c21b]'
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="text-[#525252]">Type: {project.projectType}</div>
                  <div className="text-[#525252]">Rating: {project.rating}</div>
                  <div className="text-[#0f62fe]">ROI: {project.roi}%</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <h3 className="text-[#161616] mb-4">Create New Project</h3>
        <div className="grid grid-cols-2 gap-6">
          {/* Left Panel - Configuration */}
          <div className="bg-[#f4f4f4] border border-[#e0e0e0] p-6">
            <h3 className="text-[#161616] mb-6">Project Configuration</h3>

            <div className="space-y-6">
              <div>
                <Label htmlFor="projectType" className="text-[#525252] mb-2 block">
                  Project Type
                </Label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger 
                    id="projectType" 
                    className="bg-white border-[#e0e0e0] text-[#161616]"
                  >
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#e0e0e0] text-[#161616]">
                    <SelectItem value="bess">Add New BESS</SelectItem>
                    <SelectItem value="line">Replace Line</SelectItem>
                    <SelectItem value="solar">New Solar Farm</SelectItem>
                    <SelectItem value="transformer">Upgrade Transformer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="busId" className="text-[#525252] mb-2 block">
                  Location Bus ID
                </Label>
                <Select value={busId} onValueChange={setBusId}>
                  <SelectTrigger 
                    id="busId" 
                    className="bg-white border-[#e0e0e0] text-[#161616]"
                  >
                    <SelectValue placeholder="Select bus location" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#e0e0e0] text-[#161616]">
                    <SelectItem value="BUS_101">BUS_101</SelectItem>
                    <SelectItem value="BUS_201">BUS_201</SelectItem>
                    <SelectItem value="BUS_301">BUS_301</SelectItem>
                    <SelectItem value="BUS_401">BUS_401</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="rating" className="text-[#525252] mb-2 block">
                  Proposed Rating
                </Label>
                <Input
                  id="rating"
                  placeholder="e.g., 5.0 MW or 30 MVA"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="bg-white border-[#e0e0e0] text-[#161616] placeholder:text-[#525252]"
                />
              </div>

              <div>
                <Label htmlFor="cost" className="text-[#525252] mb-2 block">
                  Estimated Cost ($)
                </Label>
                <Input
                  id="cost"
                  type="number"
                  placeholder="e.g., 2500000"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="bg-white border-[#e0e0e0] text-[#161616] placeholder:text-[#525252]"
                />
              </div>

              <div>
                <Label htmlFor="projection" className="text-[#525252] mb-2 block">
                  Future Projection
                </Label>
                <Select value={projection} onValueChange={setProjection}>
                  <SelectTrigger 
                    id="projection" 
                    className="bg-white border-[#e0e0e0] text-[#161616]"
                  >
                    <SelectValue placeholder="Select projection scenario" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#e0e0e0] text-[#161616]">
                    <SelectItem value="5yr-load">5 Years Load Growth</SelectItem>
                    <SelectItem value="10yr-ev">10 Years EV Integration</SelectItem>
                    <SelectItem value="renewable">Renewable Energy Expansion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={runSimulation}
                className="w-full bg-[#0f62fe] hover:bg-[#0353e9] text-white"
                disabled={!projectType || !busId || !rating || !cost || !projection}
              >
                RUN LONG-TERM SIMULATION
              </Button>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="bg-[#f4f4f4] border border-[#e0e0e0] p-6">
            <h3 className="text-[#161616] mb-6">Feasibility and ROI Report</h3>

            {!results ? (
              <div className="h-full flex items-center justify-center text-[#525252]">
                Configure project parameters and run simulation to view results
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-white border border-[#e0e0e0] p-6">
                  <div className="text-[#525252] text-sm mb-2">
                    Annual Energy Loss Reduction
                  </div>
                  <div className="text-[#42be65] text-3xl">
                    {results.lossReduction.toLocaleString()} MWh/Year
                  </div>
                </div>

                <div className="bg-white border border-[#e0e0e0] p-6">
                  <div className="text-[#525252] text-sm mb-2">
                    Peak Voltage Violation Count (Projected)
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[#da1e28] text-3xl">
                      {results.violationReduction.before}
                    </span>
                    <span className="text-[#525252]">→</span>
                    <span className="text-[#42be65] text-3xl">
                      {results.violationReduction.after}
                    </span>
                  </div>
                  <div className="text-[#42be65] text-sm mt-2">
                    {Math.round(((results.violationReduction.before - results.violationReduction.after) / results.violationReduction.before) * 100)}% reduction
                  </div>
                </div>

                <div className="bg-white border border-[#e0e0e0] p-6">
                  <div className="text-[#525252] text-sm mb-2">
                    Total Project Cost
                  </div>
                  <div className="text-[#161616] text-3xl">
                    ${results.projectCost.toLocaleString()}
                  </div>
                </div>

                <div className="bg-white border border-[#0f62fe] p-6">
                  <div className="text-[#525252] text-sm mb-2">
                    Calculated ROI
                  </div>
                  <div className="text-[#0f62fe] text-4xl">
                    {results.roi}%
                  </div>
                  <div className="text-[#525252] text-sm mt-2">
                    Expected payback period: {Math.round(100 / results.roi)} years
                  </div>
                </div>

                <div className="pt-4 border-t border-[#e0e0e0]">
                  <Button
                    variant="outline"
                    className="w-full border-[#0f62fe] text-[#0f62fe] hover:bg-[#0f62fe] hover:text-white"
                  >
                    Export Full Analysis Report
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Details Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="bg-white border-[#e0e0e0] text-[#161616] max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedProject?.name}</DialogTitle>
            </DialogHeader>
            
            {selectedProject && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[#525252]">Project ID</Label>
                    <div className="text-[#161616] mt-1">{selectedProject.id}</div>
                  </div>
                  <div>
                    <Label className="text-[#525252]">Status</Label>
                    <div className="mt-1">
                      <Badge 
                        className={
                          selectedProject.status === 'Completed' 
                            ? 'bg-[#42be65] text-white hover:bg-[#42be65]'
                            : selectedProject.status === 'Approved'
                            ? 'bg-[#0f62fe] text-white hover:bg-[#0f62fe]'
                            : 'bg-[#f1c21b] text-[#161616] hover:bg-[#f1c21b]'
                        }
                      >
                        {selectedProject.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-[#525252]">Project Type</Label>
                  <div className="text-[#161616] mt-1">{selectedProject.projectType}</div>
                </div>

                <div>
                  <Label className="text-[#525252]">Affected Assets</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.affectedAssets.map((asset) => (
                      <Badge key={asset} variant="outline" className="border-[#e0e0e0] text-[#161616]">
                        {asset}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[#525252]">Proposed Rating</Label>
                    <div className="text-[#161616] mt-1">{selectedProject.rating}</div>
                  </div>
                  <div>
                    <Label className="text-[#525252]">Estimated Cost</Label>
                    <div className="text-[#161616] mt-1">${selectedProject.cost.toLocaleString()}</div>
                  </div>
                </div>

                <div>
                  <Label className="text-[#525252]">Future Projection Scenario</Label>
                  <div className="text-[#161616] mt-1">{selectedProject.projection}</div>
                </div>

                <div className="border-t border-[#e0e0e0] pt-4">
                  <h4 className="text-[#161616] mb-4">Simulation Results</h4>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#e0e0e0]">
                        <TableHead className="text-[#525252]">Metric</TableHead>
                        <TableHead className="text-[#525252]">Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-[#e0e0e0]">
                        <TableCell className="text-[#525252]">Annual Energy Loss Reduction</TableCell>
                        <TableCell className="text-[#42be65]">{selectedProject.lossReduction.toLocaleString()} MWh/Year</TableCell>
                      </TableRow>
                      <TableRow className="border-[#e0e0e0]">
                        <TableCell className="text-[#525252]">Voltage Violation Reduction</TableCell>
                        <TableCell>
                          <span className="text-[#da1e28]">{selectedProject.violationReduction.before}</span>
                          {' → '}
                          <span className="text-[#42be65]">{selectedProject.violationReduction.after}</span>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-[#e0e0e0]">
                        <TableCell className="text-[#525252]">Total Project Cost</TableCell>
                        <TableCell className="text-[#161616]">${selectedProject.cost.toLocaleString()}</TableCell>
                      </TableRow>
                      <TableRow className="border-[#e0e0e0]">
                        <TableCell className="text-[#525252]">Calculated ROI</TableCell>
                        <TableCell className="text-[#0f62fe]">{selectedProject.roi}%</TableCell>
                      </TableRow>
                      <TableRow className="border-[#e0e0e0]">
                        <TableCell className="text-[#525252]">Payback Period</TableCell>
                        <TableCell className="text-[#161616]">{Math.round(100 / selectedProject.roi)} years</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-[#0f62fe] text-[#0f62fe] hover:bg-[#0f62fe] hover:text-white"
                  >
                    Export Project Report
                  </Button>
                  <Button
                    className="flex-1 bg-[#0f62fe] hover:bg-[#0353e9] text-white"
                  >
                    Duplicate Project
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
