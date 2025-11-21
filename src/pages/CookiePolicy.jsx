import React from "react";

export default function CookiePolicy() {
  return (
    <div className="container-safe py-12">
      <h1 className="text-heading-2 mb-6">Cookie Policy</h1>
      <p className="text-body-lg text-dark-600 mb-6">
        Bolt Market uses cookies and similar technologies to improve your experience, analyze traffic, and provide essential functionality. This page explains the types of cookies we use and why.
      </p>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Essential Cookies</h2>
        <p className="text-dark-600">
          These cookies are necessary for the website to function properly. They enable basic features such as page navigation, secure login, and maintaining your session. Without these cookies, some parts of the platform may not work correctly.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Performance & Analytics Cookies</h2>
        <p className="text-dark-600">
          We use these cookies to collect information about how visitors interact with the platform. This helps us improve our services, optimize user experience, and monitor traffic patterns. The data collected is anonymous and cannot identify individual users.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Functional Cookies</h2>
        <p className="text-dark-600">
          Functional cookies allow the platform to remember your preferences, such as language settings or login details, to provide a more personalized experience.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Third-Party Cookies</h2>
        <p className="text-dark-600">
          We may use third-party services, like analytics providers, which may set their own cookies. These cookies help us understand usage trends and improve our services.
        </p>
      </section>

      {/* Section 5 */}
      <section>
        <h2 className="text-xl font-semibold mb-2">5. Managing Cookies</h2>
        <p className="text-dark-600">
          You can control or disable cookies in your browser settings. Please note that disabling certain cookies may affect the functionality and performance of the platform.
        </p>
      </section>
    </div>
  );
}
