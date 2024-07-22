import { Link } from "react-router-dom";

const Sale = ({ sale }) => {
  return (
    <Link to={`/sales/${sale._id}`} className="block p-4 border rounded-lg shadow-md hover:bg-gray-100 transition-colors">
      <div className="flex flex-col space-y-2">
        <span className="font-semibold">Cliente: {sale.client || 'No disponible'}</span>
        <span className="font-semibold">CI: {sale.ci || 'No disponible'}</span>
        <span className="font-semibold">Monto: ${sale.totalAmount}</span>
        <span className="font-semibold">Fecha: {new Date(sale.date).toLocaleDateString()}</span>
      </div>
    </Link> 
  );
};

export default Sale;
