import  { useState } from 'react';
import axios from 'axios';

const CreateResource = () => {
  const [formData, setFormData] = useState({ title: '', description: '', file: null });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = e => setFormData({ ...formData, file: e.target.files[0] });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('file', formData.file);

    try {
      await axios.post('http://localhost:5000/api/resources/create', data, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Crear Recurso</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input type="text" className="form-control" name="title" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input type="text" className="form-control" name="description" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Archivo PDF</label>
          <input type="file" className="form-control" name="file" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary">Crear Recurso</button>
      </form>
    </div>
  );
};

export default CreateResource;
