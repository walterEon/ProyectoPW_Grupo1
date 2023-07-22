"use client"
 import { useState, useEffect } from 'react';
 import { useRouter } from 'next/navigation';
 import Link from 'next/link';
 import styles from '../page.module.css';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import Select from 'react-select';
 import personasApi from '@/api/personas';
 
 const Registro = () => {

   const [usuarios, setUsuarios] = useState([]);
   const router = useRouter();
 
   
 
   const [nombres, setNombres] = useState('');
   const [apellidos, setApellidos] = useState('');
   const [doc_tipo, setDoc_tipo] = useState('');
   const [rol, setRol] = useState('');
   const [doc_numero, setDoc_numero] = useState('');
   const [idPersona, setIdPersona] = useState('');
   const [usuario, setUsuario] = useState('');
   const [password, setPassword] = useState('');
   const [check_password, setCheck_password] = useState('');
 
   const submitForm = async (event) => {
     event.preventDefault();
     if (usuarios === '' || password === '' || check_password === '') {
       alert('Complete sus datos de Usuario');
       return;
     }
     if (usuarios.find((e) => e.user === usuario)) {
       alert('Ese usuario ya existe');
       return;
     }
     if (password !== check_password) {
       alert('Las contraseñas no son iguales');
       return;
     }
     // Obtiene el último idPersona registrado y asigna el siguiente número disponible
     Math.max()
     let ids = []
     for (let i = 0; i < usuarios.length; i++){
        ids.push(usuarios[i].idPersona)
     }
     const ultidpersona = Math.max(...ids)+1
     
    
     // Objeto con los datos del nuevo usuario
     const newUser = {
       idPersona: ultidpersona,
       nombre: nombres,
       apellido: apellidos,
       tipoDocumento: doc_tipo,
       DNI: doc_numero,
       idRol: (rol === "alumno" ? 1 : 2), // Suponemos que 1 representa 'alumno' y 2 representa 'docente'
       email: usuario,
       password: password,
       idCarrera: 1, // Id de la carrera (aquí asumimos que siempre es 2)
       tituloPresentacion: "", // Valor fijo para este ejemplo
       presentacion: "", // Valor fijo para este ejemplo
       grado: "", // Valor fijo para este ejemplo
     };

     console.log(newUser);

     
     try {
       // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
       const response = await personasApi.create(newUser);
 
       // Comprueba el resultado de la solicitud
       if (response && response.status === 200) {
         // Registro exitoso, redirige a la página de inicio de sesión
         alert('Registro exitoso!');
         router.push('/');
       } else {
         // Manejo de errores en caso de que algo salga mal en el backend
         alert('Error al registrar usuario');
       }
     } catch (error) {
       // Manejo de errores en caso de problemas de conexión o errores en el backend
       alert('Error al registrar usuario');
     }
   };

   useEffect(() => {
    // Aquí puedes realizar una solicitud GET al backend para obtener la lista de usuarios registrados
    const handleOnLoad = async () => {
       try{
           const result = await personasApi.findAll();
           setUsuarios(result.data);
       } catch (error) {
           console.error('Error al obtener usuarios:', error);
         }
    
   } 
   handleOnLoad();
   console.log(usuarios[usuarios.length-1]) 
  }, []);

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
export default Registro;

