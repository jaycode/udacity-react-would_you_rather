import React, { useContext, useEffect } from 'react'
import { FaReact as Logo } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import Card from 'react-bootstrap/Card'
import { Container, Row, Col } from 'react-bootstrap'
import { Form, Button} from 'react-bootstrap'

const handleLogin = (e) => {

}

const handleInitialData = (e) => {
  
}


export default function Login() {
  const dispatch = useDispatch()

  useEffect(() => {
    handleInitialData()
  }, []);

  return (
    <Row>
      <Col>
        <Card className="text-center mx-auto" style={{width: '500px'}}>
          <Card.Header>
            <Card.Title>Welcome to the Would You Rather App!</Card.Title>
            <Card.Subtitle>Please sign in to continue</Card.Subtitle>
          </Card.Header>
          <Card.Body className="window-content">
            <Logo className="logo" />
            <p class="sign-in">Sign in</p>
            <Form>
              <Form.Control as="select">
              </Form.Control>
              <br />
              <Button variant="primary" type="submit" onClick={handleLogin}>
                Sign In
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}