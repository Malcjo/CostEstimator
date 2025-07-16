import React, { useState, useEffect } from "react";
import PricingGroup from "./PricingGroup";

export default function PricingSettingsRow({ rows, onConfigChange }) {

  const addMainRow = () =>{
    const newGroup = {
      id: Date.now(),
      groupName:'',
      items: []
    };
    onConfigChange([...rows, newGroup]);
  }

  const updateGroup = (updatedGroup) =>{
    const newRows = rows.map(group =>{
      group.id === updateGroup.id ? updateGroup : group
    });
    onConfigChange(newRows);
  }

  const removeGroup = (id) =>{
    const newGroup = rows.filter(group => group.id !== id);
    onConfigChange(newGroup);
  }

  return (
    <div style ={{display: 'flex', height: '100%'}}>
      <div style ={{flex:1, padding:16, borderRight: '1px solid #ccc'}}>
        <h1> Pricing Settings Row</h1>

        {rows.map(group =>(
        <PricingGroup
          key = {group.id}
          group = {group}
          onChange={updateGroup}
          onRemove={removeGroup}
        />   
        ))}

      </div>
        <div style={{
          width: '80px',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}>
          <button onClick={addMainRow}>
            (+)
          </button>
        </div>

    </div>
    
  );
}
