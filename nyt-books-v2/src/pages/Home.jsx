import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../Home.css';
import BigImage from '../assets/imgs/fondo-libros2k.jpg';

import { Container, Row, Col, Card } from 'react-bootstrap';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = () => {
    const books = [
        { imgSrc: 'https://picsum.photos/751/1001', title: 'Título libro', text: 'Descripción del libro corta.' },
        { imgSrc: 'https://picsum.photos/752/1002', title: 'Título libro', text: 'Descripción del libro corta.' },
        { imgSrc: 'https://picsum.photos/753/1003', title: 'Título libro', text: 'Descripción del libro corta.' },
        { imgSrc: 'https://picsum.photos/754/1004', title: 'Título libro', text: 'Descripción del libro corta.' },
        { imgSrc: 'https://picsum.photos/755/1005', title: 'Título libro', text: 'Descripción del libro corta.' },
        { imgSrc: 'https://picsum.photos/756/1006', title: 'Título libro', text: 'Descripción del libro corta.' },
      ];
    
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
          items: 1,
          slidesToSlide: 1 // optional, default to 1
        }
      };
    
      return (
        <Container fluid style={{ height: 'auto', margin: 0, width: 'auto', padding: 0 }}>
          <Container>
            <Row>
              <Col>
                <Card style={{ minHeight: '150px', maxHeight: '2em' }}>
                  <Card.Img src={BigImage} alt="Big Image" style={{ minHeight: '150px', objectFit: 'cover' }} />
                  <Card.ImgOverlay style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0))' }}>
                    <Card.Title className="text-white">The New York Times Best Sellers</Card.Title>
                    <Card.Text className="text-white">Authoritatively ranked lists of books sold in the United States, sorted by format and genre.</Card.Text>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            </Row>
          </Container>
    
          <Container className="pt-5 pb-5">
            <Row>
              <Col className="mb-5">
                <h2 className="text">Hardcover Fiction</h2>
                <div className="bookshelf-background">
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
                    {books.map((book, index) => (
                      <Card key={index} className="carousel-item-half-height">
                        <Card.Img src={book.imgSrc} alt={book.title} className="card-img" />
                        <Card.ImgOverlay style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))', bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                          <Card.Title style={{ color: 'white' }}>{book.title}</Card.Title>
                          <Card.Text style={{ color: 'white' }}>{book.text}</Card.Text>
                        </Card.ImgOverlay>
                      </Card>
                    ))}
                  </Carousel>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      );
    };

            
        
   

export default Home