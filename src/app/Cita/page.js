'use client';
import Cancelar from '../../components/Card_cancelar/profe/Card_cancelar.jsx'
import Cancelar2 from '../../components/Card_cancelar/estudiante/Card_can.jsx'
import '../Cita/style1.css'
import Button from 'react-bootstrap/Button'
import React from 'react';
import CitasApi from '../../api/citas.js';
import PersonasApi from '../../api/personas.js';
import CursosApi from '../../api/cursos.js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

const Cita = () => {
    const fechaSistema = new Date();
    const [citasOriginal, setCitasOriginal] = useState([]);
    const [citasFiltrado, setCitasFiltrado] = useState([]);
    const [numeroCitas, setNumeroCitas] = useState(0);
    const [usuarios, setUsuarios ] = useState([]);
    const [sesion , setSesion] = useState({});
    const [cursos, setCursos ] = useState([]); 

 

    const filtrarFecha = async (citasOriginal, sesion) =>{ 
        let citasFiltradas = []
        if(sesion.idRol == 1){
            citasFiltradas = citasOriginal.filter(elemento => (new Date(elemento.fecha) > fechaSistema && elemento.idPersonaAlumno == sesion.idPersona));
            //setCitasFiltrado(citasFiltradas)
        }else{
            citasFiltradas = citasOriginal.filter(elemento => (new Date(elemento.fecha) > fechaSistema && elemento.idPersonaDocente == sesion.idPersona));
            //setCitasFiltrado(citasFiltradas)
        }
        return citasFiltradas;
    };
    

      useEffect(()=>{
        const handleOnLoad = async () => {
            const result = await CitasApi.findAll();
            setCitasOriginal(result.data);
            let datos = result.data
            const result2 = await PersonasApi.findAll();
            setUsuarios(result2.data);
            const result3 = await CursosApi.findAll();
            setCursos(result3.data);
            let sesionGuardada = localStorage.getItem("sesion");
            if(sesionGuardada == undefined){
                router.push('/')
            }
            setSesion(JSON.parse(sesionGuardada))
            const citasFiltradasA = await filtrarFecha(datos, (JSON.parse(sesionGuardada))); 
            setCitasFiltrado(citasFiltradasA)
            setNumeroCitas(datos.length)
        }
        handleOnLoad();
        

    },[])

    const handleDeleteCard =  async (elem) => {
        if(numeroCitas=== citasOriginal.length){
            const nuevaCitasFiltrado = citasFiltrado.filter(item => item.idCita == elem.idCita);
            setCitasFiltrado(nuevaCitasFiltrado);
            setNumeroCitas(numeroCitas-1-(citasOriginal.length-citasFiltrado.length));
            console.log(citasFiltrado.length)
            console.log(numeroCitas)
        }else{
            const nuevaCitasFiltrado = citasFiltrado.filter(item => item.idCita == elem.idCita);
            setCitasFiltrado(nuevaCitasFiltrado);
            setNumeroCitas(numeroCitas-1);
            console.log(citasFiltrado.length)
            console.log(numeroCitas)
        }
        const result = await CitasApi.remove(elem.idCita);
           
      };
      const router = useRouter()
      const handleClick1 =()=>{
        router.push('/reserva_busq')

      }
      const handleClick =()=>{
        router.push('/citaspasadas')

}

            return(
                    <div className='cuerpo'>
                        
                        <div className='arriba'>
                            <h2 className='titulo'>Mis citas</h2>
                            <Button variant="outline-secondary" className='programar' onClick={handleClick1}>Programar una cita</Button>
                        </div>
                        <br></br>
                        <br></br>
                        <div>
                            <hr></hr> 
                        </div>
                        <div>
                            <h4 className='titulo'>Citas de asesoría reservadas</h4>
                            <Button variant="outline-secondary" className='programar2'onClick={handleClick}>Ver citas pasadas</Button>
                        </div>
                        <br></br>
                        <br></br>

                        {numeroCitas === 0  || citasFiltrado.length === 0 ? 

                        (<div className="text-center">
                            <div className="p-5">
                                Actualmente no tiene citas de asesoría reservadas.
                            </div>
                            <div>
                                <button type="button" className="btn btn-success" onClick={handleClick1} style={{backgroundColor:'#a254b6', border:'none', borderRadius:'20px'}}>
                                    Programar una asesoría
                                </button>
                            </div> 
                        </div>)
                        :
                        (sesion.idRol == 1 ?
                        
                        (<div className='cards'>
                            
                        {citasFiltrado.map(elem => (
                            <Cancelar  
                            nombreprof={(usuarios.find((e) => e.idPersona == elem.idPersonaDocente).nombre)+' '+ (usuarios.find((e) => e.idPersona == elem.idPersonaDocente).apellido)}
                            especialidad={(usuarios.find((e) => e.idPersona == elem.idPersonaDocente).tituloPresentacion)} 
                            fecha={elem.fecha} 
                            curso={(cursos.find((e) => e.idCurso == elem.idCurso).nombre)}
                            onDelete={() => handleDeleteCard(elem)}
                            cita={elem}
                            />
                        ))
                        }
                        </div>)
                        :
                          
                        (<div className='cards'>
                            
                        {citasFiltrado.map(elem => (
                            <Cancelar2  
                            nomEst={(usuarios.find((e) => e.idPersona == elem.idPersonaAlumno).nombre)+' '+ (usuarios.find((e) => e.idPersona == elem.idPersonaAlumno).apellido)}
                            especialidad={(usuarios.find((e) => e.idPersona == elem.idPersonaAlumno).tituloPresentacion)} 
                            fecha={elem.fecha} 
                            curso={(cursos.find((e) => e.idCurso == elem.idCurso).nombre)}
                            onDelete={() => handleDeleteCard(elem)}
                            cita={elem}   
                            />
                        ))
                        }
                        </div>)
                        )
                        }
                    
                    </div>
                )
            }


export default Cita;