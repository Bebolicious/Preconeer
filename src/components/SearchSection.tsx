import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality will be implemented here
    console.log("Searching for:", searchQuery);
  };

  return (
    <section id="search" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Search MTG Cards
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Find the perfect cards for your deck upgrades and strategies
            </p>
          </div>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative flex gap-2">
                <Input
                  type="text"
                  placeholder="Search for cards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-14 text-lg bg-card border-border focus-visible:ring-primary"
                />
                <Button type="submit" variant="magic" size="lg" className="h-14 px-8">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {["White", "Blue", "Black", "Red", "Green", "Multicolor", "Colorless"].map((color) => (
              <Button
                key={color}
                variant="outline"
                size="sm"
                className="hover:bg-primary/10 hover:border-primary transition-colors"
                onClick={() => setSearchQuery(color)}
              >
                {color}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
