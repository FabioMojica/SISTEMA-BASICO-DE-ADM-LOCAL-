import { FaBars, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import NavBar from './NavBar'; 
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const toggleNavBar = () => setShowNavBar(!showNavBar);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  const handleLogoutClick = async () =>{
    try {
      await logOut();
      return navigate('/login',{
        replace: true
      })
    } catch (error) {
      console.log(error);
    }
  }

  const closeNavBar = () => setShowNavBar(false)

  return (
    <>
    { user && (
      <header className="flex items-center justify-between p-4 bg-red-600 text-white shadow-lg">
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleNavBar} 
            className="text-3xl hover:text-yellow-300 transition-colors">
            <FaBars />
          </button>
          <Link to="/home" className="text-2xl font-semibold hover:text-yellow-300 transition-colors">
              Sistema de Administración
          </Link>
        </div>
        <div className="relative flex items-center space-x-4">
          <button 
            onClick={toggleUserMenu} 
            className="flex items-center space-x-2 bg-white text-red-600 py-1 px-3 mr-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <span className="text-lg font-medium">{user.name}</span>
            <FaUser className="text-2xl" />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white text-red-600 shadow-lg rounded-lg z-10">
              <ul>
                <li className="px-4 py-2 hover:bg-red-100 cursor-pointer rounded-t-lg">
                  <Link to='/profile'>Ver Usuario</Link>
                </li>
                <li className="px-4 py-2 hover:bg-red-100 cursor-pointer rounded-b-lg" onClick={handleLogoutClick}>
                  Cerrar Sesión
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      )}
      {showNavBar && <NavBar closeNavBar={closeNavBar}/>}
    </>
  );
};

export default Header;
