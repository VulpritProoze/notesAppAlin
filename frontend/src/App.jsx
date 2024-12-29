import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoutes';
import './styles/index.css';
import Footer from './components/Footer';

function Logout() {
  const theme = localStorage.getItem('theme');
  localStorage.clear();
  if (theme) {
    localStorage.setItem('theme', theme);
  }

  return <Navigate to='/login' />;
}

function RegisterAndLogout() {
  const theme = localStorage.getItem('theme');
  localStorage.clear();
  if (theme) {
    localStorage.setItem('theme', theme);
  }

  return <Register />
}


function App() {
  const [theme, setTheme] = useState( () => localStorage.getItem('theme'));
  
  useEffect( () => {
    const selectedTheme = localStorage.getItem('theme');
    console.log('theme login', selectedTheme);
    if (selectedTheme) {
      document.body.className = selectedTheme;
      setTheme(selectedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.className = 'dark';
      setTheme('dark');
    } else {
      document.body.className = 'light';
      setTheme('light');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={
            <ProtectedRoute>
                <Home theme={theme} setTheme={setTheme}/>
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={ <Login /> } />
        <Route path='/logout' element={ <Logout /> } />
        <Route path='/register' element={ <RegisterAndLogout /> }  />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
