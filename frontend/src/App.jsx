import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { AnimatedCursor } from './components/ui/AnimatedCursor';

import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#1B1029]">
      <span className="font-pixel text-sm text-[var(--mc-gold)] animate-pulse">Loading world...</span>
    </div>
  );
  if (!user) return <Navigate to="/login" />;
  
  return children;
};

function App() {
  return (
    <div className="bg-[var(--mc-obsidian)] min-h-screen relative">
      <AnimatedCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
