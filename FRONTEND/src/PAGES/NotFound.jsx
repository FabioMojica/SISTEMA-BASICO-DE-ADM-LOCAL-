import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
        <h1 className="text-4xl font-bold mb-2">404 - Recurso No Encontrado</h1>
        <p className="text-lg mb-4">Lo sentimos, pero la página que estás buscando no existe.</p>
        <Link to="/home" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
          Regresar al Inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
