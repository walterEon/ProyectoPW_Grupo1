'use client';
import styles from '../app/page.module.css'
import Link from 'next/link';
import { useState , useEffect } from 'react'
import { useRouter } from 'next/navigation';
import {citas} from '../api/citas';

export default function Sidebar(props) {
    const router = useRouter();
    const [usuarios, setUsuarios ] = useState([]);
    const [citasOriginal, setCitasOriginal] = useState(citas);
    const [citasFiltrado, setCitasFiltrado] = useState([]);
    const [sesion , setSesion] = useState({});
    const fechaSistema = new Date();

    const filtrarFecha = () =>{
        const citasFiltradas = citasOriginal.filter(elemento => (new Date(elemento.fecha) >= fechaSistema));
        setCitasFiltrado(citasFiltradas)

      };

      
    useEffect(() => {
        
        let savedItem = localStorage.getItem("sesion");
        if(savedItem == undefined){
            router.push('/')
        }
        setSesion(JSON.parse(savedItem))
    }, [])
    return (
        <div>
            <div className={`${styles.navBar} collapse show collapse-horizontal shadow-sm `} id="collapseWidthExample">
                <ul className="list-group list-group-flush">
                    <Link href="/dashboard"
                        className={props.name == 'dashboard' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}
                        style={{backgroundColor: '#d9d9d9', border:'none', textAlign: 'center', color: '#bb59d3', fontWeight: 'bold'}} 
                    >
                        Principal
                    </Link>
                    <Link href="/perfil"
                    className={props.name == 'perfil' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} 
                    style={{backgroundColor: '#d9d9d9', border:'none', textAlign: 'center', color: '#bb59d3', fontWeight: 'bold', marginTop: '4px'}} 
                    >
                        Perfil
                    </Link>
                    { (sesion.rol == 'docente' || sesion.rol == 'admin')  &&
                        <Link href="/horario"
                            className={props.name == 'horario' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} 
                            style={{backgroundColor: '#d9d9d9', border:'none', textAlign: 'center', color: '#bb59d3', fontWeight: 'bold', marginTop: '4px'}}                         
                        >
                            Horarios
                        </Link>


                    }

                    { (sesion.rol == 'docente' || sesion.rol == 'admin')  &&
                        <Link href="/calificaciones"
                            className={props.name == 'calificaciones' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} 
                            style={{backgroundColor: '#d9d9d9', border:'none', textAlign: 'center', color: '#bb59d3', fontWeight: 'bold', marginTop: '4px'}}                         
                        >
                            Calificaciones
                        </Link>


                    }
                    { (sesion.rol == 'alumno' || sesion.rol == 'admin')  &&
                        <Link href={citasFiltrado.length === 0 ? '/Cita' : '/recordatorio'}
                            className={props.name == 'citas' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} 
                            style={{backgroundColor: '#d9d9d9', border:'none', textAlign: 'center', color: '#bb59d3', fontWeight: 'bold', marginTop: '4px'}}                      
                        >
                            Citas
                        </Link>
                    }
                    { sesion.rol == 'alumno'  &&
                        <div>
                            <Link href="/universidades"
                                className={props.name == 'universidades' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} 
                                style={{backgroundColor: '#d9d9d9', border:'none', textAlign: 'center', color: '#bb59d3', fontWeight: 'bold', marginTop: '4px'}} 
                            >
                                Universidades
                            </Link>
                            <Link href="/cursos"
                                className={props.name == 'cursos' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} 
                                style={{backgroundColor: '#d9d9d9', border:'none', textAlign: 'center', color: '#bb59d3', fontWeight: 'bold', marginTop: '4px'}} 
                            >
                                Cursos
                            </Link>
                            <Link href="/carreras"
                                className={props.name == 'carreras' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} 
                                style={{backgroundColor: '#d9d9d9', border:'none', textAlign: 'center', color: '#bb59d3', fontWeight: 'bold', marginTop: '4px'}} 
                            >
                                Carreras
                            </Link>
                        </div>
                    }
                </ul>
            </div>
        </div>
    )
}