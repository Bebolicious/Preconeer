import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroCard from "@/assets/hero-card.png";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Upgrade Your
              </span>
              <br />
              <span className="text-foreground">MTG Precons</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
              Discover powerful upgrades and complete reworks for your Magic: The Gathering preconstructed decks. 
              Transform your deck into a competitive powerhouse.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button 
                variant="magic" 
                size="lg"
                className="text-lg"
                onClick={() => document.getElementById('precons')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Precons
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg"
                onClick={() => document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Search Cards
              </Button>
            </div>
          </div>

          {/* Hero Card Image */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-50 blur-3xl rounded-full"></div>
              <img 
                src={heroCard} 
                alt="Magic Trading Card" 
                className="relative w-full h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 card-glow"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
