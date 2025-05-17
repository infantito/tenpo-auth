import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './index.css'

import App from './app.tsx'

const root = document.getElementById('root')

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
