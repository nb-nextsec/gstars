export function CookiePolicy() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[300px] flex items-center bg-navy">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Cookie Policy
            </h1>
            <p className="text-lg text-white/90">
              How Geelong Stars uses cookies and similar technologies on our website.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none">
          <p className="text-gray-500 text-sm mb-8">Last updated: February 2026</p>

          <h2 className="text-2xl font-bold text-navy mb-4">What Are Cookies?</h2>
          <p className="text-gray-600 mb-6">
            Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners. Cookies help improve your browsing experience by remembering your preferences and understanding how you use the site.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">How We Use Cookies</h2>
          <p className="text-gray-600 mb-4">
            The Geelong Stars website uses a minimal number of cookies to ensure the website functions correctly and to improve your experience. We use the following types of cookies:
          </p>

          <h3 className="text-xl font-semibold text-navy mb-3">Essential Cookies</h3>
          <p className="text-gray-600 mb-4">
            These cookies are necessary for the website to function properly. They enable basic features such as page navigation and access to secure areas of the website. The website cannot function properly without these cookies.
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>Session management and security</li>
            <li>Remembering your cookie consent preferences</li>
            <li>Ensuring forms work correctly (e.g., contact form)</li>
          </ul>

          <h3 className="text-xl font-semibold text-navy mb-3">Analytics Cookies</h3>
          <p className="text-gray-600 mb-6">
            We may use analytics cookies to understand how visitors interact with our website. This helps us improve the website and provide a better experience. These cookies collect information anonymously and do not identify you personally. We may use services such as Google Analytics for this purpose.
          </p>

          <h3 className="text-xl font-semibold text-navy mb-3">Third-Party Cookies</h3>
          <p className="text-gray-600 mb-4">
            Some third-party services embedded on our website may set their own cookies. These include:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li><strong>Google Maps:</strong> Used on our Contact page to show our location. Google may set cookies to provide mapping functionality.</li>
            <li><strong>Social media platforms:</strong> Links to our Facebook and Instagram pages may use cookies if you interact with embedded social content.</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mb-4">Managing Cookies</h2>
          <p className="text-gray-600 mb-4">
            You can control and manage cookies in your browser settings. Most browsers allow you to:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>View what cookies are stored on your device and delete them individually</li>
            <li>Block third-party cookies</li>
            <li>Block cookies from specific websites</li>
            <li>Block all cookies</li>
            <li>Delete all cookies when you close your browser</li>
          </ul>
          <p className="text-gray-600 mb-6">
            Please note that blocking or deleting cookies may affect the functionality of this website and your browsing experience. For more information on managing cookies in your browser, visit your browser's help documentation.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">Changes to This Policy</h2>
          <p className="text-gray-600 mb-6">
            We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. Any changes will be posted on this page with an updated revision date.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about our use of cookies, please contact us at{' '}
            <a href="mailto:contact@geelongstars.com.au" className="text-accent hover:text-accent-dark">
              contact@geelongstars.com.au
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}

export default CookiePolicy;
