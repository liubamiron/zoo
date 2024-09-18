import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {LanguageProvider} from "./providers";

// way to log environment variables in Vite
console.log(import.meta.env.VITE_API_URL, import.meta.env.VITE_URL);


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <LanguageProvider>
            <App />
            </LanguageProvider>
        </BrowserRouter>
    </StrictMode>
)
