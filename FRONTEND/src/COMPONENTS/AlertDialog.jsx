
const AlertDialog = ({ message, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded-md shadow-lg max-w-sm mx-auto">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
