const SeeSales = () => {
    return (
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Ventas Registradas</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Aquí irán los datos de las ventas */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">001</td>
                <td className="px-6 py-4 whitespace-nowrap">Juan Pérez</td>
                <td className="px-6 py-4 whitespace-nowrap">15/07/2024</td>
                <td className="px-6 py-4 whitespace-nowrap">$50.00</td>
              </tr>
              {/* Más filas según los datos */}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default SeeSales;
  