import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import { useBooks } from '../context/BooksContext';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Books = () => {
  const location = useLocation();
  const { bookId } = useParams();
  const { booksData } = useBooks();
  const [book, setBook] = useState(location.state?.book || null);
  const [category, setCategory] = useState(location.state?.category || null);

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

  

  if (!book) {
    return <p>No book data available.</p>;
  }

  return (
    <div className="bookshelf-background">
      <Header />
    <Container>
      <h1 className="text-center pb-3">{book.title}</h1>
      
      <Row>
        <Col md={4}>
          <Image src={book.book_image} alt="Imagen del libro" fluid style={{ border:'3px solid white', height: '40vh', marginBottom: '20px'}} />
        </Col>
        <Col md={8} className="text-start">
        <Container style={{ border: '3px solid white', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
          <p>{book.description}</p>
          <p>Author: {book.author}</p>
          <p>Published by: {book.publisher}</p>
          <p>Category: {category}</p>
          </Container>
        </Col>
      </Row>
    

    </Container>
    <Footer />
    </div>
  );
}

export default Books;