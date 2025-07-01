import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiUrl = window.estimatorApiUrl;
    if(!apiUrl){
      setError("API URL is not defined.");
      return;
    }

    fetch(apiUrl)
      .then(res => {
        if(!res.ok) throw new Error(`Error: ${res.status}`)
        return res.json();
    })
    .then(setData)
    .catch(err => setError(err.message));
  }, [])

  if (error) return <div style={{color: 'red'}}>Error: {error}</div>
  if (!data) return <div>Loading data...</div>

  return (
    <>
      <div style={{ padding: `1rem`}}>
        <h2>Funeral Estimator</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  )
}

export default App
