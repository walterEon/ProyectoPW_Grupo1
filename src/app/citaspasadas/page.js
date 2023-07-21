'use client';
import Carta from '../../components/Card/Card.jsx'
import '../Cita/style1.css'
import Button from 'react-bootstrap/Button'
import React from 'react';
import CitasApi from '../../api/citas.js';
import PersonasApi from '../../api/personas.js';
import CursosApi from '../../api/cursos.js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

const citaspasadas = () => {
    const fechaSistema = new Date();
    const [citasOriginal, setCitasOriginal] = useState([]);
    const [citasFiltrado, setCitasFiltrado] = useState([]);
    const [numeroCitas, setNumeroCitas] = useState(0);
    const [usuarios, setUsuarios ] = useState([]);
    const [sesion , setSesion] = useState({});
    const [cursos, setCursos ] = useState([]);

 

    const filtrarFecha =  async () =>{
        if(sesion.idRol == 1){
            const citasFiltradas = citasOriginal.filter(elemento => (new Date(elemento.fecha) < fechaSistema && elemento.idPersonaAlumno == sesion.idPersona));
            setCitasFiltrado(citasFiltradas)
        }else{
            const citasFiltradas = citasOriginal.filter(elemento => (new Date(elemento.fecha) < fechaSistema && elemento.idPersonaDocente == sesion.idPersona));
            setCitasFiltrado(citasFiltradas)
        }

    };

    const handleOnLoad = async () => {
        const result = await CitasApi.findAll();
        console.log(result.data);
        setCitasOriginal(result.data);
        const result2 = await PersonasApi.findAll();
        setUsuarios(result2.data);
        const result3 = await CursosApi.findAll();
        setCursos(result3.data);
        

    }
    // NO SETEA NADAAAA
      useEffect(()=>{
        handleOnLoad();
        filtrarFecha();
        let sesionGuardada = localStorage.getItem("sesion");
        if(sesionGuardada == undefined){
            router.push('/')
        }
        setSesion(JSON.parse(sesionGuardada))
        setNumeroCitas(citasOriginal.length)
    },[])

    

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
                            <h4 className='titulo'>Citas reservas pasadas</h4>
                            <Button variant="outline-secondary" className='programar2'onClick={handleClick}>Ver citas pasadas</Button>
                        </div>
                        <br></br> 
                        <br></br>

                        {numeroCitas === 0  || citasFiltrado.length === 0 ? 

                        (<div className="text-center">
                            <div className="p-5">
                                No hay citas pasadas.
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
                            <Carta  
                            nombreprof={(usuarios.find((e) => e.idPersona == elem.idPersonaDocente).nombre)+' '+ (usuarios.find((e) => e.idPersona == elem.idPersonaDocente).apellido)}
                            especialidad={(usuarios.find((e) => e.idPersona == elem.idPersonaDocente).tituloPresentacion)} 
                            fecha={elem.fecha} 
                            curso={(cursos.find((e) => e.idCurso == elem.idCurso).nombre)}
                            />
                        ))
                        }
                        </div>)
                        :
                          
                        (<div className='cards'>
                            
                        {citasFiltrado.map(elem => (
                            <Carta
                            nombreprof={(usuarios.find((e) => e.idPersona == elem.idPersonaAlumno).nombre)+' '+ (usuarios.find((e) => e.idPersona == elem.idPersonaAlumno).apellido)}
                            especialidad={(usuarios.find((e) => e.idPersona == elem.idPersonaAlumno).tituloPresentacion)} 
                            fecha={elem.fecha} 
                            curso={(cursos.find((e) => e.idCurso == elem.idCurso).nombre)}
                            />
                        ))
                        }
                        </div>)
                        )
                        }
                    
                    </div>
                )
            }


export default citaspasadas;