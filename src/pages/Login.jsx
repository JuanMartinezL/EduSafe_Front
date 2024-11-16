import { useState } from 'react'; 
import axios from 'axios'; 
import { useNavigate, Link } from 'react-router-dom'; 
import { Button, Container, Form } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../assets/css/Login.css'; 

const Login = () => {
  // Estado para manejar los datos del formulario, inicializado con email y password vacíos
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // Hook para realizar la navegación programática

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Actualiza el estado con los valores del formulario

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne el comportamiento por defecto del formulario (recarga de la página)
    try {
      // Realiza una solicitud POST al backend para autenticar al usuario
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token); // Guarda el token en el localStorage para mantener la sesión activa
      navigate('/dashboard'); // Redirige al dashboard tras un login exitoso
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
            onChange={handleChange} // Evento que maneja el cambio en el valor del campo
            required // Campo obligatorio
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label> 
          <Form.Control
            type="password" 
            name="password" 
            placeholder="Ingresa tu contraseña" 
            onChange={handleChange} // Evento que maneja el cambio en el valor del campo
            required // Campo obligatorio
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" size="lg">
          </Button>
        </div>
      </Form>
      <div className="mt-3"> 
        <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p> 
        <Button variant="secondary" onClick={() => navigate(-1)} size="sm"> {/* Botón para regresar a la página anterior */}
          Regresar
        </Button>
      </div>
    </Container>
  );
};

export default Login; 