import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container-safe py-12">
      <h1 className="text-heading-2 mb-4">Privacy Policy</h1>
      <p className="text-body-lg text-dark-600">This is the Privacy Policy page. Replace this with your full privacy policy content.</p>
      <section className="mt-6">
        <h2 className="font-semibold mb-2">Data We Collect</h2>
        <p className="text-dark-600">We collect personal information necessary to provide our services, such as name, email, phone number, and payment details. Sensitive information is encrypted in storage.</p>
      </section>
      <section className="mt-4">
        <h2 className="font-semibold mb-2">How We Use Data</h2>
        <p className="text-dark-600">We use data to operate and improve the platform, process payments, and provide customer support. We do not sell personal data.</p>
      </section>
    </div>
  );
}
