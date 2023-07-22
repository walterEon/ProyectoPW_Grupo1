'use client';
import React, { useState, useEffect } from "react";
import Lista from "@/components/Lista/Lista";
import './style.css'
import Button from 'react-bootstrap/Button';
import {useRouter} from 'next/navigation'

import CalificacionesApi from "../../api/calificaciones.js";
import CitasApi from "../../api/citas.js";
import PersonasApi from "../../api/personas.js";

const calificaciones = () => {

    const [calificaciones, setCalificaciones] = useState([])
    const [citas, setCitas] = useState([])
    const [sesion , setSesion] = useState({});
    const [alumnos, setAlumnos] = useState([]);


    const  filtrarCalificaciones = async (citas, calificaciones, sesion) =>{
        let citasFiltradas = []
        citasFiltradas = citas.filter((e) => e.idPersonaDocente == sesion.idPersona)

       

        let calificacionesFiltradas = []
        calificacionesFiltradas = calificaciones.filter((e) => citasFiltradas.some((f) => f.idCita == e.idCita));
            

        return calificacionesFiltradas;
    }

    const  filtrarCitas = async (citas, calificaciones, sesion) =>{
        let citasFiltradas = []
        citasFiltradas = citas.filter((e) => e.idPersonaDocente == sesion.idPersona)
            

        return citasFiltradas;
    }

    const  obtenerAlumnos = async (citas, calificaciones, sesion, personas) =>{
        let citasFiltradas = []
        citasFiltradas = citas.filter((e) => e.idPersonaDocente == sesion.idPersona)

       

        let calificacionesFiltradas = []
        calificacionesFiltradas = calificaciones.filter((e) => citasFiltradas.some((f) => f.idCita == e.idCita));

        let citasFiltradas2 = []
        citasFiltradas2 = citas.filter((e) => calificacionesFiltradas.some((f) => f.idCita == e.idCita));

        let alumnosFiltrados = []
        alumnosFiltrados = personas.filter((e) => citasFiltradas2.some((f) => f.idPersonaAlumno == e.idPersona))
            

        return alumnosFiltrados;
    }

    const router = useRouter();
    const handleClickVolver = () =>{
        router.push('/dashboard')
    }

    


    useEffect(() => {
        const handleOnLoad = async () => {
            const result = await CalificacionesApi.findAll();
            let rawCalificaciones = result.data
            //setCalificaciones(result.data);
            const result2 = await CitasApi.findAll();
            let rawCitas = result2.data
            //setCitas(result2.data)
            const result3 = await PersonasApi.findAll();
            let rawPersonas = result3.data
            let sesionGuardada = localStorage.getItem("sesion");
            if(sesionGuardada == undefined){
                router.push('/')
            }
            setSesion(JSON.parse(sesionGuardada))
            const calificacionesFiltradas = await filtrarCalificaciones(rawCitas, rawCalificaciones, JSON.parse(sesionGuardada));
            setCalificaciones(calificacionesFiltradas)
            const alumnosFiltrados = await obtenerAlumnos(rawCitas, rawCalificaciones, JSON.parse(sesionGuardada), rawPersonas);
            setAlumnos(alumnosFiltrados)
            const citasFiltradas = await filtrarCitas(rawCitas, rawCalificaciones, JSON.parse(sesionGuardada));
            setCitas(citasFiltradas)
        }
        handleOnLoad();
        
    }, []);

    return(
        <div className="contenedor">
            <div className="lista">
                <h2 className="titulo">Bienvenido al centro de calificaciones</h2>
                <hr></hr>
                {calificaciones.length === 0?
                (<h4>No hay calificaciones disponibles</h4>):
                (calificaciones.map(elemento =>(
                    <Lista  key={elemento.idCalificacion}
                     nombre={(alumnos.find((e) => e.idPersona == elemento.cita.idPersonaAlumno)?.nombre)+' '+(alumnos.find((e) => e.idPersona == elemento.cita.idPersonaAlumno)?.apellido)} 
                     fecha={(citas.find((e) => e.idCita == elemento.idCita)?.fecha)}  
                     puntaje ={elemento.calificacion} 
                     comentario={elemento.comentario} 
                     num = {calificaciones.indexOf(elemento)}/>
                )))}
            </div>
            <div>
                <Button variant="outline-secondary" className="boton" onClick={handleClickVolver}>Volver a citas programadas</Button>
            </div>
        </div>
    )
}

export default calificaciones;