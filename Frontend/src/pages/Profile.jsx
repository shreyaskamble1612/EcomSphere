import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { User, Mail, Calendar, Shield, Bell, Lock, Eye, EyeOff, Check, X } from 'lucide-react';

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  // Email Notifications Settings
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    securityAlerts: true,
  });

  // Privacy Settings
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    dataCollection: false,
    thirdPartySharing: false,
    analytics: true,
  });

  // Password Change
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  // Initialize settings when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
      
      if (user.notifications) {
        setNotifications(user.notifications);
      }
      
      if (user.privacy) {
        setPrivacy(user.privacy);
      }
    }
  }, [user]);

  // Test authentication function
  const testAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Testing auth with token:', token);
      
      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      console.log('Auth test response:', data);
      
      if (response.ok) {
        alert('Authentication working!');
      } else {
        // Handle expired token
        if (data.expired || response.status === 401) {
          alert('Your session has expired. Please login again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login'; // Redirect to login
          return;
        }
        alert(`Auth failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Auth test error:', error);
      alert(`Auth test error: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        // Update the user context with new data
        const updatedUser = { ...user, ...data.user };
        login(updatedUser); // Update the AuthContext
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Update localStorage
        
        // Update form data to reflect the saved changes
        setFormData({
          name: updatedUser.name,
          email: updatedUser.email,
        });
        
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  // Notification Settings Handlers
  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const saveNotificationSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Debug log
      console.log('Notifications to save:', notifications); // Debug log
      
      const response = await fetch('http://localhost:5000/api/auth/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ notifications })
      });

      console.log('Response status:', response.status); // Debug log
      const data = await response.json();
      console.log('Response data:', data); // Debug log
      
      if (response.ok && data.success) {
        alert('Notification settings saved successfully!');
      } else {
        console.error('Failed to save notification settings:', data);
        
        // Handle expired token
        if (data.expired || response.status === 401) {
          alert('Your session has expired. Please login again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login'; // Redirect to login
          return;
        }
        
        alert(`Failed to save notification settings: ${data.message || `HTTP ${response.status}`}`);
      }
    } catch (error) {
      console.error('Error saving notification settings:', error);
      alert(`Error saving notification settings: ${error.message}`);
    }
  };

  // Privacy Settings Handlers
  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const savePrivacySettings = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Debug log
      console.log('Privacy settings to save:', privacy); // Debug log
      
      const response = await fetch('http://localhost:5000/api/auth/privacy', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ privacy })
      });

      console.log('Response status:', response.status); // Debug log
      const data = await response.json();
      console.log('Response data:', data); // Debug log
      
      if (response.ok && data.success) {
        alert('Privacy settings saved successfully!');
      } else {
        console.error('Failed to save privacy settings:', data);
        
        // Handle expired token
        if (data.expired || response.status === 401) {
          alert('Your session has expired. Please login again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login'; // Redirect to login
          return;
        }
        
        alert(`Failed to save privacy settings: ${data.message || `HTTP ${response.status}`}`);
      }
    } catch (error) {
      console.error('Error saving privacy settings:', error);
      alert(`Error saving privacy settings: ${error.message}`);
    }
  };

  // Password Change Handlers
  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific error when user starts typing
    if (passwordErrors[field]) {
      setPasswordErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePassword = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (passwordData.currentPassword === passwordData.newPassword) {
      errors.newPassword = 'New password must be different from current password';
    }
    
    return errors;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const errors = validatePassword();
    
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Password changed successfully!');
        // Reset form
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setShowPasswordChange(false);
        setPasswordErrors({});
      } else {
        // Handle specific error messages from backend
        if (data.message === 'Current password is incorrect') {
          setPasswordErrors({ currentPassword: 'Current password is incorrect' });
        } else {
          alert(data.message || 'Failed to change password');
        }
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Please log in to view your profile.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          <div className="p-6">
            {/* Test Auth Button (temporary) */}
            <div className="mb-4">
              <Button onClick={testAuth} variant="outline" size="sm">
                Test Authentication
              </Button>
            </div>

            {/* Profile Avatar & Basic Info */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{user.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-blue-600 font-medium">
                    {user.role === 'admin' ? 'Administrator' : 'Customer'}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>

                {/* Account Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Shield className="w-4 h-4 inline mr-2" />
                    Account Type
                  </label>
                  <Input
                    type="text"
                    value={user.role === 'admin' ? 'Administrator' : 'Customer'}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                {/* Member Since */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Member Since
                  </label>
                  <Input
                    type="text"
                    value={new Date().getFullYear()} // You can replace this with actual join date
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-3">
                  <Button type="submit">
                    Save Changes
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
          </div>
          <div className="p-6">
            {/* Email Notifications */}
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Manage your email notification preferences</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    onClick={() => setShowNotificationSettings(!showNotificationSettings)}
                  >
                    {showNotificationSettings ? 'Hide' : 'Configure'}
                  </Button>
                </div>
                
                {showNotificationSettings && (
                  <div className="mt-4 space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Order Updates</p>
                          <p className="text-xs text-gray-500">Get notified about order status changes</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('orderUpdates')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.orderUpdates ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.orderUpdates ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Promotions</p>
                          <p className="text-xs text-gray-500">Receive promotional offers and discounts</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('promotions')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.promotions ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.promotions ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Newsletter</p>
                          <p className="text-xs text-gray-500">Stay updated with our latest news</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('newsletter')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.newsletter ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.newsletter ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Security Alerts</p>
                          <p className="text-xs text-gray-500">Important account security notifications</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('securityAlerts')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.securityAlerts ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.securityAlerts ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button
                        onClick={saveNotificationSettings}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Privacy Settings */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-gray-500" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Privacy Settings</h3>
                      <p className="text-sm text-gray-500">Control your data and privacy preferences</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    onClick={() => setShowPrivacySettings(!showPrivacySettings)}
                  >
                    {showPrivacySettings ? 'Hide' : 'Manage'}
                  </Button>
                </div>
                
                {showPrivacySettings && (
                  <div className="mt-4 space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-gray-900">Profile Visibility</p>
                        </div>
                        <select
                          value={privacy.profileVisibility}
                          onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="public">Public</option>
                          <option value="friends">Friends Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Data Collection</p>
                          <p className="text-xs text-gray-500">Allow us to collect usage data to improve your experience</p>
                        </div>
                        <button
                          onClick={() => handlePrivacyChange('dataCollection', !privacy.dataCollection)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            privacy.dataCollection ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              privacy.dataCollection ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Third-party Sharing</p>
                          <p className="text-xs text-gray-500">Allow sharing data with trusted partners</p>
                        </div>
                        <button
                          onClick={() => handlePrivacyChange('thirdPartySharing', !privacy.thirdPartySharing)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            privacy.thirdPartySharing ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              privacy.thirdPartySharing ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Analytics</p>
                          <p className="text-xs text-gray-500">Help us improve by sharing anonymous analytics</p>
                        </div>
                        <button
                          onClick={() => handlePrivacyChange('analytics', !privacy.analytics)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            privacy.analytics ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              privacy.analytics ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button
                        onClick={savePrivacySettings}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Save Settings
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Password Change */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-gray-500" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Password</h3>
                      <p className="text-sm text-gray-500">Change your account password</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    onClick={() => setShowPasswordChange(!showPasswordChange)}
                  >
                    {showPasswordChange ? 'Cancel' : 'Change'}
                  </Button>
                </div>
                
                {showPasswordChange && (
                  <div className="mt-4">
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <div className="relative">
                          <Input
                            type={showPasswords.currentPassword ? 'text' : 'password'}
                            value={passwordData.currentPassword}
                            onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                            className={`pr-10 ${passwordErrors.currentPassword ? 'border-red-500' : ''}`}
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility('currentPassword')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPasswords.currentPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                        {passwordErrors.currentPassword && (
                          <p className="text-sm text-red-600 mt-1">{passwordErrors.currentPassword}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <div className="relative">
                          <Input
                            type={showPasswords.newPassword ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                            className={`pr-10 ${passwordErrors.newPassword ? 'border-red-500' : ''}`}
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility('newPassword')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPasswords.newPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                        {passwordErrors.newPassword && (
                          <p className="text-sm text-red-600 mt-1">{passwordErrors.newPassword}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <Input
                            type={showPasswords.confirmPassword ? 'text' : 'password'}
                            value={passwordData.confirmPassword}
                            onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                            className={`pr-10 ${passwordErrors.confirmPassword ? 'border-red-500' : ''}`}
                            placeholder="Confirm new password"
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility('confirmPassword')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPasswords.confirmPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                        {passwordErrors.confirmPassword && (
                          <p className="text-sm text-red-600 mt-1">{passwordErrors.confirmPassword}</p>
                        )}
                      </div>
                      
                      <div className="flex justify-end space-x-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowPasswordChange(false);
                            setPasswordData({
                              currentPassword: '',
                              newPassword: '',
                              confirmPassword: '',
                            });
                            setPasswordErrors({});
                          }}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Update Password
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;