import React, { useEffect, useState } from 'react';
import { ordersAPI, payoutsAPI } from '../services/supabase';

export default function EarningsCard({ sellerId, payouts = [], onWithdraw = ()=>{} }){
  const [stats, setStats] = useState({ totalRevenue:0, totalSales:0, withdrawable:0 });

  useEffect(()=>{
    if (!sellerId) return;
    let mounted = true;
    (async ()=>{
      try{
        const { data } = await ordersAPI.getUserOrders(sellerId);
        if (!mounted) return;
        const orders = data || [];
        let revenue = 0, sales = 0;
        for(const o of orders){ revenue += Number(o.total_amount||0); sales += 1; }
        const withdrawable = revenue - (payouts.reduce((s,p)=> s + (p.amount||0),0));
        setStats({ totalRevenue: revenue, totalSales: sales, withdrawable });
      }catch(err){ console.error(err); }
    })();
    return ()=> mounted = false;
  }, [sellerId, payouts]);

  return (
    <div>
      <div className="mb-3">
        <p className="text-sm text-dark-600">Total Revenue</p>
        <p className="text-2xl font-bold">KES {stats.totalRevenue.toFixed(2)}</p>
      </div>
      <div className="mb-3">
        <p className="text-sm text-dark-600">Total Sales</p>
        <p className="text-lg font-medium">{stats.totalSales}</p>
      </div>
      <div className="mb-3">
        <p className="text-sm text-dark-600">Withdrawable</p>
        <p className="text-lg font-medium">KES {stats.withdrawable.toFixed(2)}</p>
      </div>
      <div>
        <button onClick={onWithdraw} className="btn btn-primary">Request Withdrawal</button>
      </div>
    </div>
  );
}
