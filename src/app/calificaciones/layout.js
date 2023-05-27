'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styles from '../page.module.css'
import Sidebar from '../../components/sidebar'
import { useRouter } from 'next/navigation';
import { useState , useEffect } from 'react'


export default function RootLayout({ children }) {
    const router = useRouter();
    const [usuarios, setUsuarios ] = useState([]);
    const [sesion , setSesion] = useState({});
    useEffect(() => {
        let sesionGuardada = localStorage.getItem("sesion");
        if(sesionGuardada == undefined){
            router.push('/')
        }
        setSesion(JSON.parse(sesionGuardada))
    }, [])
    const salir = () =>{
        localStorage.removeItem('sesion')
        setSesion({})
        router.push('/');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="">
                        <button className="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="text-center flex-grow-1">
                        <label>
                            Atencion de Citas
                        </label>
                    </div>
                    <div>
                        <div className="btn-group dropstart">
                            <button type="button" className="btn btn-outlined dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faUser} />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="#" onClick={salir}>Cerrar sesión</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className={`${styles.fullMain} d-flex`}>
                <Sidebar name={`dashboard`} />
                {children}
            </div>
        </div>
    )
}
