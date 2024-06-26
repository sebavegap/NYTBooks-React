import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useBooks } from '../context/BooksContext';

const Books = () => {
  const location = useLocation();
  const { bookId } = useParams();
  const { booksData } = useBooks();
  const [book, setBook] = useState(location.state?.book || null);
  const [category, setCategory] = useState(location.state?.category || null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!book && booksData) {
      const allBooks = booksData.results.lists.flatMap(list => list.books);
      const foundBook = allBooks.find(b => b.primary_isbn13 === bookId);
      setBook(foundBook);

      const foundCategory = booksData.results.lists.find(list => list.books.some(b => b.primary_isbn13 === bookId)).list_name;
      setCategory(foundCategory);

      console.log('Book data:', foundBook);
    } else if (book) {
      console.log('Book data:', book);
    }
  }, [book, bookId, booksData]);

  useEffect(() => {
    const fetchReviews = async (retryCount = 0) => {
      if (book) {
        try {
          const response = await axios.get(`https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${book.primary_isbn13}&api-key=lSEIqcrspFjvfKKyxC3rRFxwg9RpoYsk`);
          setReviews(response.data.results);

          console.log('Reviews data:', response.data.results);
        } catch (error) {
          if (error.response && error.response.status === 429 && retryCount < 3) {
            const delay = Math.pow(2, retryCount) * 1000;
            console.warn(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
            setTimeout(() => fetchReviews(retryCount + 1), delay);
          } else {
            console.error('Error fetching reviews', error);
          }
        }
      }
    };
    fetchReviews();
  }, [book]);

  if (!book) {
    return <p>No book data available.</p>;
  }

  return (
    <Container>
      <h1 className="text-center pb-5">{book.title}</h1>
      
      <Row>
        <Col md={4}>
          <Image src={book.book_image} alt="Imagen del libro" fluid style={{ height: '50vh' }} />
        </Col>
        <Col md={8} className="text-start">
        <Container style={{ border: '1px solid black', borderRadius: '10px' }}>
          <p><strong>{book.description}</strong></p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Published by:</strong> {book.publisher}</p>
          <p><strong>Category:</strong> {category}</p>
          </Container>
        </Col>
      </Row>
    
      <Row className="py-5">
        <Col>
          <h2 className="text-center">Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-center">There are no reviews for this book yet.</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index}>
                <h3><a href={review.url}>{review.book_title}</a></h3>
                <h4>{review.byline}</h4>
                <br />
              </div>
            ))
          )}
        </Col>
      </Row>
    
      <Row>
        <Col md={4}>
        </Col>
        <Col md={8}>
        </Col>
      </Row>
    </Container>
  );
}

export default Books;