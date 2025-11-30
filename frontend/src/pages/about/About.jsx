import Stack from 'react-bootstrap/esm/Stack'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/esm/Card'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

export const About = () => {
  return (
    <Stack className="about-page py-5" as="main">
      <Container>
        <h2 className="text-center mb-5">About</h2>
        <Row>
          <Col>About Us</Col>
        </Row>
      </Container>
    </Stack>
  )
}
