//components/PasswordReset.js//

import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/reset-password', { newPassword, confirmPassword });
      setMessage(response.data.message);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      setMessage('Error al restablecer la contraseña. Por favor, intenta nuevamente más tarde.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mt-5">Cambio de Contraseña</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="newPassword">
              <Form.Label>Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirmar Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirma tu nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="btn btn-primary btn-block">
              Cambiar Contraseña
            </Button>
            {message && <div className="mt-3">{message}</div>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordReset;

