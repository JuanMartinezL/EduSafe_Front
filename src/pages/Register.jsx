import { useState } from 'react'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import '../assets/css/Register.css'; 

const Register = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',       
    last_name: '',  
    email: '',      
    password: '',   
    roleName: 'Estudiante', // Rol predeterminado para nuevos usuarios
  });
  const navigate = useNavigate(); // Hook para la navegación programática

  // Manejar cambios en los campos del formulario
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
    try {
      // Enviar los datos del formulario al endpoint de registro
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login'); // Redirige a la página de inicio de sesión tras el registro exitoso
    } catch (err) {
      console.error(err); // Maneja cualquier error en la petición
    }
  };

  return (
    <div className="register-container">
      <h1>Registrarse</h1> 

      {/* Formulario de registro */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name" 
            onChange={handleChange} // Actualiza el estado al cambiar el valor
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            name="last_name" // Vincula este campo al estado `last_name`
            onChange={handleChange} // Actualiza el estado al cambiar el valor
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email" // Vincula este campo al estado `email`
            onChange={handleChange} // Actualiza el estado al cambiar el valor
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="password" // Vincula este campo al estado `password`
            onChange={handleChange} // Actualiza el estado al cambiar el valor
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Registrarse {/* Botón para enviar el formulario */}
        </button>
      </form>

      {/* Enlaces adicionales */}
      <div className="text-center mt-3">
        <p>
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="btn-link">Iniciar sesión</a> {/* Enlace a la página de login */}
        </p>
        <button className="btn btn-secondary mt-2" onClick={() => navigate(-1)}>
          Volver 
        </button>
      </div>
    </div>
  );
};

export default Register; 
