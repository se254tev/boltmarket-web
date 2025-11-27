import React from 'react';

export default function FaqAccordion({ items = [] }){
  return (
    <div className="space-y-4">
      {items.map((f, idx) => {
        const id = `faq-${idx}`;
        return (
          <details key={id} className="bg-white rounded-lg p-4 shadow-sm border" id={id}>
            <summary className="font-semibold cursor-pointer">{f.question}</summary>
            <div className="mt-3 text-dark-700">{f.answer}</div>
          </details>
        );
      })}
    </div>
  );
}
