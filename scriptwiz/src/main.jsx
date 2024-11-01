import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createHashRouter,
  RouterProvider
} from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import {FileProvider} from './contexts/fileContext.jsx'

const router = createHashRouter([
  {
    path: "/*",
    element: <App />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FileProvider>
      <App />
    </FileProvider>
  </StrictMode>,
)
