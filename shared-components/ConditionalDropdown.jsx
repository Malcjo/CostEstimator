import { useState, usEffect } from "react";

export default function ConditionalDropdown({
    label, 
    options ={}, 
    onSelect, 
    Conditions = {}
}){
    const [selected, setSelected] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setSelected(value);
        onSelect && onSelect(options[value]);
    }

    const mainRow= (
        <tr>
            <td>{label}</td>
            <td>
            <select value={selected} onChange={handleChange}>
                    <option value="">Select</option>
                        {/* dynamically creates the dropdown lsit based off of the options object that is passed in*/}
                        {/*Object.entries(options.map) turns into a map */}
                    {Object.entries(options).map(([key, value]) => (
                        <option key ={key} value={key}>
                            {key.replace(/_/g,' ')} {/* replaces underscores with a space */}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                {selected && options[selected] && options[selected].type === "fixed"
                    ? `$${options[selected].value}`
                    : selected && options[selected] && options[selected].type === "range"
                    ? `$${options[selected].lower} - $${options[selected].higher}`
                    : "-"}
            </td>
        </tr>

    );

    const conditionalRow = 
        selected && Conditions[selected] 
        ? Conditions[selected]
        : null;
    return(
        <>
            {mainRow}
            {conditionalRow}
        </>
    );
}