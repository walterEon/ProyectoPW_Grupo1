'use client';

const no_cita = () => {
    return (
        <div className="p-5 w-100">
            <h2>Mis Citas</h2>
            <hr></hr>
            <div className="text-center">
                <div className="p-5">
                    Actualmente no tiene citas de asesoría reservadas.
                </div>
                <div>
                    <button type="button" className="btn btn-success">
                        Programar una asesoria.
                    </button>
                </div>
            </div>
        </div>
    );
};

export default no_cita;