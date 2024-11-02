import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard'); // Redirige al usuario al dashboard tras el login
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="login-container text-center mt-5">
      <h1 className="mb-4">Iniciar Sesión</h1>
      <Form onSubmit={handleSubmit} className="text-start">
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Ingresa tu correo electrónico"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" size="lg">
            Iniciar Sesión
          </Button>
        </div>
      </Form>
      <div className="mt-3">
        <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
        <Button variant="secondary" onClick={() => navigate(-1)} size="sm">
          Regresar
        </Button>
      </div>
    </Container>
  );
};

export default Login;
