import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Home.css';
import BigImage from '../assets/imgs/fondo-libros2k.jpg';

import { Container, Row, Col, Card } from 'react-bootstrap';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useBooks } from '../context/BooksContext';

//Se establece un máximo de caracteres en el string para la descripción de los libros.
//Si la descripción supera el máximo, se aplica un slice al string y se añade "..." al final.
const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

//Se crea el componente Home, el cual se encarga de mostrar la página principal de la aplicación.
const Home = () => {
  //Se obtienen las funciones de navegación y la ubicación actual.
  const navigate = useNavigate();
  const location = useLocation();
  //Se obtienen los datos de los libros.
  const { booksData } = useBooks();
  //Se crea una referencia para cada categoría de libros.
  const categoryRefs = useRef({});

  useEffect(() => {
    //Si la ubicación actual tiene un estado de scroll, se obtiene la referencia de la categoría y se desplaza hasta ella.
    if (location.state?.scrollTo) {
      const categoryElement = categoryRefs.current[location.state.scrollTo];
      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth' });
      }
      navigate(location.pathname, { replace: true }); // Clear state after scroll
    }
  }, [location, navigate]);

  //Función que se encarga de manejar el click en una tarjeta de libro.
  //Se navega a la página del libro seleccionado.
  //Se establece el URL de la página del libro con su codigo isbn y la categoría a la que pertenece.
  const handleCardClick = (book, category) => {
    navigate(`/book/${book.primary_isbn13}`, { state: { book, category } });
  };

  //Se establcen las propiedades de responsive para el carrusel de libros.
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
    //Se establece el contenedor principal de la página.
    <Container fluid style={{ height: 'auto', margin: 0, width: 'auto', padding: 0 }}>
      {/* Se establece el contenedor del banner principal de la página. */}
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
        {/* Se mapea por cada resultado de la lista de libros, se crea una fila con el nombre de la categoría y se muestra un carrusel con los libros de la categoría. */}
        {booksData && booksData.results.lists.map((category, index) => (
          <Row
          /* Se establece la clave de la fila con el índice de la categoría. */
          /* Se establece la clase de la fila con un margen inferior de 5. */
          /* Se establece la referencia de la fila con el nombre de la categoría. */
          /* Se establece el título de la categoría. */
            key={index}
            className="mb-5"
            ref={(el) => { categoryRefs.current[category.list_name] = el; }}
          >
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
                  {category.books.map((book, bookIndex) => (
                    <Card 
                      key={bookIndex} 
                      className="carousel-item-half-height" 
                      onClick={() => handleCardClick(book, category.list_name)}
                      style={{ cursor: 'pointer' }} // Adding a pointer cursor to indicate the card is clickable
                    >
                      <Card.Img src={book.book_image} alt={book.title} className="card-img" />
                      <Card.ImgOverlay>
                        <Card.Title style={{ color: 'white' }}>{book.title}</Card.Title>
                        <Card.Text style={{ color: 'white' }}>{truncateString(book.description, 40)}</Card.Text>
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