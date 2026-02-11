export function TermsOfService() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[300px] flex items-center bg-navy">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-white/90">
              Please read these terms carefully before using the Geelong Stars website.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none">
          <p className="text-gray-500 text-sm mb-8">Last updated: February 2025</p>

          <h2 className="text-2xl font-bold text-navy mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 mb-6">
            By accessing and using the Geelong All-Abilities Sports Club (Geelong Stars) website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">2. About Geelong Stars</h2>
          <p className="text-gray-600 mb-6">
            Geelong Stars is a not-for-profit all-abilities sports club based in Geelong, Victoria, Australia. We provide inclusive sporting programs for people of all ages and abilities. Our registered address is 203 St Albans Road, Thomson VIC 3219.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">3. Use of Website</h2>
          <p className="text-gray-600 mb-4">
            This website is provided for informational purposes about our club, programs, events, and services. You agree to use this website only for lawful purposes and in a manner that does not infringe upon the rights of others.
          </p>
          <p className="text-gray-600 mb-6">You must not:</p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>Use this website in any way that is unlawful or fraudulent</li>
            <li>Attempt to gain unauthorised access to any part of the website</li>
            <li>Use automated tools to scrape or collect data from the website</li>
            <li>Transmit any harmful code, viruses, or malicious software</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mb-4">4. Membership and Programs</h2>
          <p className="text-gray-600 mb-4">
            Participation in Geelong Stars programs is subject to separate membership terms and conditions provided at the time of registration. Program schedules, fees, and availability are subject to change without notice.
          </p>
          <p className="text-gray-600 mb-6">
            Geelong Stars reserves the right to modify, suspend, or cancel any program at its discretion. We will make reasonable efforts to notify members of any significant changes.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">5. Intellectual Property</h2>
          <p className="text-gray-600 mb-6">
            All content on this website, including text, images, logos, graphics, and design, is the property of Geelong All-Abilities Sports Club or its content providers and is protected by Australian copyright and intellectual property laws. You may not reproduce, distribute, or use any content without prior written permission.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">6. User-Submitted Content</h2>
          <p className="text-gray-600 mb-6">
            When you submit information through our contact form or other communication channels, you grant Geelong Stars the right to use that information to respond to your enquiry and provide relevant services. We will handle your personal information in accordance with our Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">7. Disclaimer</h2>
          <p className="text-gray-600 mb-6">
            This website is provided on an "as is" and "as available" basis. Geelong Stars makes no warranties or representations about the accuracy, completeness, or reliability of the content on this website. While we endeavour to keep information up to date, we do not guarantee that all information is current at all times.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">8. Limitation of Liability</h2>
          <p className="text-gray-600 mb-6">
            To the maximum extent permitted by Australian law, Geelong Stars shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or any information provided on it.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">9. External Links</h2>
          <p className="text-gray-600 mb-6">
            This website may contain links to external websites, including those of our sponsors and partners. Geelong Stars is not responsible for the content, privacy practices, or availability of these external sites. Linking to external sites does not imply endorsement.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">10. Changes to Terms</h2>
          <p className="text-gray-600 mb-6">
            Geelong Stars reserves the right to update or modify these Terms of Service at any time. Changes will be effective immediately upon posting to this website. Your continued use of the website after changes are posted constitutes your acceptance of the revised terms.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">11. Governing Law</h2>
          <p className="text-gray-600 mb-6">
            These Terms of Service are governed by the laws of the State of Victoria, Australia. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Victoria.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-4">12. Contact Us</h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:info@geelongstars.com.au" className="text-accent hover:text-accent-dark">
              info@geelongstars.com.au
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}

export default TermsOfService;
