import { useState } from "react";
import AuthenticationPassComponent from "../COMPONENTS/SALES/SeeSales/AuthenticationPassComponent";
import { useNavigate } from "react-router-dom";
import ProductPreview from "../COMPONENTS/AddProduct/ProductPreview";
import ProductForm from "../COMPONENTS/AddProduct/ProductForm";

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



  