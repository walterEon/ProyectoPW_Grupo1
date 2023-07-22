'use client';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from '../page.module.css'
import 'animate.css';
import { useState , useEffect } from 'react'

import React from 'react'

import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

import { useRouter } from 'next/navigation';

import ChipCursos from '../../components/Chip_Cursos/Chip_Cursos.jsx';

import CarrerasApi from '../../api/carreras.js'
import UniversidadesApi from '../../api/universidades.js'
import PersonasApi from '../../api/personas.js'
import CursosApi from '../../api/cursos.js'
import PersonasCursosApi from '../../api/personascursos.js'

export default function Dashboard() {
    const [usuarios, setUsuarios ] = useState([]);
    const [carreras, setCarreras ] = useState([]);
    const [universidades, setUniversidades ] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [sesion , setSesion] = useState({});
    const [cursosSelec, setCursosSelec] = useState([]);
    const [personasCursos, setPersonasCursos ] = useState([]);
    const router = useRouter();

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState( '' );
    const [doc_tipo, setDoc_tipo] = useState( '');
    const [rol, setRol] = useState('');
    const [doc_numero, setDoc_numero] = useState('');

    const [usuario , setUsuario] = useState('')
    const [password , setPassword] = useState('')
    const [new_password , setNew_password] = useState('')
    const [check_password , setCheck_password] = useState('')
    const [universidad , setUniversidad] = useState('')
    const [carrera , setCarrera] = useState(0)


    const [titulo , setTitulo] = useState('')
    const [presentacion , setPresentacion] = useState('')
    const [grado , setGrado] = useState('')
    
    const [tab , setTab] = useState('datos')


    const [imagen , setImagen] = useState(undefined)

    const [selectedFile, setSelectedFile] = useState(undefined);
    




    const  filtrarCursosMatriculados = async (personasCursos, cursos, sesion) =>{
        let personasCursosFiltrados = []
        personasCursosFiltrados = personasCursos.filter((e) => e.idPersona == sesion.idPersona)

       

        let cursosFiltrados = []
        cursosFiltrados = cursos.filter((e) => personasCursosFiltrados.some((f) => f.idCurso == e.idCurso));
            

        return cursosFiltrados;
    }

    

    const setData = async ( dataSesion ) => {
        setNombres(dataSesion.nombre)
        setApellidos(dataSesion.apellido)
        setDoc_tipo(dataSesion.tipoDocumento)
        setRol(dataSesion.idRol)
        setDoc_numero(dataSesion.DNI)
        setUsuario(dataSesion.email)
        setPassword(dataSesion.password)
        setUniversidad(dataSesion.carrera.idUniversidad) // no se obtiene
        setCarrera(dataSesion.idCarrera) // no se obtiene
        setTitulo(dataSesion.tituloPresentacion)
        setPresentacion(dataSesion.presentacion)
        setImagen(dataSesion.imagen || '')
        setGrado(dataSesion.grado)
        
    }

    const imagenUpload = async (event) => {
        event.preventDefault();
        var base64 = await toBase64(event.target.files[0]);
        setImagen(base64);
    }
    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
        
            fileReader.readAsDataURL(file);
        
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
        
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
      };

    const submitForm = async (event) => {
        event.preventDefault();

        if( usuarios.find(e => e.email == usuario && e.idPersona != sesion.idPersona ) ){
            alert( 'Ese usuario ya existe' );
            return;
        }
        if( password != '' ){
            if(usuarios.find(e => e.email == usuario && e.password == password ) ){
                if(new_password != check_password){
                    alert( 'Las contraseñas no coinciden' );
                    return;
                }
            }else{
                alert( 'Contraseña incorrecta, no se pudo actualizar' );
                return;
            }
        }
        
        var usuarioCambio = usuarios.find(e => e.idPersona == sesion.idPersona)
        if(new_password == ''){
            usuarioCambio.password = password;
        }else{
            usuarioCambio.password = new_password;
        }
        
        usuarioCambio.nombre = nombres;
        usuarioCambio.apellido = apellidos;
        usuarioCambio.tipoDocumento = doc_tipo;
        usuarioCambio.DNI = doc_numero;
        usuarioCambio.idRol = rol;
        usuarioCambio.email = usuario;
        usuarioCambio.idCarrera = carrera;
        usuarioCambio.tituloPresentacion = titulo;
        usuarioCambio.presentacion = presentacion;
        usuarioCambio.grado = grado;
        

        const result = await PersonasApi.update(usuarioCambio);
    
    }
    
    
  




    useEffect(() => {
        const handleOnLoad = async () => {
            const result = await CarrerasApi.findAll();
            setCarreras(result.data);
            const result2 = await UniversidadesApi.findAll();
            setUniversidades(result2.data);
            const result3 = await PersonasApi.findAll();
            setUsuarios(result3.data);
            const result4 = await CursosApi.findAll();
            let rawCursos = result4.data
            setCursos(result4.data);
            const result5 = await PersonasCursosApi.findAll();
            let rawPersonasCursos = result5.data
            setPersonasCursos(result5.data);
            let sesionGuardada = localStorage.getItem("sesion");
            if(sesionGuardada == undefined){
                router.push('/')
            }
            setSesion(JSON.parse(sesionGuardada))
            const cursosMatriculadosFiltrados = await filtrarCursosMatriculados(rawPersonasCursos, rawCursos, JSON.parse(sesionGuardada));
            setCursosSelec(cursosMatriculadosFiltrados)
            setData(JSON.parse(sesionGuardada)) 
        }


        handleOnLoad()
        
        

        
    }, []);
   
    return (
        <div className={`${styles.contenedor} col`}> 
            <div>
                <form method="post" onSubmit={submitForm}>
                    <div className="d-flex justify-content-between">
                        <h4> Mi perfil </h4>
                        <button className="btn btn-primary" type="submit" style={{backgroundColor:'#a254b6', border: 'none'}}> Guardar </button> 
                    </div>
                    <hr></hr>
                    <h6>Información Personal</h6>
                    <div>
                        <div className="row align-items-start">
                            <div className="col-md-7 row row-gap-3 pe-4">                                    
                                <div className="col-md-6">
                                    <label htmlFor="inputNombres" className="form-label">Nombres</label>
                                    <input type="text" className="form-control" id="inputNombres" aria-describedby="correoHelp" 
                                        value={ nombres }
                                        onChange={e => setNombres(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputApellidos" className="form-label">Apellidos</label>
                                    <input type="text" className="form-control" id="inputApellidos" 
                                        value={ apellidos } 
                                        onChange={e => setApellidos(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputDocumentoTipo" className="form-label">Tipo de Documento</label>
                                    <select type="text" className="form-select" id="inputDocumentoTipo" 
                                        value={ doc_tipo } 
                                        onChange={e => setDoc_tipo(e.target.value)}
                                        required
                                    >
                                        <option value="DNI">DNI</option>
                                        <option value="Pasaporte">Pasaporte</option> 
                                        
                                    </select>
                                </div>
                              
                                <div className="col-md-6">
                                    <label htmlFor="inputDocumentoNumero" className="form-label">Nro de Documento</label>
                                    <input type="text" className="form-control" id="inputDocumentoNumero"
                                        value={ doc_numero } 
                                        onChange={e => setDoc_numero(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="inputRol" className="form-label">ROL</label>
                                    <select type="text" className="form-select" id="inputRol" 
                                        value={ rol } 
                                        onChange={e => setRol(e.target.value)}
                                        required
                                    >
                                        <option value={1}>Alumno</option>
                                        <option value={2}>Docente</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="text-center pt-4">
                                    <div className="text-center m-auto" style={{maxWidth: '350px', maxHeight : '350px'}}>
                                        <img src={imagen != '' && imagen != undefined ? imagen :'https://placehold.jp/200x200.png' } style={{maxWidth: `250px` , maxHeight: `250px` , objectFit :'contain'}} ></img>
                                    </div>
                                    <div className="py-3">
                                        <label htmlFor="inputFile" className="form-label">Subir Imagen</label>
                                        {<textarea className="form-control" id="inputImagen"
                                            value={ imagen }
                                            onChange={e => setImagen(e.target.value)}
                                        > 
                                        </textarea>}
                                        <input
                                            className="form-control" id="inputFile"
                                            type="file"
                                            accept=".png,.jpg,.jpeg"
                                            value={ selectedFile }
                                            onChange={ imagenUpload }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a className={tab == 'datos' ? 'nav-link active' : 'nav-link'  } href="#" onClick={ e => setTab('datos') }>Datos de Usuario</a>
                                </li>
                                <li className="nav-item">
                                    <a className={tab == 'universidad' ? 'nav-link active' : 'nav-link'  } href="#" onClick={ e => setTab('universidad') }>Universidad</a>
                                </li>
                                <li className="nav-item">
                                    <a className={tab == 'presentacion' ? 'nav-link active' : 'nav-link'  } href="#" onClick={ e => setTab('presentacion') } >Presentación</a>
                                </li>
                            </ul>
                        </div>
                        <div className={`${styles.tabs}`}>
                            { tab == 'datos' && (
                                <div id="datos_usuario" className="mb-3">
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="inputUsuario" className="form-label">Usuario</label>
                                            <input type="text" className="form-control" id="inputUsuario"
                                                value={ usuario } 
                                                onChange={e => setUsuario(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="inputPassword" className="form-label">Contraseña Actual</label>
                                            <input type="password" className="form-control" id="inputPassword"
                                                value={ password } 
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row row-gap-3">
                                        <div className="col-md-6">
                                            <label htmlFor="inputNewPassword" className="form-label">Nueva Contraseña</label>
                                            <input type="password" className="form-control" id="inputNewPassword"
                                                value={ new_password } 
                                                onChange={e => setNew_password(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="inputRepeatPassword" className="form-label">Repetir Contraseña</label>
                                            <input type="password" className="form-control" id="inputRepeatPassword"
                                                value={ check_password } 
                                                onChange={e => setCheck_password(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div> 
                            )}
                            { tab == 'universidad' && (
                                <div id="universidad" className="mb-3">
                                    <div className="row row-gap-4">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <div className="d-flex justify-content-between pb-1">
                                                    <label htmlFor="inputUniversidad" className="form-label">Universidad</label>
                                                    
                                                </div>
                                    
                                                <select type="text" className="form-select" id="inputUniversidad" 
                                                    value={universidad } 
                                                    onChange={e => setUniversidad(e.target.value)}
                                                >{universidades.map((item, index)=>{
                                                    return(
                                                        <option value={item.idUniversidad}>{item.descripcion}</option>
    
                                                    )
                                                })
                                                    
                                                }
                                                    
                                                </select>
                                            </div>
                                            <div className="">
                                                <div className="d-flex justify-content-between pb-1">
                                                    <label htmlFor="inputUniversidad" className="form-label">Carrera</label>
                                                    
                                                </div>
                                                <select type="text" className="form-select" id="inputCarrera" 
                                                    value={carrera } 
                                                    onChange={e => setCarrera(e.target.value)}
                                                >{carreras.map((item, index)=>{
                                                    return(
                                                        <option value={item.idCarrera}>{item.nombre}</option>
    
                                                    )
                                                })
                                                    
                                                }</select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                            <div className="d-flex justify-content-between pb-1">
                                                    <label htmlFor="inputUniversidad" className="form-label">Agregar Cursos</label>
                                                    
                                                </div>
                                                <select type="text" className="form-select" id="inputCurso" 
                                                    
                                                    onChange={e => setCarrera(e.target.value)}
                                                >{cursos.map((item, index)=>{
                                                    return(
                                                        <option value="carr">{item.nombre}</option>
    
                                                    )
                                                })
                                                    
                                                }</select>
                                                {
                                                    cursosSelec.map((item, index) =>{
                                                        return(
                                                            <ChipCursos nombre={item.nombre}></ChipCursos>
                                                        )
                                                    })
                                                }
                                                
                                            </div>
                                                <div className="">
                                                    <label htmlFor="inputGrado" className="form-label pb-1">Grado alcanzado</label>
                                                    <select type="text" className="form-select" id="inputGrado"
                                                        value={ grado } 
                                                        onChange={e => setGrado(e.target.value)}
                                                        required
                                                    >
                                                        <option value="Bachiller">Bachiller</option>
                                                        <option value="Magister">Magister</option>
                                                        <option value="Doctorado">Doctor</option>
                                                        <option value="Pregrado">Pregrado</option>
                                                    </select>
                                                    
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            { tab == 'presentacion' && (
                                <div id="presentacion" className="pb-2">
                                    <div className="mb-3">
                                        <label htmlFor="inputTitulo" className="form-label">Título</label>
                                        <input type="text" className="form-control" id="inputTitulo" 
                                            value={ titulo } 
                                            onChange={e => setTitulo(e.target.value)}
                                        /> 
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputPresentacion" className="form-label">Presentacion</label>
                                            
                                        <textarea className="form-control" id="inputPresentacion" style={{resize:'none', height:'50px'}}value={ presentacion}  onChange={e => setPresentacion(e.target.value)} ></textarea>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
