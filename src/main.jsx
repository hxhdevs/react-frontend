import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './index.css'
import { QuioscoProvider } from './context/QuioscoProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
// el modo strcito imprime doble para buscar errores si se comenta solo imprime uno  
  <React.StrictMode>
    <QuioscoProvider>
      <RouterProvider router={router}/>
    </QuioscoProvider>
  </React.StrictMode>,
)
