//components/Login.js

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login'; 
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; // Importa las funciones de autenticación correctamente

import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password); // 
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider); // 
      navigate('/home'); // redirigir a home
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem(email);
    if (storedPassword === password) {
      alert('Inicio de sesión exitoso!');
      onLogin();
      navigate('/home'); 
    } else {
      setError('Nombre de usuario o contraseña incorrectos');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mt-5">Iniciar Sesión</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {!validateEmail(email) && <div className="alert alert-danger">Por favor, ingresa un correo electrónico válido.</div>}
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {!validatePassword(password) && <div className="alert alert-danger">Por favor, ingresa una contraseña de al menos 8 caracteres.</div>}
            </Form.Group>
            <Button type="submit" className="btn btn-primary btn-block" disabled={!validateEmail(email) || !validatePassword(password)}>
              Iniciar Sesión
            </Button>
            
            <button className="btn btn-primary" onClick={handleGoogleLogin}>
              Iniciar sesión con Google
            </button>
          </Form>
          <Link to="/register" className="btn btn-link d-block mt-3">
            ¿No tienes una cuenta? Regístrate
          </Link>
          <Link to="/password-recovery" className="btn btn-link d-block mt-3">
            ¿Olvidaste tu contraseña? 
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
