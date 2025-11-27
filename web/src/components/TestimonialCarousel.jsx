import React, { useEffect, useState, useRef } from 'react';

function Avatar({ name }){
  const initials = (name || '').split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold" aria-hidden>
      {initials}
    </div>
  );
}

export default function TestimonialCarousel({ items = [] }){
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const liveRef = useRef(null);

  useEffect(()=>{
    if (!items.length) return;
    timeoutRef.current = setInterval(()=> setIndex(i => (i+1) % items.length), 6000);
    return ()=> clearInterval(timeoutRef.current);
  }, [items.length]);

  const prev = ()=> setIndex(i => (i - 1 + items.length) % items.length);
  const next = ()=> setIndex(i => (i + 1) % items.length);

  if (!items.length) return null;

  const current = items[index];

  return (
    <section aria-roledescription="carousel" className="card card-base p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">Loved by Sellers</h4>
        <div className="flex gap-2">
          <button onClick={prev} aria-label="Previous testimonial" className="btn btn-outline btn-sm">‹</button>
          <button onClick={next} aria-label="Next testimonial" className="btn btn-outline btn-sm">›</button>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <Avatar name={current.name} />
        <div>
          <p className="italic text-dark-700">"{current.quote}"</p>
          <p className="mt-3 font-semibold text-dark-900">{current.name}</p>
          <p className="text-sm text-dark-600">{current.role}</p>
        </div>
      </div>

      <div aria-live="polite" ref={liveRef} className="sr-only">Showing testimonial {index+1} of {items.length}</div>
    </section>
  );
}
