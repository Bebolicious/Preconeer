import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import PreconSection from "@/components/PreconSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <SearchSection />
      <PreconSection />
      
      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-12 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-lg font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Preconeer
              </h3>
              <p className="text-sm text-muted-foreground">
                Your ultimate resource for MTG precon deck upgrades and strategies.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3 text-foreground">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#precons" className="hover:text-primary transition-colors">Precons</a></li>
                <li><a href="#search" className="hover:text-primary transition-colors">Search</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3 text-foreground">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Reddit</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Preconeer. All rights reserved. Magic: The Gathering is a trademark of Wizards of the Coast.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
