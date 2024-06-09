import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const Books = () => {
  const location = useLocation();
  const { bookId } = useParams();
  const [book, setBook] = useState(location.state?.book || null);

  useEffect(() => {
    if (!book) {
      // Fetch the book details using the bookId
      const fetchBook = async () => {
        try {
          const response = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=lSEIqcrspFjvfKKyxC3rRFxwg9RpoYsk`);
          const allBooks = response.data.results.lists.flatMap(list => list.books);
          const foundBook = allBooks.find(b => b.primary_isbn13 === bookId);
          setBook(foundBook);
        } catch (error) {
          console.error('Error fetching book data', error);
        }
      };
      fetchBook();
    }
  }, [book, bookId]);

  if (!book) {
    return <p>No book data available.</p>;
  }

  return (
    <Container>
      <h1 className="text-center pb-5">{book.title}</h1>
      
      <Row>
        {/* Book image as a 1/3 column */}
        <Col md={4}>
          <Image src={book.book_image} alt="Imagen del libro" fluid />
        </Col>
        {/* Book description as a 2/3 column */}
        <Col md={8} className="text-start">
          <p><strong>{book.description}</strong></p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Published by:</strong> {book.publisher}</p>
          <p><strong>Category:</strong> {book.category}</p>
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
          <h3><a href="bajoconstruccion.html">Review Title</a></h3>
          <h4>Review Author</h4>
          <br />
          <h3><a href="bajoconstruccion.html">Review Title</a></h3>
          <h4>Review Author</h4>
          <br />
          <h3><a href="bajoconstruccion.html">Review Title</a></h3>
          <h4>Review Author</h4>
          <br />
          <h3><a href="bajoconstruccion.html">Review Title</a></h3>
          <h4>Review Author</h4>
          <br />
        </Col>
        <Col md={8}>
          {/* Additional reviews or content can go here, aligning with the book description */}
        </Col>
      </Row>
    </Container>
  )
}

export default Books;