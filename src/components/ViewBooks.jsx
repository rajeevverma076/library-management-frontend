import React, { useEffect, useState } from 'react';
import {axiosClient} from '../config';
import './ViewBooks.css'


const ViewBooks = () => {
  const [books, setBooks] = useState([]);
 
  useEffect(() => {
    const fetchBooks = async () => {
      try {
    const response = await axiosClient.get('api/books');
    console.log(response.data.data)
        setBooks(response.data.data);
      } catch (error) {
        console.error('Error fetching books', error);
      }
    };
 
    fetchBooks();
  }, []);
 
  return (
    <div className="list_book books-list">
      <h2>Books in Library</h2>
     
      {books.length === 0 ? (
        <p>No books in the library</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>{book.title} by {book.author}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
 
export default ViewBooks;