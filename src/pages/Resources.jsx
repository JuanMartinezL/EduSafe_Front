import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para la navegación

const Resources = () => {
  const [resources, setResources] = useState([]); // Estado para almacenar la lista de recursos.
  const navigate = useNavigate(); // Hook de React Router para navegar entre rutas.

  // useEffect para cargar los recursos educativos al montar el componente.
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtiene el token almacenado para autenticar.
        const res = await axios.get('http://localhost:5000/api/resources', {
          headers: { Authorization: `Bearer ${token}` } // Token en los headers para la autenticación.
        });
        setResources(res.data); // Almacena los datos recibidos en el estado.
      } catch (error) {
        console.error('Error fetching resources', error); // Manejo de errores al cargar los recursos.
      }
    };

    fetchResources(); // Llama a la función para obtener los recursos.
  }, []);

  return (
    <div className="container">
      <h1 className="mt-5">Recursos Educativos</h1>
      {/* Botón para regresar a la página anterior */}
      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3 mb-4">
        Regresar
      </button>

      {/* Renderiza la tabla de recursos si hay datos disponibles */}
      {resources.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Título</th> {/* Encabezado de la columna de títulos */}
              <th>Acciones</th> {/* Encabezado de la columna de acciones */}
            </tr>
          </thead>
          <tbody>
            {resources.map(resource => (
              <tr key={resource._id}>
                <td>{resource.title}</td> {/* Título del recurso */}
                <td>
                  {/* Botón para ver el recurso en una nueva pestaña */}
                  <a
                    href={`http://localhost:5000/${resource.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm mr-2"
                  >
                    Ver
                  </a>
                  {/* Botón para descargar el recurso */}
                  <a
                    href={`http://localhost:5000/${resource.filePath}`}
                    download
                    className="btn btn-success btn-sm"
                  >
                    Descargar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Mensaje si no hay recursos disponibles.
        <p>No hay recursos disponibles.</p>
      )}
    </div>
  );
};

export default Resources;
