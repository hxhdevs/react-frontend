import useQuiosco from "../hooks/useQuiosco"
// es un argumento que se pasa entre componentes de React
export default function Categoria({categoria}) {
    // console.log(categoria)
    const {handleClickCategoria, categoriaActual} = useQuiosco();
    const {icono, id, nombre} = categoria
    
  return (
     <div className={`${categoriaActual.id === id ? "bg-amber-400" : 'bg-white'} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
     {/* <div className={`${categoriaActual.id === id ? "bg-amber-400" : 'bg-white'} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}></div> */}

        <img
            alt="Imagen icono"
            src={`/img/icono_${icono}.svg`}
            className="w-12 "
        />
        <button 
          className="text-l font-bold cursor-buttonointer truncate"
          type="button"
          onClick={() => handleClickCategoria(id)}
          // colocar arrow function para evitar que se dispare solo
          >
            {nombre}
          </button>
    </div>
  )
}