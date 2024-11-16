import PropTypes from 'prop-types';  
import { Navigate } from 'react-router-dom';  

// Componente para proteger las rutas privadas y verifica si el usuario está autenticado
const PrivateRoute = ({ children }) => {
  // Verificamos si el usuario está autenticado al comprobar si existe un token en localStorage
  const isAuthenticated = !!localStorage.getItem('token'); // !! convierte el valor a un booleano

  // Si el usuario está autenticado, renderiza los 'children' , si no, redirige al login
  return isAuthenticated ? children : <Navigate to="/login" />; // Redirige a '/login' si no está autenticado
};

// Valida que el prop 'children' sea un nodo de React
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,  // Asegura que 'children' es requerido y es un nodo válido 
};

export default PrivateRoute;  