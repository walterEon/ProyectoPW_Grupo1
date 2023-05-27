'use client';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import {citas} from '../../api/citas.js';
import { useRouter } from 'next/navigation'
import './style.css'

const Aviso = () => {
    const fechaSistema = new Date();
    const [cita, setCita] = useState(citas)
    const [citasFiltradas, setCitasFiltradas] = useState([])

    const filtrarFecha = () =>{
        const filtrado = cita.filter(elem => {
          const citaFecha = new Date(elem.fecha)

          const diferenciaTiempo = Math.abs(fechaSistema.getTime() - citaFecha.getTime())
          const diferenciaDias = Math.ceil(diferenciaTiempo/(1000*60*60*24))

          return diferenciaDias <=2;
        })

        setCitasFiltradas(filtrado)

      };

  

  useEffect(()=>{
    filtrarFecha();
},[])



const router = useRouter()
const handleClick1 =()=>{
    router.push('/Cita')
 }

  return (
      <div className='contenido'>
      <Modal aria-labelledby="contained-modal-title-vcenter"
      centered show={true} onHide={handleClick1} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title className='title'>Recordatorio de próximas citas</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        { citasFiltradas.length === 0 ? (
                <div className='sincita'>No hay citas próximas para recordar</div>
            ):
            (citasFiltradas.map(elem => (
                <ul className='elemento'>
                    <li  key={elem.nombreprof} className='elemento'>
                        Hay cita con el profesor {elem.nombreprof} en el curso {elem.curso}
                    </li>
                </ul>
                )))
        }
        </Modal.Body>
        
      </Modal>
    </div>
  );
}


export default Aviso;