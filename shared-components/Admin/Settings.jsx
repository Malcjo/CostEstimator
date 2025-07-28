

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
  }

  const uploadConfig = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (event) =>{
        try{
          const json = JSON.parse(event.target.result);
          onUploadConfig(json);
        }
        catch (err){
          console.error("Invalid JSON file", err);
        }
      };
      reader.readAsText(file);
    }
  }

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
