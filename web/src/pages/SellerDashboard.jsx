import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Modal from '../components/Modal';
import {
  listingsAPI,
  sellersAPI,
  ordersAPI,
  chatAPI,
  analyticsAPI,
  payoutsAPI,
  reviewsAPI,
  moderationAPI,
} from '../services/supabase';
import supabase from '../services/supabase';

// New reusable components
import FileUploader from '../components/FileUploader';
import MessageInbox from '../components/MessageInbox';
import EarningsCard from '../components/EarningsCard';
import OrderDetailsModal from '../components/OrderDetailsModal';
import BulkUploadCSV from '../components/BulkUploadCSV';
import AnalyticsPanel from '../components/AnalyticsPanel';

/**
 * SellerDashboard Component
 * Seller dashboard for managing listings and creating new ones
 */
function SellerDashboard() {
  // Main data stores
  const [listings, setListings] = useState([]);
  const [seller, setSeller] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // UI state
  const [activeTab, setActiveTab] = useState('listings'); // listings, analytics, messages, orders, settings

  // Create / edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(getEmptyForm());

  // Orders & messages
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Analytics and earnings
  const [analytics, setAnalytics] = useState(null);
  const [payouts, setPayouts] = useState([]);
  const [reviewsMap, setReviewsMap] = useState({});

  // Load seller profile, listings, orders and analytics on mount
  useEffect(() => {
    let mounted = true;
    const loadAll = async () => {
      setIsLoading(true);
      try {
        const [{ data: listingsResp }, sellerResp, ordersResp, payoutsResp] = await Promise.all([
          listingsAPI.getMyListings(),
          sellersAPI.getCurrentProfile(),
          sellersAPI.getCurrentProfile().then(async (r) => {
            const id = r?.data?.id || null;
            if (!id) return { data: [] };
            return ordersAPI.getUserOrders(id);
          }),
          sellersAPI.getCurrentProfile().then(async (r) => {
            const id = r?.data?.id || null;
            if (!id) return { data: [] };
            return payoutsAPI.getPayoutsForSeller(id);
          }),
        ]);

        if (!mounted) return;
        setListings(listingsResp?.data || listingsResp || []);
        setSeller(sellerResp?.data || sellerResp || null);
        setOrders(ordersResp?.data || ordersResp || []);
        setPayouts(payoutsResp?.data || payoutsResp || []);
      } catch (err) {
        console.error('Seller dashboard load error', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadAll();
    return () => { mounted = false; };
  }, []);

  // Derived values
  const filteredListings = useMemo(() => listings.filter(Boolean), [listings]);

  // Generic input handler
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Create listing: handles images array, variants, delivery and scheduling
  const handleCreateListing = async ({ publish = true } = {}) => {
    // validation
    if (!formData.title || !formData.price || !formData.quantity) {
      alert('Please fill title, price and quantity');
      return;
    }
    const priceNum = parseFloat(formData.price);
    if (Number.isNaN(priceNum) || priceNum <= 0) {
      alert('Please enter a valid price');
      return;
    }

    // build payload
    const payload = {
      title: formData.title,
      price: priceNum,
      category: formData.category,
      images: formData.images || [],
      description: formData.description || '',
      delivery_fee: parseFloat(formData.delivery_fee) || 0,
      delivery_method: formData.delivery_method || 'pickup',
      delivery_time: formData.delivery_time || '',
      quantity: parseInt(formData.quantity, 10) || 0,
      variants: formData.variants || [],
      featured: !!formData.featured,
      draft: !!formData.draft || !publish,
      schedule_at: formData.schedule_at || null,
      created_at: new Date(),
      status: 'active',
    };

    try {
      const { data: created } = await listingsAPI.createListing(payload);
      const createdItem = created?.data || created;
      setListings((prev) => [createdItem, ...prev]);
      // update analytics/payouts after creation
    } catch (err) {
      console.error('Create listing failed', err);
      alert('Failed to create listing');
      return;
    }

    setFormData(getEmptyForm());
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleEditListing = (id) => {
    const listing = listings.find((l) => l.id === id);
    if (!listing) return;
    setFormData({
      title: listing.title || '',
      price: listing.price || '',
      category: listing.category || 'Fashion',
      images: listing.images || [],
      description: listing.description || '',
      delivery_fee: listing.delivery_fee || 0,
      delivery_method: listing.delivery_method || 'pickup',
      delivery_time: listing.delivery_time || '',
      quantity: listing.quantity || 0,
      variants: listing.variants || [],
      featured: !!listing.featured,
      draft: !!listing.draft,
      schedule_at: listing.schedule_at || null,
    });
    setEditingId(id);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      const payload = {
        title: formData.title,
        price: parseFloat(formData.price),
        category: formData.category,
        images: formData.images || [],
        description: formData.description,
        delivery_fee: parseFloat(formData.delivery_fee) || 0,
        delivery_method: formData.delivery_method,
        delivery_time: formData.delivery_time,
        quantity: parseInt(formData.quantity, 10) || 0,
        variants: formData.variants || [],
        featured: !!formData.featured,
        draft: !!formData.draft,
        schedule_at: formData.schedule_at || null,
      };

      const { data: updated } = await listingsAPI.updateListing(editingId, payload);
      const updatedItem = updated?.data || updated;
      setListings((prev) => prev.map((l) => (l.id === editingId ? updatedItem : l)));
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update listing');
      return;
    }

    setFormData(getEmptyForm());
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleDeleteListing = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      await listingsAPI.deleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete listing');
    }
  };

  // Copy helper
  const handleCopy = async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  // Simulated bank verification flow (can be replaced with real API)
  const handleVerifyBank = () => {
    alert('Bank verification simulated — please integrate with payments provider to complete.');
  };

  const stats = useMemo(() => [
    { label: 'Active Listings', value: listings.filter((l) => l.status === 'active').length, icon: '📦' },
    { label: 'Total Views', value: listings.reduce((sum, l) => sum + (l.views || 0), 0), icon: '👁' },
    { label: 'Favorites', value: listings.reduce((sum, l) => sum + (l.favorites || 0), 0), icon: '❤️' },
    { label: 'Items Sold', value: seller?.items_sold || 0, icon: '✓' },
  ], [listings, seller]);

  return (
    <div className="min-h-screen bg-dark-50 py-8">
      <div className="container-safe">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-heading-2 mb-2">Seller Dashboard</h1>
            <p className="text-body-lg text-dark-600">Welcome back, {seller?.full_name || seller?.name || 'seller'}!</p>
          </div>
          <div className="flex items-center gap-3">
            <BulkUploadCSV onComplete={(result) => {
              // result may contain created listings; refresh
              if (result?.createdCount) {
                listingsAPI.getMyListings().then(({ data }) => setListings(data || []));
              }
            }} />
            <button onClick={() => { setEditingId(null); setFormData(getEmptyForm()); setIsModalOpen(true); }} className="btn btn-primary">
              Create Listing
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex gap-2 items-center overflow-x-auto">
            {['listings','analytics','messages','orders','settings'].map((t) => (
              <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-md ${activeTab===t? 'bg-primary-600 text-white':'bg-dark-100 text-dark-700'}`}>
                {t.charAt(0).toUpperCase()+t.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Content by tab */}
        {activeTab === 'analytics' && (
          <AnalyticsPanel sellerId={seller?.id} listings={listings} orders={orders} />
        )}

        {activeTab === 'messages' && (
          <MessageInbox userId={seller?.id} />
        )}

        {activeTab === 'orders' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {orders.map((o) => (
                <div key={o.id} className="card card-base flex justify-between items-center">
                  <div>
                    <p className="text-sm text-dark-600">Order #{o.id}</p>
                    <p className="font-medium">{o.total_amount} {o.currency}</p>
                    <p className="text-xs text-dark-500">{new Date(o.created_at).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <select value={o.status} onChange={async (e)=>{
                      const status = e.target.value;
                      try {
                        const { data } = await ordersAPI.updateOrder(o.id, { status });
                        setOrders((prev)=> prev.map(p => p.id===o.id ? (data?.[0]||data) : p));
                        // if delivered decrement stock
                        if (status === 'delivered') {
                          // fetch items for order and decrement
                          const { data: items } = await supabase.from('order_items').select('*').eq('order_id', o.id);
                          if (items && Array.isArray(items)){
                            for (const it of items){
                              const listingId = it.listing_id;
                              const listing = listings.find(l => l.id===listingId);
                              if (listing){
                                const newQty = Math.max(0, (listing.quantity || 0) - (it.quantity || 1));
                                await listingsAPI.updateListing(listingId, { quantity: newQty });
                                setListings(prev => prev.map(l => l.id===listingId?{...l, quantity:newQty}:l));
                              }
                            }
                          }
                        }
                      } catch (err) { console.error(err); alert('Failed update order'); }
                    }} className="input">
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="delivered">Delivered</option>
                    </select>
                    <button onClick={()=> setSelectedOrder(o)} className="btn btn-outline">View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="card card-base">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <p className="text-dark-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Listings Grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <div key={listing.id} className={`card overflow-hidden ${listing.featured? 'ring-2 ring-yellow-400':''}`}>
                    <div className="relative h-40 overflow-hidden bg-dark-200">
                      <img src={(listing.images && listing.images[0]) || ''} alt={listing.title} className="w-full h-full object-cover" />
                      <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${listing.status==='active'?'bg-emerald-500':'bg-dark-600'}`}>{(listing.status||'').toUpperCase()}</div>
                    </div>
                    <div className="card-base">
                      <h3 className="font-semibold text-dark-900 mb-2 truncate-lines-2">{listing.title} {listing.quantity<=0 && (<span className="text-xs text-red-600">(Out of stock)</span>)}</h3>
                      <div className="flex justify-between items-end mb-4 pb-4 border-b border-dark-100">
                        <div>
                          <p className="text-xs text-dark-600 mb-1">Price</p>
                          <p className="text-2xl font-bold text-primary-600">{listing.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-dark-600 mb-1">Created</p>
                          <p className="text-sm font-medium text-dark-900">{new Date(listing.created_at || listing.created).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-dark-50 p-3 rounded-lg text-center">
                          <p className="text-xs text-dark-600 mb-1">Views</p>
                          <p className="text-lg font-bold text-dark-900">{listing.views||0}</p>
                        </div>
                        <div className="bg-dark-50 p-3 rounded-lg text-center">
                          <p className="text-xs text-dark-600 mb-1">Favorites</p>
                          <p className="text-lg font-bold text-accent-500">{listing.favorites||0}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditListing(listing.id)} className="btn btn-secondary flex-1 btn-sm">Edit</button>
                        <button onClick={() => handleDeleteListing(listing.id)} className="btn bg-red-600 text-white hover:bg-red-700 flex-1 btn-sm">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card card-base text-center py-12">
                <h3 className="text-xl font-semibold text-dark-900 mb-2">No listings yet</h3>
                <p className="text-dark-600 mb-6">Create your first listing to get started</p>
                <button onClick={() => { setIsModalOpen(true); setEditingId(null); }} className="btn btn-primary mx-auto">Create Listing</button>
              </div>
            )}
          </div>
        )}

        {/* Settings: verification, payout methods, theme toggle */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card card-base">
              <h3 className="font-semibold mb-2">Seller Verification</h3>
              <p className="text-sm text-dark-600 mb-3">Current status: <strong>{seller?.verification_level || 'unverified'}</strong></p>
              <label className="block mb-2">Upload ID</label>
              <FileUploader accept="image/*" single onComplete={async (urls) => {
                try {
                  // save file url as seller id submission
                  await sellersAPI.updateProfile(seller.id, { id_document: urls[0], verification_level: 'id_submitted' });
                  const { data } = await sellersAPI.getCurrentProfile();
                  setSeller(data?.data||data);
                } catch (err) { console.error(err); alert('Upload failed'); }
              }} />
            </div>
            <div className="card card-base">
              <h3 className="font-semibold mb-2">Payouts & Earnings</h3>
              <EarningsCard sellerId={seller?.id} payouts={payouts} onWithdraw={async ()=>{
                alert('Withdrawal request sent (placeholder)');
              }} />
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Listing Modal */}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setFormData(getEmptyForm()); setEditingId(null); }} title={editingId? 'Edit Listing':'Create New Listing'} confirmText={editingId? 'Save Changes':'Publish'} onConfirm={editingId? handleSaveEdit: ()=>handleCreateListing({publish:true})}>
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Item Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g., Vintage Leather Jacket" className="input" />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Images</label>
            <FileUploader accept="image/*" multiple onComplete={(urls)=> setFormData(f=>({...f, images: urls}))} existing={formData.images} />
          </div>

          {/* Category and Price row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">Category</label>
              <input name="category" value={formData.category} onChange={handleInputChange} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">Price (KES) *</label>
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">Quantity *</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} className="input" />
            </div>
          </div>

          {/* Delivery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">Delivery Fee (KES)</label>
              <input type="number" name="delivery_fee" value={formData.delivery_fee} onChange={handleInputChange} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">Delivery Method</label>
              <select name="delivery_method" value={formData.delivery_method} onChange={handleInputChange} className="input">
                <option value="pickup">Pickup</option>
                <option value="rider">Rider</option>
                <option value="parcel">Parcel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">Delivery Time</label>
              <input name="delivery_time" value={formData.delivery_time} onChange={handleInputChange} className="input" />
            </div>
          </div>

          {/* Variants */}
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Variants</label>
            <VariantEditor variants={formData.variants} onChange={(v)=> setFormData(f=>({...f, variants:v}))} />
          </div>

          {/* Description and settings */}
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="input" />
          </div>

          <div className="flex gap-3 items-center">
            <label className="flex items-center gap-2"><input type="checkbox" checked={formData.featured} onChange={(e)=> setFormData(f=>({...f, featured:e.target.checked}))} /> Feature this listing</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={formData.draft} onChange={(e)=> setFormData(f=>({...f, draft:e.target.checked}))} /> Save as draft</label>
            <div className="flex-1">
              <label className="block text-sm text-dark-600">Schedule at</label>
              <input type="datetime-local" name="schedule_at" value={formData.schedule_at||''} onChange={handleInputChange} className="input" />
            </div>
            <button type="button" className="btn btn-secondary" onClick={async ()=>{
              try {
                const resp = await fetch('/api/ai/generate-description', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title: formData.title }) });
                if (!resp.ok) throw new Error('AI generation failed');
                const body = await resp.json();
                setFormData(f=>({...f, description: body.description || f.description, tags: body.tags || f.tags, seo_keywords: body.seo_keywords || f.seo_keywords}));
              } catch (err) { console.error(err); alert('AI generate failed'); }
            }}>Generate Description</button>
          </div>
        </div>
      </Modal>

      <OrderDetailsModal order={selectedOrder} onClose={()=> setSelectedOrder(null)} />
    </div>
  );
}

export default SellerDashboard;
