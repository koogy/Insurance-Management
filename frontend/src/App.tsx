import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import Quote from './components/Quote'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EmailConfirmation from './components/email/EmailConfirmation'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SignUp from './components/Authentification/SignUp';
import SignIn from './components/Authentification/SingIn';
import AccountContract from './components/Account/Contract';
import AuthentificationSuccess from './components/Authentification/AuthentificationSuccess';
import Profile from "./components/Account/Profile";
import UserQuote from "./components/Account/UserQuote";
import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute";
import Admin from './components/Admin/Admin';
import UnconnectedRoute from "./Routes/UnconnectedRoute";
import AccidentForm from './components/Accident/AccidentForm';
import AccidentPage from './components/Accident/AccidentPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f04c64',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="user/contract" element={<PrivateRoute component={AccountContract}/>} />
          <Route path="user/signup" element={<UnconnectedRoute component={SignUp} />} />
          <Route path="user/signin" element={<UnconnectedRoute component={SignIn} />} />
          <Route path="user/signin/success" element={<PrivateRoute component={AuthentificationSuccess}/>} />
          <Route path="user/profile" element={<PrivateRoute component={Profile}/>}/>
          <Route path="user/quote" element={<PrivateRoute component={UserQuote}/>}/>
          <Route path="user/accident" element={<PrivateRoute component={AccidentPage}/>}/>
          <Route path="quote" element={<Quote />} />
          <Route path="accident" element={<PrivateRoute component={AccidentForm} />} />
          <Route path="/emailConfirmation/:token" element={<EmailConfirmation/>}/>
          <Route path="admin" element={<AdminRoute component={Admin} />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
