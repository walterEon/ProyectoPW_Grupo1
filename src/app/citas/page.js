'use client';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './citas.css'
import 'animate.css';
import { useState , useEffect } from 'react'

import { Form } from "react-bootstrap";

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import React from 'react'

import { useRouter } from 'next/navigation';
import CursosApi from '../../api/cursos.js'
import PersonasCursosApi from '../../api/personascursos.js'
import CitasApi from '../../api/citas.js'

export default function Dashboard() {

    const citaDefault = {
        idCita: 0,
        idPersonaDocente: 0,
        idPersonaAlumno: 0,
        fecha: "",
        horaInicio: "",
        horaFin: "",
        enlaceSesion: "",
        estado: "",
        idCurso: 0
    } 

    const [usuarios, setUsuarios ] = useState([]);
    const [sesion , setSesion] = useState({});
    const router = useRouter();
    const [user, setUser] = useState({})

    const [grado , setGrado] = useState('')

    const [imagen , setImagen] = useState(undefined)
    const [citas, setCitas] = useState([])

    const [filtro, setFiltro] = useState('');
    const [cursosFiltrados, setCursosFiltrados] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [cursosSelec, setCursosSelec] = useState([]);
    const [personasCursos, setPersonasCursos ] = useState([]);
    const [cursos, setCursos] = useState([]);

    const[fecha, setFecha] = useState('')
    const[curso, setCurso] = useState(0)
    const[hora, setHora] = useState('')
    
    const [cita, setCita] = useState(citaDefault);

    
    const  filtrarCursosMatriculados = async (personasCursos, cursos, sesion) =>{
        let personasCursosFiltrados = []
        personasCursosFiltrados = personasCursos.filter((e) => e.idPersona == sesion.idPersona)

       

        let cursosFiltrados = []
        cursosFiltrados = cursos.filter((e) => personasCursosFiltrados.some((f) => f.idCurso == e.idCurso));
        return cursosFiltrados;
    }


      const handleBuscarClick = async () => {
        //setCita({...cita, idCita: citas.length+10, idPersonaDocente: sesion.idPersona, idPersonaAlumno: user.idPersona,
        //fecha: fecha, horaInicio: sesion.horarios[0].horaInicio, horaFin: sesion.horarios[0].horaFin, enlaceSesion: "https://nothing.com/", estado: "Pendiente", idCurso: parseInt(curso)})
        let ids = []
        for (let i = 0; i < citas.length; i++){
            ids.push(citas[i].idCita)
        }
        const maxIdCita = Math.max(...ids)+1
        const nuevaCita = {
            idCita: maxIdCita+2,
            idPersonaDocente: sesion.idPersona,
            idPersonaAlumno: user.idPersona,
            fecha: fecha,
            horaInicio: sesion.horarios[0].horaInicio,
            horaFin: sesion.horarios[0].horaFin,
            enlaceSesion: "https://nothing.com/",
            estado: "Pendiente",
            idCurso: cursosSelec[0].idCurso
          };
        console.log(nuevaCita)
        
        const result = await CitasApi.create(nuevaCita);
        if(result){
            setShowModal(true);
        }else{
            alert('error')
        }
        
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
        router.push('/reserva_busq')
 
      };

    useEffect(() => {
        const handleOnLoad = async () => {
            const result = await CursosApi.findAll();
            let rawCursos = result.data
            const result2 = await PersonasCursosApi.findAll();
            let rawPersonasCursos = result2.data
            const result3 = await CitasApi.findAll();
            setCitas(result3.data);
            console.log(result3.data);
            let sesionGuardada = localStorage.getItem("docente");
            let sesionGuardada2 = localStorage.getItem("sesion");
            if(sesionGuardada == undefined){
                router.push('/')
            }
            setSesion(JSON.parse(sesionGuardada))
            setUser(JSON.parse(sesionGuardada2))
            const cursosFiltrados2 = await filtrarCursosMatriculados(rawPersonasCursos, rawCursos, JSON.parse(sesionGuardada))
            setCursosSelec(cursosFiltrados2)
        }
        handleOnLoad();
    }, []);
   
    return (
        <div className="contenedorPrincipal">
            
                <form method="post">
                    <div className="d-flex justify-content-between">
                        <h4> Citas </h4>
                        <button className="btn btn-primary" type="submit"  onClick={handleBuscarClick} style={{backgroundColor: '#a254b6', border:'none'}}> Reservar </button> 
                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                            <Modal.Title>Reserva de cita</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            Usted ha reservado la cita existosamente para el {fecha} a las {sesion.horarios[0]?.horaInicio} para la asesoría del curso {cursosSelec[0]?.nombre}. Encontrará el detalle en su página de citas
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>OK</Button>
                            </Modal.Footer>  
                        </Modal> 
                    </div>
                    <hr></hr>

                    <div className="informacionProfesor">
                       <div className="infoProfe">
                            <div className="col-auto d-flex align-items-center px-3" style={{marginLeft: '40px'}}>
                                <div className={styles.cardLetra} style={{fontWeight:'bold', fontSize:'20px', marginBottom: '15px'}}> {sesion.rol  == 'docente' ? '-' : 'JS'}  
                                </div>
                            </div>

                            <div className="cont">
                                <h6>Docente {sesion.nombre+' '+sesion.apellido}</h6>
                                <p>{sesion.tituloPresentacion}</p>
                            </div>
                       </div> 
                        
                        <div className="presentacion">
                            
                            <div className="contenedorsito">
                                <div className="text-center m-auto" style={{maxWidth: '350px', maxHeight : '350px'}}>
                                        <img src={imagen != '' && imagen != undefined ? imagen :'https://placehold.jp/200x200.png' } style={{maxWidth: `250px` , maxHeight: `250px` , objectFit :'contain'}} ></img>
                                </div>
                            </div>
                                
                            <div className="contenedorsitoo">
                                <p className="text-justify">{sesion.presentacion}</p>
                            </div>
                            
                            <div className="contenedorsito">
                                <div>
                                    <h6 style={{color:'gray'}}>Correo electrónico</h6>
                                    <p style={{fontWeight:'bold'}}>{sesion.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="seccionCursos">
                            <div className="titulo cursos">
                                <h6 style={{color:'gray', marginLeft:'60px'}}>Cursos</h6>
                            </div >

                            <div className="listaCursos">
                            {cursosSelec.map((item, index)=>{
                                                    return(
                                                        <div className="button">
                                                            <button class="d-flex btn btn-primary" type="button" value="Input" style={{color: 'purple', backgroundColor:'white', borderColor: 'purple', border:'solid 1.6px', fontWeight:'bold'}} disabled>{item.nombre}</button>
                                                        </div>
    
                                                    )
                                                })
                                                    
                                                }
                            </div>
                        </div>
                    </div>

                    <div className="Contenedor2">
                        <h6>Fechas y horarios disponibles</h6>
                        <hr></hr>
                        <div>   
                                <div className="rellenar">
                                        <div className="formFecha">
                                            <h6 className="ingresarFecha">Ingrese una Fecha</h6>
                                            <Form.Group controlId="dob">
                                                <Form.Control type="date" name="dob" className="fechaElegir" onChange={(e) => setFecha(e.target.value)} />
                                            </Form.Group>
                                        </div>
                                        <div className="formCurso">
                                            <h6 className="ingresarCurso">Curso de Interés</h6>
                                            <select type="text" value={curso} 
                                                        onChange={e => setCurso(e.target.value)}
                                                         className="form-select"
                                                          id="inputCurso" style={{width:'95%', marginLeft:'14px',marginRight:'14px', paddingBottom:'5px', paddingTop:'0px', height:'25px', border:'none', fontSize:'15px', boxShadow:'none'}}
                                            >
                                                {cursosSelec.map((item, index)=>{ 
                                                    return(
                                                        <option value={item.idCurso}>
                                                            {item.nombre}
                                                        </option> 
                                                    )
                                                }) 
                                                    
                                                }   
                                                

                                            </select>


                                            
                                            
                                            
                                            
                                            
                                            
                                        </div>
                                </div>
                                    

                                    <div className="descripcion">
                                        <span className="info">DD/MM/YYYY</span>
                                    </div>

                                    <div className="horarios">
                                    <div className="button">
                                        <button class="btn btn-primary"  type="button" value="Input" style={{color:'black', backgroundColor:'#e8def8', border:'none'}}>08:00</button>
                                    </div>
                                    <div className="button">
                                        <button class="btn btn-primary"  type="button" value="Input" style={{color:'black', backgroundColor:'#e8def8', border:'none'}}>08:30</button>
                                    </div>
                                    </div>
                                    <div className="detalle">
                                        <ul> 
                                            <li>Las sesiones son de 30 minutos </li>
                                        </ul>
                                    </div>
                            
                        </div>
                    </div> 
                </form>
        </div>
    )
}
/*
<div className="button">
    <button class="btn btn-primary" onClick={setHora(sesion.horarios[0].horaInicio.slice(1,5))} type="button" value="Input" style={{color:'black', backgroundColor:'#e8def8', border:'none'}}>{sesion.horarios[0].horaInicio.slice(1,5)}</button>
</div>
<div className="button">
    <button class="btn btn-primary" onClick={setHora(sesion.horarios[0].horaInicio.slice(1,5)+30)} type="button" value="Input" style={{color:'black', backgroundColor:'#e8def8', border:'none'}}>{(sesion.horarios[0].horaInicio).slice(1,3)+30}</button>
</div>


a las {sesion.horarios[0].horaInicio} am
{cursos.find((e) => e.idCurso == parseInt(curso)).nombre} 
*/
