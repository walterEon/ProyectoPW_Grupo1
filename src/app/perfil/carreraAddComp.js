'use client';
import { useState , useEffect } from 'react'

export default function carreraAdd({callback}) {
    const [carreras, setCarreras ] = useState([]);
    const [carrera , setCarrera] = useState('');
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        var carreras = JSON.parse(localStorage.getItem('carreras'));
        if (carreras) {
            setCarreras(carreras);
        }
    }, [])
    const guardarCarrera = () =>{
        if(carrera != ''){
            var c = carreras;
            if(carreras.find( (e) => e.label == carrera )){
                alert("Esta carrera ya existe")
                return
            }
            var nId = 1;
            if(carreras.length >= 1){
                nId = Math.max(...carreras.map( obj => obj.value )); 
            }
            c.push({ 
                value : (Number.parseInt(nId) + 1) , label : carrera
            })
            localStorage.setItem('carreras', JSON.stringify(c))
            setCarrera('');
            document.getElementById("btnCerrarCa").click();
            callback()
        }else{
            alert("Ingrese una carrera")
        }
    }
    return (
        <div className="modal fade" id="modalCarrera" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar Carrera</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="inputNuevaCarrera" className="form-label">Nombre de la Carrera</label>
                        <input type="text" className="form-control" id="inputNuevaCarrera" 
                            value={ carrera } 
                            onChange={e => setCarrera(e.target.value)}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" id="btnCerrarCa" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={guardarCarrera}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
