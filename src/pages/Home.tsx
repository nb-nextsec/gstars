import { HeroSection, WelcomeSection, FeaturedPrograms, UpcomingEvents, SponsorsCarousel } from '../components/home';

export function Home() {
  return (
    <>
      <SponsorsCarousel />
      <HeroSection />
      <WelcomeSection />
      <FeaturedPrograms />
      <UpcomingEvents />
    </>
  );
}

export default Home;
