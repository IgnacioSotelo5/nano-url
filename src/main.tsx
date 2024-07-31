import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import './index.css'
import { PreviewContextProvider } from './components/pages/QRCodes/context/previewContext.tsx'
import { ContextProvider } from './context/sidebar.tsx'
import { ThemeProvider } from './context/themeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <PreviewContextProvider>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
     </PreviewContextProvider>
    </ContextProvider>
  </React.StrictMode>
)
