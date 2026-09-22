import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProviders } from '@/app/providers'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element #root not found')
}

createRoot(rootElement).render(
  <StrictMode>
    {/* Global providers: Redux, React Query, (future: theme, etc.) */}
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
