'use client';
import React from "react";
import Lista from "@/components/Lista/Lista";
import './style.css'
import Button from 'react-bootstrap/Button';
import {useRouter} from 'next/navigation'

const calificaciones = () => {
    const arreglo = [{nombre: "Alexa Mendoza", fecha:"2023-04-21", puntaje: "4 estrellas", comentario: "La asesoría fue buena, pero el tiempo fue muy poco"},
    {nombre: "Samuel Martinez", fecha:"2023-04-23", puntaje: "5 estrellas", comentario: "El profesor es el mejor en la materia"},
    {nombre: "Andrés Arévalo", fecha:"2023-05-11", puntaje: "4 estrellas", comentario: "Considero que faltó tiempo, surgieron más dudas a lo largo de la asesoría"},
    {nombre: "Bianca Varela", fecha:"2023-05-14", puntaje: "3 estrellas", comentario: "No pude entender muy bien al profesor, se enredaba al explicar"},
    {nombre: "Selene Silva", fecha:"2023-05-18", puntaje: "5 estrellas", comentario: "El profesor me ayudó a solventar mis dudas"},
    {nombre: "Santiago Mills", fecha:"2023-05-20", puntaje: "4 estrellas", comentario: "Aprendí mucho en la asesoría, pero había demasiada gente"},]

    const router = useRouter();
    const handleClickVolver = () =>{
        router.push('/dashboard')
    }

    return(
        <div className="contenedor">
            <div className="lista">
                <h2 className="titulo">Bienvenido al centro de calificaciones</h2>
                <hr></hr>
                {arreglo.length === 0?
                (<h4>No hay calificaciones disponibles</h4>):
                (arreglo.map(elemento =>(
                    <Lista nombre = {elemento.nombre} fecha={elemento.fecha} puntaje={elemento.puntaje} comentario={elemento.comentario} num = {arreglo.indexOf(elemento)}/>
                )))}
            </div>
            <div>
                <Button variant="outline-secondary" className="boton" onClick={handleClickVolver}>Volver a citas programadas</Button>
            </div>
        </div>
    )
}

export default calificaciones;