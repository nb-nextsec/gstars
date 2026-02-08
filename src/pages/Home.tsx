import { HeroSection, WelcomeSection, FeaturedPrograms, UpcomingEvents, SponsorsCarousel } from '../components/home';

export function Home() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <FeaturedPrograms />
      <UpcomingEvents />
      <SponsorsCarousel />
    </>
  );
}

export default Home;
