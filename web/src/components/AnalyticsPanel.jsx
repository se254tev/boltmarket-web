import React, { useEffect, useState, useMemo } from 'react';
import supabase from '../services/supabase';

// Lightweight SVG line chart (small data sets)
function SimpleLineChart({ data = [], width = '100%', height = 220 }){
  const viewW = 600, viewH = 220;
  const points = data.map((d, i) => ({ x: (i/(Math.max(1,data.length-1)))*viewW, y:  viewH - (d.sales / Math.max(...data.map(x=>x.sales),1))* (viewH-20) }));
  const path = points.map((p,i)=> `${i===0? 'M':'L'} ${p.x} ${p.y}`).join(' ');
  return (
    <svg viewBox={`0 0 ${viewW} ${viewH}`} style={{ width, height }} role="img" aria-label="line chart">
      <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
      <path d={path} fill="none" stroke="#8884d8" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p,i)=> (<circle key={i} cx={p.x} cy={p.y} r={3} fill="#8884d8" />))}
    </svg>
  );
}

function SimpleBarList({ data = [] }){
  const max = Math.max(...data.map(d=>d.count), 1);
  return (
    <div className="space-y-3">
      {data.map(d=> (
        <div key={d.id} className="flex items-center gap-3">
          <div className="w-36 text-sm truncate">Item #{d.id}</div>
          <div className="flex-1 bg-slate-100 rounded overflow-hidden h-4">
            <div style={{ width: `${(d.count/max)*100}%` }} className="bg-emerald-500 h-4"></div>
          </div>
          <div className="w-12 text-right text-sm">{d.count}</div>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPanel({ sellerId, listings = [], orders = [] }){
  const [monthlyData, setMonthlyData] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(()=>{
    if (!sellerId) return;
    let mounted = true;
    (async ()=>{
      try{
        const listingIds = (listings||[]).map(l => l.id).filter(Boolean);
        if (listingIds.length === 0){ setMonthlyData([]); setTopItems([]); setRevenue(0); return; }

        const { data: items } = await supabase.from('order_items').select('*, orders(created_at)').in('listing_id', listingIds);
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

  const monthlyMemo = useMemo(()=> monthlyData, [monthlyData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card card-base">
        <h4 className="font-semibold mb-3">Monthly Sales</h4>
        <div style={{ width: '100%', height: 300 }}>
          <SimpleLineChart data={monthlyMemo} height={300} />
        </div>
      </div>

      <div className="card card-base">
        <h4 className="font-semibold mb-3">Top Selling Items</h4>
        <div style={{ width: '100%', height: 300 }}>
          <SimpleBarList data={topItems} />
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
