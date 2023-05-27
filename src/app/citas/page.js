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

export default function Dashboard() {
    const [usuarios, setUsuarios ] = useState([]);
    const [sesion , setSesion] = useState({});
    const router = useRouter();

    const [grado , setGrado] = useState('')

    const [imagen , setImagen] = useState(undefined)

    const [filtro, setFiltro] = useState('');
    const [cursosFiltrados, setCursosFiltrados] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState('');
    const [showModal, setShowModal] = useState(false);

    


    const setData = ( dataSesion ) => {
        setImagen(dataSesion.imagen || '')
        if(dataSesion.rol == 'docente'){
            setGrado(dataSesion.grado)
        }else{
            setGrado('')
        }
    }

    
      const handleBuscarClick = () => {
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
        router.push('/reserva_busq')

      };

    useEffect(() => {
        let sesionGuardada = localStorage.getItem("sesion");
        if(sesionGuardada == undefined){
            router.push('/')
        }
        var objSesion = JSON.parse(sesionGuardada);
        setSesion(objSesion);
        setData(objSesion);

        
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
                            Usted ha reservado la cita existosamente para el Lunes 24 de abril del 2023 a las 9:00 am para la asesoría del curso {cursoSeleccionado}. Encontrará el detalle en su página de citas
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
                                <h6>Profesor Juan López</h6>
                                <p>Magister en Ingeniería de Software</p>
                            </div>
                       </div>
                        
                        <div className="presentacion">
                            
                            <div className="contenedorsito">
                                <div className="text-center m-auto" style={{maxWidth: '350px', maxHeight : '350px'}}>
                                        <img src={imagen != '' && imagen != undefined ? imagen :'https://placehold.jp/200x200.png' } style={{maxWidth: `250px` , maxHeight: `250px` , objectFit :'contain'}} ></img>
                                </div>
                            </div>
                                
                            <div className="contenedorsito">
                                <p className="text-justify">Fusce condimentum mauris diam, in vestibulum sapien molestie nec. Donec non velit quam. Sed non facilisis felis. Proin vel egestas lacus, cursus efficitur lorem. Morbi consectetur sem in turpis varius suscipit. Vestibulum porta urna eget sem tempor ornare et sit amet ipsum. Quisque bibendum nunc id molestie dapibus. Quisque sit amet metus risus. Fusce nec ipsum quis augue luctus sagittis id consectetur nisl. Nunc mattis ipsum ac mauris gravida, id blandit nunc suscipit. Maecenas pharetra, nisi a aliquet fringilla, nisi lectus imperdiet purus, a tincidunt lectus erat id dolor. Nam mauris orci, fringilla ut lacus sit amet, maximus sodales libero. Praesent nulla ipsum, ultrices eget blandit aliquet, tincidunt a justo. Donec quis maximus purus. Nulla lacinia gravida arcu sed placerat. Donec pulvinar risus sit amet est eleifend, quis fringilla dui aliquet.</p>
                            </div>
                            
                            <div className="contenedorsito">
                                <div>
                                    <h6 style={{color:'gray'}}>Correo electrónico</h6>
                                    <p style={{fontWeight:'bold'}}>jlopez1949@ulima.edu.pe</p>
                                </div>
                            </div>
                        </div>

                        <div className="seccionCursos">
                            <div className="titulo cursos">
                                <h6 style={{color:'gray', marginLeft:'60px'}}>Cursos</h6>
                            </div >

                            <div className="listaCursos">
                                <div className="button">
                                    <button class="d-flex btn btn-primary" type="button" value="Input" style={{color: 'purple', backgroundColor:'white', borderColor: 'purple', border:'solid 1.6px', fontWeight:'bold'}} disabled>Ingeniería de Software</button>
                                </div>

                                <div className="button">
                                    <button class=" btn btn-primary" type="button" value="Input" style={{color: 'purple', backgroundColor:'white', borderColor: 'purple', border:'solid 1.6px', fontWeight:'bold'}} disabled>Programación Web</button>
                                </div>

                                <div className="button">
                                    <button class="btn btn-primary" type="button" value="Input" style={{color: 'purple', backgroundColor:'white', borderColor: 'purple', border:'solid 1.6px', fontWeight:'bold'}} disabled>Programación de Videojuegos</button>
                                </div>

                                <div className="button">
                                    <button class="btn btn-primary" type="button" value="Input" style={{color: 'purple', backgroundColor:'white', borderColor: 'purple', border:'solid 1.6px', fontWeight:'bold'}} disabled>Programación Orientada a Objetos</button>
                                </div> 
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
                                                <Form.Control type="date" name="dob" className="fechaElegir" />
                                            </Form.Group>
                                        </div>
                                        <div className="formCurso">
                                            <h6 className="ingresarCurso">Curso de Interés</h6>
                                            <select type="text" className="form-select" id="inputCurso" style={{width:'95%', marginLeft:'14px',marginRight:'14px', paddingBottom:'5px', paddingTop:'0px', height:'25px', border:'none', fontSize:'15px', boxShadow:'none'}}
                                            >
                                                <option value="curso1">Ingeniería de Software</option>
                                                <option value="curso2">Programación Web</option>
                                                <option value="curso3">Programación de Videojuegos</option>
                                                <option value="cursi4">Programación Orientada a Objetos</option>
                                            </select>
                                            
                                        </div>
                                </div>
                                    

                                    <div className="descripcion">
                                        <span className="info">DD/MM/YYYY</span>
                                    </div>

                                    <div className="horarios">
                                        <div className="button">
                                            <button class="btn btn-primary" type="button" value="Input" style={{color:'black', backgroundColor:'#e8def8', border:'none'}}>8:00</button>
                                        </div>

                                        <div className="button">
                                            <button class="btn btn-primary" type="button" value="Input" style={{color:'black', backgroundColor:'#e8def8', border:'none'}}>9:00</button>
                                        </div>

                                        <div className="button">
                                            <button class="btn btn-primary" type="button" value="Input" style={{color:'black', backgroundColor:'#e8def8', border:'none'}}>10:00</button>
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
