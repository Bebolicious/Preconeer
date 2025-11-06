import { useParams, Link } from "react-router-dom";
import { preconDecks } from "@/data/precons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Folder } from "lucide-react";

// Mock data - will be replaced with real data later
const mockUpgradeCards = [
  { id: "1", name: "Rhystic Study", type: "Enchantment", image: "https://cards.scryfall.io/normal/front/d/6/d6914dba-0d27-4055-ac34-b3ebf5802221.jpg" },
  { id: "2", name: "Cyclonic Rift", type: "Instant", image: "https://cards.scryfall.io/normal/front/f/f/ff08e5ed-f47b-4d8e-8b8b-41675dccef8b.jpg" },
];

const mockPacks = [
  { 
    type: "upgradePack", 
    name: "Manifest Dread Pack", 
    cards: [
      { id: "p1", name: "Pack Card 1", type: "Creature", image: "https://cards.scryfall.io/normal/front/d/6/d6914dba-0d27-4055-ac34-b3ebf5802221.jpg" },
      { id: "p2", name: "Pack Card 2", type: "Sorcery", image: "https://cards.scryfall.io/normal/front/f/f/ff08e5ed-f47b-4d8e-8b8b-41675dccef8b.jpg" },
    ]
  },
  { 
    type: "upgradePack", 
    name: "Power Boost Pack", 
    cards: [
      { id: "p3", name: "Pack Card 3", type: "Artifact", image: "https://cards.scryfall.io/normal/front/d/6/d6914dba-0d27-4055-ac34-b3ebf5802221.jpg" },
    ]
  },
];

const mockBeautifyCards = [
  { id: "b1", name: "Showcase Commander", type: "Legendary Creature", image: "https://cards.scryfall.io/normal/front/d/6/d6914dba-0d27-4055-ac34-b3ebf5802221.jpg", variant: "Borderless" },
];

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
            
            <TooltipProvider>
              <Tabs defaultValue="cards" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="cards">Cards</TabsTrigger>
                  <TabsTrigger value="packs">Packs</TabsTrigger>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger value="beautify">Beautify</TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Make your deck fabulous</p>
                    </TooltipContent>
                  </Tooltip>
                </TabsList>

                <TabsContent value="cards" className="mt-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {mockUpgradeCards.map((card) => (
                      <Card key={card.id} className="overflow-hidden hover-scale">
                        <img 
                          src={card.image} 
                          alt={card.name}
                          className="w-full h-auto object-cover"
                        />
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="packs" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockPacks.map((pack, idx) => (
                      <Dialog key={idx}>
                        <DialogTrigger asChild>
                          <Card className="group cursor-pointer hover-scale transition-all duration-300 hover:shadow-xl border-2 hover:border-primary/50">
                            <CardContent className="p-8 flex flex-col items-center gap-4">
                              <Folder className="w-20 h-20 text-primary group-hover:text-accent transition-colors" />
                              <div className="text-center">
                                <h3 className="font-bold text-lg">{pack.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {pack.cards.length} cards
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh]">
                          <DialogHeader>
                            <DialogTitle>{pack.name}</DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="h-[60vh] pr-4">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                              {pack.cards.map((card) => (
                                <div key={card.id} className="space-y-2">
                                  <img 
                                    src={card.image} 
                                    alt={card.name}
                                    className="w-full h-auto object-cover rounded-lg"
                                  />
                                  <p className="text-sm font-medium text-center">{card.name}</p>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="beautify" className="mt-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {mockBeautifyCards.map((card) => (
                      <Card key={card.id} className="overflow-hidden hover-scale">
                        <div className="relative">
                          <img 
                            src={card.image} 
                            alt={card.name}
                            className="w-full h-auto object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                            {card.variant}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreconDetail;
