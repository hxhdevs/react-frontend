// Con esto evitas el flasheo al hacer reload de site en site
import { createRef, useState } from 'react';
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  
  const emailRef = createRef();
  const passwordRef = createRef();

  const [errores, setErrores] = useState([])
  const {login} = useAuth({
    middleware: 'guest',
    url: '/'
  })

  const handleSubmit = async e => {
    e.preventDefault();

    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    login(datos, setErrores)
  }
  return (
    <>
        <h1 className="text-4xl font-black">Iniciar sesion</h1>
        <p>Inicia sesion para poder hacer tus pedidos</p>
        
        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
            <form
              onSubmit={handleSubmit}
              noValidate
            >
                 {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                 <div className="mb-4">
                    <label 
                    className="text-slate-800"
                    htmlFor="correo"
                    >Correo:</label>
                    <input
                        type="text"
                        id="correo"
                        className="mt-2 w-full p-2 bg-gray-50"
                        name="correo"
                        placeholder="Tu correo"
                        ref={emailRef}
                    />
                 </div>
                 <div className="mb-4">
                    <label 
                    className="text-slate-800"
                    htmlFor="name"
                    >Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="mt-2 w-full p-2 bg-gray-50"
                        name="password"
                        placeholder="Tu password"
                        ref={passwordRef}
                    />
                 </div>
                 <input
                  type="submit"
                  value="Iniciar sesion"
                  className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                  />
            </form>
        </div>
        <nav className="mt-5">
          <Link to="/auth/registro">
            No tienes cuenta? Crea Una
          </Link>
        </nav>
      </>
  )
}
