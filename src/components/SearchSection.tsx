import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { preconDecks } from "@/data/precons";
import PreconCard from "./PreconCard";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const filteredPrecons = searchQuery.trim()
    ? preconDecks.filter((deck) =>
        deck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deck.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deck.colors.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <section id="search" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Search Precons
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Find the perfect precon deck for your playstyle and strategies
            </p>
          </div>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative flex gap-2">
                <Input
                  type="text"
                  placeholder="Search for precons..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(e.target.value.trim().length > 0);
                  }}
                  className="flex-1 h-14 text-lg bg-card border-border focus-visible:ring-primary"
                />
                <Button type="submit" variant="magic" size="lg" className="h-14 px-8">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </form>

          {/* Search Results */}
          {showResults && (
            <div className="mt-12 animate-fade-in">
              {filteredPrecons.length > 0 ? (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-center">
                    Found {filteredPrecons.length} precon{filteredPrecons.length !== 1 ? "s" : ""}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPrecons.map((deck) => (
                      <PreconCard key={deck.id} {...deck} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No precons found matching "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {["White", "Blue", "Black", "Red", "Green", "Multicolor", "Colorless"].map((color) => (
              <Button
                key={color}
                variant="outline"
                size="sm"
                className="hover:bg-primary/10 hover:border-primary transition-colors"
                onClick={() => {
                  setSearchQuery(color);
                  setShowResults(true);
                }}
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
