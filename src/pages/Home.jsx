import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Home.css';
import logoEduSafe from '../assets/img/logo_Edusafe.png';

const Home = () => {
  return (
    //Contenedor Principal
    <Container className="home-container text-center mt-5">
      <Row className="align-items-center">
        <Col md={6} className="text-start">
          <h1 className='h1__home'>EduSafe</h1>
          <p>Construyendo un camino hacia la educación libre de abuso, donde la seguridad de cada estudiante es nuestra mayor prioridad y el aprendizaje se desarrolla en un ambiente de confianza.</p>
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
