'use client';
import React, { useState, useEffect } from "react";
import Lista from "@/components/Lista/Lista";
import './style.css'
import Button from 'react-bootstrap/Button';
import {useRouter} from 'next/navigation'

import CalificacionesApi from "../../api/calificaciones.js";
import CitasApi from "../../api/citas.js";

const calificaciones = () => {

    const [calificacionesAPI, setCalificaciones] = useState([])
    const [citas, setCitas] = useState([])
    const [sesion , setSesion] = useState({});

    const filtrarCalificaciones = () =>{
        console.log(citas)
        console.log(calificacionesAPI)
        const citasFiltradas = citas.filter(e => calificacionesAPI.some((f) => f.idCita == e.idCita))
        console.log(citasFiltradas);

    };

    const router = useRouter();
    const handleClickVolver = () =>{
        router.push('/dashboard')
    }

    const handleOnLoad = async () => {
        const result = await CalificacionesApi.findAll();
        setCalificaciones(result.data);
        const result2 = await CitasApi.findAll();
        setCitas(result2.data)
    }


    useEffect(() => {
        handleOnLoad();
        let sesionGuardada = localStorage.getItem("sesion");
        if(sesionGuardada == undefined){
            router.push('/')
        }
        setSesion(JSON.parse(sesionGuardada))
        console.log(citas)
        console.log(calificacionesAPI)
        filtrarCalificaciones();
    }, []);

    return(
        <div className="contenedor">
            <div className="lista">
                <h2 className="titulo">Bienvenido al centro de calificaciones</h2>
                <hr></hr>
                {calificacionesAPI.length === 0?
                (<h4>No hay calificaciones disponibles</h4>):
                (calificacionesAPI.map(elemento =>(
                    <Lista  key={elemento.idCalificacion}  puntaje ={elemento.calificacion} comentario={elemento.comentario} num = {calificacionesAPI.indexOf(elemento)}/>
                )))}
            </div>
            <div>
                <Button variant="outline-secondary" className="boton" onClick={handleClickVolver}>Volver a citas programadas</Button>
            </div>
        </div>
    )
}

export default calificaciones;