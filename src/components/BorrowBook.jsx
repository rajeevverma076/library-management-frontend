import React, { useEffect, useState } from 'react';
import {axiosClient} from '../config';
import './BorrowBook.css'


const BorrowBook = ({ userId }) => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');
 
  useEffect(() => {
    const fetchBooks = async () => {
      try {
const response = await axiosClient.get('api/books');
        setBooks(response.data.data);
      } catch (error) {
        console.error('Error fetching books', error);
      }
    };
 
    fetchBooks();
  }, []);
 
  const handleBorrow = async (bookId) => {
    try {
      const response = await axiosClient.post(`api/users/${userId}/borrow/${bookId}`);
      setMessage(response.data.message);
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Error borrowing book');
    }
  };
 
  return (
    <div className='borrow_book_container borrowed-books-list'>
      <h2>Borrow Book</h2>
      {message && <p className='error'>{message}</p>}
      {books.length === 0 ? (
        <p>No books available to borrow</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              {book.title} by {book.author}
              <button onClick={() => handleBorrow(book._id)}>Borrow</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
 
export default BorrowBook;