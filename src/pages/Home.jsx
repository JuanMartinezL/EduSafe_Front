import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Home.css';
import logoEduSafe from '../assets/img/EdusafeLogo.png';
const Home = () => {
  return (
    <Container className="home-container text-center mt-5">
      <Row>
        <Col md={6} className="text-start">
          <h1 className='h1__home'>EduSafe</h1>
          <p>Promoviendo entornos seguros y libres de abuso en cada institución educativa</p>
          <div className="button-group">
            <Button variant="primary" size="lg" href="/login">Iniciar Sesión</Button>
            <Button variant="success" size="lg" href="/register" className="ml-2">Registrarse</Button>
          </div>
        </Col>
        <Col md={6}>
        <Image src={logoEduSafe} alt="Imagen representativa de EduSafe" fluid rounded />

        </Col>
      </Row>
    </Container>
  );
};

export default Home;
