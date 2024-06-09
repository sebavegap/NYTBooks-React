import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home.css';
import BigImage from '../assets/imgs/fondo-libros2k.jpg';

import { Container, Row, Col, Card } from 'react-bootstrap';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the NYT Books API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=lSEIqcrspFjvfKKyxC3rRFxwg9RpoYsk'
        );
        const fetchedData = response.data;
        setData(fetchedData);

        // Log the fetched data to the console
        console.log(fetchedData);

        // Extract categories and remove duplicates
        const extractedCategories = fetchedData.results.lists.map((list) => ({
          list_name: list.list_name,
          list_id: list.list_id,
        }));

        const uniqueCategories = Array.from(
          new Map(extractedCategories.map(item => [item['list_name'], item])).values()
        );

        setCategories(uniqueCategories);

      } catch (error) {
        console.error('Error fetching data from NYT Books API', error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (book) => {
    navigate(`/book/${book.primary_isbn13}`, { state: { book } });
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
        {data && categories.map((category, index) => (
          <Row key={index} className="mb-5">
            <Col>
              <h2 className="text">{category.list_name}</h2>
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
                  {data.results.lists.filter(list => list.list_name === category.list_name)[0].books.map((book, bookIndex) => (
                    <Card 
                      key={bookIndex} 
                      className="carousel-item-half-height" 
                      onClick={() => handleCardClick(book)}
                      style={{ cursor: 'pointer' }} // Adding a pointer cursor to indicate the card is clickable
                    >
                      <Card.Img src={book.book_image} alt={book.title} className="card-img" />
                      <Card.ImgOverlay style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))', bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <Card.Title style={{ color: 'white' }}>{book.title}</Card.Title>
                        <Card.Text style={{ color: 'white' }}>{book.description}</Card.Text>
                      </Card.ImgOverlay>
                    </Card>
                  ))}
                </Carousel>
              </div>
            </Col>
          </Row>
        ))}
      </Container>
    </Container>
  );
};

export default Home;