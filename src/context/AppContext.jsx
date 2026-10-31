import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_MENU_ITEMS,
  INITIAL_BRANDS,
  INITIAL_ORDERS,
  INITIAL_FRANCHISE_ENQUIRIES,
  INITIAL_CONTACT_ENQUIRIES,
  INITIAL_TESTIMONIALS,
  INITIAL_SITE_CONTENT
} from '../data/initialData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Helper to load from localStorage with fallback
  const loadStored = (key, fallback) => {
    try {
      const item = localStorage.getItem(`teamood_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.warn(`Error reading ${key} from storage:`, e);
      return fallback;
    }
  };

  // State definitions with initial data fallbacks
  const [products, setProducts] = useState(() => loadStored('products', INITIAL_PRODUCTS));
  const [categories, setCategories] = useState(() => loadStored('categories', INITIAL_CATEGORIES));
  const [menuItems, setMenuItems] = useState(() => loadStored('menuItems', INITIAL_MENU_ITEMS));
  const [brands, setBrands] = useState(() => loadStored('brands', INITIAL_BRANDS));
  const [orders, setOrders] = useState(() => loadStored('orders', INITIAL_ORDERS));
  const [franchiseEnquiries, setFranchiseEnquiries] = useState(() => loadStored('franchise', INITIAL_FRANCHISE_ENQUIRIES));
  const [contactEnquiries, setContactEnquiries] = useState(() => loadStored('contact', INITIAL_CONTACT_ENQUIRIES));
  const [testimonials, setTestimonials] = useState(() => loadStored('testimonials', INITIAL_TESTIMONIALS));
  const [siteContent, setSiteContent] = useState(() => loadStored('siteContent', INITIAL_SITE_CONTENT));

  // Cart State
  const [cart, setCart] = useState(() => loadStored('cart', []));
  const [appliedCoupon, setAppliedCoupon] = useState(() => loadStored('coupon', null));

  // Admin Auth State
  const [adminUser, setAdminUser] = useState(() => loadStored('adminUser', null));

  // Toast / Global message notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('teamood_products', JSON.stringify(products));
      localStorage.setItem('teamood_categories', JSON.stringify(categories));
      localStorage.setItem('teamood_menuItems', JSON.stringify(menuItems));
      localStorage.setItem('teamood_brands', JSON.stringify(brands));
      localStorage.setItem('teamood_orders', JSON.stringify(orders));
      localStorage.setItem('teamood_franchise', JSON.stringify(franchiseEnquiries));
      localStorage.setItem('teamood_contact', JSON.stringify(contactEnquiries));
      localStorage.setItem('teamood_testimonials', JSON.stringify(testimonials));
      localStorage.setItem('teamood_siteContent', JSON.stringify(siteContent));
      localStorage.setItem('teamood_cart', JSON.stringify(cart));
      localStorage.setItem('teamood_coupon', JSON.stringify(appliedCoupon));
      localStorage.setItem('teamood_adminUser', JSON.stringify(adminUser));
    } catch (e) {
      console.warn("Storage sync error", e);
    }
  }, [products, categories, menuItems, brands, orders, franchiseEnquiries, contactEnquiries, testimonials, siteContent, cart, appliedCoupon, adminUser]);

  // --- CART FUNCTIONS ---
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}x ${product.name} to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCouponCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'TEAMOOD10' || clean === 'CHAI10') {
      setAppliedCoupon({ code: clean, discountPercent: 10, name: "10% Welcome Chai Treat" });
      showToast('Coupon TEAMOOD10 applied! (10% discount)');
      return true;
    } else if (clean === 'KOTA20' || clean === 'SPECIAL20') {
      setAppliedCoupon({ code: clean, discountPercent: 20, name: "20% Kota Grand Special" });
      showToast('Coupon KOTA20 applied! (20% discount)');
      return true;
    } else {
      showToast('Invalid coupon code. Try TEAMOOD10 or KOTA20', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Cart financial calculations
  const cartSubtotal = cart.reduce((acc, item) => {
    const price = item.product.discountPrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const cartDiscount = appliedCoupon
    ? (cartSubtotal * appliedCoupon.discountPercent) / 100
    : 0;

  const cartTax = (cartSubtotal - cartDiscount) * 0.05; // 5% GST on beverages/goods
  const cartShipping = cartSubtotal > 499 || cartSubtotal === 0 ? 0 : 49;
  const cartGrandTotal = Math.max(0, cartSubtotal - cartDiscount + cartTax + cartShipping);

  // --- ORDER MANAGEMENT ---
  const placeOnlineOrder = (customerDetails, paymentMethod) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      type: "online",
      customer: customerDetails,
      items: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.discountPrice || item.product.price
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      tax: cartTax,
      shipping: cartShipping,
      total: cartGrandTotal,
      paymentMethod: `${paymentMethod} (Simulated)`,
      paymentStatus: "Paid",
      orderStatus: "Confirmed"
    };

    // Decrement stock for purchased products
    setProducts(prevProducts =>
      prevProducts.map(p => {
        const orderedItem = cart.find(ci => ci.product.id === p.id);
        if (orderedItem) {
          const newStock = Math.max(0, p.stock - orderedItem.quantity);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // --- POS BILLING SYSTEM ---
  const createPosBill = (billData) => {
    const newBill = {
      id: `POS-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      type: "pos",
      customer: {
        name: billData.customerName || "Walk-in Guest",
        phone: billData.customerPhone || "N/A",
        table: billData.tableNo || "Counter"
      },
      items: billData.items,
      subtotal: billData.subtotal,
      discount: billData.discount || 0,
      tax: billData.tax || 0,
      total: billData.total,
      paymentMethod: billData.paymentMethod || "Cash",
      paymentStatus: "Paid",
      orderStatus: "Delivered"
    };

    // If any items correspond to packaged products, adjust inventory
    setProducts(prev =>
      prev.map(p => {
        const itemSold = billData.items.find(i => i.id === p.id || i.name === p.name);
        if (itemSold) {
          return { ...p, stock: Math.max(0, p.stock - itemSold.quantity) };
        }
        return p;
      })
    );

    setOrders(prev => [newBill, ...prev]);
    showToast(`Bill #${newBill.id} created successfully! Total: ₹${newBill.total.toFixed(2)}`);
    return newBill;
  };

  // --- PRODUCT CRUD ---
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
      slug: (productData.name || 'product').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      rating: 5.0,
      reviewsCount: 1,
      stock: Number(productData.stock) || 20,
      minStock: Number(productData.minStock) || 5,
      price: Number(productData.price) || 0,
      discountPrice: productData.discountPrice ? Number(productData.discountPrice) : null,
      published: productData.published !== undefined ? productData.published : true
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" created!`);
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('Product updated successfully!');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted', 'info');
  };

  // --- MENU CRUD & AI SCANNER SYNC ---
  const addMenuItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: `menu-${Date.now()}`,
      price: Number(itemData.price) || 0,
      status: itemData.status || "Active",
      isVeg: itemData.isVeg !== undefined ? itemData.isVeg : true
    };
    setMenuItems(prev => [...prev, newItem]);
    showToast(`Menu item "${newItem.name}" added!`);
    return newItem;
  };

  const updateMenuItem = (id, updatedFields) => {
    setMenuItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    showToast('Menu item updated!');
  };

  const deleteMenuItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    showToast('Menu item removed', 'info');
  };

  const bulkAddMenuItems = (extractedItems) => {
    const formatted = extractedItems.map(item => ({
      ...item,
      id: `menu-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      price: Number(item.price) || 0,
      status: "Active",
      isVeg: item.isVeg !== undefined ? item.isVeg : true
    }));
    setMenuItems(prev => [...prev, ...formatted]);
    showToast(`Successfully imported ${formatted.length} items from AI scan!`);
  };

  // --- CATEGORIES CRUD ---
  const addCategory = (catData) => {
    const newCat = {
      ...catData,
      id: `cat-${Date.now()}`,
      count: 0
    };
    setCategories(prev => [...prev, newCat]);
    showToast(`Category "${newCat.name}" created!`);
  };

  const updateCategory = (id, updated) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updated } : c))
    );
    showToast('Category updated!');
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    showToast('Category deleted', 'info');
  };

  // --- FRANCHISE ENQUIRY CRUD ---
  const submitFranchiseEnquiry = (enquiryData) => {
    const newEnquiry = {
      ...enquiryData,
      id: `FRN-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString(),
      status: "New",
      notes: "Enquiry submitted via public website franchise form.",
      assignedTo: "Unassigned"
    };
    setFranchiseEnquiries(prev => [newEnquiry, ...prev]);
    showToast('Franchise enquiry received! Our team will contact you shortly.');
    return newEnquiry;
  };

  const updateFranchiseStatus = (id, status, notes = null, assignedTo = null) => {
    setFranchiseEnquiries(prev =>
      prev.map(enq => {
        if (enq.id === id) {
          return {
            ...enq,
            status,
            notes: notes !== null ? notes : enq.notes,
            assignedTo: assignedTo !== null ? assignedTo : enq.assignedTo
          };
        }
        return enq;
      })
    );
    showToast('Franchise enquiry updated!');
  };

  const deleteFranchiseEnquiry = (id) => {
    setFranchiseEnquiries(prev => prev.filter(enq => enq.id !== id));
    showToast('Enquiry removed', 'info');
  };

  // --- CONTACT ENQUIRIES CRUD ---
  const submitContactEnquiry = (data) => {
    const newContact = {
      ...data,
      id: `CNT-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString(),
      status: "New",
      notes: "Submitted through website contact form."
    };
    setContactEnquiries(prev => [newContact, ...prev]);
    showToast('Thank you! Your message has been sent to Teamood Cafe.');
    return newContact;
  };

  const updateContactStatus = (id, status, notes = null) => {
    setContactEnquiries(prev =>
      prev.map(item => (item.id === id ? { ...item, status, notes: notes !== null ? notes : item.notes } : item))
    );
    showToast('Message status updated!');
  };

  const deleteContactEnquiry = (id) => {
    setContactEnquiries(prev => prev.filter(item => item.id !== id));
    showToast('Message deleted', 'info');
  };

  // --- TESTIMONIALS CRUD ---
  const addTestimonial = (testData) => {
    const newT = {
      ...testData,
      id: `t-${Date.now()}`,
      date: "Just now"
    };
    setTestimonials(prev => [newT, ...prev]);
    showToast('Testimonial added!');
  };

  const deleteTestimonial = (id) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    showToast('Testimonial removed', 'info');
  };

  // --- SITE CONTENT CMS ---
  const updateSiteSection = (sectionKey, newContent) => {
    setSiteContent(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        ...newContent
      }
    }));
    showToast('Website content updated live!');
  };

  // --- AUTH DEMO ---
  const loginAdmin = (email, password) => {
    // Demo login helper
    if (email && password) {
      const user = {
        name: "Cafe Manager (Kota)",
        email: email,
        role: "Super Admin",
        store: "Kota Flagship Lounge"
      };
      setAdminUser(user);
      showToast('Welcome back, Admin! Access granted.');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    showToast('Logged out successfully', 'info');
  };

  // Adjust stock manually
  const adjustStock = (productId, amount) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const updatedStock = Math.max(0, p.stock + amount);
          return { ...p, stock: updatedStock };
        }
        return p;
      })
    );
    showToast(`Inventory updated for product.`);
  };

  return (
    <AppContext.Provider
      value={{
        // Products
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        adjustStock,

        // Categories
        categories,
        addCategory,
        updateCategory,
        deleteCategory,

        // Menu
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        bulkAddMenuItems,

        // Brands
        brands,
        setBrands,

        // Orders & POS
        orders,
        placeOnlineOrder,
        createPosBill,

        // Enquiries
        franchiseEnquiries,
        submitFranchiseEnquiry,
        updateFranchiseStatus,
        deleteFranchiseEnquiry,

        contactEnquiries,
        submitContactEnquiry,
        updateContactStatus,
        deleteContactEnquiry,

        // Testimonials
        testimonials,
        addTestimonial,
        deleteTestimonial,

        // Site Content
        siteContent,
        updateSiteSection,

        // Cart
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartTax,
        cartShipping,
        cartGrandTotal,

        // Auth
        adminUser,
        loginAdmin,
        logoutAdmin,

        // Toast
        toast,
        showToast
      }}
    >
      {children}
      {/* Global Toast Notification Component */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-elevated bg-cream-50 border border-tea-caramel/30 text-tea-dark transition-all transform animate-bounce">
          <span className={`w-3 h-3 rounded-full ${toast.type === 'error' ? 'bg-red-500' : toast.type === 'info' ? 'bg-blue-500' : 'bg-emerald-600'}`}></span>
          <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
