export function PrivacyPolicy() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[300px] flex items-center bg-navy">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-white/90">
              How Geelong Stars collects, uses, and protects your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none">
          <p className="text-gray-500 text-sm mb-8">Last updated: February 2026</p>

          <h2 className="text-2xl font-bold text-navy mb-4">1. Introduction</h2>
          <p className="text-gray-600 mb-6">
            Geelong All-Abilities Sports Club (Geelong Stars) is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our club. We comply with the Australian Privacy Principles (APPs) contained in the Privacy Act 1988 (Cth).
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">2. Information We Collect</h2>
          <p className="text-gray-600 mb-4">We may collect the following types of personal information:</p>

          <h3 className="text-xl font-semibold text-navy mb-3">Information You Provide</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
            <li>Name and contact details (email address, phone number) when you submit our contact form</li>
            <li>Membership registration details including name, age, address, and emergency contacts</li>
            <li>Medical or health information relevant to participation in our programs</li>
            <li>Photographs and videos taken during club activities (with consent)</li>
          </ul>

          <h3 className="text-xl font-semibold text-navy mb-3">Information Collected Automatically</h3>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>Browser type and version</li>
            <li>Pages visited and time spent on our website</li>
            <li>Referring website addresses</li>
            <li>General location information (city/region level only)</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">We use your personal information for the following purposes:</p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>To respond to your enquiries and contact form submissions</li>
            <li>To manage membership registrations and program participation</li>
            <li>To communicate with members about programs, events, and club news</li>
            <li>To ensure the safety and wellbeing of our participants</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
            <li>To promote our club activities (photographs/videos, with consent)</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mb-4">4. How We Share Your Information</h2>
          <p className="text-gray-600 mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li><strong>Service providers:</strong> Third-party services that help us operate our website and manage communications (e.g., email providers, web hosting)</li>
            <li><strong>Sports associations:</strong> Relevant sporting bodies or associations as required for program registration and insurance</li>
            <li><strong>Legal requirements:</strong> When required by law, regulation, or legal process</li>
            <li><strong>Safety:</strong> When necessary to protect the safety of our members, staff, or volunteers</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mb-4">5. Data Security</h2>
          <p className="text-gray-600 mb-6">
            We take reasonable steps to protect your personal information from unauthorised access, modification, disclosure, or destruction. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security of your data.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">6. Your Rights</h2>
          <p className="text-gray-600 mb-4">
            Under Australian privacy law, you have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate or outdated information</li>
            <li>Request deletion of your personal information (subject to legal obligations)</li>
            <li>Opt out of receiving marketing communications</li>
            <li>Make a complaint about how we handle your personal information</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mb-4">7. Children's Privacy</h2>
          <p className="text-gray-600 mb-6">
            Geelong Stars provides programs for children and young people. We collect personal information about minors only with the consent of their parent or guardian. Parents and guardians may access, update, or request deletion of their child's personal information by contacting us.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">8. Photographs and Media</h2>
          <p className="text-gray-600 mb-6">
            Photographs and videos may be taken during Geelong Stars programs and events for promotional purposes, including use on our website, social media, and printed materials. We obtain consent for the use of images, particularly those involving children. If you do not wish to be photographed, please inform our staff or volunteers.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">9. Third-Party Links</h2>
          <p className="text-gray-600 mb-6">
            Our website may contain links to third-party websites, including those of our sponsors and partners. We are not responsible for the privacy practices of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">10. Changes to This Policy</h2>
          <p className="text-gray-600 mb-6">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">11. Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about this Privacy Policy, wish to access or correct your personal information, or want to make a complaint, please contact us:
          </p>
          <ul className="list-none text-gray-600 mb-4 space-y-1">
            <li><strong>Email:</strong>{' '}
              <a href="mailto:contact@geelongstars.com.au" className="text-accent hover:text-accent-dark">
                contact@geelongstars.com.au
              </a>
            </li>
            <li><strong>Address:</strong> 203 St Albans Road, Thomson VIC 3219</li>
          </ul>
          <p className="text-gray-600 mb-6">
            If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at{' '}
            <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-dark">
              www.oaic.gov.au
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}

export default PrivacyPolicy;
