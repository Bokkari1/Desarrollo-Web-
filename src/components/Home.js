import React from 'react';
import { Button, Container } from 'react-bootstrap';

const Home = ({ onLogout }) => {
  return (
    <Container className="text-center mt-5">
      <h1>Bienvenido</h1>
      <Button onClick={onLogout} className="btn btn-danger mt-3">
        Cerrar sesión
      </Button>
    </Container>
  );
};

export default Home;
