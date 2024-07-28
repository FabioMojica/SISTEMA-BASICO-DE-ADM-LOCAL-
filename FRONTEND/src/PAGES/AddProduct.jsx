import { useState } from "react";
import AuthenticationPassComponent from "../COMPONENTS/SALES/SeeSales/AuthenticationPassComponent";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [product, setProduct] = useState({ name: "", price: "", image: null });
  const navigate = useNavigate();

  const handleOnCloseAuthenticationPassComponent = () => {
    navigate('/home');
  };

  const handleProductChange = (updatedProduct) => {
    setProduct(updatedProduct);
  };

  return (
    <>
      {!isAuthenticated ? (
        <AuthenticationPassComponent
          setIsAuthenticated={() => setIsAuthenticated(true)}
          onClose={handleOnCloseAuthenticationPassComponent}
        />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <p className="text-2xl font-bold mb-4">Agregar Producto</p>
          <div className="flex flex-col md:flex-row md:space-x-4 w-full max-w-4xl">
            <ProductForm product={product} onProductChange={handleProductChange} />
            <ProductPreview product={product} />
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct;

const ProductForm = ({ product, onProductChange }) => {
  const [form, setForm] = useState(product);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
    onProductChange({ ...form, [name]: name === "image" ? files[0] : value });
  };

  const handleCancel = () => {
    setForm({ name: "", price: "", image: null });
    onProductChange({ name: "", price: "", image: null });
  };

  const isFormValid = form.name && form.price;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/2">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre del Producto <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Precio <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Imagen <span className="text-gray-500">(Opcional)</span>
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`px-4 py-2 rounded-md ${isFormValid ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"}`}
            disabled={!isFormValid}
          >
            Agregar Producto
          </button>
        </div>
      </form>
    </div>
  );
};


const ProductPreview = ({ product }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/2 mt-4 md:mt-0">
        <h2 className="text-xl font-semibold mb-4">Vista Previa</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-700"><strong>Nombre:</strong> {product.name}</p>
          </div>
          <div>
            <p className="text-gray-700"><strong>Precio:</strong> ${product.price}</p>
          </div>
          <div>
            {product.image ? (
              <img src={URL.createObjectURL(product.image)} alt="Imagen del Producto" className="w-full h-64 object-cover rounded-md" />
            ) : (
              <p className="text-gray-500">Sin imagen</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  

  