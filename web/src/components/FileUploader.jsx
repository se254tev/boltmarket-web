import React, { useState } from 'react';
import supabase from '../services/supabase';

// FileUploader
// - Supports single or multiple file uploads
// - Uploads to Supabase Storage 'listings' bucket (must exist)
// - Returns public URLs via `onComplete` callback
export default function FileUploader({ multiple = false, accept = '*/*', onComplete = () => {}, existing = [], single = false }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFiles = (ev) => {
    const list = Array.from(ev.target.files || []);
    setFiles(list);
  };

  const upload = async () => {
    if (!files.length) return onComplete(existing || []);
    setUploading(true);
    try {
      const uploadedUrls = [];
      for (const f of files) {
        const path = `public/listings/${Date.now()}-${Math.random().toString(36).slice(2)}-${f.name}`;
        const { data, error } = await supabase.storage.from('listings').upload(path, f, { cacheControl: '3600', upsert: false });
        if (error) throw error;
        const { publicUrl } = supabase.storage.from('listings').getPublicUrl(path);
        uploadedUrls.push(publicUrl);
      }
      const result = (existing || []).concat(uploadedUrls);
      onComplete(single ? [result[0]] : result);
      setFiles([]);
    } catch (err) {
      console.error('Upload failed', err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <input type="file" multiple={multiple} accept={accept} onChange={handleFiles} />
        <button onClick={upload} className="btn btn-sm btn-primary" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</button>
      </div>
      {files.length > 0 && (
        <div className="mt-2 flex gap-2">
          {files.map((f, idx) => (
            <div key={idx} className="w-20 h-20 bg-dark-100 rounded overflow-hidden flex items-center justify-center text-xs">{f.name}</div>
          ))}
        </div>
      )}
      {existing && existing.length > 0 && (
        <div className="mt-2 flex gap-2">
          {existing.map((u, i) => (
            <img key={i} src={u} alt={`existing-${i}`} className="w-20 h-20 object-cover rounded" />
          ))}
        </div>
      )}
    </div>
  );
}
