import { Router } from "express";
import verifyJwT from "../middlewares/verifyJwt.middleware.js";

import { 
    getProductsDB,
    getProductDB, 
    addProductDB,
    updateProductDB, 
    deleteProductDB
} from "../controllers/productsDB.controller.js";

const productsRouter = Router();

productsRouter.get('/', getProductsDB);
productsRouter.get('/:id', verifyJwT, getProductDB);
productsRouter.post('/', verifyJwT, addProductDB);
productsRouter.put('/:id', verifyJwT, updateProductDB);
productsRouter.delete('/:id', verifyJwT,deleteProductDB);

export default productsRouter;