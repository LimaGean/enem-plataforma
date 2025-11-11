import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // Aqui futuramente podemos validar o token (ex: expirado manualmente)
  return children;
}

export default PrivateRoute;

