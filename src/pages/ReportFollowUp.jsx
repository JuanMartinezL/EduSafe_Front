import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReportFollowUp = () => {
  const { id } = useParams(); // Obtiene el ID del reporte desde la URL.
  const [report, setReport] = useState(null); // Almacena los datos del reporte.
  const [status, setStatus] = useState(''); // Almacena el estado actual del reporte.
  const [loading, setLoading] = useState(true); // Controla el estado de carga.
  const [error, setError] = useState(null); // Almacena mensajes de error.
  const [success, setSuccess] = useState(null); // Almacena mensajes de éxito.
  const navigate = useNavigate(); // Permite la navegación programática.

  // useEffect para obtener datos del reporte al cargar el componente.
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtiene el token para la autenticación.
        const response = await axios.get(`http://localhost:5000/api/reports/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, // Envía el token en los headers.
        });
        setReport(response.data); // Guarda los datos del reporte.
        setStatus(response.data.status); // Inicializa el estado con el valor actual del reporte.
      } catch (err) {
        setError('Error al cargar el reporte. Intenta nuevamente.'); // Muestra un mensaje de error.
        console.error('Error fetching report:', err);
      } finally {
        setLoading(false); // Finaliza el estado de carga.
      }
    };

    fetchReport();
  }, [id]); // Se ejecuta cuando cambia el ID del reporte.

  // Maneja el cambio de estado del reporte.
  const handleStatusChange = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Obtiene el token para la autenticación.
      await axios.put(
        `http://localhost:5000/api/reports/${id}`,
        { status }, // Envía el estado actualizado.
        { headers: { Authorization: `Bearer ${token}` } } // Envía el token en los headers.
      );
      setSuccess('Estado actualizado correctamente.'); // Muestra un mensaje de éxito.
      
      setTimeout(() => {
        navigate('/dashboard/reports'); // Redirige al panel de reportes.
      }, 2000);
    } catch (err) {
      setError('Error al actualizar el estado. Intenta nuevamente.'); // Muestra un mensaje de error.
      console.error('Error updating report status:', err);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Seguimiento de Reporte</h2>
      {loading ? (
        <Spinner animation="border" variant="primary" /> // Muestra un indicador de carga.
      ) : error ? (
        <Alert variant="danger">{error}</Alert> // Muestra un mensaje de error si ocurre.
      ) : (
        report && (
          <Form onSubmit={handleStatusChange}>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" value={report.description} readOnly /> {/* Campo de descripción en solo lectura */}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}> {/* Dropdown para cambiar estado */}
                <option value="Pendiente">Pendiente</option>
                <option value="En proceso">En proceso</option>
                <option value="Completado">Completado</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">Actualizar Estado</Button> 
            {success && <Alert variant="success" className="mt-3">{success}</Alert>} 
          </Form>
        )
      )}
      <Button variant="secondary" className="mt-3" onClick={() => navigate(-1)}> {/* Botón para regresar */}
        Regresar
      </Button>
    </Container>
  );
};

export default ReportFollowUp;
