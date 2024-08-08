import React, { useState } from 'react';
import {axiosClient} from '../config';
import './RegisterUser.css';

const RegisterUser = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
 
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
const response = await axiosClient.post('api/users/register', { name });
      console.log(response.data.message)
      setMessage(response.data.message);
      setName(response.data.data.name);
      sessionStorage.setItem("userId", response.data.data._id);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Error registering user');
    }
  };
 
  return (
    <div className="register-form"> 
      <h2 >Register User</h2>
      <form onSubmit={handleRegister}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Add New User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
 
export default RegisterUser;