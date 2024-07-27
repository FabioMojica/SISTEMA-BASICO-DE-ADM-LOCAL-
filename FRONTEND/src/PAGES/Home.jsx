import React from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaReceipt, FaUsers, FaChartLine, FaCog } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Bienvenido al Sistema de Administración de Restaurante</h1>
        <p className="text-gray-600 mt-2">Aquí puedes gestionar todos los aspectos de tu restaurante de manera eficiente.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Link to="/sales" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4">
          <FaReceipt className="text-4xl text-blue-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Ventas</h2>
            <p className="text-gray-600">Gestiona y revisa todas las ventas realizadas en el restaurante.</p>
          </div>
        </Link>

        <Link to="/products" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4">
          <FaBox className="text-4xl text-green-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Productos</h2>
            <p className="text-gray-600">Administra el inventario y añade nuevos productos al menú.</p>
          </div>
        </Link>

        <Link to="/employees" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4">
          <FaUsers className="text-4xl text-orange-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Empleados</h2>
            <p className="text-gray-600">Gestiona los datos y permisos de los empleados del restaurante.</p>
          </div>
        </Link>

        <Link to="/reports" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4">
          <FaChartLine className="text-4xl text-purple-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Informes</h2>
            <p className="text-gray-600">Genera y revisa informes detallados sobre el rendimiento del restaurante.</p>
          </div>
        </Link>

        <Link to="/settings" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4">
          <FaCog className="text-4xl text-gray-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Configuraciones</h2>
            <p className="text-gray-600">Configura los ajustes del sistema según las necesidades de tu restaurante.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
