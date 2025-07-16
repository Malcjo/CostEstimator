
export default function PricingGroup({group, onChange, onRemove }) {

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', padding: '8px', border: '1px solid #ddd' }}>
            <div>
                <p>Group Name</p>
                <input type="text" placeholder="Input" />
            </div>


            <div>
                <button>
                    +
                </button>

                <button onClick={() => onRemove(group.id)}>
                    -
                </button>
            </div>
        </div>

    );
}

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