import { Search } from "lucide-react";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card/80 backdrop-blur-xl border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all duration-300">
              <span className="text-primary-foreground font-bold text-lg sm:text-xl">P</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Preconeer
            </span>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium"
            >
              About
            </a>
            <a
              href="#precons"
              className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium"
            >
              Precons
            </a>
            <a
              href="#search"
              className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium flex items-center space-x-1"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
