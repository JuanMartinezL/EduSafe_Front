import { useState, useEffect } from 'react'; 
import axios from 'axios';  
import { Container, Row, Col, Spinner, Alert, ListGroup, Button } from 'react-bootstrap';  
import 'bootstrap/dist/css/bootstrap.min.css';  
import '../assets/css/AdminDashboard.css';  
import { useNavigate } from 'react-router-dom'; 

// Componente principal para el panel de administración
const AdminDashboard = () => {
  // Estado para almacenar los usuarios, reportes, y manejar estados de carga y error
  const [users, setUsers] = useState([]);  
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);  // Estado para controlar la carga de los datos
  const [error, setError] = useState(null);  // Estado para manejar errores
  const navigate = useNavigate(); // Hook para la navegación programática

  // Hook useEffect que se ejecuta al montar el componente para obtener datos de los usuarios y reportes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // Muestra el spinner mientras se cargan los datos
      const token = localStorage.getItem('token');  // Obtiene el token de autenticación del localStorage

      try {
        // Realiza las solicitudes paralelas para obtener los usuarios y reportes
        const [userRes, reportRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5000/api/reports/view', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        // Si las solicitudes son exitosas, se actualiza el estado de usuarios y reportes
        setUsers(userRes.data);
        setReports(reportRes.data);
      } catch (err) {
        // Si hay un error en la carga de datos, mostramos un mensaje de error
        setError('Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.');
        console.error('Error en la carga de datos:', err);  // Imprime el error en la consola para depuración
      } finally {
        setLoading(false);  // Al final de la carga, se actualiza el estado de carga a falso
      }
    };

    fetchData();  // Llama a la función fetchData para obtener los datos al montar el componente
  }, []);  // El array vacío asegura que el efecto se ejecute solo una vez al montar el componente

  return (
    <Container>
      <h1 className="mt-5">Panel de Administración</h1>
      {/* Botón para regresar al dashboard */}
      <Button variant="secondary" className="mb-3" onClick={() => navigate('/dashboard')}>
        Regresar
      </Button>
      
      {/* Muestra el spinner mientras los datos están siendo cargados */}
      {loading && (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Muestra el mensaje de error si algo falla al cargar los datos */}
      {error && (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      )}

      {/* Muestra los datos de los usuarios y reportes si no hay error y la carga ha terminado */}
      {!loading && !error && (
        <>
          <Row>
            <Col md={6}>
              <h2>Usuarios</h2>
              <ListGroup>
                {/* Mapea los usuarios para mostrar sus nombres y correos electrónicos */}
                {users.map(user => (
                  <ListGroup.Item key={user._id}>
                    {user.name} ({user.email})
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={6}>
              <h2>Reportes</h2>
              <ListGroup>
                {/* Mapea los reportes para mostrar sus descripciones */}
                {reports.map(report => (
                  <ListGroup.Item key={report._id}>
                    {report.description}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;  