const ProductPreview = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/2 mt-4 md:mt-0">
      <h2 className="text-xl font-semibold mb-4">Vista Previa</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-700">
            <strong>Nombre:</strong> {product.name}
          </p>
        </div>
        <div>
          <p className="text-gray-700">
            <strong>Precio:</strong> ${product.price}
          </p>
        </div>
        <div>
          {product.image ? (
            <img
              src={URL.createObjectURL(product.image)}
              alt="Imagen del Producto"
              className="w-full h-64 object-cover rounded-md"
            />
          ) : (
            <p className="text-gray-500">Sin imagen</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;