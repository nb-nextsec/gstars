import { Shield, FileText, Users, Heart, AlertTriangle, Camera, Sun, Download } from 'lucide-react';

const HERO_IMAGE = 'https://static.wixstatic.com/media/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg/v1/fill/w_1200,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c23ea9_1071a90c20b044f4bb98e30faed73a2c~mv2.jpg';

const policies = [
  {
    icon: Shield,
    title: 'Child Safety Policy',
    description:
      'Geelong Stars is committed to the safety and wellbeing of all children and young people involved in our programs. All volunteers and coaches hold valid Working With Children Checks. We have zero tolerance for child abuse and follow strict safeguarding procedures in line with Victorian legislation.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Users,
    title: 'Code of Conduct',
    description:
      'All members, volunteers, coaches, and spectators are expected to behave respectfully and inclusively at all times. We promote fair play, good sportsmanship, and positive attitudes. Discrimination, bullying, or harassment of any kind will not be tolerated.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Heart,
    title: 'Inclusion & Accessibility',
    description:
      'We welcome participants of all abilities, backgrounds, and experience levels. Our programs are adapted to ensure everyone can participate meaningfully. We are committed to removing barriers and creating a welcoming environment for all.',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    icon: AlertTriangle,
    title: 'Health & Safety',
    description:
      'The safety of our members is our top priority. We maintain first aid supplies and trained personnel at all sessions. Members are encouraged to disclose any medical conditions or needs so we can provide appropriate support. All incidents are reported and reviewed.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Camera,
    title: 'Photography & Social Media',
    description:
      'Photos and videos may be taken during sessions and events for promotional purposes. We obtain consent from members (or their guardians) before publishing any images. Members may opt out of photography at any time by notifying a club official.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: FileText,
    title: 'Privacy Policy',
    description:
      'We collect and store personal information in accordance with the Australian Privacy Principles. Member data is used solely for club administration and communication purposes. We do not share personal information with third parties without consent.',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    icon: Sun,
    title: 'Sun Safety',
    description:
      'During outdoor programs, we encourage all participants to slip on sun-protective clothing, slop on SPF 30+ sunscreen, slap on a hat, seek shade, and slide on sunglasses. Sessions may be modified or cancelled during extreme heat conditions for the safety of all participants.',
    color: 'bg-yellow-100 text-yellow-600',
  },
];

export function ClubPolicies() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Geelong Stars Club Policies"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Club Policies
            </h1>
            <p className="text-xl text-white/90">
              Geelong Stars is committed to providing a safe, inclusive, and enjoyable
              environment for all members, volunteers, and families.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Manual */}
      <section className="pt-16 pb-8 lg:pt-24 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Policy Manual
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              For full details on all of our club policies, please refer to the official
              Geelong All-Abilities Sports Club Policy Manual.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <a
              href="/Geelong All-Abilities Sports Club - Policy Manual.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-7 h-7 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-navy mb-1 group-hover:text-accent transition-colors">
                  Geelong All-Abilities Sports Club - Policy Manual
                </h3>
                <p className="text-gray-500 text-sm">PDF Document</p>
              </div>
              <div className="flex-shrink-0">
                <Download className="w-6 h-6 text-navy/50 group-hover:text-accent transition-colors" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="pt-8 pb-16 lg:pt-12 lg:pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {policies.map((policy) => (
              <div
                key={policy.title}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 flex items-start gap-5"
              >
                <div className={`w-12 h-12 ${policy.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <policy.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {policy.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-navy to-navy-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Questions About Our Policies?
            </h2>
            <p className="text-xl text-white/90">
              If you have any questions about our club policies or would like more
              information, please don't hesitate to get in touch with us.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default ClubPolicies;
