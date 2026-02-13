import type { Sponsor } from '../../types';

interface SponsorGridProps {
  sponsors: Sponsor[];
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
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
    p-4 h-24
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

export function SponsorGrid({ sponsors }: SponsorGridProps) {
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

export default SponsorGrid;
