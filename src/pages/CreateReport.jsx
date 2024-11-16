import { useState } from 'react';  
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';  

// Componente para crear un reporte
const CreateReport = () => {
  // Estado para manejar los datos del formulario (descripción, tipo de reporte y anonimato)
  const [formData, setFormData] = useState({ description: '', type_report: '', anonimo: false });
  // Estado para mostrar un mensaje de éxito después de registrar el reporte
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Hook para la navegación programática

  // Función para manejar el cambio de valor en los campos del formulario
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Función para manejar el envío del formulario
  const handleSubmit = async e => {
    e.preventDefault();  // Previne el comportamiento predeterminado del formulario
    const token = localStorage.getItem('token');  // Obtiene el token de autenticación desde el localStorage
    try {
      // Realiza una solicitud POST para registrar el reporte
      await axios.post('http://localhost:5000/api/reports', formData, {
        headers: { Authorization: `Bearer ${token}` }  // Envía el token en los headers de la solicitud
      });
      setSuccessMessage('Reporte registrado exitosamente en el sistema');  
      setFormData({ description: '', type_report: '', anonimo: false });  // Limpia el formulario
    } catch (err) {
      console.error(err);  // Maneja el error en caso de fallo en la solicitud
    }
  };

  // Función para redirigir a la página anterior
  const handleBack = () => {
    navigate(-1);  // Redirige al usuario a la página anterior en el historial
  };

  return (
    <div className="container">
      <h1 className="mt-5">Crear Reporte</h1>
      {/* Muestra el mensaje de éxito si está disponible */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {/* Formulario para crear un reporte */}
      <form onSubmit={handleSubmit}>
        {/* Campo para la descripción del reporte */}
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}  // Actualiza el estado del formulario con cada cambio
          />
        </div>
        {/* Campo para el tipo de reporte */}
        <div className="mb-3">
          <label className="form-label">Tipo de Reporte</label>
          <input
            type="text"
            className="form-control"
            name="type_report"
            value={formData.type_report}
            onChange={handleChange}  
          />
        </div>
        {/* Checkbox para marcar el reporte como anónimo */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="anonimo"
            checked={formData.anonimo}
            onChange={e => setFormData({ ...formData, anonimo: e.target.checked })}  // Cambia el estado del checkbox
          />
          <label className="form-check-label">Anónimo</label>
        </div>
        {/* Botón para enviar el formulario */}
        <button type="submit" className="btn btn-primary">Crear Reporte</button>
        {/* Botón para regresar a la página anterior */}
        <button type="button" className="btn btn-secondary ms-2" onClick={handleBack}>Regresar</button>
      </form>
    </div>
  );
};

export default CreateReport;  
