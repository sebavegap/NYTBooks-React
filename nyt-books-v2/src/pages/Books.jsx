import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';

const Books = () => {
  return (
    <Container>
    <h1 className="text-center pb-5">FUNNY STORY</h1>
    
    <Row>
      {/* Book image as a 1/3 column */}
      <Col md={4}>
        <Image src="https://storage.googleapis.com/du-prd/books/images/9780593441282.jpg" alt="Imagen del libro" fluid />
      </Col>
      {/* Book description as a 2/3 column */}
      <Col md={8} className="text-start">
        {/* These are placeholder data; API consumption is needed */}
        <p><strong>After their exes run off together, Daphne and Miles form a friendship and concoct a plan involving misleading photos.</strong></p>
        <p><strong>Author:</strong> Emily Henry</p>
        <p><strong>Published by:</strong> Berkley</p>
        <p><strong>Category:</strong> Hardcover Fiction</p>
      </Col>
    </Row>
  
    <Row className="py-5">
      <Col>
        <h2 className="text-center">Reviews</h2>
      </Col>
    </Row>
  
    {/* Ensure reviews start where the image starts */}
    <Row>
      <Col md={4}>
        {/* These reviews are placeholders; API consumption is needed */}
        <h3><a href="bajoconstruccion.html">Título de la reseña</a></h3>
        <h4>Autor de la reseña</h4>
        <br />
        <h3><a href="bajoconstruccion.html">Título de la reseña</a></h3>
        <h4>Autor de la reseña</h4>
        <br />
        <h3><a href="bajoconstruccion.html">Título de la reseña</a></h3>
        <h4>Autor de la reseña</h4>
        <br />
        <h3><a href="bajoconstruccion.html">Título de la reseña</a></h3>
        <h4>Autor de la reseña</h4>
        <br />
      </Col>
      <Col md={8}>
        {/* Additional reviews or content can go here, aligning with the book description */}
      </Col>
    </Row>
  </Container>
  )
}

export default Books