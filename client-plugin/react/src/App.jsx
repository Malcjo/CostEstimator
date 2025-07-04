import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AdminPanelDashboard from '@shared/Admin/AdminPanelDashboard.jsx';

import './App.css'

function App() {

const mode = window.CE_APP_DATA?.mode;
const isPro = window.CE_APP_DATA?.pro;


  return (
    <>
    <div>
      <AdminPanelDashboard mode={mode} isPro={isPro} />
    </div>
    </>
  )
}

export default App
