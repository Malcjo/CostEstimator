import React, { useState, useEffect } from 'react';
import LayoutRow from './LayoutRow';


export default function EstimatorLayoutRow({rows, onConfigChange, pricingGroups}) {

  const addMainRow = () =>{
    const newRows = {
        id: Date.now(), 
        label: '', 
        type: '', 
        pricingSet: '' 
      };
    onConfigChange([...rows, newRows]);
    console.log(newRows);
  }
  const updateRow = (updatedRow) =>{
    const newRows = rows.map(row =>{
      return row.id === updatedRow.id ? updatedRow : row
    });
    onConfigChange(newRows);
  };
  const removeMainRow = (id) => {
    const newRows = rows.filter(row => row.id !== id);
    onConfigChange(newRows);
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: 1, padding: 16, borderRight: '1px solid #ccc' }}>
        <h1>Estimator Layout Control</h1>

        {rows.map(row => (
          <LayoutRow
            key={row.id}
            row={row}
            onChange={updateRow}
            onRemove={removeMainRow}
            pricingGroups={pricingGroups}
          />
        ))}
      </div>

      {/* Side Column */}
      <div
        style={{
          width: '80px',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}
      >
        <button
          onClick={addMainRow}
          style={{
            padding: '8px 12px',
            fontSize: '16px',
            alignSelf: 'center'
          }}
        >
          (+)
        </button>
      </div>
    </div>
  );
}
