import React, { useEffect, useState } from 'react';
import {axiosClient} from '../config';
import './ReturnBook.css'
 
const ReturnBook = ({ userId }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [message, setMessage] = useState('');

 
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axiosClient.get(`api/users/${userId}/borrowedBooks`);
        setBorrowedBooks(response?.data?.data?.borrowedBooks);
      } catch (error) {
        console.error('Error fetching borrowed books', error);
      }
    };
 
    fetchBorrowedBooks();
  }, [userId]);
 
  const handleReturn = async (bookId) => {
    debugger
    try {
      const response = await axiosClient.post(`api/users/${userId}/return/${bookId}`);
      setMessage(response.data.message);
      setBorrowedBooks(borrowedBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Error returning book');
    }
  };
 
  return (
    <div className='book_return_container borrowed-books-list'>
      <h2>Return Book</h2>
      {message && <p>{message}</p>}
      {borrowedBooks.length === 0 ? (
        <p>No borrowed books</p>
      ) : (
        <ul>
          {borrowedBooks.map((book) => (
            <li key={book._id}>
              {book.title} by {book.author}
              <button onClick={() => handleReturn(book._id)}>Return</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
 
export default ReturnBook;
 