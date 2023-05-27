'use client';
import { useState , useEffect } from 'react'

export default function universidadAdd({callback}) {
    const [universidades, setUniversidades ] = useState([]);
    const [universidad , setUniversidad] = useState('');
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        var universidades = JSON.parse(localStorage.getItem('universidades'));
        if (universidades) {
            setUniversidades(universidades);
        }
    }, [])
    const guardarUniversidad = () =>{
        if(universidad != ''){
            var u = universidades;
            if(universidades.find( (e) => e.label == universidad )){
                alert("Esta universidad ya existe")
                return
            }
            var nId = 1;
            if(universidades.length >= 1){
                nId = Math.max(...universidades.map( obj => obj.value )); 
            }
            u.push({ 
                value : (Number.parseInt(nId) + 1) , label : universidad
            })
            localStorage.setItem('universidades', JSON.stringify(u))
            setUniversidad('');
            document.getElementById("btnCerrarU").click();
            callback()
        }else{
            alert("Ingrese una universidad")
        }
    }
    return (
        <div className="modal fade" id="modalUniversidad" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar Universidad</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="inputNuevaUni" className="form-label">Nombre de la Universidad</label>
                        <input type="text" className="form-control" id="inputNuevaUni" 
                            value={ universidad } 
                            onChange={e => setUniversidad(e.target.value)}
                        />
                    </div>
                    <div className="modal-footer">
                    <button type="button" id="btnCerrarU" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={guardarUniversidad}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
