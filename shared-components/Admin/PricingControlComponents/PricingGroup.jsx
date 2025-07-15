
export default function PricingGroup({}){

    return(
        <div style={{display: 'flex', alignItems:'center', marginBottom:'12px', padding:'8px', border:'1px solid #ddd'}}>
            <div>
            <p>Group Name</p>
            <input type="text" placeholder="Input"/>
            </div>


        <div>
            <button>
            +
            </button>

            <button>
            -
            </button>
        </div>
        </div>
        
    );
}