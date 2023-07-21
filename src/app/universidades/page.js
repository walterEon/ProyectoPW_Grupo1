'use client';
import Link from 'next/link';
import styles from '../page.module.css'
import { useState , useEffect } from 'react'
import { useRouter } from 'next/navigation';
import UniversidadesApi from '../../api/universidades.js';


export default function Dashboard() {
    const router = useRouter();
    const [universidades, setUniversidades ] = useState([]);

    const handleOnLoad = async () => {

        const result = await UniversidadesApi.findAll();
        setUniversidades(result.data);
        console.log(universidades)
    }

    useEffect(() => {
        handleOnLoad();
    }, [])

    
    return (
        <div className={`px-3 col`}>
            <div className='pt-3'>
                <div className="card-header d-flex justify-content-between">
                    <h4> Universidades </h4>
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
                                                <td> {item.idUniversidad} </td>
                                                <td> {item.descripcion} </td>
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
            
        </div>
    )
}
