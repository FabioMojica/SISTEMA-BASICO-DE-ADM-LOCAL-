import { useState } from 'react';
import SeeSalesMenuOption from '../COMPONENTS/SALES/SeeSales/SeeSalesMenuOption';
import ErrorModal from '../COMPONENTS/ErrorModal';
import TodaysSales from '../COMPONENTS/SALES/SeeSales/TodaysSales';
import { getSaleRequest, getSalesRequest } from '../api/orders';

const SeeSales = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');
  const [ viewSale, setViewSale ] = useState(null);

  const getTodaysSales = async() =>{
    try {
        const res = await getSalesRequest();
        return res;
    } catch (error) {
        return error;
    }
  }

  const getSale = async(saleID) => {
    try {
        const res = await getSaleRequest(saleID);
        setViewSale(res.data)
        return res;
    } catch (error) {
        return error;
    }
  }

  return (
    <div className="p-4">
      {viewSale && ( <SaleView sale={viewSale} onClose={() => setViewSale(null)}/> )}
      <h1 className="text-2xl font-semib+old mb-4">Vista de Ventas</h1>
      <SeeSalesMenuOption setSelectedOption={setSelectedOption} />
      {selectedOption === 'todaysSales' && 
        <TodaysSales 
            setError={setError} 
            getTodaysSales={getTodaysSales}
            setViewSale={getSale}
        >
        </TodaysSales>}
      {error && (
        <ErrorModal error={error}></ErrorModal>
      )}
    </div>
  );
};

export default SeeSales;
