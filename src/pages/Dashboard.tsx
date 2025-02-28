import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { User, Settings, ShoppingBag, Heart, LogOut, Upload } from 'lucide-react';

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
              <button 
                className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                <ShoppingBag size={20} />
                <span>My Products</span>
              </button>
            )}
            
            <button 
              className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              <Heart size={20} />
              <span>Favorites</span>
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
                    Edit Profile
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
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      placeholder="Tell us about yourself"
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
                  
                  <div className="form-actions">
                    <Button type="secondary" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                    <Button type="primary" disabled={loading}>
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="info-group">
                    <h3>Full Name</h3>
                    <p>{user.name}</p>
                  </div>
                  
                  <div className="info-group">
                    <h3>Email</h3>
                    <p>{user.email}</p>
                  </div>
                  
                  <div className="info-group">
                    <h3>Bio</h3>
                    <p>{user.bio || 'No bio added yet.'}</p>
                  </div>
                  
                  <div className="info-group">
                    <h3>Location</h3>
                    <p>{user.location || 'No location added yet.'}</p>
                  </div>
                  
                  {user.isArtisan && (
                    <div className="info-group">
                      <h3>Specialty</h3>
                      <p>{user.specialty || 'No specialty added yet.'}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'products' && user.isArtisan && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>My Products</h2>
                <Button type="primary">Add New Product</Button>
              </div>
              
              <div className="empty-state">
                <ShoppingBag size={48} />
                <h3>No products yet</h3>
                <p>Start adding your handcrafted products to showcase to customers.</p>
                <Button type="secondary">Add Your First Product</Button>
              </div>
            </div>
          )}
          
          {activeTab === 'favorites' && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>My Favorites</h2>
              </div>
              
              <div className="empty-state">
                <Heart size={48} />
                <h3>No favorites yet</h3>
                <p>Browse our collection and add items to your favorites.</p>
                <Button type="secondary">Explore Products</Button>
              </div>
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
                  <Button type="secondary">Notification Settings</Button>
                </div>
                
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