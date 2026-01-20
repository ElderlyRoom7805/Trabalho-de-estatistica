import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { JogadorProvider } from './context/constext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <JogadorProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </JogadorProvider>
  </StrictMode>,
)
