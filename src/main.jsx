import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import Api from './ContextApi/Api.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
<Api>
    <App />
    </Api>
    </BrowserRouter>
  </React.StrictMode>,
)
