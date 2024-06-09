import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BooksContext = createContext();

export const useBooks = () => useContext(BooksContext);

export const BooksProvider = ({ children }) => {
  const [booksData, setBooksData] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch data from the NYT Books API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=lSEIqcrspFjvfKKyxC3rRFxwg9RpoYsk'
        );
        const fetchedData = response.data;
        setBooksData(fetchedData);

        // Extract categories and remove duplicates
        const extractedCategories = fetchedData.results.lists.map((list) => ({
          list_name: list.list_name,
          list_id: list.list_id,
        }));

        const uniqueCategories = Array.from(
          new Map(extractedCategories.map(item => [item['list_name'], item])).values()
        );

        setCategories(uniqueCategories);

        // Log the fetched data to the console
        console.log(fetchedData);
      } catch (error) {
        console.error('Error fetching data from NYT Books API', error);
      }
    };

    fetchData();
  }, []);

  return (
    <BooksContext.Provider value={{ booksData, categories }}>
      {children}
    </BooksContext.Provider>
  );
};