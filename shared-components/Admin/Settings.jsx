

export default function Settings({ mode, config, onUploadConfig }) {
  const downloadConfigAsJSON = (config) =>{
    const jsonString = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonString], {type:"application/json"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "cost_estimator_config.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  const uploadConfig = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (event) =>{
        try{
          const json = JSON.parse(event.target.result);

          const isValid = validateConfig(json);
          if(!isValid){
            alert("Invalid JSON structure. Make sure it has layout[], pricing[], design{}, and settings{}");
            return;
          }
          onUploadConfig(json);
        }
        catch (err){
          console.error("Invalid JSON file", err);
        }
      };
      reader.readAsText(file);
    }
  };

    const validateConfig = (data) => {
    if (typeof data !== "object" || data === null) return false;

    const hasLayout = Array.isArray(data.layout);
    const hasPricing = Array.isArray(data.pricing);
    const hasDesign = typeof data.design === "object" && data.design !== null;
    const hasSettings = typeof data.settings === "object" && data.settings !== null;

    return hasLayout && hasPricing && hasDesign && hasSettings;
  };
  return (
    <div>
      <div>
        <p>Settings</p>
        <p>Mode: {mode === 'host' ? 'Host' : 'Client'}</p>
      </div>
      <div>
        <button
          onClick={() => downloadConfigAsJSON(config)}
          style={{ marginLeft: '1em', padding: '0.5em', background: '#0073aa', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Download Config
        </button>
        <input
          type="file"
          accept="applicaiton/json"
          onChange={uploadConfig}
        
        />
      </div>
    </div>
  );
}
