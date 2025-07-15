import { useState } from 'react';
import EstimatorLayout from './EstimatorLayout';
import EstimatorDesign from './EstimatorDesign';
import PricingSettings from './PricingSettings';
import Settings from './Settings';

const tabs = ['Layout', 'Design', 'Pricing', 'Settings'];

export default function AdminPanelDashboard({ mode = 'client', isPro = false }) {
  const [activeTab, setActiveTab] = useState('Layout');

  const [config, setConfig] = useState({
    layout:[],
    pricing:{},
    design:{},
    settings:{}
  });

  const handleConfigSectionUpdate = (key, value) =>{
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'Layout':
        return (
          <EstimatorLayout
            layout={config.layout}
            onChange={(newLayout) => handleConfigSectionUpdate('layout', newLayout)}
          />
        );
      case 'Design':
        return <EstimatorDesign />;
      case 'Pricing':
        return <PricingSettings 
        layout ={config.pricing}
        onChange={(newConfig) =>{
        }} />;
      case 'Settings':
        return <Settings mode={mode} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1em', borderBottom: '1px solid #ccc', paddingBottom: '0.5em' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              padding: '0.5em 1em',
              border: 'none',
              background: 'red',
              cursor: 'pointer',
              borderBottom: activeTab === tab ? '2px solid #000' : 'none',
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '1em' }}>
        {renderTab()}
      </div>
    </div>
  );
}
