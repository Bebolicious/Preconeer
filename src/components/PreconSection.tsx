import PreconCard from "./PreconCard";
import { preconDecks } from "@/data/precons";

const PreconSection = () => {
  return (
    <section id="precons" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Featured Precons
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of Magic: The Gathering preconstructed decks and discover powerful upgrade paths
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {preconDecks.map((deck, index) => (
            <div
              key={deck.name}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PreconCard {...deck} />
            </div>
          ))}
        </div>

        {/* Color Filter Pills */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          <span className="text-muted-foreground text-sm font-medium self-center">Filter by color:</span>
          {[
            { name: "White", color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-900" },
            { name: "Blue", color: "bg-blue-500 hover:bg-blue-600 text-white" },
            { name: "Black", color: "bg-gray-900 hover:bg-gray-800 text-white" },
            { name: "Red", color: "bg-red-600 hover:bg-red-700 text-white" },
            { name: "Green", color: "bg-green-600 hover:bg-green-700 text-white" },
          ].map((colorFilter) => (
            <button
              key={colorFilter.name}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg ${colorFilter.color}`}
            >
              {colorFilter.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreconSection;
