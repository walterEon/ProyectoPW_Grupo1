'use client';
import React from "react";
import './style.css';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Chip_Reserva from '../../components/Chip_Reserva/Chip_Reserva.jsx';
import { useState } from 'react';

const reserva_busq = () => {

    const profesores = [{nombre: 'Marco Cornejo Villanueva', universidad: 'Universidad de Lima', carrera: 'Ingeniería de Sistemas', fecha: '2023-05-26'},
                        {nombre: 'Belen Jara Nevado', universidad: 'Universidad de Piura', carrera: 'Ingeniería Industrial', fecha: '2023-05-26'},
                        {nombre: 'Pascuala Flores Tapia', universidad: 'Universidad Peruana Cayetano Heredia', carrera: 'Medicina', fecha: '2023-05-27'},
                        {nombre: 'Ramona Mur Mercader', universidad: 'Universidad Nacional Mayor de San Marcos', carrera: 'Medicina', fecha: '2023-05-28'},
                        {nombre: 'Primitivo Pulido Blanca', universidad: 'Universidad del Pacífico', carrera: 'Ingeniería Civil', fecha: '2023-05-28'},
                        {nombre: 'Dionisia Noriega Varela', universidad: 'Universidad de Lima', carrera: 'Ingeniería Industrial', fecha: '2023-05-28'},
                        {nombre: 'Josué Quintero Barberá', universidad: 'Universidad de Piura', carrera: 'Arquitectura', fecha: '2023-05-29'},
                        {nombre: 'Óscar Grau Dueñas', universidad: 'Universidad Peruana Cayetano Heredia', carrera: 'Ingeniería de Sistemas', fecha: '2023-05-29'},
                        {nombre: 'Berta Gibert Álvaro', universidad: 'Universidad Nacional Mayor de San Marcos', carrera: 'Biología', fecha: '2023-05-30'},
                        {nombre: 'Fabio Jaén Quintana', universidad: 'Universidad del Pacífico', carrera: 'Psicología', fecha: '2023-06-01'},
                        ]

    const [opcion, setOpcion] = useState('nombre');

    const [isClickedN, setIsClickedN] = useState(true);

    const [isClickedF, setIsClickedF] = useState(false);

    const [fecha, setFecha] = useState('');

    const [displayText, setDisplayText] = useState("Ingrese nombre de docente, universidad o carrera");

    const handleOpcionClick = (opcion) => {
        setOpcion(opcion);
        setBusqueda('');
        setFecha('');
        if (opcion === 'nombre') {
            setIsClickedF(false);
            setIsClickedN(true);
            setDisplayText("Ingrese nombre de docente, universidad o carrera");
        } else if (opcion === 'fecha') {
            setIsClickedN(false);
            setIsClickedF(true);
            setDisplayText("DD/MM/YYYY");
          }
      };
    
      const handleFechaChange = (event) => {
        console.log(event.target.value);
        setFecha(event.target.value);
        const resultados = profesores.filter(profesor => profesor.fecha.includes(event.target.value));
        setResultados(resultados);
      };

    

    const [busqueda, setBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);

    const handleInputChange = (event) => {
        console.log(event.target.value);
        setBusqueda(event.target.value);
        const resultados = profesores.filter(profesor => {
          const {nombre, universidad, carrera } = profesor;
          const terminoBusqueda = event.target.value.toLowerCase();
          return (
            nombre.toLowerCase().includes(terminoBusqueda) ||
            universidad.toLowerCase().includes(terminoBusqueda) ||
            carrera.toLowerCase().includes(terminoBusqueda)
          );
        });
        setResultados(resultados);
      };
      
    return(
        <div className="contenedor">
            <div className="tit">
                <h2 className="titulo">Reserva de Cita</h2> 
             
                <hr></hr>
            </div>
            <div className="busq">
                <div className="barra">
                    <h6>Búsqueda</h6>
                    <div className="form">

                        <div className="lupa">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-search" viewBox="0 0 40 40">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </div>

                        {opcion === 'nombre' && (
                            <Form onSubmit={handleSubmit} className="formNombre">
                                <Form.Group controlId="nombre">
                                    <Form.Control
                                    type="text"
                                    value={busqueda}
                                    onChange={handleInputChange}
                                    className="cajaBusqN"
                                    />
                                </Form.Group>
                            </Form>
                        )}

                        {opcion === 'fecha' && (
                                <Form onSubmit={handleSubmit} className="formFecha">
                                    <Form.Group controlId="fecha">
                                        <Form.Control
                                        type="date"
                                        value={fecha}
                                        onChange={handleFechaChange}
                                        className="cajaBusqF"
                                        />
                                    </Form.Group>
                                </Form>
                            )}


                    </div>
                </div>
                <div className="botones">
                    <Button className="botonN" variant="outlined" onClick={() => handleOpcionClick('nombre')}
                    style={{ backgroundColor: isClickedN ? '#e8def8' : 'white' }}>
                        Por nombre
                    </Button> 
                    <Button className="botonF" variant="outlined" onClick={() => handleOpcionClick('fecha')}
                    style={{ backgroundColor: isClickedF ? '#e8def8' : 'white' }}>
                        Por fecha
                    </Button>
                </div>
            </div>
            <div className="descripcion">
                <span className="info">{displayText}</span>
            </div>
            <div className="profes">
                <ul className='nobullets'>
                    { resultados.map((profesor, index) =>{
                        return (<li key={index} style={{display: 'inline-block'}} ><Chip_Reserva nombre={profesor.nombre} universidad={profesor.universidad} carrera={profesor.carrera}/></li>)
                        })
                    }
                </ul>
            </div>
            
            
        </div>
    )
}

export default reserva_busq;