import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrors({ ...errors, email: 'Por favor, ingresa un correo electrónico válido.' });
      return;
    }

    if (!validatePassword(password)) {
      setErrors({ ...errors, password: 'Por favor, ingresa una contraseña de al menos 8 caracteres.' });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: 'Las contraseñas no coinciden.' });
      return;
    }

    localStorage.setItem(email, password);
    alert('Usuario registrado exitosamente!');
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mt-5">Registrarse</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="registerFirstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="registerLastName">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tus apellidos"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="registerEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <div className="alert alert-danger">{errors.email}</div>}
            </Form.Group>
            <Form.Group controlId="registerPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <div className="alert alert-danger">{errors.password}</div>}
            </Form.Group>
            <Form.Group controlId="registerConfirmPassword">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirma tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && <div className="alert alert-danger">{errors.confirmPassword}</div>}
            </Form.Group>
            <Button type="submit" className="btn btn-primary btn-block">
              Registrarse
            </Button>
          </Form>
          <Link to="/login" className="btn btn-link d-block mt-3">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

