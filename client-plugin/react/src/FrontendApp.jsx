import './App.css';
import EstimatorApp from '@shared/Estimator-Component/EstimatorApp.jsx';
import { useState, useEffect } from 'react';

export default function FrontendApp() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch('/wp-json/cost-estimator/v1/config')
      .then((res) => res.json())
      .then((data) => setConfig(data));
  }, []);

  if (!config) {
    return <div>Loading Cost Estimator...</div>;
  }

  return <EstimatorApp config={config} />;
}