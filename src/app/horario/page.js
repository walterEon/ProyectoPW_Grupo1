"use client";
import React, { useState, useEffect } from "react";
import horariosApi from "@/api/horarios";

const horario = () => {

  const [horarios, setHorarios] = useState([]);
  const [horariosOriginal, setHorariosOriginal] = useState([]);
  const [nuevoHorario, setNuevoHorario] = useState({
    idHorario: 0,
    idPersona: 0,
    horaInicio: "",
    diaSemana: "",
    horaFin: ""
  });


  const obtenerHorarios = async (horarios, sesion) =>{ 
    let horariosFiltrados = []

    horariosFiltrados = horarios.filter((e) => e.idPersona == sesion.idPersona);
    
    return horariosFiltrados;
};

  const agregarHorario = async () => {

    let ids = []
     for (let i = 0; i < horariosOriginal.length; i++){
        ids.push(horariosOriginal[i].idHorario)
     }
     const maxIdHorario = Math.max(...ids)+2
    nuevoHorario.idHorario = maxIdHorario;
    nuevoHorario.idPersona = horarios[0].idPersona;
    console.log(nuevoHorario);
    try {
      await horariosApi.create(nuevoHorario);
      setHorarios([...horarios, nuevoHorario]);
      setNuevoHorario({
        idHorario: 0,
    idPersona: 0,
    horaInicio: "",
    diaSemana: "",
    horaFin: ""
      });
    } catch (error) {
      console.error("Error al agregar el horario:", error);
    }
  };

  const eliminarHorario = async (id, eliminar) => {
    try {
      await horariosApi.remove(id);
      const nuevosHorarios = [...horarios];
      nuevosHorarios.splice(eliminar, 1);
      setHorarios(nuevosHorarios);
    } catch (error) {
      console.error("Error al eliminar el horario:", error);
    }
  };


  useEffect(() => {
    const handleOnLoad = async () => {
      const result = await horariosApi.findAll();
      setHorariosOriginal(result.data);
      let datos = result.data
      let sesionGuardada = localStorage.getItem("sesion");
      if(sesionGuardada == undefined){
          router.push('/')
      }
      const horariosObtenidos = await obtenerHorarios(datos, (JSON.parse(sesionGuardada))); 
      setHorarios(horariosObtenidos)
    }
    handleOnLoad();
    
    
}, []); 

  return (
    <div className="p-3 w-100">
      <h2>Mis horarios</h2>
      <hr></hr>
      <form className="d-flex pt-3">
        <div className="form-group p-1">
          <label>Día de la semana:</label>
          <input
            type="text"
            className="form-control"
            value={nuevoHorario.diaSemana}
            onChange={(data) =>
              setNuevoHorario({ ...nuevoHorario, diaSemana: data.target.value })
            }
          />
        </div>
        <div className="form-group p-1">
          <label>Hora de inicio:</label>
          <input
            type="text"
            className="form-control"
            value={nuevoHorario.horaInicio}
            onChange={(data) =>
              setNuevoHorario({
                ...nuevoHorario,
                horaInicio: data.target.value,
              })
            }
          />
        </div>
        <div className="form-group p-1">
          <label>Hora de fin:</label>
          <input
            type="text"
            className="form-control"
            value={nuevoHorario.horaFin}
            onChange={(data) =>
              setNuevoHorario({ ...nuevoHorario, horaFin: data.target.value })
            }
          />
        </div>
        
        <button
          type="button"
          className="btn btn-success m-4 "
          onClick={agregarHorario}
          style={{
            backgroundColor: "#a254b6",
            border: "none",
            borderRadius: "20px",
          }}
        >
          Agregar
        </button>
      </form>

      <table className="table mt-4 bg-light">
        <thead>
          <tr>
            <th>Día de la semana</th>
            <th>Hora de inicio</th>
            <th>Hora de fin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario, eliminar) => (
            <tr key={eliminar}>
              <td>{horario.diaSemana}</td>
              <td>{horario.horaInicio}</td>
              <td>{horario.horaFin}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => eliminarHorario(horario.idHorario, horario)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default horario;