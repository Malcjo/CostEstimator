import { useState, useEffect } from 'react';
import EstimatorLayout from './EstimatorLayout';
import EstimatorDesign from './EstimatorDesign';
import PricingSettings from './PricingSettings';
import Settings from './Settings';

const tabs = ['Layout', 'Design', 'Pricing', 'Settings'];

export default function AdminPanelDashboard({ mode = 'client', isPro = false }) {
  const [activeTab, setActiveTab] = useState('Layout');

  const [config, setConfig] = useState({
    layout: [],
    pricing: [],
    design: {},
    settings: {}
  });

  useEffect(() => {
    fetch('/wp-json/cost-estimator/v1/config', {
    })
      .then(res => res.json())
      .then(data => {
        console.log('Loaded config from WP: ', data);
        if (data) {
          setConfig(data);
        }
      });
  }, []);

  const saveConfigToServer = (dataToSave = config) => {
    fetch('/wp-json/cost-estimator/v1/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': CE_APP_DATA.nonce
      },
      credentials: 'include',
      body: JSON.stringify(dataToSave),
    })
      .then(res => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Config saved!', data);
      })
      .catch(err => {
        console.error('Error saving config:', err);
      });
  };

  const handleConfigSectionUpdate = (key, value) => {
    setConfig(prev => {
      const updated = { ...prev, [key]: value };
      saveConfigToServer(updated);
      return updated
    })

  };

  const renderTab = () => {
    switch (activeTab) {
      case 'Layout':
        return (
          <EstimatorLayout
            layout={config.layout}
            onChange={(newLayout) => handleConfigSectionUpdate('layout', newLayout)}
            pricing_Groups={config.pricing}
          />
        );
      case 'Design':
        return <EstimatorDesign />;
      case 'Pricing':
        return <PricingSettings
          pricing={config.pricing}
          onChange={(newPricing) => handleConfigSectionUpdate('pricing', newPricing)}
        />;
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
