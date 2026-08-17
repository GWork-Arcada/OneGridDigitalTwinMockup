import { LayoutDashboard, Network, Activity, BookOpen, Building2, Settings } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'command-center', label: 'Command Center', icon: LayoutDashboard },
    { id: 'topology', label: 'Topology', icon: Network },
    { id: 'operations', label: 'Operations', icon: Activity },
    { id: 'scenario-library', label: 'Scenario Library', icon: BookOpen },
    { id: 'infrastructure', label: 'Infrastructure Planning', icon: Building2 },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-[#f4f4f4] border-r border-[#e0e0e0] flex flex-col">
      <div className="p-6 border-b border-[#e0e0e0]">
        <h1 className="text-[#161616]">OneGrid</h1>
        <p className="text-[#525252] text-sm mt-1">Digital Twin for Electricity Grid</p>
      </div>
      
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full px-6 py-3 flex items-center gap-3 transition-colors relative ${
                isActive ? 'bg-[#e0e0e0]' : 'hover:bg-[#e0e0e0]'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#0f62fe]" />
              )}
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#161616]' : 'text-[#0f62fe]'}`} />
              <span className={isActive ? 'text-[#161616] font-bold' : 'text-[#0f62fe]'}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
