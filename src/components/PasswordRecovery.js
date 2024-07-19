import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para mostrar el mensaje de confirmación

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post('/api/sendPasswordResetEmail', { email });
      const { token, message: msg } = response.data;
      setSubmitted(true);
      setMessage(msg);
      setShowConfirmation(true); 
    } catch (error) {
      console.error('Error al enviar la solicitud de recuperación:', error);
      setMessage('Error al enviar la solicitud de recuperación.');
      setShowConfirmation(true); 
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mt-5">Recuperación de Contraseña</h2>
          {showConfirmation && ( 
            <Alert variant={submitted ? "success" : "danger"} className="mt-3">
              {message}
            </Alert>
          )}
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
            </Form.Group>
            <Button type="submit" className="btn btn-primary btn-block">
              Enviar solicitud de recuperación
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordRecovery;

