import { useState } from 'react';
import SeeSalesMenuOption from '../COMPONENTS/SALES/SeeSales/SeeSalesMenuOption';
import DailySales from '../COMPONENTS/SALES/SeeSales/DailySales';
import ErrorModal from '../COMPONENTS/ErrorModal';

const SeeSales = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Lista de Ventas</h1>
      <SeeSalesMenuOption setSelectedOption={setSelectedOption} />
      {selectedOption === 'dailySales' && <DailySales setError={setError} />}
      {error && (
        <ErrorModal error={error}></ErrorModal>
      )}
    </div>
  );
};

export default SeeSales;
