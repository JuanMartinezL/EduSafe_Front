import  { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/reports/view', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReports(res.data);
    };

    fetchReports();
  }, []);

  return (
    <div className="container">
      <h1 className="mt-5">Reportes</h1>
      <ul className="list-group">
        {reports.map(report => (
          <li className="list-group-item" key={report._id}>{report.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
