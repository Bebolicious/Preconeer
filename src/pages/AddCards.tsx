import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cardsApi } from "@/lib/api/cards";
import { preconsApi, type Precon } from "@/lib/api/precons";
import { Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [precons, setPrecons] = useState<Precon[]>([]);
  const [selectedCard, setSelectedCard] = useState<ScryfallCard | null>(null);
  const [isPreconDialogOpen, setIsPreconDialogOpen] = useState(false);
  const [isAddingToPrecon, setIsAddingToPrecon] = useState(false);
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

  const handleOpenPreconDialog = async (card: ScryfallCard) => {
    setSelectedCard(card);
    setIsPreconDialogOpen(true);
    
    try {
      const fetchedPrecons = await preconsApi.fetchAllPrecons();
      setPrecons(fetchedPrecons);
    } catch (error) {
      toast({
        title: "Failed to load precons",
        description: "Could not fetch precons from database",
        variant: "destructive",
      });
    }
  };

  const handleAddToPrecon = async (precon: Precon) => {
    if (!selectedCard) return;

    setIsAddingToPrecon(true);
    try {
      // First, ensure the card exists in the cards table
      const addedCard = await cardsApi.addCard({
        uuid: selectedCard.oracle_id,
        scryfall_id: selectedCard.id,
        name: selectedCard.name,
        set: selectedCard.set,
        image_url: selectedCard.image_uris?.normal || "",
        type_line: selectedCard.type_line,
        oracle_text: selectedCard.oracle_text || "",
      });

      // Then add it to the precon
      await preconsApi.addCardToPrecon(precon.id, {
        id: addedCard.id,
        scryfall_id: selectedCard.id,
        ammount: 1,
        type: ''
      });

      toast({
        title: "Card added to precon",
        description: `${selectedCard.name} has been added to ${precon.name}`,
      });

      setIsPreconDialogOpen(false);
      setSelectedCard(null);
    } catch (error) {
      toast({
        title: "Failed to add card to precon",
        description: "Could not add card to precon",
        variant: "destructive",
      });
    } finally {
      setIsAddingToPrecon(false);
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
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4">
                {card.image_uris && (
                  <img
                    src={card.image_uris.small}
                    alt={card.name}
                    className="w-full mb-4 rounded cursor-pointer"
                    onClick={() => handleAddCard(card)}
                  />
                )}
                <h3 className="font-bold text-lg mb-2">{card.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{card.type_line}</p>
                <p className="text-xs text-muted-foreground mb-3">Set: {card.set}</p>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleAddCard(card)}
                    disabled={isAdding === card.id}
                  >
                    {isAdding === card.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      "Add to Cards"
                    )}
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenPreconDialog(card);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Precon
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isPreconDialogOpen} onOpenChange={setIsPreconDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Select a Precon</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 gap-3 mt-4">
              {precons.map((precon) => (
                <Card
                  key={precon.id}
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleAddToPrecon(precon)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    {precon.precon_image && (
                      <img
                        src={precon.precon_image}
                        alt={precon.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{precon.name}</h3>
                      <p className="text-sm text-muted-foreground">{precon.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Year: {precon.released_year} • Cards: {precon.cards?.length || 0}
                      </p>
                    </div>
                    {isAddingToPrecon && (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {searchResults.length === 0 && !isSearching && searchQuery && (
          <p className="text-center text-muted-foreground mt-8">No cards found</p>
        )}
      </div>
    </div>
  );
};

export default AddCards;
