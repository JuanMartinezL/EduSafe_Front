import { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { Card, Button, Row, Col, Container, Image, Spinner, Alert } from 'react-bootstrap'; 
import { Link, useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../assets/css/Dashboard.css'; 
import defaultProfileImage from '../assets/img/default-profile.png'; 
import userManagementImg from '../assets/img/gestionUser.png'; 
import reportsImg from '../assets/img/reportsImg.png'; 
import resourcesImg from '../assets/img/resourcesImg.png'; 
import addResourceImg from '../assets/img/addResourceImg.png'; 
import createReportImg from '../assets/img/createReportImg.png'; 

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({}); // Estado para guardar la información del usuario
  const [options, setOptions] = useState([]); // Estado para las opciones disponibles en el dashboard según el rol
  const [loading, setLoading] = useState(true); // Estado de carga mientras se obtienen los datos
  const [error, setError] = useState(null); // Estado para gestionar errores de carga
  const navigate = useNavigate(); // Hook para navegar programáticamente

  useEffect(() => {
    // Efecto secundario que se ejecuta al montar el componente
    const fetchData = async () => {
      setLoading(true); // Inicia el estado de carga
      const token = localStorage.getItem('token'); // Obtiene el token del localStorage (autenticación)

      if (!token) {
        navigate('/login'); // Redirige al login si no hay token
        return;
      }

      try {
        // Solicita la información del perfil del usuario desde el backend
        const userRes = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }, // Enviar token como header de autorización
        });
        setUserInfo(userRes.data); // Guarda la información del usuario en el estado

        // Define las opciones disponibles según el rol del usuario
        const roleOptions = {
          Administrador: [
            { name: 'Gestión de Usuarios', link: '/dashboard/users', image: userManagementImg },
            { name: 'Reportes', link: '/dashboard/reports', image: reportsImg },
            { name: 'Ver Recursos', link: '/dashboard/resources', image: resourcesImg },
            { name: 'Agregar Recurso', link: '/dashboard/create', image: addResourceImg },
          ],
          Estudiante: [
            { name: 'Mis Reportes', link: '/dashboard/my-reports', image: reportsImg },
            { name: 'Crear Reporte', link: '/dashboard/reports/create', image: createReportImg },
            { name: 'Ver Recursos', link: '/dashboard/resources', image: resourcesImg },
          ],
          Profesor: [
            { name: 'Reportes de Estudiantes', link: '/dashboard/reports', image: reportsImg },
            { name: 'Crear Reporte', link: '/dashboard/reports/create', image: createReportImg },
            { name: 'Ver Recursos', link: '/dashboard/resources', image: resourcesImg },
            { name: 'Agregar Recurso', link: '/dashboard/create', image: addResourceImg },
          ],
        };

        setOptions(roleOptions[userRes.data.role] || []); // Establece las opciones según el rol del usuario
      } catch (err) {
        console.error('Error en la carga de datos:', err.response ? err.response.data : err.message);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token'); // Elimina el token si hay un error 401 (no autorizado)
          navigate('/login'); // Redirige al login
        } else {
          setError('Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.'); 
        }
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchData(); // Ejecuta la función para obtener los datos
  }, [navigate]); // El efecto se ejecuta cuando el componente se monta o se actualiza la navegación

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token al cerrar sesión
    navigate('/login'); // Redirige al login
  };

  return (
    <Container fluid className="dashboard-container"> {/* Contenedor principal con Bootstrap */}
      <Row>
        <Col md={3} className="user-info-section"> {/* Sección de información del usuario */}
          <div className="user-info">
            <Image
              src={userInfo.profileImage || defaultProfileImage} // Si el usuario tiene una imagen, se muestra; si no, la predeterminada
              roundedCircle
              width={100}
              height={100}
            />
            <h5>{userInfo.name}</h5> 
            <p>{userInfo.email}</p> 
            <Button variant="primary" href="/dashboard/edit-profile" className="edit-profile-btn">Editar perfil</Button>
            {userInfo.role === 'Administrador' && (
              <Button variant="secondary" href="/admin" className="mt-2">Panel de Administración</Button> // Visible solo para administradores
            )}
            <Button variant="danger" onClick={handleLogout} className="mt-3">Cerrar Sesión</Button>
          </div>
        </Col>

        <Col md={9} className="dashboard-content"> 
          {loading && (
            <div className="text-center mt-4"> 
              <Spinner animation="border" variant="primary" /> {/* Spinner de carga mientras los datos se están obteniendo */}
            </div>
          )}

          {error && (
            <Alert variant="danger" className="mt-4"> {/* Alerta de error si ocurre algún problema */}
              {error}
            </Alert>
          )}

          {!loading && !error && (
            <>
              <h3>Opciones</h3> 
              <Row className="options-section"> {/* Contenedor de las opciones del dashboard */}
                {options.map((option, index) => (
                  <Col key={index} md={4}> {/* Muestra las opciones en formato de tarjetas */}
                    <Card className="mb-4">
                      <Card.Img
                        variant="top"
                        src={option.image} // Imagen de la opción
                        alt={option.name}
                        style={{ height: '150px', objectFit: 'cover' }} // Estilo para ajustar la imagen
                      />
                      <Card.Body>
                        <Card.Title>{option.name}</Card.Title> 
                        <Button variant="primary" as={Link} to={option.link}>Ir</Button> 
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
