import React, { useState } from 'react';
import { listingsAPI } from '../services/supabase';

// Basic CSV splitter that respects quoted fields
function splitCSVLine(line){
  const re = /,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
  // split but keep quoted content intact
  const cols = line.split(re);
  return cols.map(c => c.trim().replace(/^"|"$/g, '').replace(/""/g,'"'));
}

// BulkUploadCSV: lightweight CSV parsing fallback (naive but avoids external dep)
export default function BulkUploadCSV({ onComplete = ()=>{} }){
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setProcessing(true);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try{
        const text = ev.target.result;
        const lines = text.split(/\r?\n/).filter(Boolean);
        if (lines.length === 0) throw new Error('Empty CSV');
        const headers = splitCSVLine(lines[0]).map(h=>h.trim());
        const rows = lines.slice(1).map(l => {
          const cols = splitCSVLine(l);
          const obj = {};
          headers.forEach((h,i)=> obj[h] = cols[i] ?? '');
          return obj;
        });

        const created = [];
        const errors = [];
        for (const r of rows){
          try{
            const payload = {
              title: r.title,
              price: parseFloat(r.price||0),
              quantity: parseInt(r.quantity||1,10),
              category: r.category || 'General',
              description: r.description || '',
              images: r.images ? r.images.split('|') : [],
              created_at: new Date(),
              status: (String(r.draft||'').toLowerCase() === 'true') ? 'draft' : 'active'
            };
            const { data } = await listingsAPI.createListing(payload);
            created.push(data || null);
          }catch(err){ errors.push({ row: r, error: err?.message || String(err) }); }
        }
        setResults({ createdCount: created.length, errors });
        onComplete({ createdCount: created.length, errors });
      }catch(err){
        setResults({ createdCount: 0, errors: [{ error: err.message || String(err) }] });
      }finally{
        setProcessing(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="btn btn-outline">Bulk CSV<input type="file" accept=".csv" onChange={handleFile} className="hidden" /></label>
      {processing && <span className="text-sm">Processing...</span>}
      {results && <span className="text-sm">Created: {results.createdCount} Errors: {results.errors.length}</span>}
    </div>
  );
}
