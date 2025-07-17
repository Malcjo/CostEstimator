export default function PricingItem({item, onChange, onRemove}){
  const handleChange = (field, value) => {
    onChange({ ...item, [field]: value });
  };

  return (
    <div style={{ marginBottom: '6px' }}>
      <input
        type="text"
        placeholder="Label"
        value={item.label}
        onChange={(e) => handleChange('label', e.target.value)}
      />

      {item.isRange ? (
        <>
          <input
            type="number"
            placeholder="Lower"
            value={item.lower}
            onChange={(e) => handleChange('lower', e.target.value)}
          />
          <input
            type="number"
            placeholder="Upper"
            value={item.upper}
            onChange={(e) => handleChange('upper', e.target.value)}
          />
        </>
      ) : (
        <input
          type="number"
          placeholder="Price"
          value={item.value}
          onChange={(e) => handleChange('value', e.target.value)}
        />
      )}

      <label style={{ marginLeft: '8px' }}>
        <input
          type="checkbox"
          checked={item.isRange}
          onChange={(e) => handleChange('isRange', e.target.checked)}
        /> Range
      </label>

      <button onClick={() => onRemove(item.id)} style={{ marginLeft: '6px' }}>−</button>
    </div>
  );
}