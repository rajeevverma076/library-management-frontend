import React,{useState,useEffect} from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import RegisterUser from './components/RegisterUser';
import ViewBooks from './components/ViewBooks';
import BorrowBook from './components/BorrowBook';
import ReturnBook from './components/ReturnBook';
import './styles/Global.css';
import './index.css'

function App() {
  const [userId, setUserID] = useState('');
  useEffect(() => {
    const value = sessionStorage.getItem('userId');
    setUserID(value)

  }, []);
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
          <Route path="register" element={<RegisterUser />} />
          <Route path="return" element={<ReturnBook  userId={userId}/>} />
          <Route path="books" element={<ViewBooks userId={userId}/>} />
          <Route path="borrow" element={<BorrowBook userId={userId}/>} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
  );
}

export default App;


function Layout() {
  return (
    <>
      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Add new user</Link>
          </li>
          <li>
            <Link to="/books">View book</Link>
          </li>
          <li>
            <Link to="/borrow">Borrow book</Link>
          </li>
          <li>
            <Link to="/return">Return book</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing here</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </>
  );
}

function Home() {
  return (
    <div className="container">
      <h2>Home</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div className="container">
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}