import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../Home.css';
import BigImage from '../assets/imgs/fondo-libros2k.jpg';

import { Container, Row, Col, Card } from 'react-bootstrap';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useBooks } from '../context/BooksContext';

const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { booksData } = useBooks();
  const categoryRefs = useRef({});

  useEffect(() => {
    if (location.state?.scrollTo) {
      const categoryElement = categoryRefs.current[location.state.scrollTo];
      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth' });
      }
      navigate(location.pathname, { replace: true }); // Clear state after scroll
    }
  }, [location, navigate]);

  const handleCardClick = (book, category) => {
    navigate(`/book/${book.primary_isbn13}`, { state: { book, category } });
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5 // optional, default to 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1
    }
  };

  return (
    <div className="bookshelf-background">
      <Container fluid style={{ height: 'auto', margin: 0, width: 'auto', padding: 0 }}>
        <Header />
        <Container>
  <Row style={{marginTop: '100px'}}>
    {/* Banner */}
    <Col>
      <Card style={{ minHeight: '150px', maxHeight: '2em', borderColor: 'black' }}>
        <Card.Img src={BigImage} alt="Big Image" style={{ minHeight: '150px', objectFit: 'cover' }} />
        <Card.ImgOverlay style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))' }}>
          <Card.Title className="text-white">The New York Times Best Sellers</Card.Title>
          <Card.Text className="text-white">Authoritatively ranked lists of books sold in the United States, sorted by format and genre.</Card.Text>
        </Card.ImgOverlay>
      </Card>
    </Col>
  </Row>
</Container>

        <Container className="pt-5 pb-5">
          {booksData && booksData.results.lists.map((category, index) => (
            <Row
              key={index}
              className="mb-5"
              ref={(el) => { categoryRefs.current[category.list_name] = el; }}
            >
              <Col>
                <h2 className="text"style={{ color: 'white' }}>{category.list_name}</h2>
                <Carousel
                  swipeable={true}
                  draggable={true}
                  showDots={true}
                  responsive={responsive}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  deviceType={""}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >
                  {category.books.map((book, bookIndex) => (
                    <Card 
                      key={bookIndex} 
                      className="carousel-item-half-height" 
                      onClick={() => handleCardClick(book, category.list_name)}
                      style={{ cursor: 'pointer' }} // Adding a pointer cursor to indicate the card is clickable
                    >
                      <Card.Img src={book.book_image} alt={book.title} className="card-img" />
                    {/*   <Card.ImgOverlay>
                        <Card.Title style={{ color: 'white' }}>{book.title}</Card.Title>
                        <Card.Text style={{ color: 'white' }}>{truncateString(book.description, 40)}</Card.Text>
                      </Card.ImgOverlay> */}
                    </Card>
                  ))}
                </Carousel>
              </Col>
            </Row>
          ))}
        </Container>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;