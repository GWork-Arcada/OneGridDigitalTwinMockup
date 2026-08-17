import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function SystemSettings() {
  const [predictionModel, setPredictionModel] = useState('ARIMA');
  const [computationalUnit, setComputationalUnit] = useState('Classical');
  const [solverLibrary, setSolverLibrary] = useState('CVXPY');
  const [hydroCost, setHydroCost] = useState('50');
  const [bessCost, setBessCost] = useState('10');
  const [voltagePenalty, setVoltagePenalty] = useState('10000');

  const users = [
    { id: 1, name: 'Sarah Chen', email: 'sarah.chen@onegrid.com', role: 'Grid Operator', status: 'Active' },
    { id: 2, name: 'Marcus Johnson', email: 'marcus.j@onegrid.com', role: 'System Administrator', status: 'Active' },
    { id: 3, name: 'Elena Popov', email: 'elena.p@onegrid.com', role: 'Analyst', status: 'Active' },
    { id: 4, name: 'James Wilson', email: 'james.w@onegrid.com', role: 'Viewer', status: 'Inactive' },
  ];

  return (
    <div className="flex-1 h-screen overflow-auto bg-white">
      <div className="p-8">
        <h2 className="text-[#161616] mb-6">System Settings - Algorithm & Cost Control</h2>

        <Tabs defaultValue="algorithm" className="w-full">
          <TabsList className="bg-[#f4f4f4] border border-[#e0e0e0]">
            <TabsTrigger 
              value="algorithm" 
              className="data-[state=active]:bg-[#0f62fe] data-[state=active]:text-white text-[#525252]"
            >
              Algorithm
            </TabsTrigger>
            <TabsTrigger 
              value="economics" 
              className="data-[state=active]:bg-[#0f62fe] data-[state=active]:text-white text-[#525252]"
            >
              Economics
            </TabsTrigger>
            <TabsTrigger 
              value="access" 
              className="data-[state=active]:bg-[#0f62fe] data-[state=active]:text-white text-[#525252]"
            >
              Access Control
            </TabsTrigger>
          </TabsList>

          <TabsContent value="algorithm" className="mt-6">
            <div className="bg-[#f4f4f4] border border-[#e0e0e0] p-8 max-w-3xl">
              <h3 className="text-[#161616] mb-6">Algorithm Configuration</h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="predictionModel" className="text-[#525252] mb-2 block">
                    Prediction Model
                  </Label>
                  <Select value={predictionModel} onValueChange={setPredictionModel}>
                    <SelectTrigger 
                      id="predictionModel" 
                      className="bg-white border-[#e0e0e0] text-[#161616]"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#e0e0e0] text-[#161616]">
                      <SelectItem value="ARIMA">ARIMA</SelectItem>
                      <SelectItem value="SARIMA">SARIMA</SelectItem>
                      <SelectItem value="Prophet">Prophet</SelectItem>
                      <SelectItem value="Darts">Darts</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[#525252] text-sm mt-2">
                    Time series forecasting model for load and generation prediction
                  </p>
                </div>

                <div>
                  <Label htmlFor="computationalUnit" className="text-[#525252] mb-2 block">
                    Computational Unit
                  </Label>
                  <Select value={computationalUnit} onValueChange={setComputationalUnit}>
                    <SelectTrigger 
                      id="computationalUnit" 
                      className="bg-white border-[#e0e0e0] text-[#161616]"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#e0e0e0] text-[#161616]">
                      <SelectItem value="Classical">Classical</SelectItem>
                      <SelectItem value="Quantum">Quantum</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[#525252] text-sm mt-2">
                    Processing architecture for optimization solver
                  </p>
                </div>

                <div>
                  <Label htmlFor="solverLibrary" className="text-[#525252] mb-2 block">
                    Solver Libraries
                  </Label>
                  <Select value={solverLibrary} onValueChange={setSolverLibrary}>
                    <SelectTrigger 
                      id="solverLibrary" 
                      className="bg-white border-[#e0e0e0] text-[#161616]"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#e0e0e0] text-[#161616]">
                      <SelectItem value="CVXPY">CVXPY</SelectItem>
                      <SelectItem value="GLPK">GLPK</SelectItem>
                      <SelectItem value="Gurobi">Gurobi</SelectItem>
                      <SelectItem value="CPLEX">CPLEX</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[#525252] text-sm mt-2">
                    Mathematical optimization solver framework
                  </p>
                </div>

                <div className="pt-4">
                  <Button className="bg-[#0f62fe] hover:bg-[#0353e9] text-white">
                    Save Algorithm Settings
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="economics" className="mt-6">
            <div className="bg-[#f4f4f4] border border-[#e0e0e0] p-8 max-w-3xl">
              <h3 className="text-[#161616] mb-6">Economic Parameters</h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="hydroCost" className="text-[#525252] mb-2 block">
                    Hydro Dispatch Cost ($/MWh)
                  </Label>
                  <Input
                    id="hydroCost"
                    type="number"
                    value={hydroCost}
                    onChange={(e) => setHydroCost(e.target.value)}
                    className="bg-white border-[#e0e0e0] text-[#161616]"
                  />
                  <p className="text-[#525252] text-sm mt-2">
                    Operating cost for hydro generation dispatch
                  </p>
                </div>

                <div>
                  <Label htmlFor="bessCost" className="text-[#525252] mb-2 block">
                    BESS Dispatch Cost ($/MWh)
                  </Label>
                  <Input
                    id="bessCost"
                    type="number"
                    value={bessCost}
                    onChange={(e) => setBessCost(e.target.value)}
                    className="bg-white border-[#e0e0e0] text-[#161616]"
                  />
                  <p className="text-[#525252] text-sm mt-2">
                    Charge/discharge cost for battery storage systems
                  </p>
                </div>

                <div>
                  <Label htmlFor="voltagePenalty" className="text-[#525252] mb-2 block">
                    Voltage Violation Penalty ($/Violation Unit)
                  </Label>
                  <Input
                    id="voltagePenalty"
                    type="number"
                    value={voltagePenalty}
                    onChange={(e) => setVoltagePenalty(e.target.value)}
                    className="bg-white border-[#e0e0e0] text-[#161616]"
                  />
                  <p className="text-[#525252] text-sm mt-2">
                    Critical penalty weight for prioritizing voltage stability in optimization
                  </p>
                </div>

                <div className="bg-[#0f62fe]/10 border border-[#0f62fe] p-4 mt-6">
                  <p className="text-[#0f62fe] text-sm">
                    These economic parameters directly influence the optimization objective function. 
                    Higher voltage violation penalties will prioritize grid stability over cost minimization.
                  </p>
                </div>

                <div className="pt-4">
                  <Button className="bg-[#0f62fe] hover:bg-[#0353e9] text-white">
                    Save Economic Parameters
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="access" className="mt-6">
            <div className="bg-[#f4f4f4] border border-[#e0e0e0] p-8">
              <h3 className="text-[#161616] mb-6">User Management & Access Control</h3>
              
              <Table>
                <TableHeader>
                  <TableRow className="border-[#e0e0e0]">
                    <TableHead className="text-[#525252]">Name</TableHead>
                    <TableHead className="text-[#525252]">Email</TableHead>
                    <TableHead className="text-[#525252]">Role</TableHead>
                    <TableHead className="text-[#525252]">Status</TableHead>
                    <TableHead className="text-[#525252]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-[#e0e0e0]">
                      <TableCell className="text-[#161616]">{user.name}</TableCell>
                      <TableCell className="text-[#161616]">{user.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className="border-[#e0e0e0] text-[#161616]"
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            user.status === 'Active' 
                              ? 'bg-[#42be65] text-white hover:bg-[#42be65]' 
                              : 'bg-[#e0e0e0] text-[#525252] hover:bg-[#e0e0e0]'
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-[#0f62fe] hover:bg-[#e0e0e0] hover:text-[#0f62fe]"
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6">
                <Button className="bg-[#0f62fe] hover:bg-[#0353e9] text-white">
                  Add New User
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
