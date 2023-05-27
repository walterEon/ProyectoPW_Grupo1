'use client';
import styles from './page.module.css'
import Link from 'next/link';
import { useState , useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLock } from '@fortawesome/free-solid-svg-icons'



const Login = () => {
    const [usuarios, setUsuarios ] = useState([]);
    const [sesion , setSesion] = useState({});
    const [usuario , setUsuario] = useState('');
    const router = useRouter();

    useEffect(() => {
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
            setUsuarios(users);
        }
    }, []);

    
    const submitForm = (event) => {
        event.preventDefault();
        var usuario = document.getElementById('usuario').value;
        var clave = document.getElementById('clave').value;
        const sesionU = usuarios.find((e) => e.user == usuario && e.password == clave );
        if(sesionU){
            localStorage.setItem('sesion', JSON.stringify(sesionU))
            setSesion(sesionU);
            router.push('/dashboard');
        }else{
            alert("Usuario no encontrado")
        }
    }
    const recuperarPassword = (event) => {
        event.preventDefault();
        var usuarioRecuperar = usuarios.find(e => e.user == usuario)
         if( usuarioRecuperar == undefined ){
            alert( 'Este usuario no existe' );
            return;
        }

        var u = usuarios;
        var indexSesion = u.findIndex(object => {
            return object.id === usuarioRecuperar.id;
        })
        var randomstring = Math.random().toString(36).slice(-8);
        usuarioRecuperar.password = randomstring;
        u.splice(indexSesion, 1, usuarioRecuperar)
        localStorage.setItem('usuarios', JSON.stringify(u))
        
        alert("Tu nueva contraseña es: " + randomstring)
        location.reload();        
    }
    return (
        <main className={styles.main}>
            <div className="card">
                <div>
                    <h1 style={{margin:'20px'}}>Sistemas de Citas para Atención de Citas</h1>
                </div>
                <div className='py-3 px-3 d-flex items-align-center justify-content-center'>
                    <FontAwesomeIcon icon={ faUserLock } style={{fontSize: '12em'}} />
                </div>
                <div className="card-body pt-0 pb-5 px-3">
                    <form method="post" onSubmit={submitForm}>
                        <div className="mb-3">
                            <label htmlFor="usuario" className="form-label" style={{color: '#6c25be', fontWeight: 'bold'}}>Usuario</label>
                            <input type="text" className="form-control" id="usuario" aria-describedby="emailHelp" style={{color: 'gray'}} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="clave" className="form-label" style={{color: '#6c25be', fontWeight: 'bold'}}>Contraseña</label>
                            <input type="password" className="form-control" id="clave" required/>
                        </div>
                        <div className="d-flex row-gap-2 flex-column align-items-center">
                            <Link href="/registro" style={{color: '#6c25be'}}>Registro de nuevo usuario</Link>
                            <a href='#' data-bs-toggle="modal" data-bs-target="#exampleModal" style={{color: '#6c25be'}}> Olvidé mi contraseña </a>
                            <button type="submit" className="btn btn-primary" style={{color:'white', backgroundColor: '#a254b6', border: 'none    '}}>Ingresar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Recuperar Contraseña</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form method="post" onSubmit={recuperarPassword}>
                            <div className="modal-body">
                                <label htmlFor="inputUsuario" className="form-label">Usuario</label>
                                <input type="text" className="form-control" id="inputUsuario" 
                                    value={ usuario } 
                                    onChange={e => setUsuario(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="submit" className="btn btn-primary">Generar nueva contraseña</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Login