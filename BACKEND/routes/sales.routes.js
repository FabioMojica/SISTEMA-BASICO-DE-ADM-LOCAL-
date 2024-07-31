import { Router } from "express";
import verifyJwT from "../middlewares/verifyJwt.middleware.js";
import { getSalesDB, getTodaySalesDB, getSaleDB, addSaleDB,updateSaleDB, deleteSaleDB } from "../controllers/salesDB.controllers.js";
       
const salesRouter = Router();

salesRouter.get('/', verifyJwT, getSalesDB);

salesRouter.get('/today', verifyJwT, getTodaySalesDB);

salesRouter.get('/:id', verifyJwT, getSaleDB); 

salesRouter.post('/addSale', verifyJwT, addSaleDB);

salesRouter.put('/:id', verifyJwT, updateSaleDB);

salesRouter.delete('/:id', verifyJwT, deleteSaleDB);


export default salesRouter;