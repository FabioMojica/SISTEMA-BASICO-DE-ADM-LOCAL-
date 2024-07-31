import Product from '../models/product.model.js';

// TODO: Add status responses

// TODO: Validate fields

export const getProductsDB = async (req, res) => {
    try{
        const products = await Product.find();
        
        res.json(products);
    } catch(error){
        res.json(error);
    }
}

export const getProductDB = async (req, res) => {
    const idProduct = req.params.id; 
    try{
        const productFound = await Product.findById(idProduct);

        if(!productFound) return res.json({message: "Product not found"});

        res.json(productFound);

    } catch(error) {
        res.json(error);
    }
};

export const addProductDB = async (req, res) => {
    const {name, price} = req.body;
    const image = req.file ? req.file.path : null;

    console.log(req.body)

    const newProduct = new Product({
        name,
        price
    });

    try {
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        res.json(error);
    }
};

export const updateProductDB = async (req, res) => {
    const productUpdated = req.body;
    try {

        const productNow = await Product.findByIdAndUpdate(req.params.id, productUpdated, {
            new: true
        });

        if(!productNow) return res.json({message: "Product not found"});

        res.json(productNow);

    } catch (error) {
        res.json(error);
    }

};

export const deleteProductDB = async (req, res) => {
    const idProduct = req.params.id;

    try {
        const productDeleted = await Product.findByIdAndDelete(idProduct)

        if(!productDeleted) return res.json({message: "Product not found"});
        
        res.json(productDeleted);

    } catch (error) {
        res.json(error);
    }

};


