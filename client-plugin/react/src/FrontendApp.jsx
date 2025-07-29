import './App.css';
import EstimatorApp from '@shared/Estimator-Component/EstimatorApp.jsx';
import { useState, useEffect } from 'react';

export default function FrontendApp() {
  const [config, setConfig] = useState(null);
    //this might need to be changed later, or this whole thing will need to be copied when making for the Host side
    //need the ability to change the config depending on what API ID is given in the shortcode
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