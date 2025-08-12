import './App.css';
import EstimatorApp from '@shared/Estimator-Component/EstimatorApp.jsx';
import { useState, useEffect } from 'react';

export default function FrontendApp() {
  /*
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
  */

    const [config, setConfig] = useState(null);
  const [error, setError] = useState(null);

  async function loadConfig(client) {
    // Use localized REST base if provided, otherwise default
    const base = (typeof COST_ESTIMATOR_BOOT !== 'undefined' && COST_ESTIMATOR_BOOT.restUrl)
      ? COST_ESTIMATOR_BOOT.restUrl
      : '/wp-json/cost-estimator/v1';

    const headers = {};
    if (typeof COST_ESTIMATOR_BOOT !== 'undefined' && COST_ESTIMATOR_BOOT.nonce) {
      headers['X-WP-Nonce'] = COST_ESTIMATOR_BOOT.nonce; // harmless if GET is public
    }

    // Try client-aware first; fall back to plain /config
    let res = await fetch(`${base}/config?client=${encodeURIComponent(client || 'default')}`, { headers });
    if (!res.ok) {
      res = await fetch(`${base}/config`, { headers });
    }
    if (!res.ok) {
      throw new Error(`Failed to load config (${res.status})`);
    }
    return res.json();
  }

  useEffect(() => {
    let cancelled = false;

    const client =
      (typeof COST_ESTIMATOR_BOOT !== 'undefined' && COST_ESTIMATOR_BOOT.client)
        ? COST_ESTIMATOR_BOOT.client
        : 'default';

    loadConfig(client)
      .then(data => { if (!cancelled) setConfig(data); })
      .catch(err => {
        console.error(err);
        if (!cancelled) setError(err.message);
      });

    return () => { cancelled = true; };
  }, []);

  if (error) return <div>Failed to load cost estimator: {error}</div>;
  if (!config) return <div>Loading Cost Estimator...</div>;

  return <EstimatorApp config={config} />;
}