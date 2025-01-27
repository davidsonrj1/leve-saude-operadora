import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/home';
import Login from './Pages/login';

function AppRouter() {
  const isAuthenticated = !!localStorage.getItem('access_token'); // Verifica se o token está salvo

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
