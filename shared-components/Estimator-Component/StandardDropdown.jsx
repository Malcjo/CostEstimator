import { useState, useEffect } from "react";


export default function StandardDropdown({label, options = {}, onSelect}){
//porperties for the component, label, options, onSelect
    const [selected, setSelected] = useState('');//stores currently selected key from dropdown
    const [cost, setCost] = useState('-');//stores value from cost column

    useEffect(() =>{
        //This fires whenever selected changes
        //updats the cost of the new selection
        //notifies the parent component of the selection change, only if onSelect is provided
        if(selected && options[selected]){
            setCost(options[selected]);
            onSelect && onSelect(options[selected]);
        }
        //if nothing or no valid option selected then set cost to a neutral
        //and send back 0 for onSelect
        else{
            setCost('-');
            onSelect && onSelect(0);
        }
    }, [selected]);

    return(
        <tr>
            <td>{label}</td>
            <td>
                <select value={selected} onChange={(e) => setSelected(e.target.value)}>
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
                {
                    cost === '-' ? '-' :
                    cost.type ==='fixed' ? `$${cost.value}` :
                    cost.type === 'range' ? `$${cost.lower} - $${cost.higher}`:
                    'Invalid'
                }
            </td>
        </tr>
    );
}