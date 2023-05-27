'use client';
import './style.css'
import Button from 'react-bootstrap/Button'
import {citas} from '../../api/citas.js'
import {useState} from 'react';
import Form from 'react-bootstrap/Form'
import {useRouter} from 'next/navigation'

const calificar = () =>{

    const router = useRouter();

    const aceptar = () =>{
        alert("¡Calificación enviada!");
        router.push("/Cita")
    }

    const [ponerValor, setPonerValor] = useState('')

    const handleChange = (event) =>{
        setPonerValor(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setPonerValor('');
        console.log(ponerValor)
        console.log(rating)
    }

    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const Star = ({ value, isSelected, onRatingChange }) => {
        const handleClick = () => {
          onRatingChange(value);
        };
        return (
            <span className='h3' onClick={handleClick} style={{ cursor: 'pointer' }}>{isSelected ? '★' : '☆'}</span>
          );
    }

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
                        onRatingChange={handleRatingChange}
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
                     onChange={handleChange} value={ponerValor}
                    />
                
                <br></br>
                <Button className='boton' onClick={aceptar}>Guardar</Button>
                </Form>
            </div>
        </div>
    )
}

export default calificar;