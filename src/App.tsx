import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import Artisans from './pages/Artisans';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import ProtectedRoute from './components/ProtectedRoute';
import ChatAssistant from './components/ChatAssistant';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Toaster position="top-center" />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/artisans" element={<Artisans />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/order-success" element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
        <ChatAssistant />
      </div>
    </AuthProvider>
  );
};

export default App;