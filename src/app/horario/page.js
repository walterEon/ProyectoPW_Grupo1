'use client';
import React, { useState } from 'react';

const horario = () => {
  const [horarios, setHorarios] = useState([]);
  const [nuevoHorario, setNuevoHorario] = useState({
    diaSemana: '',
    horaInicio: '',
    horaFin: '',
    enlaceZoom: ''
  });

  const agregarHorario = () => {
    setHorarios([...horarios, nuevoHorario]);
    setNuevoHorario({
      diaSemana: '',
      horaInicio: '',
      horaFin: '',
      enlaceZoom: ''
    });
  };

  const eliminarHorario = (eliminar) => {
    const nuevosHorarios = [...horarios];
    nuevosHorarios.splice(eliminar, 1);
    setHorarios(nuevosHorarios);
  };

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
              setNuevoHorario({ ...nuevoHorario, horaInicio: data.target.value })
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
        <div className="form-group p-1">
          <label>Enlace de Zoom:</label>
          <input
            type="text"
            className="form-control"
            value={nuevoHorario.enlaceZoom}
            onChange={(data) =>
              setNuevoHorario({ ...nuevoHorario, enlaceZoom: data.target.value })
            }
          />
        </div>
        <button type="button" className="btn btn-success m-4 " onClick={agregarHorario} style={{backgroundColor:'#a254b6', border:'none', borderRadius:'20px'}}>
          Agregar
        </button>
      </form>

      <table className="table mt-4 bg-light">
        <thead>
          <tr>
            <th>Día de la semana</th>
            <th>Hora de inicio</th>
            <th>Hora de fin</th>
            <th>Enlace de Zoom</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario, eliminar) => (
            <tr key={eliminar}>
              <td>{horario.diaSemana}</td>
              <td>{horario.horaInicio}</td>
              <td>{horario.horaFin}</td>
              <td>{horario.enlaceZoom}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => eliminarHorario(eliminar)}
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