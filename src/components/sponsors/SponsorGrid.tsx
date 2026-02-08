import type { Sponsor, SponsorTier } from '../../types';

interface SponsorGridProps {
  sponsors: Sponsor[];
  showTierHeaders?: boolean;
}

const tierOrder: SponsorTier[] = ['gold', 'silver', 'bronze'];

const tierStyles: Record<SponsorTier, { bg: string; border: string; title: string }> = {
  gold: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    title: 'Gold Sponsors',
  },
  silver: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    title: 'Silver Sponsors',
  },
  bronze: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    title: 'Bronze Sponsors',
  },
};

function SponsorCard({ sponsor, size = 'md' }: { sponsor: Sponsor; size?: 'sm' | 'md' | 'lg' }) {
  const sizeStyles = {
    sm: 'p-3 h-20',
    md: 'p-4 h-24',
    lg: 'p-6 h-32',
  };

  const content = sponsor.logo_url ? (
    <img
      src={sponsor.logo_url}
      alt={sponsor.name}
      className="max-h-full max-w-full object-contain"
    />
  ) : (
    <span className="text-gray-700 font-medium text-center">{sponsor.name}</span>
  );

  const cardClass = `
    bg-white rounded-lg border border-gray-100 shadow-sm
    flex items-center justify-center
    hover:shadow-md transition-shadow
    ${sizeStyles[size]}
  `;

  if (sponsor.website_url) {
    return (
      <a
        href={sponsor.website_url}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
        title={`Visit ${sponsor.name}`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={cardClass} title={sponsor.name}>
      {content}
    </div>
  );
}

export function SponsorGrid({ sponsors, showTierHeaders = true }: SponsorGridProps) {
  if (!showTierHeaders) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sponsors
          .sort((a, b) => a.display_order - b.display_order)
          .map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
      </div>
    );
  }

  // Group sponsors by tier
  const sponsorsByTier = tierOrder.reduce((acc, tier) => {
    acc[tier] = sponsors
      .filter((s) => s.tier === tier)
      .sort((a, b) => a.display_order - b.display_order);
    return acc;
  }, {} as Record<SponsorTier, Sponsor[]>);

  return (
    <div className="space-y-12">
      {tierOrder.map((tier) => {
        const tierSponsors = sponsorsByTier[tier];
        if (!tierSponsors || tierSponsors.length === 0) return null;

        const style = tierStyles[tier];
        const gridCols = tier === 'gold'
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          : tier === 'silver'
          ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5';
        const size = tier === 'gold' ? 'lg' : tier === 'silver' ? 'md' : 'sm';

        return (
          <div key={tier}>
            <div className={`${style.bg} ${style.border} border rounded-lg p-6`}>
              <h3 className="text-xl font-semibold text-navy mb-6 text-center">
                {style.title}
              </h3>
              <div className={`grid ${gridCols} gap-4`}>
                {tierSponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} size={size} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SponsorGrid;
