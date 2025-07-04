import { useState } from 'react';

export default function NumberTracker({ label, options = {}, allowCustom = false, onChange }) {
    const [selectedValue, setSelected] = useState('');
    const [customValue, setCustomValue] = useState('');

    const groupName = `number-tracker-${label.replace(/\s+/g, '-')}`;

    const handleChange = (value) => {
        setSelected(String(value));
        const num = Number(value);
        onChange && onChange(isNaN(num) ? 0 : num);// isNaN checks if it is Not a Number, true set to 0, false set to num
    };

    const handleCustomChange = (e) => {
        const val = e.target.value;
        setCustomValue(val);
        const num = Number(val);
        if(selectedValue === 'custom'){
            onChange && onChange(isNaN(num) ? 0 : num); 
        }
        
    };

    const displayNumber = selectedValue === 'custom' ? Number(customValue) : Number(selectedValue);

    return (
        <tr>
            <td>{label}</td>
            <td colSpan="2">
                {Object.entries(options).map(([OptionLabel, OptionValue]) => (
                    <label key={OptionLabel} style={{ marginRight: '1em' }}>
                        <input
                            type="radio"
                            name={groupName}
                            value={OptionValue}
                            checked={selectedValue === String(OptionValue)}
                            onChange={() => handleChange(OptionValue)}
                        />
                        {OptionLabel}
                    </label>
                ))}

                {allowCustom && (
                    <>
                        <label>
                            <input
                                type="radio"
                                name={groupName}
                                value="custom"
                                checked={selectedValue === 'custom'}
                                onChange={() => setSelected('custom')}
                            />
                            Custom:
                        </label>
                        {selectedValue === 'custom' && (
                            <input
                                type="number"
                                value={customValue}
                                onChange={handleCustomChange}
                                style={{ marginLeft: '0.5em', width: '60px' }}
                                disabled={selectedValue !== 'custom'}
                            />
                        )}
                    </>
                )}
            </td>
            <td>
                {isNaN(displayNumber) ? '' : displayNumber}
            </td>
        </tr>
    );
}