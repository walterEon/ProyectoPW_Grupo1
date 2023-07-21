'use client';
import Link from 'next/link';
import styles from '../page.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { useState , useEffect } from 'react'
import { useRouter } from 'next/navigation';
import CitasApi from '../../api/citas.js';
import PersonasApi from '../../api/personas.js'
import Button from 'react-bootstrap/Button'
import './style.css'

export default function Dashboard() {
    const router = useRouter();
    const [usuarios, setUsuarios ] = useState([]);
    const [sesion , setSesion] = useState({});
    const [citasOriginal, setCitasOriginal] = useState([]);
    const [citasFiltrado, setCitasFiltrado] = useState([]);

    

    

    
    const fechaSistema = new Date();


    const filtrarFecha =  async () =>{
        if(sesion.idRol == 1){
            const citasFiltradas = citasOriginal.filter(elemento => (new Date(elemento.fecha) > fechaSistema && elemento.idPersonaAlumno == sesion.idPersona));
            setCitasFiltrado(citasFiltradas)
        }else{
            const citasFiltradas = citasOriginal.filter(elemento => (new Date(elemento.fecha) > fechaSistema && elemento.idPersonaDocente == sesion.idPersona));
            setCitasFiltrado(citasFiltradas)
        }

    };

    const handleOnLoad = async () => {
        const result = await CitasApi.findAll();
        setCitasOriginal(result.data);
        const result2 = await PersonasApi.findAll();
        setUsuarios(result2.data);
    }

    function obtenerPrimeraLetra(cadena) {
        return cadena[0];
      }
      
    
    useEffect(() => {
        handleOnLoad();
        filtrarFecha();
        let sesionGuardada = localStorage.getItem("sesion");
        if(sesionGuardada == undefined){
            router.push('/')
        }
        setSesion(JSON.parse(sesionGuardada))
        handleOnLoad();
        filtrarFecha();
    }, []);

    


    const handleClickCalificaciones = () =>{
        router.push('/calificaciones')
    }
    
    return (
        <div className={`${styles.contenedor} col`}>
            <div>
                <div className='encabezado'>
                    <h4> Bienvenido,{sesion.idRol == 2 ? ' Docente' :''} {sesion.nombre+' '+sesion.apellido}! </h4>
                </div>
                <hr></hr>
                <div className="card mb-3" style={{backgroundColor: `#f3edf7` , minHeight: `260px`}}>
                    <div className="card-header d-flex justify-content-between">
                        <label> Próximas citas </label>
                    </div>
                    <div className="card-body">
                    {
                                (citasFiltrado.length > 0) &&
                                    citasFiltrado?.map(item =>(
                                    <div className="card mb-2" style={{maxWidth: `650px` , minWidth: `300px`}}>
                                        <div className="row mx-0">
                                            <div className="col-auto d-flex align-items-center px-3">
                                                <div className={styles.cardLetra}> {sesion.idRol  == 2 ? obtenerPrimeraLetra(usuarios.find((e) => e.idPersona == item.idPersonaAlumno).nombre) : obtenerPrimeraLetra(usuarios.find((e) => e.idPersona == item.idPersonaDocente).nombre)} </div>
                                            </div>
                                            <div className="col px-0">
                                                <div className="card-body px-0">
                                                    <h5 className="card-title">{sesion.idRol  == 2 ? (usuarios.find((e) => e.idPersona == item.idPersonaAlumno).nombre)+' '+(usuarios.find((e) => e.idPersona == item.idPersonaAlumno).apellido) : (usuarios.find((e) => e.idPersona == item.idPersonaDocente).nombre)+' '+(usuarios.find((e) => e.idPersona == item.idPersonaDocente).apellido)  } </h5>
                                                    <p className="card-text text-center">
                                                        {item.fecha+' '+item.horaInicio}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-auto d-flex align-items-center px-3">
                                                <FontAwesomeIcon icon={faCalendarDay} className="" style={{ fontSize : `3em`}} />
                                            </div>
                                        </div>
                                        </div>
                                    ))
                            }
                        
                            
                            
                        
                        
                        <div className='text-end mt-3' >
                            Pagina 1 de 1 {`< 1 ... 1 >`}
                        </div>
                    </div>
                </div>
                <div className="card mb-3"style={{backgroundColor: `#f3edf7` , height: `260px`}}>
                    <div className="card-body">
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
    )
}
