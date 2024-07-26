import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingMessage from "../../LoandingMessage";
import { getSaleRequest } from "../../../api/orders";
import AuthenticationPassComponent from "./AuthenticationPassComponent";

const SaleView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sale, setSale] = useState(null);
  const [showOptions, setShowOptions] = useState(false); // Estado para manejar la visibilidad del componente y el cambio de texto
  const { id } = useParams();

  const fetchSale = async () => {
    try {
      const res = await getSaleRequest(id);
      setSale(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSale();
  }, []);

  if (isLoading) return <LoadingMessage />;

  return (
    <div className="container mx-auto p-4">
      {sale && (
        <>
          <div className="bg-gray-200 shadow-md rounded p-4 mb-4">
            <div className="mb-2">
              <span className="font-bold">Fecha:</span>{" "}
              {new Date(sale.date).toLocaleDateString()}{" "}
              <span className="font-bold">Horas:</span>{" "}
              {new Date(sale.date).toLocaleTimeString()}
            </div>
            <div className="mb-2">
              <span className="font-bold">Cliente:</span> {sale.client}
            </div>
            <div className="mb-4">
              <span className="font-bold">CI:</span> {sale.ci}
            </div>
            <div className="mb-4">
              <span className="font-bold">Compra:</span>
              <div className="overflow-x-auto">
                <div className="min-w-full bg-white rounded-lg border">
                  <div className="flex font-bold py-2 border-b text-center">
                    <div className="w-1/4">Producto</div>
                    <div className="w-1/4">Precio</div>
                    <div className="w-1/4">Cantidad</div>
                    <div className="w-1/4">Total</div>
                  </div>
                  {sale.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex py-2 border-b last:border-none text-center"
                    >
                      <div className="w-1/4">{product.name}</div>
                      <div className="w-1/4">${product.price}</div>
                      <div className="w-1/4">{product.quantity}</div>
                      <div className="w-1/4">
                        ${product.price * product.quantity}
                      </div>
                    </div>
                  ))}
                  <div className="flex font-bold py-2 text-center">
                    <div className="w-3/4">Monto total</div>
                    <div className="w-1/4">{sale.totalAmount} Bs.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            {!showOptions && (
              <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Imprimir factura
              </button>
            )}
            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className={`px-4 py-2 rounded ${
                  showOptions
                    ? "bg-red-500 hover:bg-red-700"
                    : "bg-yellow-500 hover:bg-yellow-700"
                } text-white`}
              >
                {showOptions ? "Cerrar" : "Opciones de venta"}
              </button>
            </div>
          </div>
          {showOptions && <AuthenticationPassComponent />}
        </>
      )}
    </div>
  );
};

export default SaleView;
