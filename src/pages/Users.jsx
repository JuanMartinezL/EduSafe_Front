import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Spinner, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar la lista de usuarios.
  const [loading, setLoading] = useState(true); // Estado para indicar si los datos están cargando.
  const [error, setError] = useState(null); // Estado para manejar errores.
  const navigate = useNavigate(); // Hook para navegar entre rutas.

  // useEffect para cargar la lista de usuarios al montar el componente.
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); // Activa el estado de carga.
        const token = localStorage.getItem('token'); // Obtiene el token de autenticación.
        const response = await axios.get('http://localhost:5000/api/auth/users', {
          headers: { Authorization: `Bearer ${token}` }, // Incluye el token en los headers.
        });
        setUsers(response.data); // Almacena los datos obtenidos en el estado.
      } catch (err) {
        setError('Error al cargar los usuarios. Intenta nuevamente más tarde.'); // Manejo de errores.
        console.error('Error fetching users:', err); // Log para depuración.
      } finally {
        setLoading(false); // Finaliza el estado de carga.
      }
    };

    fetchUsers(); // Llama a la función al montar el componente.
  }, []);

  return (
    <Container className="mt-5">
      <h2>Gestión de Usuarios</h2>

      {/* Botón para regresar a la página anterior */}
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        Regresar
      </Button>

      {/* Muestra un spinner mientras se cargan los datos */}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Muestra un mensaje de error si ocurre algún problema */}
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {/* Tabla de usuarios si los datos están disponibles y no hay errores */}
      {!loading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th> {/* Columna de ID del usuario */}
              <th>Nombre</th> {/* Columna del nombre */}
              <th>Email</th> {/* Columna del email */}
              <th>Rol</th> {/* Columna del rol */}
              <th>Acciones</th> {/* Columna para acciones */}
            </tr>
          </thead>
          <tbody>
            {/* Itera sobre la lista de usuarios para generar las filas */}
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td> {/* Muestra el ID del usuario */}
                <td>{user.name}</td> {/* Muestra el nombre del usuario */}
                <td>{user.email}</td> {/* Muestra el email del usuario */}
                <td>{user.role}</td> {/* Muestra el rol del usuario */}
                <td>
                  {/* Botón para editar al usuario */}
                  <Button variant="warning" className="me-2">
                    Editar
                  </Button>
                  {/* Botón para eliminar al usuario */}
                  <Button variant="danger">
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserManagement;
