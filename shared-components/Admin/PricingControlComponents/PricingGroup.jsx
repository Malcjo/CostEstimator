
import PricingItem from "./PricingItem";

export default function PricingGroup({group, onChange, onRemove }) {

  const updateGroupName = (e) => {
    onChange({ ...group, groupName: e.target.value });
  };

  const addItem = () => {
    
    const newItem = {
      id: Date.now(),
      label: '',
      value: '',
      lower: '',
      upper: '',
      isRange: false,
      taskCount:1,
    };
    console.log("added new Item", newItem);
    onChange({ ...group, items: [...(group.items || []), newItem] });
    console.log(group);
  };

  const updateItem = (updatedItem) => {
    const newItems = group.items.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    onChange({ ...group, items: newItems });
  };

  const removeItem = (id) => {
    const newItems = group.items.filter(item => item.id !== id);
    onChange({ ...group, items: newItems });
  };

    return (
    <div style={{ marginBottom: '16px', padding: '12px', border: '1px solid #ccc' }}>
      <div style={{ marginBottom: '8px' }}>
        <label>Group Name:</label>
        <input
          type="text"
          value={group.groupName}
          onChange={updateGroupName}
          style={{ marginLeft: '8px' }}
        />
        <button onClick={() => onRemove(group.id)} style={{ marginLeft: '12px' }}>Delete Group</button>
      </div>

      {group.items.map(item => (
        <PricingItem
          key={item.id}
          item={item}
          onChange={updateItem}
          onRemove={removeItem}
        />
      ))}

      <button onClick={addItem}>+ Add Item</button>
    </div>
    );
};

{
    /*
    group and item structure
    [
  {
    id: 1,
    groupName: "Casket Prices",
    items: [
      { id: 1, label: "Standard", value: 1000, isRange: false },
      { id: 2, label: "Deluxe", lower: 1500, upper: 2500, isRange: true }
    ]
  },
  ...
]

*/
}