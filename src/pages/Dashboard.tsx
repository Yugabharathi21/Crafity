import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { User, Settings, ShoppingBag, Heart, LogOut, Upload, CreditCard, Clock, MessageSquare, Star, Package, Truck, Calendar, MapPin, Mail, Phone, Edit, Save, X, Plus, Trash, DollarSign, Eye, Bell, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout, updateProfile, uploadProfileImage, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || '');
  const [specialty, setSpecialty] = useState(user?.specialty || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  
  // Mock data for dashboard
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2023-001',
      date: '2023-05-15',
      total: 129.99,
      status: 'Delivered',
      items: [
        { name: 'Handcrafted Wooden Bowl', price: 89.99, quantity: 1 },
        { name: 'Ceramic Mug', price: 20.00, quantity: 2 }
      ]
    },
    {
      id: 'ORD-2023-002',
      date: '2023-06-22',
      total: 159.99,
      status: 'Processing',
      items: [
        { name: 'Handwoven Wool Blanket', price: 159.99, quantity: 1 }
      ]
    }
  ]);
  
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Hand-carved Wooden Bowl',
      artisan: 'Thomas Woodcraft',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1635983495219-8256f1e4a663?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      category: 'Woodwork'
    },
    {
      id: 2,
      name: 'Ceramic Vase Set',
      artisan: 'Elena Pottery',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f5a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      category: 'Pottery'
    },
    {
      id: 3,
      name: 'Handwoven Wool Blanket',
      artisan: 'Mountain Textiles',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      category: 'Textiles'
    }
  ]);
  
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Handcrafted Ceramic Planter',
      price: 45.99,
      inventory: 12,
      sold: 28,
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      category: 'Pottery',
      featured: true
    },
    {
      id: 2,
      name: 'Hand-carved Wooden Spoons (Set of 3)',
      price: 35.99,
      inventory: 8,
      sold: 42,
      image: 'https://images.unsplash.com/photo-1584653059760-3c18fdceb248?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      category: 'Woodwork',
      featured: false
    },
    {
      id: 3,
      name: 'Handwoven Table Runner',
      price: 65.99,
      inventory: 5,
      sold: 17,
      image: 'https://images.unsplash.com/photo-1584652868274-8b617acb692d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      category: 'Textiles',
      featured: true
    }
  ]);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'Sarah Johnson',
      subject: 'Question about wooden bowl',
      message: 'Hi there, I was wondering if the wooden bowl is food safe? Thanks!',
      date: '2023-06-28',
      read: true
    },
    {
      id: 2,
      from: 'Michael Chen',
      subject: 'Custom order inquiry',
      message: "Hello, I'm interested in commissioning a custom piece. Could we discuss the details?",
      date: '2023-07-02',
      read: false
    },
    {
      id: 3,
      from: 'Craftify Support',
      subject: 'Your recent order',
      message: 'Thank you for your recent order! We wanted to check if everything arrived as expected.',
      date: '2023-07-05',
      read: false
    }
  ]);
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'Your order has been delivered',
      date: '2023-07-01',
      type: 'order'
    },
    {
      id: 2,
      message: 'New message from Sarah Johnson',
      date: '2023-06-28',
      type: 'message'
    },
    {
      id: 3,
      message: 'Your product "Handcrafted Ceramic Planter" is running low on inventory (5 left)',
      date: '2023-06-25',
      type: 'inventory'
    },
    {
      id: 4,
      message: 'You have a new review on "Hand-carved Wooden Spoons"',
      date: '2023-06-20',
      type: 'review'
    }
  ]);
  
  const [stats, setStats] = useState({
    totalSales: 1245.87,
    totalOrders: 18,
    averageRating: 4.8,
    totalProducts: 12,
    totalViews: 1876
  });
  
  useEffect(() => {
    // This would normally fetch data from the backend
    // For now, we're using mock data
  }, []);
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      name,
      email,
      bio,
      location,
      specialty,
      profileImage
    });
    setEditMode(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadLoading(true);
      const imageUrl = await uploadProfileImage(file);
      setProfileImage(imageUrl);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploadLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };
  
  const markAsRead = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };
  
  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  if (!user) return null;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="user-info">
            <div className="user-avatar">
              {profileImage ? (
                <img src={profileImage} alt={user.name} />
              ) : (
                <div className="avatar-placeholder">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h3 className="user-name">{user.name}</h3>
            <p className="user-type">{user.isArtisan ? 'Artisan' : 'Customer'}</p>
          </div>
          
          <nav className="dashboard-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={20} />
              <span>Profile</span>
            </button>
            
            {user.isArtisan && (
              <>
                <button 
                  className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
                  onClick={() => setActiveTab('products')}
                >
                  <ShoppingBag size={20} />
                  <span>My Products</span>
                </button>
                
                <button 
                  className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  <Package size={20} />
                  <span>Orders</span>
                </button>
                
                <button 
                  className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
                  onClick={() => setActiveTab('messages')}
                >
                  <MessageSquare size={20} />
                  <span>Messages</span>
                  <span className="badge">{messages.filter(m => !m.read).length}</span>
                </button>
                
                <button 
                  className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  <Star size={20} />
                  <span>Analytics</span>
                </button>
              </>
            )}
            
            {!user.isArtisan && (
              <>
                <button 
                  className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  <Package size={20} />
                  <span>My Orders</span>
                </button>
              </>
            )}
            
            <button 
              className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              <Heart size={20} />
              <span>Favorites</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={20} />
              <span>Notifications</span>
              <span className="badge">{notifications.length}</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
            
            <button className="nav-item logout" onClick={logout}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
        
        <div className="dashboard-content">
          {activeTab === 'profile' && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>My Profile</h2>
                {!editMode && (
                  <Button 
                    type="secondary" 
                    className="edit-button"
                    onClick={() => setEditMode(true)}
                  >
                    <Edit size={16} />
                    <span>Edit Profile</span>
                  </Button>
                )}
              </div>
              
              {editMode ? (
                <form className="profile-form" onSubmit={handleUpdateProfile}>
                  <div className="profile-image-upload">
                    <div className="current-image">
                      {profileImage ? (
                        <img src={profileImage} alt={name} />
                      ) : (
                        <div className="avatar-placeholder large">
                          {name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="upload-controls">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                      <Button 
                        type="secondary" 
                        onClick={triggerFileInput}
                        disabled={uploadLoading}
                      >
                        {uploadLoading ? 'Uploading...' : (
                          <>
                            <Upload size={16} />
                            <span>Upload Photo</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="location">Location</label>
                      <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City, State"
                      />
                    </div>
                    
                    {user.isArtisan && (
                      <div className="form-group">
                        <label htmlFor="specialty">Specialty</label>
                        <input
                          type="text"
                          id="specialty"
                          value={specialty}
                          onChange={(e) => setSpecialty(e.target.value)}
                          placeholder="e.g., Pottery, Woodworking"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      placeholder="Tell us about yourself"
                    />
                  </div>
                  
                  <h3 className="form-section-title">Address Information</h3>
                  
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label htmlFor="address">Street Address</label>
                      <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="123 Main St"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="zipCode">ZIP Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <Button type="secondary" onClick={() => setEditMode(false)}>
                      <X size={16} />
                      <span>Cancel</span>
                    </Button>
                    <Button type="primary" disabled={loading}>
                      <Save size={16} />
                      <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="profile-card">
                    <div className="profile-header">
                      <div className="profile-avatar">
                        {profileImage ? (
                          <img src={profileImage} alt={user.name} />
                        ) : (
                          <div className="avatar-placeholder large">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="profile-details">
                        <h2 className="profile-name">{user.name}</h2>
                        <p className="profile-role">{user.isArtisan ? 'Artisan' : 'Customer'}</p>
                        {user.isArtisan && user.specialty && (
                          <p className="profile-specialty">{user.specialty}</p>
                        )}
                        {user.location && (
                          <p className="profile-location">
                            <MapPin size={16} />
                            <span>{user.location}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="profile-body">
                      <div className="profile-section">
                        <h3>Contact Information</h3>
                        <div className="contact-info">
                          <p>
                            <Mail size={16} />
                            <span>{user.email}</span>
                          </p>
                          {phone && (
                            <p>
                              <Phone size={16} />
                              <span>{phone}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="profile-section">
                        <h3>Bio</h3>
                        <p>{user.bio || 'No bio added yet.'}</p>
                      </div>
                      
                      {user.isArtisan && (
                        <div className="profile-section">
                          <h3>Shop Statistics</h3>
                          <div className="stats-grid">
                            <div className="stat-item">
                              <span className="stat-value">{stats.totalProducts}</span>
                              <span className="stat-label">Products</span>
                            </div>
                            <div className="stat-item">
                              <span className="stat-value">{stats.totalOrders}</span>
                              <span className="stat-label">Orders</span>
                            </div>
                            <div className="stat-item">
                              <span className="stat-value">${stats.totalSales.toFixed(2)}</span>
                              <span className="stat-label">Sales</span>
                            </div>
                            <div className="stat-item">
                              <span className="stat-value">{stats.averageRating}</span>
                              <span className="stat-label">Rating</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'products' && user.isArtisan && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>My Products</h2>
                <Button type="primary">
                  <Plus size={16} />
                  <span>Add New Product</span>
                </Button>
              </div>
              
              {products.length > 0 ? (
                <>
                  <div className="dashboard-stats">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <ShoppingBag size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>{products.length}</h3>
                        <p>Total Products</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Package size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>{products.reduce((acc, product) => acc + product.inventory, 0)}</h3>
                        <p>Items in Stock</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Truck size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>{products.reduce((acc, product) => acc + product.sold, 0)}</h3>
                        <p>Items Sold</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="products-table-container">
                    <table className="products-table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Inventory</th>
                          <th>Sold</th>
                          <th>Featured</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id}>
                            <td className="product-cell">
                              <div className="product-info">
                                <img src={product.image} alt={product.name} className="product-thumbnail" />
                                <span>{product.name}</span>
                              </div>
                            </td>
                            <td>{product.category}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.inventory}</td>
                            <td>{product.sold}</td>
                            <td>
                              <span className={`status-badge ${product.featured ? 'featured' : 'not-featured'}`}>
                                {product.featured ? 'Featured' : 'Not Featured'}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button className="icon-button edit">
                                  <Edit size={16} />
                                </button>
                                <button className="icon-button delete">
                                  <Trash size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <ShoppingBag size={48} />
                  <h3>No products yet</h3>
                  <p>Start adding your handcrafted products to showcase to customers.</p>
                  <Button type="secondary">Add Your First Product</Button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>{user.isArtisan ? 'Customer Orders' : 'My Orders'}</h2>
              </div>
              
              {orders.length > 0 ? (
                <div className="orders-container">
                  {orders.map(order => (
                    <div className="order-card" key={order.id}>
                      <div className="order-header">
                        <div className="order-info">
                          <h3 className="order-id">{order.id}</h3>
                          <p className="order-date">
                            <Calendar size={14} />
                            <span>{new Date(order.date).toLocaleDateString()}</span>
                          </p>
                        </div>
                        <div className="order-status">
                          <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="order-items">
                        {order.items.map((item, index) => (
                          <div className="order-item" key={index}>
                            <p className="item-name">{item.name}</p>
                            <p className="item-details">
                              <span className="item-price">${item.price.toFixed(2)}</span>
                              <span className="item-quantity">x{item.quantity}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="order-footer">
                        <div className="order-total">
                          <p>Total</p>
                          <p className="total-amount">${order.total.toFixed(2)}</p>
                        </div>
                        <div className="order-actions">
                          <Button type="secondary" className="small-button">View Details</Button>
                          {user.isArtisan && order.status === 'Processing' && (
                            <Button type="primary" className="small-button">Update Status</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Package size={48} />
                  <h3>No orders yet</h3>
                  <p>{user.isArtisan 
                    ? 'You haven\'t received any orders yet. Once customers place orders, they will appear here.' 
                    : 'You haven\'t placed any orders yet. Start shopping to see your orders here.'}
                  </p>
                  {!user.isArtisan && (
                    <Button type="secondary">Browse Products</Button>
                  )}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'favorites' && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>My Favorites</h2>
              </div>
              
              {favorites.length > 0 ? (
                <div className="favorites-grid">
                  {favorites.map(item => (
                    <div className="favorite-card" key={item.id}>
                      <button 
                        className="remove-favorite" 
                        onClick={() => removeFavorite(item.id)}
                      >
                        <X size={16} />
                      </button>
                      <div className="favorite-image">
                        <img src={item.image} alt={item.name} />
                        <div className="favorite-category">{item.category}</div>
                      </div>
                      <div className="favorite-info">
                        <h3 className="favorite-name">{item.name}</h3>
                        <p className="favorite-artisan">by {item.artisan}</p>
                        <p className="favorite-price">${item.price.toFixed(2)}</p>
                        <div className="favorite-actions">
                          <Button className="favorite-btn">Add to Cart</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Heart size={48} />
                  <h3>No favorites yet</h3>
                  <p>Browse our collection and add items to your favorites.</p>
                  <Button type="secondary">Explore Products</Button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'messages' && user.isArtisan && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Messages</h2>
                <Button type="secondary">
                  <MessageSquare size={16} />
                  <span>Compose</span>
                </Button>
              </div>
              
              {messages.length > 0 ? (
                <div className="messages-container">
                  {messages.map(message => (
                    <div 
                      className={`message-card ${!message.read ? 'unread' : ''}`} 
                      key={message.id}
                    >
                      <div className="message-header">
                        <h3 className="message-subject">{message.subject}</h3>
                        <p className="message-from">From: {message.from}</p>
                        <p className="message-date">
                          <Clock size={14} />
                          <span>{new Date(message.date).toLocaleDateString()}</span>
                        </p>
                      </div>
                      <div className="message-body">
                        <p>{message.message}</p>
                      </div>
                      <div className="message-actions">
                        <Button type="secondary" className="small-button">Reply</Button>
                        {!message.read && (
                          <Button 
                            type="secondary" 
                            className="small-button"
                            onClick={() => markAsRead(message.id)}
                          >
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <MessageSquare size={48} />
                  <h3>No messages</h3>
                  <p>You don't have any messages yet.</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'analytics' && user.isArtisan && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Analytics & Performance</h2>
              </div>
              
              <div className="analytics-overview">
                <div className="stat-card large">
                  <div className="stat-icon">
                    <DollarSign size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>${stats.totalSales.toFixed(2)}</h3>
                    <p>Total Sales</p>
                  </div>
                </div>
                
                <div className="stat-card large">
                  <div className="stat-icon">
                    <Package size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.totalOrders}</h3>
                    <p>Total Orders</p>
                  </div>
                </div>
                
                <div className="stat-card large">
                  <div className="stat-icon">
                    <Star size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.averageRating}</h3>
                    <p>Average Rating</p>
                  </div>
                </div>
                
                <div className="stat-card large">
                  <div className="stat-icon">
                    <Eye size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.totalViews}</h3>
                    <p>Product Views</p>
                  </div>
                </div>
              </div>
              
              <div className="analytics-charts">
                <div className="chart-container">
                  <h3>Sales Overview</h3>
                  <div className="chart-placeholder">
                    <p>Sales chart visualization would appear here</p>
                  </div>
                </div>
                
                <div className="chart-container">
                  <h3>Top Products</h3>
                  <div className="top-products">
                    {products.sort((a, b) => b.sold - a.sold).slice(0, 3).map((product, index) => (
                      <div className="top-product-item" key={product.id}>
                        <div className="rank">#{index + 1}</div>
                        <div className="product-info">
                          <img src={product.image} alt={product.name} className="product-thumbnail" />
                          <div>
                            <h4>{product.name}</h4>
                            <p>{product.sold} sold</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Notifications</h2>
                {notifications.length > 0 && (
                  <Button type="secondary" className="small-button">
                    Mark All as Read
                  </Button>
                )}
              </div>
              
              {notifications.length > 0 ? (
                <div className="notifications-container">
                  {notifications.map(notification => (
                    <div className="notification-card" key={notification.id}>
                      <div className="notification-icon">
                        {notification.type === 'order' && <Package size={20} />}
                        {notification.type === 'message' && <MessageSquare size={20} />}
                        {notification.type === 'inventory' && <AlertTriangle size={20} />}
                        {notification.type === 'review' && <Star size={20} />}
                      </div>
                      <div className="notification-content">
                        <p className="notification-message">{notification.message}</p>
                        <p className="notification-date">
                          <Clock size={14} />
                          <span>{new Date(notification.date).toLocaleDateString()}</span>
                        </p>
                      </div>
                      <button 
                        className="dismiss-notification"
                        onClick={() => dismissNotification(notification.id)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Bell size={48} />
                  <h3>No notifications</h3>
                  <p>You're all caught up! Check back later for updates.</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Account Settings</h2>
              </div>
              
              <div className="settings-options">
                <div className="settings-group">
                  <h3>Password</h3>
                  <p>Update your password to keep your account secure.</p>
                  <Button type="secondary">Change Password</Button>
                </div>
                
                <div className="settings-group">
                  <h3>Notifications</h3>
                  <p>Manage your email notification preferences.</p>
                  <div className="notification-preferences">
                    <div className="preference-item">
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider"></span>
                      </label>
                      <div>
                        <h4>Order Updates</h4>
                        <p>Receive notifications about your orders</p>
                      </div>
                    </div>
                    <div className="preference-item">
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider"></span>
                      </label>
                      <div>
                        <h4>Messages</h4>
                        <p>Receive notifications about new messages</p>
                      </div>
                    </div>
                    <div className="preference-item">
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider"></span>
                      </label>
                      <div>
                        <h4>Marketing</h4>
                        <p>Receive promotional emails and special offers</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {user.isArtisan && (
                  <div className="settings-group">
                    <h3>Payment Information</h3>
                    <p>Manage your payment methods and payout preferences.</p>
                    <div className="payment-methods">
                      <div className="payment-method">
                        <div className="payment-icon">
                          <CreditCard size={24} />
                        </div>
                        <div className="payment-details">
                          <h4>Bank Account</h4>
                          <p>Connected: **** 1234</p>
                        </div>
                        <Button type="secondary" className="small-button">Update</Button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="settings-group danger-zone">
                  <h3>Delete Account</h3>
                  <p>Permanently delete your account and all associated data.</p>
                  <Button type="secondary" className="danger-button">Delete Account</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;