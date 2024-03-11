// importacionde parte de react context y state
//state es para datos que puedan ir cambiando de acuerdo a la interaccion de los usuarios mayormente las partes mas dinamicas
import {createContext, useEffect, useState } from 'react'
// import {categorias as categoriasDB} from "../data/categorias"
import { toast } from 'react-toastify'; 
import clienteAxios from '../config/axios';

const QuioscoContext = createContext();
    // un state se divide en tres partes
// las dos primeras del = a izquierda   la tercera en el parentesis de usestate 
// en la primera parte se hace array destructuring que es una expresión de JavaScript que permite desempacar valores de arreglos o propiedades de objetos en distintas variables.
// debemos crear un state para categorias puedes llamarse del mismo nombre y el segunda es una funcion que modifica ese state importante es que esa funcion set se usa por convencion seguido del nombre del State
// nomre del state|funcion para el state|valor inicial
const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({})
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([])
    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        const nuevoTotal = pedido.reduce( (total, producto) => (producto.precio * producto.
        cantidad) + total, 0)
        setTotal(nuevoTotal)
    },[pedido])

    const obtenerCategorias = async () =>{
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await clienteAxios('/api/categorias',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        } catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerCategorias();
    }, [])

    const handleClickCategoria = id => {
        // filter devulve un array nuevo y categoria es propio del arrow function
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    }
    // console.log(categoriaActual)
    const handleClickModal = () =>{
        setModal(!modal)
    }

    const handleSetProducto = producto =>{
        setProducto(producto)
    }

    const handleAgregarPedido = ({categoria_id, ...producto}) => {
        if(pedido.some( pedidoState => pedidoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.
            id ? producto : pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Guardado correctamente')
        }else{
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }
    }

    const handleEditarCantidad = id =>{
        const prodcutoactualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(prodcutoactualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id =>{
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Eliminado del pedido')
    }

    const handleSubmitNuevaOrden = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
             const {data} = await clienteAxios.post('/api/pedidos',
            {
                total,
                productos: pedido.map(producto => {
                    return {
                        id:producto.id,
                        cantidad: producto.cantidad
                    }
                })
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message)
            setTimeout(() => {
                setPedido([])
            },1000);
            //Cerrar la sesion del usuario
            setTimeout(() =>{
                localStorage.removeItem('AUTH_TOKEN');
                logout();
            },3000);
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickCompletarPedido = async id =>{
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error)
        }    
    }
    
    const handleClickProductoAgotado = async id =>{
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/productos/${id}`, null,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error)
        }    
    }


    return(
        <QuioscoContext.Provider
        // esto es un prop especial
            value={{
                //le pasamos el state para que este disponible
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }}
        >{children}</QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext