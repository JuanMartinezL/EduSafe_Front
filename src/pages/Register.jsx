import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Register.css'

const Register = () => {
  const [formData, setFormData] = useState({ name: '', last_name: '', email: '', password: '', roleName: 'Estudiante' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" name="name" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Apellido</label>
          <input type="text" className="form-control" name="last_name" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" name="password" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Registrarse</button>
      </form>
      <div className="text-center mt-3">
        <p>¿Ya tienes una cuenta? <a href="/login" className="btn-link">Iniciar sesión</a></p>
        <button className="btn btn-secondary mt-2" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
};

export default Register;
