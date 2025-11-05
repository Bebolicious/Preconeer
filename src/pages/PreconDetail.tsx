import { useParams, Link } from "react-router-dom";
import { preconDecks } from "@/data/precons";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PreconDetail = () => {
  const { id } = useParams<{ id: string }>();
  const precon = preconDecks.find((deck) => deck.id === id);

  if (!precon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Precon Not Found</h1>
          <Link to="/">
            <Button variant="magic">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-start gap-6">
            <img
              src={precon.image}
              alt={precon.name}
              className="w-32 h-32 object-cover rounded-lg shadow-xl"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {precon.name}
              </h1>
              <p className="text-muted-foreground text-lg mt-2">{precon.theme}</p>
              <div className="flex gap-3 mt-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {precon.colors}
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                  {precon.year}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Deck Cards Section */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Deck Cards
                </span>
              </h2>
              <p className="text-muted-foreground">
                All cards included in this preconstructed deck
              </p>
            </div>
            <div className="min-h-[400px] border-2 border-dashed border-border rounded-xl bg-card/30 flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                Card data will be displayed here
                <br />
                <span className="text-sm">(Grid of deck cards)</span>
              </p>
            </div>
          </div>

          {/* Potential Upgrades Section */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Potential Upgrades
                </span>
              </h2>
              <p className="text-muted-foreground">
                Recommended cards to enhance your deck
              </p>
            </div>
            <div className="min-h-[400px] border-2 border-dashed border-border rounded-xl bg-card/30 flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                Upgrade suggestions will be displayed here
                <br />
                <span className="text-sm">(Grid of upgrade cards)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreconDetail;
