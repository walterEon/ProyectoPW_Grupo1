'use client';
import styles from '../page.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Link from 'next/link';
import { useState , useEffect } from 'react'
import { useRouter } from 'next/navigation';
import React from 'react'
import Select from 'react-select'


const registro = () => {
    const [usuarios, setUsuarios ] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('usuarios'));
        if (items) {
            setUsuarios(items);
        }else{
            var users = [
                { id : 1 , user : 'admin' , password: 'admin', nombres : 'Admin' , rol : 'docente', apellidos : '' , doc_tipo : '' , doc_numero : '' ,
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
    }, []);

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState( '' );
    const [doc_tipo, setDoc_tipo] = useState( '');
    const [rol, setRol] = useState('');
    const [doc_numero, setDoc_numero] = useState('');

    const [usuario , setUsuario] = useState('')
    const [password , setPassword] = useState('')
    const [check_password , setCheck_password] = useState('')

    const submitForm = (event) => {
        event.preventDefault();
        if(usuarios == '' || password == '' || check_password == ''){
            setTab('datos')
            alert("Complete sus datos de Usuario")
            return;
        }
        if(usuarios.find(e => e.user == usuario)){
            alert('Ese usuario ya existe')
            return;
        }
        if(password != check_password){
            alert('Las contraseñas no son iguale')
            return;
        }
        var u = usuarios;
        u.push({ 
            id : (u.length + 1)  , user : usuario , password: password, 
            nombres : nombres , apellidos : apellidos , 
            rol : rol , doc_tipo : doc_tipo , doc_numero : doc_numero,
            universidad : '', carrera : '', cursos : [],
            titulo: '', presentacion : '', grado : ''
        })
        localStorage.setItem('usuarios', JSON.stringify(u))
        alert("Registro exitoso!")
        router.push('/');
    }
    const cambio = (event) => {
        console.log(event.target.value)
    }
    return (
        <main className={styles.main} style={{maxWidth : `1200px`}}>
            <div className="mb-4">
                <h3>
                    Sistema de citas para atencion a Estudiantes
                </h3>
            </div>
            <div className='text-center fs-bold mb-2'>
                <h6>
                    Pagina de registro
                </h6>
            </div>
            <form method="post" onSubmit={submitForm}>
                <div>
                    <div>
                        <div className="mb-3 row row-gap-3">
                            <div className="col-md-6">
                                <label htmlFor="inputUsuario" className="form-label">Usuario</label>
                                <input type="text" className="form-control" id="inputUsuario"
                                    value={ usuario } 
                                    onChange={e => setUsuario(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputNewPassword" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="inputNewPassword"
                                    value={ password } 
                                    onChange={e => setPassword(e.target.value)}
                                    required
                            />
                            </div>
                            <div className="col-md-6 offset-md-6">
                                <label htmlFor="inputRepeatPassword" className="form-label">Repetir Contraseña</label>
                                <input type="password" className="form-control" id="inputRepeatPassword"
                                    value={ check_password } 
                                    onChange={e => setCheck_password(e.target.value)}
                                    required
                            />
                            </div>
                        </div> 
                    </div>
                    <div className='pb-3 mt-5'> Datos Personales </div>
                    <div className="row">
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
                            <input type="text" className="form-control" id="inputDocumentoTipo" 
                                value={ doc_tipo } 
                                onChange={e => setDoc_tipo(e.target.value)}
                            />
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
                                onChange={ e => setRol(e.target.value)}
                                required
                            >
                                <option value="">-Seleccione su ROL-</option>
                                <option value="alumno">Alumno</option>
                                <option value="docente">Docente</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="py-3 text-end">
                    <Link className='btn btn-dark me-3' href={'/'}> Volver al Login </Link>
                    <button type="submit" className="btn btn-primary">Registrar</button>
                </div>
            </form>
        </main>
    )
}
export default registro
