import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

import RolesRoutes from './src/routes/roles.js'
import UniversidadesRoutes from './src/routes/universidades.js'
import CarrerasRoutes from './src/routes/carreras.js'
import CursosRoutes from './src/routes/cursos.js'
import PersonasRoutes from './src/routes/personas.js'
import PersonasCursosRoutes from './src/routes/personascursos.js'
import HorariosRoutes from './src/routes/horario.js'
import CitasRoutes from './src/routes/citas.js'
import CalificacionesRoutes from './src/routes/calificaciones.js'

let app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ result: 'OK'});
})

app.use("/roles", RolesRoutes);
app.use("/universidades", UniversidadesRoutes);
app.use("/carreras", CarrerasRoutes);
app.use("/cursos", CursosRoutes);
app.use("/personas", PersonasRoutes);
app.use("/personascursos", PersonasCursosRoutes);
app.use("/horarios", HorariosRoutes);
app.use("/citas", CitasRoutes);
app.use("/calificaciones", CalificacionesRoutes);

export default app