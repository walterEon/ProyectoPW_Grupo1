'use client';
import Link from 'next/link';
import styles from '../page.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { useState , useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button'
import './style.css'

export default function Dashboard() {
    const router = useRouter();
    const [usuarios, setUsuarios ] = useState([]);
    const [sesion , setSesion] = useState({});
    
    useEffect(() => {
        let sesionGuardada = localStorage.getItem("sesion");
        if(sesionGuardada == undefined){
            router.push('/')
        }
        setSesion(JSON.parse(sesionGuardada))
    }, []);

    const handleClickCalificaciones = () =>{
        router.push('/calificaciones')
    }
    
    return (
        <div className={`${styles.contenedor} col`}>
            <div>
                <div className='encabezado'>
                    <h4> Bienvenido,{sesion.rol == 'docente' ? ' Profesor' :''} {sesion.nombres}! </h4>
                </div>
                <hr></hr>
                <div className="card mb-3" style={{backgroundColor: `#f3edf7` , minHeight: `260px`}}>
                    <div className="card-header d-flex justify-content-between">
                        <label> Próximas citas </label>
                    </div>
                    <div className="card-body">
                        <div className="card mb-2" style={{maxWidth: `650px` , minWidth: `300px`}}>
                            <div className="row mx-0">
                                <div className="col-auto d-flex align-items-center px-3">
                                    <div className={styles.cardLetra}> {sesion.rol  == 'docente' ? 'A' : 'D'} </div>
                                </div>
                                <div className="col px-0">
                                    <div className="card-body px-0">
                                        <h5 className="card-title">{sesion.rol  == 'docente' ? 'Alfonso Carrion' : ' Prof. Damian Porras'}  </h5>
                                        <p className="card-text text-center">
                                            18/06/2022 08:00 am
                                        </p>
                                    </div>
                                </div>
                                <div className="col-auto d-flex align-items-center px-3">
                                    <FontAwesomeIcon icon={faCalendarDay} className="" style={{ fontSize : `3em`}} />
                                </div>
                            </div>
                        </div>
                        <div className="card mb-2" style={{maxWidth: `650px` , minWidth: `300px`}}>
                            <div className="row mx-0">
                                <div className="col-auto d-flex align-items-center px-3">
                                    <div className={styles.cardLetra}> {sesion.rol  == 'docente' ? 'B' : 'E'}  </div>
                                </div>
                                <div className="col px-0">
                                    <div className="card-body px-0">
                                        <h5 className="card-title"> {sesion.rol  == 'docente' ? 'Bernardo Silva' : ' Prof. Ernesto Zapata'} </h5>
                                        <p className="card-text text-center">
                                            19/06/2022 08:00 am
                                        </p>
                                    </div>
                                </div>
                                <div className="col-auto d-flex align-items-center px-3">
                                    <FontAwesomeIcon icon={faCalendarDay} className="" style={{ fontSize : `3em`}} />
                                </div>
                            </div>
                        </div>
                        <div className='text-end mt-3'>
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
