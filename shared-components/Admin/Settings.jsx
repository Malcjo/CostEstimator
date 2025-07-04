export default function Settings({ mode }) {
  return (
    <div>
      <p>Settings</p>
      <p>Mode: {mode === 'host' ? 'Host' : 'Client'}</p>
    </div>
  );
}
