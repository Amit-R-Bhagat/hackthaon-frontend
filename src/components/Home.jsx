import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
function Home() {
  return (
    <div className="min-vh-100 bg-secondary bg-gradient ">
      <Navigation />
      <HeroSection />
    </div>
  );
}

export default Home;
