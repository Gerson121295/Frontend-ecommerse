import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { EcommerceApp } from './EcommerceApp.jsx'
//import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EcommerceApp />
  </StrictMode>,
)
