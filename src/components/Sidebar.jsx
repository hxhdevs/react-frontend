import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"
import { useAuth } from "../hooks/useAuth"

export default function Sidebar() {
    
    const {categorias} = useQuiosco()
    const {logout} = useAuth({middleware: 'auth'})

    return (
    <aside className="md:w-72">
      <div className="p-4">
        <img 
            className="w-40"
            src="img/logo.svg"
            alt="Imagen logo"
        />
      </div>
      <p className="my-10 text-xl text-center">Hola: {user?.name}</p>
      {/* el foreach solo itera pero no genera nuevos arreglos a diferencia del .map */}
      <div className="mt-10">
        {categorias.map(categoria =>(
            <Categoria 
            // siempre se espera key siempre que se este iterando una coleccion o arreglo
            key={categoria.id}
            // si lleva llaves es porque se usa js
            categoria={categoria}
            />
        ))}
      </div> 
      <div>
        <button
            type="button"
            className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
            onClick={logout}
        >
            Cancelar orden
        </button>
      </div>
    </aside>
  )
}
