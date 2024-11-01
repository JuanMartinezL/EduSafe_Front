import  { useState, useEffect } from 'react';
import axios from 'axios';

const Resources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/resources', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResources(res.data);
    };

    fetchResources();
  }, []);

  return (
    <div className="container">
      <h1 className="mt-5">Recursos Educativos</h1>
      <ul className="list-group">
        {resources.map(resource => (
          <li className="list-group-item" key={resource._id}>
            <a href={`http://localhost:5000/${resource.filePath}`} download>{resource.title} </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resources;
