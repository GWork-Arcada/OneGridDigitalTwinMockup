import { Network, Activity, BookOpen, Building2, Settings, AlertCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface CommandCenterProps {
  onNavigate: (page: string) => void;
}

export function CommandCenter({ onNavigate }: CommandCenterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dense network: 8 generation, 4 batteries, 2 consumption, 12 intermediate distribution nodes
    
    // Generation nodes (yellow)
    const genNodes = [
      { x: 80, y: 100, label: 'G1' },
      { x: 80, y: 180, label: 'G2' },
      { x: 80, y: 260, label: 'G3' },
      { x: 80, y: 340, label: 'G4' },
      { x: 150, y: 100, label: 'G5' },
      { x: 150, y: 180, label: 'G6' },
      { x: 150, y: 260, label: 'G7' },
      { x: 150, y: 340, label: 'G8' },
    ];

    // Intermediate distribution nodes (blue)
    const distNodes = [
      { x: 250, y: 80, label: 'D1' },
      { x: 250, y: 140, label: 'D2' },
      { x: 250, y: 200, label: 'D3' },
      { x: 250, y: 260, label: 'D4' },
      { x: 250, y: 320, label: 'D5' },
      { x: 250, y: 380, label: 'D6' },
      { x: 450, y: 80, label: 'D7' },
      { x: 450, y: 140, label: 'D8' },
      { x: 450, y: 200, label: 'D9' },
      { x: 450, y: 260, label: 'D10' },
      { x: 450, y: 320, label: 'D11' },
      { x: 450, y: 380, label: 'D12' },
    ];

    // Battery nodes (green)
    const batteryNodes = [
      { x: 350, y: 120, label: 'B1' },
      { x: 350, y: 200, label: 'B2' },
      { x: 350, y: 280, label: 'B3' },
      { x: 350, y: 360, label: 'B4' },
    ];

    // Consumption nodes (blue with darker shade)
    const consumptionNodes = [
      { x: 650, y: 180, label: 'C1' },
      { x: 650, y: 300, label: 'C2' },
    ];

    // Draw connections - generation to nearest distribution
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1.5;

    // Connect each generation to nearest distribution nodes
    genNodes.forEach(gen => {
      const leftSideNodes = distNodes.slice(0, 6);
      if (leftSideNodes.length > 0) {
        const nearestDist = leftSideNodes.sort((a, b) => {
          const distA = Math.sqrt(Math.pow(a.x - gen.x, 2) + Math.pow(a.y - gen.y, 2));
          const distB = Math.sqrt(Math.pow(b.x - gen.x, 2) + Math.pow(b.y - gen.y, 2));
          return distA - distB;
        })[0];
        
        if (nearestDist) {
          ctx.beginPath();
          ctx.moveTo(gen.x, gen.y);
          ctx.lineTo(nearestDist.x, nearestDist.y);
          ctx.stroke();
        }
      }
    });

    // Connect distribution nodes to each other (horizontal connections)
    for (let i = 0; i < 6; i++) {
      if (distNodes[i] && distNodes[i + 6]) {
        ctx.beginPath();
        ctx.moveTo(distNodes[i].x, distNodes[i].y);
        ctx.lineTo(distNodes[i + 6].x, distNodes[i + 6].y);
        ctx.stroke();
      }
    }

    // Connect batteries to nearby distribution nodes
    batteryNodes.forEach((battery, idx) => {
      const leftIdx = Math.min(idx * 2, distNodes.length - 1);
      const rightIdx = Math.min(idx * 2 + 6, distNodes.length - 1);
      
      if (leftIdx >= 0 && leftIdx < distNodes.length) {
        ctx.beginPath();
        ctx.moveTo(battery.x, battery.y);
        ctx.lineTo(distNodes[leftIdx].x, distNodes[leftIdx].y);
        ctx.stroke();
      }
      
      if (rightIdx >= 0 && rightIdx < distNodes.length) {
        ctx.beginPath();
        ctx.moveTo(battery.x, battery.y);
        ctx.lineTo(distNodes[rightIdx].x, distNodes[rightIdx].y);
        ctx.stroke();
      }
    });

    // Connect consumption nodes to nearest distribution
    consumptionNodes.forEach(cons => {
      const rightSideNodes = distNodes.slice(6);
      if (rightSideNodes.length > 0) {
        const nearestDist = rightSideNodes.sort((a, b) => {
          const distA = Math.sqrt(Math.pow(a.x - cons.x, 2) + Math.pow(a.y - cons.y, 2));
          const distB = Math.sqrt(Math.pow(b.x - cons.x, 2) + Math.pow(b.y - cons.y, 2));
          return distA - distB;
        })[0];
        
        if (nearestDist) {
          ctx.beginPath();
          ctx.moveTo(cons.x, cons.y);
          ctx.lineTo(nearestDist.x, nearestDist.y);
          ctx.stroke();
        }
      }
    });

    // Draw nodes function
    const drawNode = (x: number, y: number, color: string, label: string, radius = 6) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#525252';
      ctx.font = '10px IBM Plex Sans';
      ctx.fillText(label, x - 10, y - 12);
    };

    // Draw all nodes
    genNodes.forEach(node => drawNode(node.x, node.y, '#f1c21b', node.label));
    distNodes.forEach(node => drawNode(node.x, node.y, '#4589ff', node.label, 5));
    batteryNodes.forEach(node => drawNode(node.x, node.y, '#42be65', node.label));
    consumptionNodes.forEach(node => drawNode(node.x, node.y, '#0f62fe', node.label, 7));

    // Draw fault indicator on one distribution node
    ctx.fillStyle = '#da1e28';
    ctx.beginPath();
    ctx.arc(distNodes[8].x, distNodes[8].y, 10, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(distNodes[8].x, distNodes[8].y, 5, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const featureCards = [
    { id: 'topology', title: 'Topology', icon: Network, description: 'Static Asset Registry' },
    { id: 'operations', title: 'Operations', icon: Activity, description: 'Real-Time State & Prediction' },
    { id: 'scenario-library', title: 'Scenario Library', icon: BookOpen, description: 'Disaster Preparedness' },
    { id: 'infrastructure', title: 'Infrastructure Planning', icon: Building2, description: 'ROI Sandbox' },
    { id: 'settings', title: 'System Settings', icon: Settings, description: 'Algorithm & Cost Control' },
  ];

  return (
    <div className="flex-1 h-screen overflow-auto bg-white">
      <div className="p-8">
        <div className="grid grid-cols-2 gap-6 h-[calc(100vh-4rem)]">
          {/* Left Panel */}
          <div className="flex flex-col gap-4">
            {/* Status Card */}
            <div className="bg-[#f4f4f4] p-6 border border-[#e0e0e0]">
              <h3 className="text-[#161616] mb-4">Operational Status</h3>
              <div className="text-[#42be65] text-2xl mb-2">SIMULATION MODE</div>
              <p className="text-[#525252] text-sm">Last Updated: {currentTime}</p>
            </div>

            {/* Feature Cards */}
            <div className="flex-1 grid grid-cols-1 gap-4 overflow-auto">
              {featureCards.map((card) => {
                const Icon = card.icon;
                return (
                  <button
                    key={card.id}
                    onClick={() => onNavigate(card.id)}
                    className="bg-[#f4f4f4] p-6 border border-[#e0e0e0] hover:border-[#0f62fe] transition-colors text-left"
                  >
                    <div className="flex items-start gap-4">
                      <Icon className="w-8 h-8 text-[#0f62fe] flex-shrink-0" />
                      <div>
                        <h4 className="text-[#161616] mb-2">{card.title}</h4>
                        <p className="text-[#525252] text-sm">{card.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel - Operational Snapshot */}
          <div className="bg-[#f4f4f4] border border-[#e0e0e0] p-6 flex flex-col">
            <h3 className="text-[#161616] mb-4">Operational Snapshot</h3>
            
            <div className="flex-1 flex items-center justify-center bg-white border border-[#e0e0e0] relative">
              <canvas ref={canvasRef} width={800} height={450} className="max-w-full" />
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#42be65]"></div>
                <span className="text-[#525252]">Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#f1c21b]"></div>
                <span className="text-[#525252]">High Load</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#da1e28]"></div>
                <span className="text-[#525252]">Fault/Violation</span>
              </div>
              <div className="flex items-center gap-2 text-[#da1e28]">
                <AlertCircle className="w-4 h-4" />
                <span>Low Voltage Detected at Bus 301</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
