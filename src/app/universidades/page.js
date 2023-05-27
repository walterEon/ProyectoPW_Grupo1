'use client';
import Link from 'next/link';
import styles from '../page.module.css'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { useState , useEffect } from 'react'
import { useRouter } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import ModalUniversidad from '../perfil/universidadAddComp';

export default function Dashboard() {
    const router = useRouter();
    const [universidades, setUniversidades ] = useState([]);

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        setObjUniversidades();
    }, [])

    const setObjUniversidades = () => {
        var universidades = JSON.parse(localStorage.getItem('universidades'));
        if (universidades) {
            setUniversidades(universidades);
        }
    }
    const borrar = (index, name = '') => {
        if(confirm( `Desea eliminar la Universidad "${name}"` )){
            universidades.splice(index, 1)
            localStorage.setItem('universidades', JSON.stringify(universidades))
            setObjUniversidades();
        }
    }
    return (
        <div className={`px-3 col`}>
            <div className='pt-3'>
                <div className="card-header d-flex justify-content-between">
                    <h4> Universidades </h4>
                    <button type="button" className="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalUniversidad">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <hr></hr>
                <div className="card mb-3" style={{backgroundColor: `#f3edf7` , minHeight: `50px`}}>
                    
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col" style={{ width: '50px' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    universidades.map((item, index)=>{
                                        return (
                                            <tr key={index}>
                                                <td> {item.value} </td>
                                                <td> {item.label} </td>
                                                <td> 
                                                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => borrar( index, item.label ) } >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>    
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                { universidades.length <= 0 &&
                                    <tr>
                                        <td colSpan="100%"> Sin registros </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ModalUniversidad callback={setObjUniversidades} />
        </div>
    )
}
