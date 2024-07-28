import Header from './COMPONENTS/Header';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './PAGES/Login';
import Products from './PAGES/Products';
import { AuthProvider } from './COMPONENTS/AuthContext';
import RegisterSale from './PAGES/RegisterSale';
import ProtectedRoute from './COMPONENTS/ProtectedRoute';
import Home from './PAGES/Home';
import SeeSales from './PAGES/SeeSales';
import SaleView from './COMPONENTS/SALES/SeeSales/SaleView';
import NotFound from './PAGES/NotFound';
import AddProduct from './PAGES/AddProduct';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </AuthProvider>
    
  );
}

function Main() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/login' && <Header />}
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path='/404' element={<NotFound></NotFound>}/>
        <Route path='*' element={<NotFound></NotFound>}/>

        <Route element={<ProtectedRoute></ProtectedRoute>}>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/addProduct" element={<AddProduct />} />
          <Route path="/sales/newSale" element={<RegisterSale></RegisterSale>} />
          <Route path="/sales/seeSales" element={<SeeSales></SeeSales>} />
          <Route path="/sales/seeSales/viewSale/:id" element={<SaleView></SaleView>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;