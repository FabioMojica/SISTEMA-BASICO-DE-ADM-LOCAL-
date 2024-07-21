import { Router } from "express";
import verifyJwT from "../middlewares/verifyJwt.middleware.js";
import { getOrdersDB, getOrderDB, addOrderDB, addOrderReturnData,updateOrderDB, deleteOrderDB } from "../controllers/ordersDB.controllers.js";

const ordersRouter = Router();

ordersRouter.get('/', verifyJwT, getOrdersDB);

ordersRouter.get('/:id', verifyJwT, getOrderDB); 

ordersRouter.post('/addOrder', verifyJwT, addOrderDB);

ordersRouter.post('/addOrderReturnData', verifyJwT, addOrderReturnData);

ordersRouter.put('/:id', verifyJwT, updateOrderDB);

ordersRouter.delete('/:id', verifyJwT, deleteOrderDB);


export default ordersRouter;