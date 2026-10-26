import express from "express";
import { peliculaRouter } from "./src/routes/pelicula.routes.js";
import { autorRouter } from "./src/routes/autor.routes.js";
import { actorRouter } from "./src/routes/actor.routes.js";
import { fichaTecnicaRouter } from "./src/routes/fichaTecnica.routes.js";
import { repartoRouter } from "./src/routes/reparto.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de gestion de peliculas funcionando");
});

app.use("/api", peliculaRouter);
app.use("/api", autorRouter);
app.use("/api", actorRouter);
app.use("/api", fichaTecnicaRouter);
app.use("/api", repartoRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
