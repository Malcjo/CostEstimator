import {useState} from 'react';

export default function RadialComponent({label, options ={}, onChange}){

    const [selectedKey, setSelectedKey] = useState('');

    const groupName = `number-tracker-${label.replace(/\s+/g, '-')}`;

    const handleChange = (key, value) => {
        setSelectedKey(key);

        // If it's an object and has structured data
        if (value && typeof value === 'object') {
            // Check if it's ACF-style with "value" or "lower/higher"
            if ('value' in value || ('lower' in value && 'higher' in value)) {
                onChange && onChange({ label: key, ...value });
            }
        } else {
            // Basic number format: { "10 people": 10 } wrap it in same formatting style so it fits
            onChange && onChange({ label: key, type: 'fixed', value });
        }
    };

    return(
        <tr>
            <td>{label}</td>
            <td colSpan="2">
                {Object.entries(options).map(([OptionLabel, OptionValue]) => (
                    <label  key={OptionLabel} style={{ marginRight: '1em' }}>
                        <input
                            type = "radio"
                            name ={groupName}
                            checked={selectedKey === String(OptionLabel)}
                            onChange = {() => handleChange(OptionLabel, OptionValue)}
                        />
                        {OptionLabel}
                    </label>                
                ))}
            </td>
            <td>
                {selectedKey && (() => {
                    const val = options[selectedKey];
                    if (typeof val === 'object') {
                        if ('value' in val) return `$${val.value}`;
                        if ('lower' in val && 'higher' in val) return `$${val.lower} - $${val.higher}`;
                    } else if (typeof val === 'number') {
                        return `$${val}`;
                    }
                    return '';
                })()}
            </td>
        </tr>
    );
}