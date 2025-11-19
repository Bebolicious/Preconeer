import { useState } from "react";
import { Card } from "@/lib/supabase";
import { categorizeCards, CardCategory } from "@/lib/utils/cardCategorization";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface DeckCardsSectionProps {
  cards: Card[];
}

export const DeckCardsSection = ({ cards }: DeckCardsSectionProps) => {
  const categories = categorizeCards(cards);
  
  if (cards.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No cards found for this deck yet.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryColumn key={category.name} category={category} />
      ))}
    </div>
  );
};

interface CategoryColumnProps {
  category: CardCategory;
}

const CategoryColumn = ({ category }: CategoryColumnProps) => {
  return (
    <div className="space-y-3">
      {/* Category Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <span className="text-xl">{category.icon}</span>
        <h3 className="text-lg font-bold text-foreground">
          {category.name} ({category.totalCount})
        </h3>
      </div>
      
      {/* Card List */}
      <div className="space-y-1">
        {category.cards.map((card) => (
          <HoverCard key={card.name} openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer">
                <span className="text-sm font-medium text-muted-foreground min-w-[1.5rem]">
                  {card.count}
                </span>
                <span className="text-sm text-foreground flex-1">
                  {card.name}
                </span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent side="right" className="w-auto p-1 border-primary/20">
              <img
                src={card.image_url}
                alt={card.name}
                className="w-64 rounded-md shadow-lg"
                loading="lazy"
              />
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};
