import React, { useState } from 'react';
import Papa from 'papaparse';
import { listingsAPI } from '../services/supabase';

// BulkUploadCSV: parse CSV and create listings via listingsAPI
export default function BulkUploadCSV({ onComplete = ()=>{} }){
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setProcessing(true);
    Papa.parse(file, { header: true, skipEmptyLines: true, complete: async (res) => {
      const rows = res.data;
      const created = [];
      const errors = [];
      for (const r of rows){
        try{
          // map CSV columns to listing fields (user should include title,price,quantity,category)
          const payload = {
            title: r.title,
            price: parseFloat(r.price||0),
            quantity: parseInt(r.quantity||1,10),
            category: r.category || 'General',
            description: r.description || '',
            images: r.images ? r.images.split('|') : [],
            created_at: new Date(),
            status: r.draft === 'true' ? 'draft' : 'active'
          };
          const { data } = await listingsAPI.createListing(payload);
          created.push(data || null);
        }catch(err){ errors.push({ row: r, error: err.message || err }); }
      }
      setResults({ createdCount: created.length, errors });
      onComplete({ createdCount: created.length, errors });
      setProcessing(false);
    }});
  };

  return (
    <div className="flex items-center gap-2">
      <label className="btn btn-outline">Bulk CSV<input type="file" accept=".csv" onChange={handleFile} className="hidden" /></label>
      {processing && <span className="text-sm">Processing...</span>}
      {results && <span className="text-sm">Created: {results.createdCount} Errors: {results.errors.length}</span>}
    </div>
  );
}
