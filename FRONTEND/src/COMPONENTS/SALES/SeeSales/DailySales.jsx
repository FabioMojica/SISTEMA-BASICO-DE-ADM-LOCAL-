import { useEffect } from "react"

const DailySales = ( { setError } ) => {
    useEffect(() => {
        try {
            throw new Error("Nuevo error");
        } catch (error) {
            setError(error.message);
        }
    },[]);
  return (
    <div>
      Daily Sales
      
    </div>
  )
}

export default DailySales
