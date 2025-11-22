import React, { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-safe py-12 mt-8 max-w-4xl mx-auto">
      <h1 className="text-heading-1 mb-4 text-dark-900">Privacy Policy</h1>
      <p className="text-body-lg text-dark-500 mb-8 text-justify leading-relaxed">
        Bolt Market respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our platform.
      </p>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-heading-4 font-bold mb-3 text-dark-800">1. Data We Collect</h2>
        <p className="text-body text-dark-600 mb-4">
          We collect personal information necessary to provide and improve our services, including:
        </p>
        <ul className="list-disc pl-8 text-dark-600 mt-3 space-y-2">
          <li>Name, email address, and phone number</li>
          <li>Payment details and billing information</li>
          <li>Order history and transaction details</li>
          <li>Device and usage information for analytics</li>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-heading-4 font-bold mb-3 text-dark-800">2. How We Use Your Data</h2>
        <p className="text-body text-dark-600 mb-4">
          Your information is used for:
        </p>
        <ul className="list-disc pl-8 text-dark-600 mt-3 space-y-2">
          <li>Processing transactions and payments</li>
          <li>Providing customer support and responding to inquiries</li>
          <li>Improving our platform and services</li>
          <li>Communicating important updates, promotions, or policy changes</li>
        </ul>
        <p className="text-body text-dark-600 mt-4">
          We do not sell or share your personal information with third parties for marketing purposes.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-heading-4 font-bold mb-3 text-dark-800">3. Data Protection & Security</h2>
        <p className="text-body text-dark-600">
          We implement appropriate security measures to protect your personal data, including encryption and secure storage. Only authorized personnel have access to your information.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-heading-4 font-bold mb-3 text-dark-800">4. Cookies & Analytics</h2>
        <p className="text-body text-dark-600">
          We may use cookies and similar technologies to improve your experience, analyze traffic, and understand user behavior. You can control cookie preferences in your browser settings.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="text-heading-4 font-bold mb-3 text-dark-800">5. Your Rights</h2>
        <p className="text-body text-dark-600">
          You have the right to access, update, or delete your personal information. Contact our support team for assistance with any data-related requests.
        </p>
      </section>

      {/* Section 6 */}
      <section>
        <h2 className="text-heading-4 font-bold mb-3 text-dark-800">6. Changes to Privacy Policy</h2>
        <p className="text-body text-dark-600">
          We may update this Privacy Policy from time to time. Continued use of the platform means you accept the updated policy.
        </p>
      </section>
    </div>
  );
}
