import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Container, ListGroup, Spinner, Alert, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import '../assets/css/Dashboard.css'; // Asegúrate de crear este archivo para estilos adicionales

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [resources, setResources] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');

      try {
        const [reportsRes, resourcesRes, usersRes] = await Promise.all([
          axios.get('http://localhost:5000/api/reports/view', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/resources', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/admin/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setReports(reportsRes.data);
        setResources(resourcesRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        setError('Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid className="dashboard-container">
      <Row>
        <Col md={3} className="sidebar">
          <h2 className="text-center">Panel de Usuario</h2>
          <Nav className="flex-column mt-3">
            <Nav.Link as={Link} to="/dashboard/reports">Reportes</Nav.Link>
            <Nav.Link as={Link} to="/dashboard/resources">Recursos</Nav.Link>
            <Nav.Link as={Link} to="/dashboard/users">Gestión de Usuarios</Nav.Link>
            <Nav.Link as={Link} to="/create-report">Crear Reporte</Nav.Link>
            <Nav.Link as={Link} to="/create-resource">Crear Recurso</Nav.Link>
          </Nav>
        </Col>

        <Col md={9} className="content">
          {loading && (
            <div className="text-center mt-4">
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          {error && (
            <Alert variant="danger" className="mt-4">
              {error}
            </Alert>
          )}

          {!loading && !error && (
            <>
              <Outlet /> {/* Este es donde se renderizarán las rutas anidadas */}
              <Row className="mt-4">
                <Col md={12}>
                  <Card>
                    <Card.Header>Reportes Recientes</Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        {reports.slice(0, 5).map(report => (
                          <ListGroup.Item key={report._id}>
                            {report.description}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                      <Button variant="primary" href="/reports" className="mt-3">Ver Todos los Reportes</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col md={12}>
                  <Card>
                    <Card.Header>Recursos Recientes</Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        {resources.slice(0, 5).map(resource => (
                          <ListGroup.Item key={resource._id}>
                            <a href={`http://localhost:5000/${resource.filePath}`} download>{resource.title}</a>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                      <Button variant="primary" href="/resources" className="mt-3">Ver Todos los Recursos</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col md={12}>
                  <Card>
                    <Card.Header>Gestión de Usuarios</Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        {users.slice(0, 5).map(user => (
                          <ListGroup.Item key={user._id}>
                            {user.name} ({user.email})
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                      <Button variant="primary" href="/admin" className="mt-3">Gestionar Usuarios</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
