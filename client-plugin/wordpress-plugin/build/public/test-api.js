window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('http://host.local/wp-json/estimator/v1/check-key', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ key: 'TEST123' })
    });

    const data = await res.json();
    console.log('API response:', data);
  } catch (err) {
    console.error('API test failed:', err);
  }
});
