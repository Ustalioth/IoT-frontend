import './App.css';
import './i18n';
import {
  Routes,
  Route
} from 'react-router-dom';
import Home from 'pages/home/Home';
import Register from 'pages/auth/signup/Register';
import Login from 'pages/auth/signin/Login';
import Profile from 'pages/account/Profile';


const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/account" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
