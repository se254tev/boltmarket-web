import React, { useState, useEffect } from 'react';

export default function SearchInput({ value = '', onChange, placeholder = 'Search...' }){
  const [q, setQ] = useState(value);

  useEffect(()=>{
    const t = setTimeout(()=> onChange(q), 250);
    return ()=> clearTimeout(t);
  }, [q, onChange]);

  return (
    <input
      type="search"
      value={q}
      onChange={(e)=> setQ(e.target.value)}
      placeholder={placeholder}
      className="input w-full"
      aria-label="Search conversations"
    />
  );
}
