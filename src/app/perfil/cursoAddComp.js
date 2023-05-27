'use client';
import { useState , useEffect } from 'react'

export default function cursoAdd({callback}) {
    const [cursos, setCursos ] = useState([]);
    const [curso , setCurso] = useState('');
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        var cursos = JSON.parse(localStorage.getItem('cursos'));
        if (cursos) {
            setCursos(cursos);
        }
    }, [])
    const guardarCurso = () =>{
        if(curso != ''){
            var c = cursos;
            if(cursos.find( (e) => e.label == curso )){
                alert("Esta curso ya existe")
                return
            }
            var nId = 1;
            if(cursos.length >= 1){
                nId = Math.max(...cursos.map( obj => obj.value )); 
            }
            c.push({ 
                value : (Number.parseInt(nId) + 1) , label : curso
            })
            localStorage.setItem('cursos', JSON.stringify(c))
            setCurso('');
            document.getElementById("btnCerrarC").click();
            callback()
        }else{
            alert("Ingrese un curso")
        }
    }
    return (
        <div className="modal fade" id="modalCurso" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar Curso</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="inputNuevoCurso" className="form-label">Nombre del curso</label>
                        <input type="text" className="form-control" id="inputNuevoCurso" 
                            value={ curso } 
                            onChange={e => setCurso(e.target.value)}
                        />
                    </div>
                    <div className="modal-footer">
                    <button type="button" id="btnCerrarC" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={guardarCurso}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
