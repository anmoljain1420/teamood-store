import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Menu from './pages/public/Menu';
import Shop from './pages/public/Shop';
import ProductDetails from './pages/public/ProductDetails';
import Cart from './pages/public/Cart';
import Checkout from './pages/public/Checkout';
import OrderSuccess from './pages/public/OrderSuccess';
import Franchise from './pages/public/Franchise';
import Contact from './pages/public/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import FranchiseEnquiries from './pages/admin/FranchiseEnquiries';
import ContactEnquiries from './pages/admin/ContactEnquiries';
import Products from './pages/admin/Products';
import Categories from './pages/admin/Categories';
import Orders from './pages/admin/Orders';
import Inventory from './pages/admin/Inventory';
import MenuManagement from './pages/admin/MenuManagement';
import POS from './pages/admin/POS';
import Sales from './pages/admin/Sales';
import WebsiteContent from './pages/admin/WebsiteContent';
import AdminBrands from './pages/admin/AdminBrands';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import Settings from './pages/admin/Settings';

export default function App() {
  return (
    <Routes>
      {/* 1. Public Customer Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/brands" element={<Navigate to="/about" replace />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* 2. Admin Authentication Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* 3. Protected Admin Operations Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="franchise-enquiries" element={<FranchiseEnquiries />} />
        <Route path="contact-enquiries" element={<ContactEnquiries />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="orders" element={<Orders />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="menu-management" element={<MenuManagement />} />
        <Route path="pos" element={<POS />} />
        <Route path="sales" element={<Sales />} />
        <Route path="content" element={<WebsiteContent />} />
        <Route path="brands" element={<AdminBrands />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
