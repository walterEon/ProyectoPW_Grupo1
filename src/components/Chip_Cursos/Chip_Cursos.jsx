import './style.css';
import Link from 'next/link'

const Chip_Cursos = ({nombre}) => {
    return(
        <div className='cont'>
            <div className='txts'>
                <span className='nombre'>{nombre}</span>
            </div>
        </div>
    )
}

export default Chip_Cursos;