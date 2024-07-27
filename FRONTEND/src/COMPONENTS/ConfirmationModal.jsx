import { FaExclamationCircle } from 'react-icons/fa';

const ConfirmationModal = ({ message, info, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
        <p className="text-xl font-bold mb-4">{message}</p>
        {info && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded relative">
            <FaExclamationCircle className="absolute top-2 right-2 text-red-500" />
            <p>{info}</p>
          </div>
        )}
        <div className="flex justify-center gap-5">
          <button
            onClick={onConfirm}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Sí
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
