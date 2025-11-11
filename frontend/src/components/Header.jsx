import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-extrabold text-white tracking-wide">
          ENEM Plataforma
        </Link>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {menuAberto ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-200 transition duration-300">
            Início
          </Link>
          <Link to="/diagnostico/questoes" className="text-white hover:text-gray-200 transition duration-300">
            Diagnóstico
          </Link>
          <Link to="/plano-de-ensino" className="text-white hover:text-gray-200 transition duration-300">
            Plano de Ensino
          </Link>
          {isAuthenticated && (
            <button onClick={logout} className="text-white hover:text-red-300 transition duration-300">
              Logout
            </button>
          )}
        </nav>
      </div>
      {menuAberto && (
        <div className="md:hidden bg-gradient-to-r from-indigo-600 to-blue-500 flex flex-col items-center py-4 space-y-4">
          <Link onClick={toggleMenu} to="/" className="text-white hover:text-gray-200 transition duration-300">
            Início
          </Link>
          <Link onClick={toggleMenu} to="/diagnostico/questoes" className="text-white hover:text-gray-200 transition duration-300">
            Diagnóstico
          </Link>
          <Link onClick={toggleMenu} to="/plano-de-ensino" className="text-white hover:text-gray-200 transition duration-300">
            Plano de Ensino
          </Link>
          {isAuthenticated && (
            <button onClick={() => { toggleMenu(); logout(); }} className="text-white hover:text-red-300 transition duration-300">
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;


