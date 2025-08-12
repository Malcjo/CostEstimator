// Admin REST helpers (nonce-aware) for your CE_APP_DATA setup
const BOOT = typeof CE_APP_DATA !== 'undefined' ? CE_APP_DATA : {};

function base() {
  return BOOT.restUrl || '/wp-json/cost-estimator/v1';
}
function headers() {
  const h = { 'Content-Type': 'application/json' };
  if (BOOT.nonce) h['X-WP-Nonce'] = BOOT.nonce;     // <-- send the nonce
  return h;
}

export async function loadConfig(client = BOOT.client || 'default') {
  const res = await fetch(`${base()}/config?client=${encodeURIComponent(client)}`, {
    method: 'GET',
    headers: headers(),
    credentials: 'same-origin', // include WP cookies
  });
  if (!res.ok) throw new Error(`Load failed (${res.status})`);
  return res.json();
}

export async function saveConfig(config, client = BOOT.client || 'default') {
  const res = await fetch(`${base()}/config?client=${encodeURIComponent(client)}`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(config),
    credentials: 'same-origin', // include WP cookies
  });
  if (!res.ok) throw new Error(`Save failed (${res.status})`);
  return res.json();
}
