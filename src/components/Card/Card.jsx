import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/navigation'
import CitasApi from '../../api/citas.js';
import { useState, useEffect } from 'react';
import './style.css'

const Carta = ({ nombreprof, especialidad, fecha,curso, cita } ) => {

  const router = useRouter();
  const [citasOriginal, setCitasOriginal] = useState([]);

  const handleClick =()=>{
    const sesionU = citasOriginal.find((e) => e.idCita == cita.idCita);
        if(sesionU){
            localStorage.setItem('cita', JSON.stringify(sesionU))
            router.push('./calificar')
        }else{
            alert("Usuario no encontrado")
        }
  }

  const handleOnLoad = async () => {
    const result = await CitasApi.findAll();
    setCitasOriginal(result.data);
  }

  useEffect(()=>{
    handleOnLoad();
  },[])

  return (
    <Card className="carta" style={{ width: '20rem' }}>
        <Card.Header className="profesor">
            <Card.Img className= "foto" scr="nombre"></Card.Img>
            <div>
                <h5>{nombreprof}</h5>
                <span>{especialidad}</span>
            </div>
        </Card.Header>
      <Card.Img variant="top" src="https://cdn.discordapp.com/attachments/1065834267084595203/1110727600571174982/profesor-emerito-2000x1200.jpg" />
      <Card.Body>
        <Card.Title>{fecha}</Card.Title>
        <Card.Text>
          <p>{curso}</p>
          <Card.Link href={cita.enlaceSesion}>Enlace Zoom</Card.Link>
          <br></br>
        </Card.Text>
        <div className="calificacion">
            <Button variant="outline-secondary" className='boton' onClick={handleClick}>Calificar</Button>
        </div>

      </Card.Body> 
    </Card>
  );
}

export default Carta;