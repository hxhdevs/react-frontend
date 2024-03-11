import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from "./layouts/AuthLayout"
import Layout from './layouts/Layout'
import Inicio from './views/Inicio'
import Login from './views/Login'
import Registro from './views/Registro'
import Ordenes from './views/Ordenes'
import Productos from './views/Productos';
import AdminLayout from './layouts/AdminLayout';

const router = createBrowserRouter([
    {
        path: '/',
        element:<Layout />,
        // para podr hacer uso de inicio tienes que pasarlo con Outlet para que pueda utilizar el componente es como decirle que puede llamar su hijo
        children:[
            {
                index:true,
                element: <Inicio />
            }
        ]

    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children:[
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/registro',
                element: <Registro />
            }
        ]
    },
    {
        path: '/admin',
        element:<AdminLayout />,
        children: [
            {
                index:true,
                element: <Ordenes />
            },
            {
                path: '/admin/productos',
                element: <Productos/>
            }
        ]
    }
    
])

export default  router