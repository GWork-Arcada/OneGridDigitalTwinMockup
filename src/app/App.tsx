import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { CommandCenter } from './components/CommandCenter';
import { TopologyView } from './components/TopologyView';
import { OperationsView } from './components/OperationsView';
import { ScenarioLibrary } from './components/ScenarioLibrary';
import { InfrastructurePlanning } from './components/InfrastructurePlanning';
import { SystemSettings } from './components/SystemSettings';

export default function App() {
  const [activePage, setActivePage] = useState('command-center');

  const renderPage = () => {
    switch (activePage) {
      case 'command-center':
        return <CommandCenter onNavigate={setActivePage} />;
      case 'topology':
        return <TopologyView />;
      case 'operations':
        return <OperationsView />;
      case 'scenario-library':
        return <ScenarioLibrary />;
      case 'infrastructure':
        return <InfrastructurePlanning />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <CommandCenter onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      {renderPage()}
    </div>
  );
}
