import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddEditBook from './pages/AddEditBook';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/" element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } />

              <Route path="/add" element={
                <PrivateRoute>
                  <AddEditBook />
                </PrivateRoute>
              } />

              <Route path="/edit/:id" element={
                <PrivateRoute>
                  <AddEditBook />
                </PrivateRoute>
              } />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
