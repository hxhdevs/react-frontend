//export para poder importarla en otros componentes
                                //Arrow function
export const formatearDinero = cantidad =>{
    return cantidad.toLocaleString('es-US',{
        style: 'currency',
        currency:'USD'  
    })
}