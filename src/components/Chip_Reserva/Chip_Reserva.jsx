import './style.css';
import Link from 'next/link'

const Chip_Reserva = ({nombre, universidad, carrera}) => {
    return(
        <div className='cont'>
            <div className='txts'>
                <span className='nombre'>{nombre}</span>
                <br></br>
                <span className='universidad-carrera'>{universidad} - {carrera}</span>
            </div>
            <div className='enlace'>
                <Link href="/citas">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-play-fill" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default Chip_Reserva;