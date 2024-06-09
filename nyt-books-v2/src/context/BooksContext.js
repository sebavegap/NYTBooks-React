import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BooksContext = createContext();

export const useBooks = () => useContext(BooksContext);

export const BooksProvider = ({ children }) => {
  const [booksData, setBooksData] = useState(null);

  useEffect(() => {
    // Fetch data from the NYT Books API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=lSEIqcrspFjvfKKyxC3rRFxwg9RpoYsk'
        );
        const fetchedData = response.data;
        setBooksData(fetchedData);

        // Log the fetched data to the console
        console.log(fetchedData);
      } catch (error) {
        console.error('Error fetching data from NYT Books API', error);
      }
    };

    fetchData();
  }, []);

  return (
    <BooksContext.Provider value={{ booksData }}>
      {children}
    </BooksContext.Provider>
  );
};