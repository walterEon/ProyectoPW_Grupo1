'use client';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from '../page.module.css'
import 'animate.css';
import { useState , useEffect } from 'react'

import React from 'react'

import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

import { useRouter } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import ModalUniversidad from './universidadAddComp';
import ModalCarrera from './carreraAddComp';
import ModalCurso from './cursoAddComp';

export default function Dashboard() {
    const [usuarios, setUsuarios ] = useState([]);
    const [sesion , setSesion] = useState({});
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
    const [carrera , setCarrera] = useState('')
    // const [cursos , setCursos] = useState('')

    const [titulo , setTitulo] = useState('')
    const [presentacion , setPresentacion] = useState('')
    const [grado , setGrado] = useState('')
    
    const [tab , setTab] = useState('datos')
    const [cursoSeleccionado , setCursoSeleccionado] = useState([])

    const [imagen , setImagen] = useState(undefined)

    const [selectedFile, setSelectedFile] = useState(undefined);
    
    const [optCursos, setOptCursos] = useState([]);
    const [optUniversidades, setOptUniversidades] = useState([]);
    const [optCarreras, setOptCarreras] = useState([]);

    const setData = ( dataSesion ) => {
        setNombres(dataSesion.nombres)
        setApellidos(dataSesion.apellidos)
        setDoc_tipo(dataSesion.doc_tipo)
        setRol(dataSesion.rol)
        setDoc_numero(dataSesion.doc_numero)
        setUsuario(dataSesion.user)
        setUniversidad(dataSesion.universidad)
        setCarrera(dataSesion.carrera)
        setTitulo(dataSesion.titulo)
        setPresentacion(dataSesion.presentacion)
        setCursoSeleccionado(dataSesion.cursos)
        setImagen(dataSesion.imagen || '')
        if(dataSesion.rol == 'docente'){
            setGrado(dataSesion.grado)
        }else{
            setGrado('')
        }
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
    const submitForm = (event) => {
        event.preventDefault();

        if( usuarios.find(e => e.user == usuario && e.id != sesion.id ) ){
            alert( 'Ese usuario ya existe' );
            return;
        }
        if( password != '' ){
            if(usuarios.find(e => e.user == usuario && e.password == password ) ){
                if(new_password != check_password){
                    alert( 'Las contraseñas no coinciden' );
                    return;
                }
                }else{
                    alert( 'Contraseña incorrecta, no se pudo actualizar' );
                return;
                }
        }

        var u = usuarios;
        var indexSesion = u.findIndex(object => {
            return object.id === sesion.id;
        })
        var pwd = password != '' ? new_password : sesion.password;
        var newSesion = { 
            id : sesion.id , user : usuario , password: pwd, 
            nombres : nombres , apellidos : apellidos , 
            imagen: imagen,
            rol : rol , doc_tipo : doc_tipo , doc_numero : doc_numero,
            universidad : universidad, carrera : carrera, cursos : cursoSeleccionado,
            titulo: titulo, presentacion : presentacion, grado : (rol == 'docente' ? grado : '')
        }
        u.splice(indexSesion, 1, newSesion)
        localStorage.setItem('usuarios', JSON.stringify(u))
        localStorage.setItem('sesion', JSON.stringify(newSesion))
        location.reload();
    }
    
    const setObjItems = () => {
        const items = JSON.parse(localStorage.getItem('usuarios'));
        if (items) {
            setUsuarios(items);
        }else{
            var users = [
                { id : 1 , user : 'admin' , password: 'admin', nombres : 'Admin' , rol : 'admin', apellidos : '' , doc_tipo : '' , doc_numero : '' ,
                    universidad : '', carrera : '', cursos : '',
                    titulo: '', presentacion : '', 
                },
                { id : 2 , user : 'profesor' , password: 'profesor', nombres : 'Profesor Pruebas' , rol : 'docente', apellidos : '' , doc_tipo : '' , doc_numero : '',
                    universidad : '', carrera : '', cursos : '',
                    titulo: '', presentacion : '', 
                },
                { id : 3 , user : 'alumno1' , password: 'alumno1', nombres : 'Alumno 1' , rol : 'alumno', apellidos : 'Pruebas' , doc_tipo : '' , doc_numero : '',
                    universidad : '', carrera : '', cursos : '',
                    titulo: '', presentacion : '', 
                },
                { id : 4 , user : 'alumno2' , password: 'alumno2', nombres : 'Alumno 2' , rol : 'alumno', apellidos : 'Pruebas' , doc_tipo : '' , doc_numero : '' ,
                    universidad : '', carrera : '', cursos : '',
                    titulo: '', presentacion : '', 
                },
                { id : 5 , user : 'alumno3' , password: 'alumno3', nombres : 'Alumno 3' , rol : 'alumno', apellidos : 'Pruebas' , doc_tipo : '' , doc_numero : '',
                    universidad : '', carrera : '', cursos : '',
                    titulo: '', presentacion : '', 
                }
            ]
            localStorage.setItem('usuarios', JSON.stringify(users))
        }
    }
    const setObjUniversidades = () => {
        var universidades = JSON.parse(localStorage.getItem('universidades'));
        if (universidades) {
            setOptUniversidades(universidades);
        }
    }
    const setObjCarreras = () => {
        var carreras = JSON.parse(localStorage.getItem('carreras'));
        if (carreras) {
            setOptCarreras(carreras);
        }
    }
    const setObjCursos = () => {
        var cursos = JSON.parse(localStorage.getItem('cursos'));
        if (cursos) {
            setOptCursos(cursos);
        }
    }
    useEffect(() => {
        let sesionGuardada = localStorage.getItem("sesion");
        if(sesionGuardada == undefined){
            router.push('/')
        }
        var objSesion = JSON.parse(sesionGuardada);
        setSesion(objSesion);
        setData(objSesion);

        setObjItems();
        setObjUniversidades();
        setObjCarreras();
        setObjCursos();
        
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
                                        <option value="dni">DNI</option>
                                        <option value="pasaporte">Pasaporte</option> 
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
                                        <option value="alumno">Alumno</option>
                                        <option value="docente">Docente</option>
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
                                        {/* <textarea className="form-control" id="inputImagen"
                                            value={ imagen }
                                            onChange={e => setImagen(e.target.value)}
                                        > 
                                        </textarea> */}
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
                                                    <button type="button" className="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalUniversidad">
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                                <Select 
                                                    noOptionsMessage={ () => 'Sin opciones' }
                                                    placeholder=""
                                                    value={universidad}
                                                    isClearable 
                                                    options={optUniversidades}
                                                    onChange={e => setUniversidad(e)}
                                                />
                                                <ModalUniversidad callback={setObjUniversidades} />
                                            </div>
                                            <div className="">
                                                <div className="d-flex justify-content-between pb-1">
                                                    <label htmlFor="inputUniversidad" className="form-label">Carrera</label>
                                                    <button type="button" className="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalCarrera">
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                                <Select 
                                                    noOptionsMessage={ () => 'Sin opciones' }
                                                    placeholder=""
                                                    value={carrera}
                                                    isClearable options={optCarreras}
                                                    onChange={e => setCarrera(e)}
                                                />
                                                <ModalCarrera callback={setObjCarreras} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                            <div className="d-flex justify-content-between pb-1">
                                                    <label htmlFor="inputUniversidad" className="form-label">Agregar Cursos</label>
                                                    <button type="button" className="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalCurso">
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                                <Select 
                                                    isMulti
                                                    name="cursos"
                                                    options={optCursos}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    noOptionsMessage={ () => 'Sin opciones' }
                                                    placeholder=""
                                                    value={cursoSeleccionado}
                                                    onChange={e => setCursoSeleccionado(e)}
                                                    defaultValue="{cursoSeleccionado}"
                                                />
                                                <ModalCurso callback={setObjCursos} />
                                            </div>
                                            { rol == 'docente' &&
                                                <div className="">
                                                    <label htmlFor="inputGrado" className="form-label pb-1">Grado alcanzado</label>
                                                    <select type="text" className="form-select" id="inputGrado"
                                                        value={ grado } 
                                                        onChange={e => setGrado(e.target.value)}
                                                        required
                                                    >
                                                        <option value="alumno">Bachiller</option>
                                                        <option value="docente">Magister</option>
                                                        <option value="docente">Doctor</option>
                                                    </select>
                                                    
                                                </div>
                                            }
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
                                            
                                        <textarea className="form-control" id="inputPresentacion" style={{resize:'none', height:'50px'}} defaultValue={presentacion} onChange={e => setPresentacion(e.target.value)} ></textarea>
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
