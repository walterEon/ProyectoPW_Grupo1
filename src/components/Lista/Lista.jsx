'use client';
import './style.css'
import { useState } from 'react';

const Lista = ({nombre, fecha, puntaje, comentario, num}) => {

    const [numero, setNumero] = useState(0)
    const [contar, setContador] = useState('')
    
    function contador(){
        return num+1;
    }

    return(
        <div className="caja">
            <div className='numero'>
                <p>{contador(num)}</p>
            </div>
            <div className="descripcion">
                <p>{nombre} - {fecha} - {puntaje} Estrella(s)</p>
                <p>"{comentario}"</p>
            </div>
        </div>
    )
 }

 export default Lista;