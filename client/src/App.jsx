import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMe } from './services/api';
import Reviews from './pages/Reviews';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Doctors from './pages/Doctors';
import NewAppointment from './pages/NewAppointment';
import MyAppointments from './pages/MyAppointments';
import NotFound from './pages/NotFound';

function PrivateRoute({ user, loading, children }) {
  if (loading) return <div className="loader"><span className="spinner" /></div>;
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }
    getMe()
      .then(res => setUser(res.data))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  function handleLogin(token, userData) {
    localStorage.setItem('token', token);
    setUser(userData);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <BrowserRouter>
      <Header user={user} onLogout={handleLogout} />
      <main className="main">
        <Routes>
          <Route path="/"                element={<Home user={user} />} />
          <Route path="/login"           element={<Login onLogin={handleLogin} />} />
          <Route path="/register"        element={<Register onLogin={handleLogin} />} />
          <Route path="/doctors"         element={<Doctors />} />
          <Route path="/appointments/new" element={
            <PrivateRoute user={user} loading={loading}>
              <NewAppointment />
            </PrivateRoute>
          } />
          <Route path="/appointments" element={
            <PrivateRoute user={user} loading={loading}>
              <MyAppointments />
            </PrivateRoute>
          } />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
