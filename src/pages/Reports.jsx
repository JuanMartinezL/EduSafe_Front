import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Container, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Reports = () => {
  const [reports, setReports] = useState([]); // Estado para almacenar la lista de reportes.
  const navigate = useNavigate(); // Hook para navegar entre rutas.
  const [userRole, setUserRole] = useState(''); // Estado para almacenar el rol del usuario.
  const [loading, setLoading] = useState(true); // Estado para controlar si los datos están cargando.
  const [error, setError] = useState(null); // Estado para manejar errores.

  // useEffect para cargar reportes y rol del usuario al montar el componente.
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtiene el token del localStorage.

        // Solicitud para obtener el rol del usuario autenticado.
        const userRes = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }, // Enviar token en los headers.
        });
        setUserRole(userRes.data.role); // Establece el rol del usuario.

        // Solicitud para obtener la lista de reportes.
        const res = await axios.get('http://localhost:5000/api/reports/view', {
          headers: { Authorization: `Bearer ${token}` }, // Enviar token en los headers.
        });
        setReports(res.data); // Almacena los reportes en el estado.
      } catch (err) {
        setError('Error al cargar los reportes. Intenta nuevamente más tarde.'); // Manejo de errores.
        console.error('Error fetching reports:', err);
      } finally {
        setLoading(false); // Cambia el estado de carga a falso.
      }
    };

    fetchReports(); // Llama a la función para obtener los datos.
  }, []);

  return (
    <Container className="mt-5">
      <h2>Gestión de Reportes</h2>

      {/* Muestra un spinner mientras los datos están cargando */}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Muestra un mensaje de error si ocurre */}
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {/* Renderiza la tabla de reportes si no hay errores y la carga ha finalizado */}
      {!loading && !error && (
        <>
          <Button
            variant="secondary"
            className="mb-3"
            onClick={() => navigate('/dashboard')}
          >
            Regresar
          </Button>

          <Table striped bordered hover> {/* Tabla de reportes */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={report._id}>
                  <td>{report._id}</td> {/* ID del reporte */}
                  <td>{report.description}</td> {/* Descripción del reporte */}
                  <td>{new Date(report.date).toLocaleDateString()}</td> {/* Fecha formateada */}
                  <td>
                    {/* Botón de "Dar seguimiento" solo visible para roles específicos */}
                    {(userRole === 'Administrador' || userRole === 'Profesor') && (
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/dashboard/reports/follow-up/${report._id}`)}
                      >
                        Dar seguimiento
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default Reports;
