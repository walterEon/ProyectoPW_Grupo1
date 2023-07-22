'use client';
import './style.css'
import Button from 'react-bootstrap/Button'
import {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form'
import {useRouter} from 'next/navigation'
import CalificacionesApi from '../../api/calificaciones.js';


const calificar = () =>{


    let defaultCalif = {
        idCalificacion: 0,
        idCita: 0,
        calificacion: 0,
        comentario: ""
    }

    const [cita, setCita] = useState({});
    const [datosCalif, setDatosCalif] = useState(defaultCalif);
    const [comentario, setComentario] = useState("")
    const [calificaciones, setCalificaciones] = useState([])

    

    const router = useRouter();

    const aceptar = async () =>{
        var calificacionTemp = calificaciones[0]
        calificacionTemp.idCalificacion = calificaciones.length+1
        calificacionTemp.idCita = cita.idCita
        calificacionTemp.calificacion = rating
        calificacionTemp.comentario = comentario
        console.log(calificacionTemp)
        const result = await CalificacionesApi.create(calificacionTemp)
        if(result){
            alert("¡Calificación enviada!");
            router.push("/Cita")
        }else{
            alert("error que penita");
        }
        
        
    }

    const [ponerValor, setPonerValor] = useState("")


    const handleSubmit = (event) => {
        event.preventDefault();
        setPonerValor('');
        console.log(ponerValor)
        console.log(rating)
    }

    const [rating, setRating] = useState(0);

    const Star = ({ value, isSelected, onRatingChange }) => {
        const handleClick = () => {
          onRatingChange(value);
        };
        return (
            <span className='h3' onClick={handleClick} style={{ cursor: 'pointer' }}>{isSelected ? '★' : '☆'}</span>
          );
    }

    useEffect(()=>{
        const handleOnLoad = async () => {
            const result = await CalificacionesApi.findAll();
            console.log(result)
            let datos = result.data
            setCalificaciones(datos)
            let citaGuardada = localStorage.getItem("cita");
            if(citaGuardada == undefined){
                router.push('/')
            }
            setCita(JSON.parse(citaGuardada))
        }
        handleOnLoad();
        
        
    },[])

    return(
        <div className='padre'>
            <div className='contenedor'>
                <h2 className='titulo'>Califica la atención</h2>
                <hr></hr>
                <span>Es muy importante para nosotros saber cómo te fue en tu sesión de asesoría.</span>
                <br></br>
                <Form onSubmit={handleSubmit}>
                <h3>Calificación: {rating}</h3>
                <div>
                    
                    {[1, 2, 3, 4, 5].map((value) => ( 
                    <Star
                        key={value}
                        value={value} 
                        isSelected={value <= rating}
                        onRatingChange={(value) => setRating(value)}
                    />
                    ))}
                    
                </div>
                <br></br>
                <p>Si crees que es necesario agregar un comentario, por favor usa la caja de comentarios.</p>
                <br></br>
                
                
                    <textarea 
                    className="caja" 
                    id="inputComentario" 
                    placeholder="Dejar comentario aquí..." 
                    value={comentario}  
                    onChange={e => setComentario(e.target.value)}>

                    </textarea>
                
                <br></br>
                <Button className='boton' onClick={() => aceptar()}>Guardar</Button>
                </Form>
            </div>
        </div>
    )
}

export default calificar;