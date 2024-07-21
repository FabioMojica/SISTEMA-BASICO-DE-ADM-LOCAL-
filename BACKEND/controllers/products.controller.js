import products from '../productsJS/products.js'

// TODO: ADD STATUS RESPONSES PRODUCT CONTROLLERS

export const getProducts = (req, res) => {
    res.json(products);
};

export const getProduct = (req, res) => {
    const idProduct = req.params.id;

    console.log(idProduct);

    const productFound = products.find(product => product.id == idProduct);

    if(!productFound) return res.json({message: "Product not found"});

    res.json(productFound);
}

export const addProduct = (req, res) => {
    const newProduct = req.body;

    console.log(req.body);

    products.push(newProduct);

    res.json(products);  
};

export const updateProduct = (req, res) => {
    const productUpdate = req.body;

    const indexProduct = products.findIndex(product => product.id == productUpdate.id);

    if(indexProduct === -1) return res.json({message: "Product not found"});

    products[indexProduct] = productUpdate;

    res.json(products);  
};

export const patchProduct = (req, res) => {
    const idProduct = req.params.id;
    const updatedInfoProduct = req.body;

    const indexProduct = products.findIndex(product => product.id == idProduct);

    if(indexProduct === -1) return res.json({message: "Product not found"});

    const courseToModify = products[indexProduct];

    console.log(typeof Object.assign(courseToModify, updatedInfoProduct));

    res.json({
        message: `Product ${indexProduct} patch successfully`, 
        products
    });  
};

export const deleteProduct = (req, res) => {
    const idProduct = req.params.id;

    const indexProduct = products.findIndex(product => product.id == idProduct);

    if(indexProduct === -1) return res.json({message: "Product not found"});
    
    products.splice(indexProduct, 1);

    res.json({
        message: `Product ${indexProduct} deleted successfully`,
        products
    })
};