
import { useEffect } from "react"
import useSWR from "swr"
import clienteAxios from "../config/axios"
import { Navigate, useNavigate } from "react-router-dom"

export const useAuth = ({middleware, url}) => {
    
    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()

    const {data:user, error, mutate} = useSWR('/api/user', () =>
        clienteAxios('/api/user',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error =>{
            throw Error(error?.response?.data?.errors)
        })
    )

    const login = async (datos, setErrores) =>{
    try {
        const {data} = await clienteAxios.post('/api/login',datos)
        localStorage.setItem('AUTH_TOKEN', data.token);
        setErrores([])
        await mutate()
        // console.log(data.token)
        } catch (error) {
            // console.log(error)
            setErrores(Object.values(error.response.data.errors))
        }
    }
    
    const registro = async (datos, setErrores) =>{
        try {
            const {data} = await clienteAxios.post('/api/registro',datos)
            localStorage.setItem('AUTH_TOKEN', data.token);
            // console.log(data.token)
        } catch (error) {
            setErrores(Object.values(error.response.data.errors))
        }
    }

    const logout = async () =>{
        // console.log('click')
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }
    
    useEffect(() => {
        if(middleware === 'guest' && url && user){
            navigate(url)
        }
        if(middleware === 'guest' && user && user.admin){
            navigate('/admin');
        }
        if(middleware === 'admin' && user && !user.admin){
            navigate('/');
        }
        if (middleware === 'auth' && error) {
            navigate('/auth/login')
        }
    },[user, error])

    // console.log(middleware)
    // console.log(url)

    return {
        login,
        registro,
        logout,
        user,
        error
    }
}