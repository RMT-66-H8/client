import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ProductProvider } from './context/product'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ProductProvider>
          <App />
        </ProductProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
