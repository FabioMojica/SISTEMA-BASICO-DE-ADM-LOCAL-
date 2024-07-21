import Header from './COMPONENTS/Header';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './PAGES/Login';
import Products from './PAGES/Products';
import { AuthProvider } from './COMPONENTS/AuthContext';
import RegisterSale from './PAGES/RegisterSale';
import ProtectedRoute from './COMPONENTS/ProtectedRoute';
import Home from './PAGES/Home';

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

        <Route element={<ProtectedRoute></ProtectedRoute>}>
          <Route path="/products" element={<Products />} />
          <Route path="/sales/newSale" element={<RegisterSale></RegisterSale>} />
          <Route path='/logout' />
        </Route>
      </Routes>
    </>
  );
}

export default App;