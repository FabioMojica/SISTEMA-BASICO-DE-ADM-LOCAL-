const FormSale = ({ products, clientName, setClientName, clientCI, setClientCI, searchTerm, setSearchTerm, setCartItems }) => {

  const handleSearch = () => {
    // Aquí puedes agregar lógica adicional si es necesario
  };

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.name === product.name);
      if (existingItem) {
        return prevItems.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  function filterProducts(products, searchTerm) {
    const isNumber = !isNaN(parseFloat(searchTerm)) && isFinite(searchTerm);

    return products.filter(product => {
        if (isNumber) {
            const priceStr = product.price.toString();
            return priceStr.includes(searchTerm);
        } else {
            return product.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
    });
}

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Formulario de Venta</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="mt-1 block w-full border rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">CI del Cliente</label>
        <input
          type="text"
          value={clientCI}
          onChange={(e) => setClientCI(e.target.value)}
          className="mt-1 block w-full border rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Buscar Producto</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={handleSearch}
          className="mt-1 block w-full border rounded-md p-2"
          placeholder="Buscar por nombre o precio (ej. nombre - 15.00)"
        />
      </div>
      <div className="overflow-x-auto flex space-x-4 py-2">
        {filterProducts(products, searchTerm).map(product => (
          <div
            key={product.name}
            className="flex-shrink-0 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
            onClick={() => handleAddToCart(product)}
          >
            <p className="text-sm font-medium">{product.name}</p>
            <p className="text-xs">{product.price.toFixed(2)} Bs.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormSale;
