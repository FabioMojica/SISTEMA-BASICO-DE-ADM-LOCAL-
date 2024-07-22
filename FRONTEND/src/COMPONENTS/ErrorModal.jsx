import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useState } from 'react';

const ErrorModal = ({ error }) => {
    console.log(error.error.response.data.token)
    const { logOut } = useAuth();
    const [ onClose, setOnClose ] = useState(false);
    const navigate = useNavigate();

    const handleAcceptClick = async () => {
        if(error.error.response.data.token === true){
            try {
                await logOut();
                /*
                navigate('/login', {
                    replace: true
                })*/
            } catch (error) {
                console.log(error);
            }
        }
        setOnClose(true);
        return;
  } 

  if (!error) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="mb-4 text-lg font-semibold text-red-700">{error.error.response.data.message}</p>
        <button
          onClick={handleAcceptClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
