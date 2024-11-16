import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import { Container, Row, Col, Spinner, Alert, Table, Button } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../assets/css/MyReports.css'; 

const MyReports = () => {
  const [reports, setReports] = useState([]); // Estado para almacenar los reportes del usuario
  const [loading, setLoading] = useState(true); // Estado para manejar el indicador de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para la navegación programática

  // Hook para cargar los reportes del usuario cuando el componente se monta
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true); // Indica que la carga está en progreso
      const token = localStorage.getItem('token'); // Obtiene el token almacenado en el localStorage

      try {
        // Petición al backend para obtener los reportes del usuario autenticado
        const res = await axios.get('http://localhost:5000/api/reports/my-reports', {
          headers: { Authorization: `Bearer ${token}` }, // Incluye el token en los encabezados
        });
        setReports(res.data); // Almacena los reportes en el estado
      } catch (err) {
        // Manejo de errores en caso de fallo en la petición
        setError('Error al cargar los reportes. Por favor, inténtalo de nuevo más tarde.');
        console.error('Error en la carga de reportes:', err);
      } finally {
        setLoading(false); // Indica que la carga ha finalizado
      }
    };

    fetchReports(); // Llama a la función para cargar los reportes
  }, []); // El efecto se ejecuta una vez al montar el componente

  return (
    <Container>
      {/* Botón para regresar a la página anterior */}
      <Button variant="secondary" className="mt-3" onClick={() => navigate(-1)}>
        Regresar
      </Button>
      <h1 className="mt-5">Mis Reportes</h1> {/* Título de la página */}

      {/* Indicador de carga */}
      {loading && (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" /> {/* Animación de carga */}
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      )}

      {/* Tabla con los reportes (se muestra solo si no hay carga ni error) */}
      {!loading && !error && (
        <Row>
          <Col>
            <Table striped bordered hover> 
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descripción</th> 
                  <th>Fecha</th> 
                </tr>
              </thead>
              <tbody>
                {reports.map(report => ( // Itera sobre los reportes y crea una fila por cada uno
                  <tr key={report._id}> {/* Usa el ID como clave única */}
                    <td>{report._id}</td> {/* Muestra el ID del reporte */}
                    <td>{report.description}</td> {/* Muestra la descripción del reporte */}
                    <td>{new Date(report.createdAt).toLocaleDateString()}</td> {/* Formatea y muestra la fecha */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MyReports; 
