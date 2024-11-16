import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import CreateReport from './pages/CreateReport';
import MyReports from './pages/MyReports';
import Resources from './pages/Resources';
import CreateResource from './pages/CreateResource';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import Users from './pages/Users';
import ReportFollowUp from './pages/ReportFollowUp';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/dashboard/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
        <Route path="/dashboard/reports/create" element={<PrivateRoute><CreateReport /></PrivateRoute>} />
        <Route path="/dashboard/resources" element={<PrivateRoute><Resources /></PrivateRoute>} />
        <Route path="/dashboard/create" element={<PrivateRoute><CreateResource /></PrivateRoute>} />
        <Route path="/dashboard/my-reports" element={<PrivateRoute><MyReports /></PrivateRoute>} />
        <Route path="/dashboard/reports/follow-up/:id" element={<PrivateRoute><ReportFollowUp /></PrivateRoute>} />
        <Route path="/dashboard/users" element={<PrivateRoute><Users /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />

      </Routes>
    </Router>
  );
};

export default App;
