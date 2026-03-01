import { HeroSection, WelcomeSection, FeaturedPrograms, UpcomingEvents, SponsorsCarousel } from '../components/home';
import { SEOHead } from '../components/common/SEOHead';

export function Home() {
  return (
    <>
      <SEOHead
        title="Geelong Stars - All-Abilities Sports Club | Geelong, Victoria"
        description="Building champions on and off the field. Join our inclusive sporting programs including basketball, football, golf, and more. Everyone is welcome at Geelong Stars!"
        url="/"
      />
      <SponsorsCarousel />
      <HeroSection />
      <WelcomeSection />
      <FeaturedPrograms />
      <UpcomingEvents />
    </>
  );
}

export default Home;
