// Child component representing a single layout row
export default function LayoutRow({ row, onChange, onRemove }) {
  return (
    <div style={{display: 'flex',alignItems: 'center', marginBottom: '12px',padding: '8px',border: '1px solid #ddd',}}
    >
      <input type="text" placeholder="Input Label" value={row.label} onChange={e => onChange({ ...row, label: e.target.value })} style={{ marginRight: 8, flex: 2 }}/>
      
      <select value={row.type}onChange={e => onChange({ ...row, type: e.target.value })}style={{ marginRight: 8 }}>
        <option value="standard">Standard Dropdown</option>
        <option value="conditional">Conditional Dropdown</option>
      </select>
      
      <select value={row.pricingSet}onChange={e => onChange({ ...row, pricingSet: e.target.value })}style={{ marginRight: 8 }}>
        <option value="">Select pricing set</option>
        <option value="CasketPrices">Casket Prices</option>
        <option value="ServiceSheets">Service Sheets</option>
      </select>

      <button onClick={() => onRemove(row.id)} style={{backgroundColor: '#e74c3c',color: 'white',border: 'none',padding: '6px 10px',borderRadius: '4px',cursor: 'pointer',}}>
        −
      </button>
    </div>
  );
}