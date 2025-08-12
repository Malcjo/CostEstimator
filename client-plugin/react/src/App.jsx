import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AdminPanelDashboard from '@shared/Admin/AdminPanelDashboard.jsx';
//use the nonce-aware helpers
import { loadConfig, saveConfig } from './admin/api';

import './App.css'

function App() {

const mode = window.CE_APP_DATA?.mode;
const isPro = window.CE_APP_DATA?.pro;
const client = window.CE_APP_DATA?.client || 'default';


  return (
    <>
    <div>
      <AdminPanelDashboard 
      mode={mode} 
      isPro={isPro} 
      loadConfig = {loadConfig}
      saveConfig={saveConfig}
      />
    </div>
    </>
  )
}

export default App
