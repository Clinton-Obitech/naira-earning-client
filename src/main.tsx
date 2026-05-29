import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ConfirmModalProvider, ErrorModalProvider, ErrorRedirectModalProvider, SuccessModalProvider, SuccessRedirectModalProvider } from './context/ModalContext.tsx'
import { LoggedProvider } from './context/LoggedContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfirmModalProvider>
        <SuccessRedirectModalProvider>
          <ErrorRedirectModalProvider>
            <SuccessModalProvider>
              <ErrorModalProvider>
                <LoggedProvider>
                <App />
                </LoggedProvider>
              </ErrorModalProvider>
            </SuccessModalProvider>
          </ErrorRedirectModalProvider>
        </SuccessRedirectModalProvider>
      </ConfirmModalProvider>
    </BrowserRouter>
  </StrictMode>,
)
