import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, GuestRoute } from './components/shared/ProtectedRoute';
import { Navbar } from './components/shared/Navbar';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { OAuthCallback } from './components/auth/OAuthCallback';
import { Quantity } from './components/quantity/Quantity';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Routes>
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
            <Route path="/oauth2/callback" element={<OAuthCallback />} />
            <Route
              path="/quantity"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Quantity />
                  </>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
