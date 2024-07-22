// src/components/Cart.js
import { FaTrashAlt } from 'react-icons/fa';

const Cart = ({ cartItems, onQuantityChange, onRemoveItem }) => {
  const handleQuantityChange = (index, value) => {
    onQuantityChange(index, value);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg h-full max-h-96 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Carrito</h2>
      {cartItems.length > 0 ? (
        <>
          <ul className="divide-y divide-gray-200">
            <li className="flex items-center justify-between font-semibold text-gray-700 mb-2">
              <span className="w-1/3 text-center">Producto</span>
              <span className="w-1/3 text-center">Precio</span>
              <span className="w-1/6 text-center">Cantidad</span>
              <span className="w-1/6 text-center">Borrar</span>
            </li>
            {cartItems.map((item, index) => (
              <li key={index} className="flex items-center justify-between py-2">
                <span className="w-1/3">{item.name}</span>
                <span className="w-1/3 text-center">{item.price.toFixed(2)} Bs.</span>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  className="w-1/6 text-center border rounded-md p-1"
                  onBlur={(e) => {
                    if (Number(e.target.value) < 1) {
                      handleQuantityChange(index, 1);
                    }
                  }}
                />
                <button
                  onClick={() => onRemoveItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-gray-500 text-center">El carrito está vacío.</p>
      )}
    </div>
  );
};

export default Cart;
