import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cardsApi } from "@/lib/api/cards";
import { Loader2 } from "lucide-react";

type ScryfallCard = {
  id: string;
  oracle_id: string;
  name: string;
  set: string;
  type_line: string;
  oracle_text?: string;
  image_uris?: {
    small: string;
    normal: string;
    large: string;
  };
};

type ScryfallResponse = {
  data: ScryfallCard[];
};

const AddCards = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ScryfallCard[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.scryfall.com/cards/search?q=${encodeURIComponent(searchQuery)}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to search cards");
      }

      const data: ScryfallResponse = await response.json();
      setSearchResults(data.data || []);
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Could not search Scryfall API",
        variant: "destructive",
      });
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddCard = async (card: ScryfallCard) => {
    setIsAdding(card.id);
    try {
      await cardsApi.addCard({
        uuid: card.oracle_id,
        scryfall_id: card.id,
        name: card.name,
        set: card.set,
        image_url: card.image_uris?.normal || "",
        type_line: card.type_line,
        oracle_text: card.oracle_text || "",
      });

      toast({
        title: "Card added",
        description: `${card.name} has been added to the database`,
      });
    } catch (error) {
      toast({
        title: "Failed to add card",
        description: "Could not add card to database",
        variant: "destructive",
      });
    } finally {
      setIsAdding(null);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Add Cards</h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Search for cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isSearching}>
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </Button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((card) => (
            <Card
              key={card.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleAddCard(card)}
            >
              <CardContent className="p-4">
                {card.image_uris && (
                  <img
                    src={card.image_uris.small}
                    alt={card.name}
                    className="w-full mb-4 rounded"
                  />
                )}
                <h3 className="font-bold text-lg mb-2">{card.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{card.type_line}</p>
                <p className="text-xs text-muted-foreground">Set: {card.set}</p>
                {isAdding === card.id && (
                  <div className="mt-2 flex items-center text-sm text-primary">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {searchResults.length === 0 && !isSearching && searchQuery && (
          <p className="text-center text-muted-foreground mt-8">No cards found</p>
        )}
      </div>
    </div>
  );
};

export default AddCards;
