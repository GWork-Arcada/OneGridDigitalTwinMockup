import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { CheckCircle, Clock, Download } from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
  description: string;
  affectedAssets: string[];
  status: 'COMPLETE' | 'PENDING';
}

export function ScenarioLibrary() {
  const scenarios: Scenario[] = [
    {
      id: 'S001',
      name: 'N-2: Line B & Wind Farm Trip',
      description: 'Simultaneous failure of transmission Line B and complete loss of Wind Farm Generation (50 MW)',
      affectedAssets: ['LINE_B', 'GEN_WIND_1'],
      status: 'COMPLETE',
    },
    {
      id: 'S002',
      name: 'Extreme Load Surge - Industrial District',
      description: 'Unexpected 40% load increase in industrial zone due to emergency cooling requirements',
      affectedAssets: ['LOAD_FACTORY_1', 'LOAD_FACTORY_2', 'TRANSFORMER_T3'],
      status: 'COMPLETE',
    },
    {
      id: 'S003',
      name: 'Solar Farm Cloud Cover Event',
      description: 'Rapid 80% reduction in solar generation over 15 minutes due to weather event',
      affectedAssets: ['GEN_SOLAR_1', 'BUS_202'],
      status: 'COMPLETE',
    },
    {
      id: 'S004',
      name: 'N-1: Main Transformer Failure',
      description: 'Critical transformer T1 failure requiring immediate load shedding and rerouting',
      affectedAssets: ['TRANSFORMER_T1', 'BUS_101', 'BUS_201'],
      status: 'PENDING',
    },
    {
      id: 'S005',
      name: 'Cascading Voltage Collapse',
      description: 'Progressive voltage degradation starting from Bus 301, risk of system-wide instability',
      affectedAssets: ['BUS_301', 'BUS_302', 'LINE_A', 'LINE_C'],
      status: 'COMPLETE',
    },
    {
      id: 'S006',
      name: 'BESS System Failure',
      description: 'Complete loss of battery storage capability during peak demand period',
      affectedAssets: ['BESS_1', 'BUS_401'],
      status: 'COMPLETE',
    },
  ];

  const ScenarioCard = ({ scenario }: { scenario: Scenario }) => {
    return (
      <div className="bg-[#f4f4f4] border border-[#e0e0e0] hover:border-[#0f62fe] transition-colors cursor-pointer">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-[#161616]">{scenario.name}</h3>
            {scenario.status === 'COMPLETE' ? (
              <Badge className="bg-[#42be65] text-white hover:bg-[#42be65]">
                <CheckCircle className="w-3 h-3 mr-1" />
                COMPLETE
              </Badge>
            ) : (
              <Badge className="bg-[#f1c21b] text-[#161616] hover:bg-[#f1c21b]">
                <Clock className="w-3 h-3 mr-1" />
                PENDING
              </Badge>
            )}
          </div>

          <p className="text-[#525252] text-sm mb-4">
            {scenario.description}
          </p>

          <div className="mb-4">
            <div className="text-[#525252] text-sm mb-2">Affected Assets:</div>
            <div className="flex flex-wrap gap-2">
              {scenario.affectedAssets.map((asset) => (
                <Badge key={asset} variant="outline" className="border-[#e0e0e0] text-[#161616]">
                  {asset}
                </Badge>
              ))}
            </div>
          </div>

          {/* Placeholder for visual snapshot */}
          <div className="bg-white border border-[#e0e0e0] h-32 mb-4 flex items-center justify-center">
            <span className="text-[#525252] text-sm">Network Response Visualization</span>
          </div>

          <div className="flex flex-col gap-2">
            <Button 
              variant="outline" 
              className="w-full bg-transparent border-[#0f62fe] text-[#0f62fe] hover:bg-[#0f62fe] hover:text-white"
            >
              VIEW DETAILS
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="flex-1 text-[#0f62fe] hover:bg-[#e0e0e0] hover:text-[#0f62fe]"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report (PDF)
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="flex-1 text-[#0f62fe] hover:bg-[#e0e0e0] hover:text-[#0f62fe]"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Data (XLSX)
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 h-screen overflow-auto bg-white">
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-[#161616] mb-2">Scenario Library - Disaster Preparedness Engine</h2>
          <p className="text-[#525252]">
            Pre-computed optimal response plans for critical failure scenarios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <ScenarioCard key={scenario.id} scenario={scenario} />
          ))}
        </div>
      </div>
    </div>
  );
}
