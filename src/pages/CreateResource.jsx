import { useState } from 'react';  
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';  

// Componente para crear un nuevo recurso
const CreateResource = () => {
  const [formData, setFormData] = useState({ title: '', description: '', file: null });  // Estado para manejar los datos del formulario
  const [error, setError] = useState(null);  
  const [success, setSuccess] = useState(null); 
  const navigate = useNavigate();  // Hook para la navegación programática

  // Función para manejar cambios en los campos del formulario
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Función para manejar cambios en el archivo seleccionado
  const handleFileChange = e => setFormData({ ...formData, file: e.target.files[0] });

  // Función para manejar el envío del formulario
  const handleSubmit = async e => {
    e.preventDefault();  // Previne el comportamiento predeterminado del formulario
    const token = localStorage.getItem('token');  // Obtiene el token de autenticación desde el localStorage

    if (!token) {
      setError('No estás autenticado. Por favor, inicia sesión.');  // Muestra un error si no hay token
      return;
    }

    const data = new FormData();  // Crea un FormData para enviar los datos como multipart/form-data
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('file', formData.file);

    try {
      // Realiza una solicitud POST para crear el recurso
      await axios.post('http://localhost:5000/api/resources/create', data, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      setSuccess('Recurso creado exitosamente.');  // Muestra un mensaje de éxito si la solicitud se completa exitosamente
      navigate('/dashboard/resources');  // Redirige al usuario al dashboard de recursos
    } catch (err) {
      console.error(err);  // Imprime el error en la consola
      setError('Error al crear el recurso. Por favor, inténtalo de nuevo.');  // Muestra un mensaje de error en caso de fallo
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Crear Recurso</h1>
      {error && <div className="alert alert-danger">{error}</div>}  
      {success && <div className="alert alert-success">{success}</div>}  
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={handleChange}  // Llama a la función handleChange cuando el usuario ingresa un valor
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            className="form-control"
            name="description"
            onChange={handleChange}  // Llama a la función handleChange cuando el usuario ingresa un valor
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Archivo PDF</label>
          <input
            type="file"
            className="form-control"
            name="file"
            onChange={handleFileChange}  // Llama a la función handleFileChange cuando el usuario selecciona un archivo
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Recurso</button> 
      </form>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Regresar
      </button>  
    </div>
  );
};

export default CreateResource; 
