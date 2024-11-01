
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import CreateReport from './pages/CreateReport';
import Resources from './pages/Resources';
import CreateResource from './pages/CreateResource';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/reports" component={Reports} />
        <PrivateRoute path="/create-report" component={CreateReport} />
        <PrivateRoute path="/resources" component={Resources} />
        <PrivateRoute path="/create-resource" component={CreateResource} />
        <PrivateRoute path="/admin" component={AdminDashboard} />
      </Switch>
    </Router>
  );
};

export default App;
