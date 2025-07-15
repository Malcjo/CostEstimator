import React, { useState, useEffect } from "react";
import PricingGroup from "./PricingGroup";

export default function PricingSettingsRow({ rows: propRows, onConfigChange }) {

  const [rows, setRows] = useState();
  
  let Rows = { emptyRows: [] };
  if (propRows) {
    Rows = propRows;
  }
  
  useEffect(() => { setRows(Rows); }, [Rows]);
  useEffect(() => { onConfigChange(Rows); }, [Rows]);
  return (
    <div>
        <p>Testing</p>
        <h2> Pricing Settings Row</h2>
        <PricingGroup/>
    </div>
    
  );
}
