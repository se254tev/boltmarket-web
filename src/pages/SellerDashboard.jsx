import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { listingsAPI, sellersAPI } from '../services/supabase';

/**
 * SellerDashboard Component
 * Seller dashboard for managing listings and creating new ones
 */
function SellerDashboard() {
  const [listings, setListings] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'Fashion',
    image: '',
    description: '',
  });

  const [filterStatus, setFilterStatus] = useState('all');
  const [seller, setSeller] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const { data: listingsResp } = await listingsAPI.getMyListings();
        setListings(listingsResp?.data || listingsResp || []);

        const { data: sellerResp } = await sellersAPI.getCurrentProfile();
        setSeller(sellerResp?.data || sellerResp || null);
      } catch (err) {
        console.error('Seller dashboard load error', err);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const filteredListings = filterStatus === 'all' 
    ? listings 
    : listings.filter(l => l.status === filterStatus);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateListing = async () => {
    if (!formData.title || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const { data: created } = await listingsAPI.createListing(formData);
      const createdItem = created?.data || created;
      setListings([createdItem, ...listings]);
    } catch (err) {
      console.error('Create listing failed', err);
      alert('Failed to create listing');
      return;
    }
    setFormData({ title: '', price: '', category: 'Fashion', image: '', description: '' });
    setShowCreateModal(false);
  };

  const handleEditListing = (id) => {
    const listing = listings.find(l => l.id === id);
    setFormData({
      title: listing.title,
      price: listing.price,
      category: listing.category,
      image: listing.image,
      description: '',
    });
    setEditingId(id);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const { data: updated } = await listingsAPI.updateListing(editingId, formData);
      const updatedItem = updated?.data || updated;
      setListings(listings.map(l => l.id === editingId ? updatedItem : l));
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update listing');
      return;
    }
    setFormData({ title: '', price: '', category: 'Fashion', image: '', description: '' });
    setEditingId(null);
    setShowEditModal(false);
  };

  const handleDeleteListing = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await listingsAPI.deleteListing(id);
        setListings(listings.filter(l => l.id !== id));
      } catch (err) {
        console.error('Delete failed', err);
        alert('Failed to delete listing');
      }
    }
  };

  const stats = [
    { label: 'Active Listings', value: listings.filter(l => l.status === 'active').length, icon: '📦' },
    { label: 'Total Views', value: listings.reduce((sum, l) => sum + (l.views || 0), 0), icon: '👁' },
    { label: 'Favorites', value: listings.reduce((sum, l) => sum + (l.favorites || 0), 0), icon: '❤️' },
    { label: 'Items Sold', value: seller?.itemsSold || 0, icon: '✓' },
  ];

  return (
    <div className="min-h-screen bg-dark-50 py-8">
      <div className="container-safe">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <h1 className="text-heading-2 mb-2">Seller Dashboard</h1>
              <p className="text-body-lg text-dark-600">Welcome back, {seller?.name}!</p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Listing
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="card card-base">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <p className="text-dark-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 border-b border-dark-200">
          {['all', 'active', 'sold'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-3 border-b-2 transition-colors font-medium capitalize ${
                filterStatus === status
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-dark-600 hover:text-dark-900'
              }`}
            >
              {status === 'all' ? 'All Listings' : status === 'active' ? 'Active' : 'Sold'}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="card overflow-hidden">
                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-dark-200">
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    listing.status === 'active' ? 'bg-emerald-500' : 'bg-dark-600'
                  }`}>
                    {listing.status.toUpperCase()}
                  </div>
                </div>

                {/* Content */}
                <div className="card-base">
                  <h3 className="font-semibold text-dark-900 mb-2 truncate-lines-2">{listing.title}</h3>
                  
                  <div className="flex justify-between items-end mb-4 pb-4 border-b border-dark-100">
                    <div>
                      <p className="text-xs text-dark-600 mb-1">Price</p>
                      <p className="text-2xl font-bold text-primary-600">${listing.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-dark-600 mb-1">Created</p>
                      <p className="text-sm font-medium text-dark-900">{listing.created}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-dark-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-dark-600 mb-1">Views</p>
                      <p className="text-lg font-bold text-dark-900">{listing.views}</p>
                    </div>
                    <div className="bg-dark-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-dark-600 mb-1">Favorites</p>
                      <p className="text-lg font-bold text-accent-500">{listing.favorites}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditListing(listing.id)}
                      className="btn btn-secondary flex-1 btn-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteListing(listing.id)}
                      className="btn bg-red-600 text-white hover:bg-red-700 flex-1 btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card card-base text-center py-12">
            <svg className="w-16 h-16 text-dark-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8 4m-8-4v10" />
            </svg>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">No listings yet</h3>
            <p className="text-dark-600 mb-6">Create your first listing to get started</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary mx-auto"
            >
              Create Listing
            </button>
          </div>
        )}
      </div>

      {/* Create/Edit Listing Modal */}
      <Modal
        isOpen={showCreateModal || showEditModal}
        onClose={() => {
          setShowCreateModal(false);
          setShowEditModal(false);
          setFormData({ title: '', price: '', category: 'Fashion', image: '', description: '' });
        }}
        title={editingId ? 'Edit Listing' : 'Create New Listing'}
        confirmText={editingId ? 'Save Changes' : 'Create Listing'}
        onConfirm={editingId ? handleSaveEdit : handleCreateListing}
      >
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Item Title *</label>
            <input 
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Vintage Leather Jacket"
              className="input"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Category</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="input"
            >
              <option>Fashion</option>
              <option>Electronics</option>
              <option>Home</option>
              <option>Sports</option>
              <option>Garden</option>
              <option>Books</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Price ($) *</label>
            <input 
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="99.99"
              step="0.01"
              className="input"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Image URL</label>
            <input 
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://..."
              className="input"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your item..."
              rows="3"
              className="input"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SellerDashboard;
