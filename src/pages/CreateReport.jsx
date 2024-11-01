import  { useState } from 'react';
import axios from 'axios';

const CreateReport = () => {
  const [formData, setFormData] = useState({ description: '', type_report: '', anonimo: false });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/reports/create', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Crear Reporte</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input type="text" className="form-control" name="description" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo de Reporte</label>
          <input type="text" className="form-control" name="type_report" onChange={handleChange} />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="anonimo"
            onChange={e => setFormData({ ...formData, anonimo: e.target.checked })}
          />
          <label className="form-check-label">Anónimo</label>
        </div>
        <button type="submit" className="btn btn-primary">Crear Reporte</button>
      </form>
    </div>
  );
};

export default CreateReport;
