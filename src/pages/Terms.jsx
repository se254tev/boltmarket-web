import React from "react";

export default function Terms() {
  return (
    <div className="container-safe py-12">
      <h1 className="text-heading-2 mb-6">Terms of Service</h1>
      <p className="text-body-lg text-dark-600 mb-6">
        Please read these Terms of Service carefully before using Bolt Market.
        By accessing or using our platform, you agree to be bound by these
        terms.
      </p>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p className="text-dark-600">
          By accessing Bolt Market, you confirm that you have read, understood,
          and agree to comply with these Terms of Service.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Use of the Platform</h2>
        <p className="text-dark-600">
          Users must use the platform responsibly and comply with all
          applicable laws. Any misuse, fraud, or unauthorized activity is
          strictly prohibited.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Accounts & Security</h2>
        <p className="text-dark-600">
          You are responsible for maintaining the confidentiality of your
          account information. Report any suspicious or unauthorized access
          immediately to support.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Payments & Transactions</h2>
        <p className="text-dark-600">
          Bolt Market acts as a marketplace connecting buyers and sellers.
          Payments, refunds, or disputes are handled according to our
          marketplace policy. Sellers must only use verified payment methods.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Prohibited Activities</h2>
        <ul className="list-disc pl-6 text-dark-600">
          <li>Submitting false information</li>
          <li>Engaging in scams or fraudulent transactions</li>
          <li>Uploading harmful or illegal content</li>
          <li>Attempting to damage the platform or gain unauthorized access</li>
        </ul>
      </section>

      {/* Section 6 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Termination</h2>
        <p className="text-dark-600">
          We may suspend or terminate accounts that violate these terms or
          engage in harmful activity.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Changes to Terms</h2>
        <p className="text-dark-600">
          We may update these terms at any time. Continued use of the platform
          means you accept the updated terms.
        </p>
      </section>

      {/* Section 8 */}
      <section>
        <h2 className="text-xl font-semibold mb-2">8. Contact Information</h2>
        <p className="text-dark-600">
          For any questions regarding these Terms, contact our support team.
        </p>
      </section>
    </div>
  );
}
