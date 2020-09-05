import express from "express";

const routes = express.Router();
const transactionRoutes = express.Router();

routes.use(express.json());
routes.get('/', (request, response) => {
    return response.json({ok: "API is working!!"});
});

transactionRoutes.get('/', (request, response) => {
    return response.json({ok: "Transaction route works"})
})

routes.use('/api/transactions', transactionRoutes);

export default routes;