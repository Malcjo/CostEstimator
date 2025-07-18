// Child component representing a single layout row
export default function LayoutRow({ row, onChange, onRemove, pricingGroups }) {
  const handlePricingSetChange = (e) =>{
    onChange({ ...row, pricingSet: e.target.value});
  }
  return (
    <div style={{display: 'flex',alignItems: 'center', marginBottom: '12px',padding: '8px',border: '1px solid #ddd',}}>
      <div>
        <label>Label:</label>
        <input 
        type="text" 
        placeholder="Input Label" 
        value={row.label} 
        onChange={e => onChange({ ...row, label: e.target.value })} 
        style={{ marginRight: 8, flex: 2 }}/>
      </div>
      
      <div>
        <label>Pricing Group:</label>
        <select value={row.pricingSet || '' } onChange={handlePricingSetChange} style={{ marginRight: 8 }}>
        <option value="">-- Select Pricing Group --</option>
        {pricingGroups.map(group =>(
          <option key={group.id} value={group.groupName}>
            {group.groupName}
          </option>
        ))}
      </select>
      </div>

      <button onClick={() => onRemove(row.id)} style={{backgroundColor: '#e74c3c',color: 'white',border: 'none',padding: '6px 10px',borderRadius: '4px',cursor: 'pointer',}}>
        −
      </button>
    </div>
  );
}