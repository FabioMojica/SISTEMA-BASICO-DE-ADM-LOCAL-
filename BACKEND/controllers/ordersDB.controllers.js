import Order from '../models/order.model.js';
import Product from  '../models/product.model.js';

// TODO: Assign  status codes

export const getOrdersDB = async (req, res) => {
    try {
        const orders = await Order.find();

        res.json(orders);
        
    } catch (error) {
        res.json(error);
    }
};

export const getOrderDB = async (req, res) => {
    const idOrder = req.params.id;

   try{
    const orderFound = await Order.findById(idOrder);

    if(!orderFound) return res.json({message: "Order not found"});

    res.json(orderFound);
   } catch (error) {
    res.json(error);
   }
};

export const addOrderDB = async (req, res) => {
    const orderData = req.body;
    try{
         // Crear una nueva instancia del modelo Order con los datos recibidos
        const newOrder = new Order({
            ticket: orderData.ticket,
            client: orderData.client,
            ci: orderData.ci,
            products: orderData.products,
            totalAmount: orderData.totalAmount,
            date: orderData.date // Utilizar la misma fecha recibida desde addOrderReturnData
        });

        // Guardar la nueva orden en la base de datos
        const savedOrder = await newOrder.save();

        res.status(201).json({
            success: true,
            message: 'Venta confirmada exitosamente',
            order: savedOrder
        });
        
    } catch(e) {
        res.status(500).json({message: e.message});
    }   
};

export const addOrderReturnData = async (req, res) => {
    const {client, ci, products} = req.body;
    const productsOrdered = products.map(order => order);
    try {
        // TODO: FIX BUG {}, check quantity (INT NUMBER)
        const productsFound = await Promise.all(productsOrdered.map(async productOrdered => {
            const foundProduct = await Product.findById(productOrdered.id);
            if (!foundProduct) throw new Error(`Product ID ${productOrdered.id} not found.`);
            return {
                _id: foundProduct._id,
                name: foundProduct.name,
                price: foundProduct.price,
                quantity: productOrdered.orders
            };
        }));

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const lastOrder = await Order.findOne({ date: { $gte: today } }).sort({ ticket: -1 });
        console.log(lastOrder);
        
        // Si no hay órdenes hoy, empieza desde 1, de lo contrario, incrementa el último número de ficha
        const newOrderNumber = lastOrder ? lastOrder.ticket + 1 : 1;

        const totalAmount = productsFound.reduce((total, product) => total + product.price * product.quantity, 0);

        const newOrder = new Order({
            ticket: newOrderNumber,
            client: client,
            ci: ci,
            products: productsFound.map(p => ({
                _id: p._id,
                name: p.name,
                price: p.price,
                quantity: p.quantity
            })),
            totalAmount
        });

        res.send(newOrder);   

    } catch (error) {
        res.json(error);
    }
};

export const updateOrderDB = async (req, res) => {
    const newOrder = req.body;
    const oldOrderId = req.params.id;

    console.log(oldOrderId);
    
    const newProductsToOrder = newOrder.products.map(product => product);

    console.log(newProductsToOrder);

    try {
        // TODO: FIX BUG {}, check quantity (INT NUMBER)
        const productsFound = await Promise.all(newProductsToOrder.map(async productOrdered => {
            const foundProduct = await Product.findById(productOrdered.id);
            if (!foundProduct) throw new Error(`Product ID ${productOrdered.id} not found.`);
            return {
                _id: foundProduct._id,
                name: foundProduct.name,
                price: foundProduct.price,
                quantity: productOrdered.orders
            };
        }));

        console.log("Products found");
        console.log(productsFound);

        const totalAmount = productsFound.reduce((total, product) => total + product.price * product.quantity, 0);

        console.log(totalAmount);

        const newOrderToUpdate = ({
            products: productsFound.map(p => ({
                _id: p._id,
                name: p.name,
                price: p.price,
                quantity: p.quantity
            })),
            totalAmount
        })

        console.log("new order: ");
        console.log(newOrderToUpdate);

        const orderUpdated = await Order.findByIdAndUpdate(oldOrderId, newOrderToUpdate,{
            new: true
        });

        res.json(orderUpdated);

    } catch (error) {
        res.json(error);
    }
};

export const deleteOrderDB = async (req, res) => {
    const orderToDeleteId = req.params.id;
    try {
        const orderDeleted = await Order.findByIdAndDelete(orderToDeleteId);

        if(!orderDeleted) return res.json({message: "Order not found"});

        res.json({message: `Order ${orderDeleted._id} deleted`, 
        orderDeleted});
        
    } catch (error) {
        res.json(error);
    }
};