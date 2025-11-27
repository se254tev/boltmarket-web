import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Legend } from 'recharts';
import supabase from '../services/supabase';

export default function AnalyticsPanel({ sellerId, listings = [], orders = [] }){
  const [monthlyData, setMonthlyData] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(()=>{
    if (!sellerId) return;
    let mounted = true;
    (async ()=>{
      try{
        // Fetch order_items for listings owned by seller
        const listingIds = (listings||[]).map(l => l.id).filter(Boolean);
        if (listingIds.length === 0){ setMonthlyData([]); setTopItems([]); return; }

        const { data: items } = await supabase.from('order_items').select('*, orders(created_at)').in('listing_id', listingIds);
        // compute monthly sales
        const months = {};
        const itemCounts = {};
        let totalRev = 0;
        for (const it of items || []){
          const date = new Date(it.orders?.created_at || it.created_at);
          const key = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`;
          months[key] = (months[key] || 0) + (it.quantity || 1);
          itemCounts[it.listing_id] = (itemCounts[it.listing_id] || 0) + (it.quantity || 1);
          totalRev += (it.unit_price || 0) * (it.quantity || 1);
        }
        const md = Object.keys(months).sort().map(k=>({ month: k, sales: months[k] }));
        const tops = Object.entries(itemCounts).sort((a,b)=> b[1]-a[1]).slice(0,6).map(([id,count])=>({ id, count }));
        if (!mounted) return;
        setMonthlyData(md);
        setTopItems(tops);
        setRevenue(totalRev);
      }catch(err){ console.error(err); }
    })();
    return ()=> mounted = false;
  }, [sellerId, listings, orders]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card card-base">
        <h4 className="font-semibold mb-3">Monthly Sales</h4>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card card-base">
        <h4 className="font-semibold mb-3">Top Selling Items</h4>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={topItems} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="id" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card card-base lg:col-span-2">
        <h4 className="font-semibold mb-3">Summary</h4>
        <div className="flex gap-6">
          <div>
            <p className="text-sm text-dark-600">Total Revenue</p>
            <p className="text-2xl font-bold">KES {revenue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-dark-600">Total Listings</p>
            <p className="text-2xl font-bold">{(listings||[]).length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
