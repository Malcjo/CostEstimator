import { useState, useEffect } from 'react';
import EstimatorLayout from './EstimatorLayout';
import EstimatorDesign from './EstimatorDesign';
import PricingSettings from './PricingSettings';
import Settings from './Settings';



const tabs = ['Layout', 'Design', 'Pricing', 'Settings'];

// Optional: keep UI safe if server returns odd data
function normalize(cfg) {
  if (!cfg || typeof cfg !== 'object') {
    return { version: 1, layout: [], pricing: [], design: {}, settings: {} };
  }
  return {
    version: cfg.version || 1,
    layout: Array.isArray(cfg.layout) ? cfg.layout : [],
    pricing: Array.isArray(cfg.pricing) ? cfg.pricing : (cfg.pricing || []),
    design: cfg.design || {},
    settings: cfg.settings || {},
  };
}

export default function AdminPanelDashboard({ 
  mode = 'client', 
  isPro = false,
loadConfig,
saveConfig }) {
  const [activeTab, setActiveTab] = useState('Layout');

  const [config, setConfig] = useState({
    layout: [],
    pricing: [],
    design: {},
    settings: {}
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Prefer the localized client (from CE_APP_DATA); fallback to 'default'
  const client = (typeof CE_APP_DATA !== 'undefined' && CE_APP_DATA.client) ? CE_APP_DATA.client : 'default';

  // Load using api (nonce/restUrl handled automatically)
  useEffect(() => {
    let cancelled = false;
    setError(null);
    loadConfig(client)
      .then(data => { if (!cancelled) setConfig(normalize(data)); })
      .catch(err => { if (!cancelled) setError(err.message || 'Failed to load'); });
    return () => { cancelled = true; };
  }, [client]);

  // Save using api
  async function saveConfigToServer(dataToSave = config) {
    try {
      setSaving(true);
      setError(null);
      await saveConfig(dataToSave, client);
      // optional: console.log('Config saved!');
    } catch (err) {
      setError(err.message || 'Failed to save');
      // optional: console.error('Error saving config:', err);
    } finally {
      setSaving(false);
    }
  }




  const handleConfigSectionUpdate = (key, value) => {
    setConfig(prev => {
      const updated = { ...prev, [key]: value };
      saveConfigToServer(updated);
      return updated
    })
  };

  const handleUpdateConfig=(newConfig) =>{
    setConfig(newConfig);
    saveConfigToServer(newConfig);
  }

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
        return (
          <Settings
            mode={mode} 
            config={config}
            onUploadConfig={handleUpdateConfig}
            />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ maxHeight: '90vh', padding: '1em' }}>
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
      <div style={{ height: 'calc(100vh - 80px)', marginTop: '1em', overflowY: 'auto', }}>
        {renderTab()}
      </div>
    </div>
  );
}



  /*

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

  */

  
/*
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
*/