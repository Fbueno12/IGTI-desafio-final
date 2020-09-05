import express from "express";
import ReleaseController from "./controller/ReleaseController.js";

const routes = express.Router();
const releaseRoutes = express.Router();

routes.use(express.json());

releaseRoutes.get('/', ReleaseController.find);
releaseRoutes.get('/:name', ReleaseController.find);
releaseRoutes.post('/', ReleaseController.store);
releaseRoutes.put('/:id', ReleaseController.update);
releaseRoutes.delete('/:id', ReleaseController.delete);

routes.use('/api/releases', releaseRoutes);

export default routes;