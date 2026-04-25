import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Home    from './pages/Home/Home';
import Login   from './pages/Login/Login';
import Signup  from './pages/Signup/Signup';
import Watch   from './pages/Watch/Watch';
import Search  from './pages/Search/Search';
import MyList  from './pages/MyList/MyList';

import './App.css';

/** Protects routes that require the user to be logged in */
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
};

/** Redirect logged-in users away from auth pages */
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
};

const App = () => (
  <Routes>
    {/* Protected routes */}
    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
    <Route path="/watch/:id" element={<PrivateRoute><Watch /></PrivateRoute>} />
    <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
    <Route path="/mylist" element={<PrivateRoute><MyList /></PrivateRoute>} />

    {/* Public auth routes */}
    <Route path="/login"  element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

    {/* Catch-all */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;