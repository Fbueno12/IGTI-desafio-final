import express from "express";
import ReleaseController from "./controller/ReleaseController.js";

const routes = express.Router();
const releaseRoutes = express.Router();

routes.use(express.json());

releaseRoutes.get('/', ReleaseController.find);
releaseRoutes.get('/:name', ReleaseController.findByName);
releaseRoutes.post('/', ReleaseController.store);
releaseRoutes.put('/:id', ReleaseController.update);
releaseRoutes.delete('/:id', ReleaseController.delete);

releaseRoutes.get('/fetch/:id', ReleaseController.findById);

routes.use('/api/releases', releaseRoutes);

export default routes;