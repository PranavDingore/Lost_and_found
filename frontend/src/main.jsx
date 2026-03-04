// main.jsx - This should look like this
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'  // Default import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
export default App;