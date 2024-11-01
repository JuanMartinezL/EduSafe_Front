import  { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    };

    const fetchReports = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/reports/view', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReports(res.data);
    };

    fetchUsers();
    fetchReports();
  }, []);

  return (
    <div className="container">
      <h1 className="mt-5">Panel de Administración</h1>
      <h2>Usuarios</h2>
      <ul className="list-group">
        {users.map(user => (
          <li className="list-group-item" key={user._id}>{user.name} ({user.email})</li>
        ))}
      </ul>
      <h2>Reportes</h2>
      <ul className="list-group">
        {reports.map(report => (
          <li className="list-group-item" key={report._id}>{report.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
