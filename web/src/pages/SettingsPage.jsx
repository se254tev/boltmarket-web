import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { paymentMethodsAPI, profilesAPI } from '../services/supabase';

function PaymentMethodForm({ initial = {}, onSave, onCancel }) {
  const [method, setMethod] = useState(initial.method || 'bank');
  const [payload, setPayload] = useState(initial.payload || {});

  useEffect(() => setMethod(initial.method || 'bank'), [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (method === 'bank' && (!payload.accountNumber || !payload.bankName)) {
      alert('Please fill bank name and account number');
      return;
    }
    onSave({ method, payload });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-dark-900 mb-2">Method</label>
        <select value={method} onChange={e => setMethod(e.target.value)} className="input">
          <option value="bank">Bank Account</option>
          <option value="till">Till Number</option>
          <option value="pochi">Pochi la Biashara</option>
          <option value="mpesa">M-PESA Send Money</option>
        </select>
      </div>

      {method === 'bank' && (
        <>
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Bank Name</label>
            <input name="bankName" value={payload.bankName || ''} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Account Number</label>
            <input name="accountNumber" value={payload.accountNumber || ''} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Account Holder</label>
            <input name="accountHolder" value={payload.accountHolder || ''} onChange={handleChange} className="input" />
          </div>
        </>
      )}

      {method === 'till' && (
        <>
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Till Number</label>
            <input name="tillNumber" value={payload.tillNumber || ''} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Business Name</label>
            <input name="businessName" value={payload.businessName || ''} onChange={handleChange} className="input" />
          </div>
        </>
      )}

      {method === 'pochi' && (
        <>
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Pochi Number</label>
            <input name="pochiNumber" value={payload.pochiNumber || ''} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Owner Name</label>
            <input name="ownerName" value={payload.ownerName || ''} onChange={handleChange} className="input" />
          </div>
        </>
      )}

      {method === 'mpesa' && (
        <>
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">M-PESA Number</label>
            <input name="mpesaNumber" value={payload.mpesaNumber || ''} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-900 mb-2">Account Name</label>
            <input name="accountName" value={payload.accountName || ''} onChange={handleChange} className="input" />
          </div>
        </>
      )}

      <div className="flex gap-2">
        <button onClick={handleSubmit} className="btn btn-primary">Save</button>
        <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [methods, setMethods] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [seller, setSeller] = useState(null);

  const load = async () => {
    try {
      const { data: profile } = await profilesAPI.getProfile('user-demo-123');
      setSeller(profile?.data || profile || null);
      const { data } = await paymentMethodsAPI.getPaymentMethods('user-demo-123');
      setMethods(data?.data || data || []);
    } catch (err) {
      console.error('Load settings error', err);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (payload) => {
    try {
      if (editing) {
        await paymentMethodsAPI.updatePaymentMethod(editing.id, { method: payload.method, payload: payload.payload });
      } else {
        await paymentMethodsAPI.addPaymentMethod({ user_id: 'user-demo-123', method: payload.method, payload: payload.payload });
      }
      setShowForm(false);
      setEditing(null);
      load();
    } catch (err) {
      console.error('Save payment method failed', err);
      alert('Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this payment method?')) return;
    await paymentMethodsAPI.deletePaymentMethod(id);
    load();
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container-safe">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-heading-2">Settings</h1>
          <div>
            <button onClick={() => { setShowForm(true); setEditing(null); }} className="btn btn-primary">Add Payment Method</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card card-base">
            <h3 className="font-semibold mb-3">Payment Methods</h3>
            {methods.length === 0 ? (
              <p className="text-dark-600">No payment methods saved</p>
            ) : (
              <div className="space-y-3">
                {methods.map((m) => (
                  <div key={m.id} className="p-3 border rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-medium">{m.method}</p>
                      <p className="text-sm text-dark-600">{JSON.stringify(m.payload)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditing(m); setShowForm(true); }} className="btn btn-outline btn-sm">Edit</button>
                      <button onClick={() => handleDelete(m.id)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card card-base">
            <h3 className="font-semibold mb-3">Bank Details (Profile)</h3>
            <p className="text-dark-600 mb-2">{seller?.bankAccount ? `${seller.bankAccount.bankName} • ${seller.bankAccount.accountNumber}` : 'No bank info'}</p>
          </div>
        </div>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title={editing ? 'Edit Payment Method' : 'Add Payment Method'} confirmText="Save" onConfirm={() => { /* handled in form */ }}>
        <PaymentMethodForm initial={editing || {}} onSave={handleSave} onCancel={() => { setShowForm(false); setEditing(null); }} />
      </Modal>
    </div>
  );
}
