import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import supabase from '../services/supabase';

export default function OrderDetailsModal({ order, onClose = ()=>{} }){
  const [items, setItems] = useState([]);

  useEffect(()=>{
    if (!order) return setItems([]);
    let mounted = true;
    (async ()=>{
      try{
        const { data } = await supabase.from('order_items').select('*').eq('order_id', order.id);
        if (!mounted) return;
        setItems(data || []);
      }catch(err){ console.error(err); }
    })();
    return ()=> mounted = false;
  }, [order]);

  if (!order) return null;

  return (
    <Modal isOpen={!!order} onClose={onClose} title={`Order #${order.id}`} confirmText="Close" onConfirm={onClose}>
      <div>
        <p className="text-sm text-dark-600">Buyer: {order.buyer_id}</p>
        <p className="text-sm text-dark-600">Total: {order.total_amount} {order.currency}</p>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Items</h4>
          <div className="space-y-2">
            {items.map(it=> (
              <div key={it.id} className="p-2 border rounded">
                <div className="font-medium">Listing: {it.listing_id}</div>
                <div className="text-sm">Quantity: {it.quantity}</div>
                <div className="text-sm">Unit price: {it.unit_price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
