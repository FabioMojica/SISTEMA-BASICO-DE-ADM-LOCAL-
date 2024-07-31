// src/pages/RegisterSale.js
import { useState, useEffect } from 'react';
import FormSale from '../COMPONENTS/SALES/RegisterSale/FormSale';
import Cart from '../COMPONENTS/SALES/RegisterSale/Cart';
import Invoice from '../COMPONENTS/SALES/RegisterSale/Invoice';
import { getProductsRequest } from '../api/products.js';
import { addSaleRequest } from '../api/sales.js';

const RegisterSale = () => {
  const [products, setProducts] = useState([]); // Array de productos que se mostrarán en FormSale
  const [cartItems, setCartItems] = useState([]);
  const [clientName, setClientName] = useState('');
  const [clientCI, setClientCI] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [ confirmDialog, setConfirmDialog ] = useState(false);
  const [ error, setError ] = useState(null);


  useEffect(() => {
    async function fetchProducts(){
      try {
        const res = await getProductsRequest();
        setProducts(res.data);
      } catch (error) {
        return {isError: true, error: error}
      }
    }
    fetchProducts();
  },[]);

  const handleCancelOrder = () => {
    setShowCancelConfirmation(true);
  };

  const confirmCancelOrder = () => {
    setClientName('');
    setClientCI('');
    setSearchTerm('');
    setCartItems([]);
    setConfirmDialog(false);
    setShowCancelConfirmation(false);
  };
  
  const resetSale = () => {
    setClientName('');
    setClientCI('');
    setSearchTerm('');
    setCartItems([]);
    setConfirmDialog(false);
  };

  const handleOnConfirmSale = async (sale) => {
    const newSale = {
      client: sale.client,
      ci: sale.ci,
      products: cartItems.map(product => ({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
      })),
      totalAmount: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2) // Total dinámico
    };
    try {
      const res = await addSaleRequest(newSale);
      setConfirmDialog(true);
    } catch (error) {
      console.log(error)
      setError(error); // Establecer el mensaje de error en el estado
    }
  };
  
  const handleQuantityChange = (index, quantity) => {
    const updatedCartItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
  };

  const handleGenerateInvoice = () => {
    // Lógica para generar factura
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Registro de Venta</h1>
        <button
          onClick={handleCancelOrder}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Cancelar Orden
        </button>
      </header>

      {showCancelConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-lg font-semibold">
              ¿Está seguro que desea cancelar la orden? Se borrarán todos los
              datos.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmCancelOrder}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Sí
              </button>
              <button
                onClick={() => setShowCancelConfirmation(false)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <FormSale
            products={products}
            clientName={clientName}
            setClientName={setClientName}
            clientCI={clientCI}
            setClientCI={setClientCI}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCartItems={setCartItems}
          />
        </div>
        <div className="md:col-span-1">
          <Cart
            cartItems={cartItems}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
            onGenerateInvoice={handleGenerateInvoice}
          />
        </div> 
        <div className="md:col-span-1">
          <Invoice 
            cartItems={cartItems} 
            client={{client:clientName, ci:clientCI}}
            onResetSale={resetSale}
            handleOnConfirmSale={handleOnConfirmSale}
            confirmDialog={confirmDialog}
            error={error}
            setError={setError}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterSale;
