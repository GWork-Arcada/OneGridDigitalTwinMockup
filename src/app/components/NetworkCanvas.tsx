import { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';

interface NetworkNode {
  id: string;
  x: number;
  y: number;
  type: 'generation' | 'distribution' | 'battery' | 'consumption';
  label: string;
  color: string;
  radius: number;
  hasFault?: boolean;
}

interface NetworkCanvasProps {
  width?: number;
  height?: number;
  showControls?: boolean;
  onNodeClick?: (node: NetworkNode) => void;
}

export function NetworkCanvas({ 
  width = 900, 
  height = 600, 
  showControls = true,
  onNodeClick 
}: NetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Generate dense network nodes
  const genNodes: NetworkNode[] = [
    { id: 'G1', x: 100, y: 150, type: 'generation', label: 'Gen1', color: '#f1c21b', radius: 8 },
    { id: 'G2', x: 100, y: 250, type: 'generation', label: 'Gen2', color: '#f1c21b', radius: 8 },
    { id: 'G3', x: 100, y: 350, type: 'generation', label: 'Gen3', color: '#f1c21b', radius: 8 },
    { id: 'G4', x: 100, y: 450, type: 'generation', label: 'Gen4', color: '#f1c21b', radius: 8 },
    { id: 'G5', x: 180, y: 150, type: 'generation', label: 'Gen5', color: '#f1c21b', radius: 8 },
    { id: 'G6', x: 180, y: 250, type: 'generation', label: 'Gen6', color: '#f1c21b', radius: 8 },
    { id: 'G7', x: 180, y: 350, type: 'generation', label: 'Gen7', color: '#f1c21b', radius: 8 },
    { id: 'G8', x: 180, y: 450, type: 'generation', label: 'Gen8', color: '#f1c21b', radius: 8 },
  ];

  const distNodes: NetworkNode[] = [
    { id: 'D1', x: 300, y: 120, type: 'distribution', label: 'Dist1', color: '#4589ff', radius: 6 },
    { id: 'D2', x: 300, y: 190, type: 'distribution', label: 'Dist2', color: '#4589ff', radius: 6 },
    { id: 'D3', x: 300, y: 260, type: 'distribution', label: 'Dist3', color: '#4589ff', radius: 6 },
    { id: 'D4', x: 300, y: 330, type: 'distribution', label: 'Dist4', color: '#4589ff', radius: 6 },
    { id: 'D5', x: 300, y: 400, type: 'distribution', label: 'Dist5', color: '#4589ff', radius: 6 },
    { id: 'D6', x: 300, y: 470, type: 'distribution', label: 'Dist6', color: '#4589ff', radius: 6 },
    { id: 'D7', x: 550, y: 120, type: 'distribution', label: 'Dist7', color: '#4589ff', radius: 6 },
    { id: 'D8', x: 550, y: 190, type: 'distribution', label: 'Dist8', color: '#4589ff', radius: 6 },
    { id: 'D9', x: 550, y: 260, type: 'distribution', label: 'Dist9', color: '#4589ff', radius: 6, hasFault: true },
    { id: 'D10', x: 550, y: 330, type: 'distribution', label: 'Dist10', color: '#4589ff', radius: 6 },
    { id: 'D11', x: 550, y: 400, type: 'distribution', label: 'Dist11', color: '#4589ff', radius: 6 },
    { id: 'D12', x: 550, y: 470, type: 'distribution', label: 'Dist12', color: '#4589ff', radius: 6 },
  ];

  const batteryNodes: NetworkNode[] = [
    { id: 'B1', x: 425, y: 170, type: 'battery', label: 'BESS1', color: '#42be65', radius: 8 },
    { id: 'B2', x: 425, y: 270, type: 'battery', label: 'BESS2', color: '#42be65', radius: 8 },
    { id: 'B3', x: 425, y: 370, type: 'battery', label: 'BESS3', color: '#42be65', radius: 8 },
    { id: 'B4', x: 425, y: 470, type: 'battery', label: 'BESS4', color: '#42be65', radius: 8 },
  ];

  const consumptionNodes: NetworkNode[] = [
    { id: 'C1', x: 750, y: 250, type: 'consumption', label: 'Load1', color: '#0f62fe', radius: 9 },
    { id: 'C2', x: 750, y: 400, type: 'consumption', label: 'Load2', color: '#0f62fe', radius: 9 },
  ];

  const allNodes = [...genNodes, ...distNodes, ...batteryNodes, ...consumptionNodes];

  const connections = [
    // Generation to nearest distribution
    ...genNodes.flatMap(gen => {
      const leftSide = distNodes.slice(0, 6);
      if (leftSide.length === 0) return [];
      const nearest = leftSide.sort((a, b) => 
        Math.hypot(a.x - gen.x, a.y - gen.y) - Math.hypot(b.x - gen.x, b.y - gen.y)
      )[0];
      return nearest ? [{ from: gen.id, to: nearest.id }] : [];
    }),
    // Distribution horizontal connections
    ...Array.from({ length: 6 }, (_, i) => {
      if (distNodes[i] && distNodes[i + 6]) {
        return { from: distNodes[i].id, to: distNodes[i + 6].id };
      }
      return null;
    }).filter(conn => conn !== null),
    // Batteries to distribution
    ...batteryNodes.flatMap((battery, idx) => {
      const connections = [];
      const leftIdx = idx * 2;
      const rightIdx = idx * 2 + 6;
      
      if (distNodes[leftIdx]) {
        connections.push({ from: battery.id, to: distNodes[leftIdx].id });
      }
      if (distNodes[rightIdx]) {
        connections.push({ from: battery.id, to: distNodes[rightIdx].id });
      }
      
      return connections;
    }),
    // Consumption to nearest distribution
    ...consumptionNodes.flatMap(cons => {
      const rightSide = distNodes.slice(6);
      if (rightSide.length === 0) return [];
      const nearest = rightSide.sort((a, b) => 
        Math.hypot(a.x - cons.x, a.y - cons.y) - Math.hypot(b.x - cons.x, b.y - cons.y)
      )[0];
      return nearest ? [{ from: cons.id, to: nearest.id }] : [];
    }),
  ];

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    
    // Apply transformations
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw connections
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 2 / zoom;
    connections.forEach(conn => {
      const fromNode = allNodes.find(n => n.id === conn.from);
      const toNode = allNodes.find(n => n.id === conn.to);
      if (fromNode && toNode) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
      }
    });

    // Draw nodes
    allNodes.forEach(node => {
      // Draw fault indicator if present
      if (node.hasFault) {
        ctx.fillStyle = '#da1e28';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw label
      ctx.fillStyle = '#525252';
      ctx.font = `${11 / zoom}px IBM Plex Sans`;
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y - node.radius - 8);
    });

    ctx.restore();
  };

  useEffect(() => {
    draw();
  }, [zoom, pan]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 3));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!onNodeClick) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;

    const clickedNode = allNodes.find(node => 
      Math.hypot(node.x - x, node.y - y) <= node.radius
    );

    if (clickedNode) {
      onNodeClick(clickedNode);
    }
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div ref={containerRef} className="relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-[#e0e0e0] cursor-move"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
      />
      {showControls && (
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            size="sm"
            variant="outline"
            className="bg-white"
            onClick={() => setZoom(prev => Math.min(prev * 1.2, 3))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white"
            onClick={() => setZoom(prev => Math.max(prev * 0.8, 0.5))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white"
            onClick={resetView}
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
