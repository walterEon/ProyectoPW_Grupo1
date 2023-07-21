'use client';
import './style.css'
import Button from 'react-bootstrap/Button'
import {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form'
import {useRouter} from 'next/navigation'
import CalificacionesApi from '../../api/calificaciones.js';


const calificar = () =>{


    let defaultCalif = {
        idCalificacion: 5,
        idCita: 0,
        calificacion: 0,
        comentario: ""
    }

    const [cita, setCita] = useState({});
    const [datosCalif, setDatosCalif] = useState(defaultCalif);

    

    const router = useRouter();

    const aceptar = async () =>{
        setDatosCalif({...datosCalif, idCita: 5})
        console.log(datosCalif)
        const result = await CalificacionesApi.create(datosCalif)
        alert("¡Calificación enviada!");
        router.push("/Cita")
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
        
        /*let citaGuardada = localStorage.getItem("cita");
        if(citaGuardada == undefined){
            router.push('/')
        }
        setCita(JSON.parse(citaGuardada))*/
        
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
                
                    <Form.Control className='caja'
                    type='text'
                    as = "textarea"
                    placeholder="Dejar comentario aquí..."
                    value={ponerValor}
                     onChange={e => setDatosCalif({...defaultCalif, comentario: e.target.value})}
                     //e => setDatosCalif({...datosCalif, comentario: e.target.value})
                    />
                
                <br></br>
                <Button className='boton' onClick={() => aceptar()}>Guardar</Button>
                </Form>
            </div>
        </div>
    )
}

export default calificar;