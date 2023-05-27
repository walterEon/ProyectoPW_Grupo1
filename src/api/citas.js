export const citas = [
    {nombreprof: "Alejandro Jimenez", especialidad: "Ingeniería de Software",
    fecha: '2023-05-28', curso:"Programación Web", estrella:"", comentario:""},
    {nombreprof: "Juan Perez", especialidad: "Ingeniería Informática",
    fecha: '2023-05-27', curso:"Programación Móvil", estrella:"", comentario:""},
    {nombreprof: "Mateo Villanueva", especialidad: "Ingeniería de Sistemas",
    fecha: '2023-05-30', curso:"Gestión de riesgos", estrella:"", comentario:""},
    
 ]
 
 const save = (cita) =>{
    
    citas.push(cita)
 }
 
 const getAll = () =>{
    return citas;
 }
 
 const actualizar = (citas, nombreprof, objetoActualizado) => {
    const arregloActualizado = citas.map((elemento) => {
       if(elemento.nombreprof === nombreprof){
          return {...elemento, ...objetoActualizado};
       }
       return elemento;
    });
    return arregloActualizado;
 }
 
 const CitaApi = {save, getAll, actualizar}
 
 export default CitaApi;