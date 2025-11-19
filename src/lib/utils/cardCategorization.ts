export interface CardType {
  supertype: string;
  subtypes: string[];
  category: string;
}

export function parseCardType(typeLine: string): CardType {
  // Split on " — " to separate supertypes from subtypes
  const parts = typeLine.split(' — ');
  const supertypesRaw = parts[0].trim();
  const subtypes = parts[1] ? parts[1].split(' ').filter(Boolean) : [];
  
  // Split supertypes (e.g., "Legendary Artifact Creature" -> ["Legendary", "Artifact", "Creature"])
  const supertypes = supertypesRaw.split(' ').filter(Boolean);
  
  // Determine category based on priority rules
  let category = 'Other';
  
  // Remove "Legendary" from consideration
  const typesForCategorization = supertypes.filter(
    type => type.toLowerCase() !== 'legendary'
  );
  
  // Priority: Land > Creature > other types
  if (typesForCategorization.some(t => t.toLowerCase() === 'land')) {
    category = 'Lands';
  } else if (typesForCategorization.some(t => t.toLowerCase() === 'creature')) {
    category = 'Creatures';
  } else if (typesForCategorization.some(t => t.toLowerCase() === 'artifact')) {
    category = 'Artifacts';
  } else if (typesForCategorization.some(t => t.toLowerCase() === 'enchantment')) {
    category = 'Enchantments';
  } else if (typesForCategorization.some(t => t.toLowerCase() === 'planeswalker')) {
    category = 'Planeswalkers';
  } else if (typesForCategorization.some(t => t.toLowerCase() === 'instant')) {
    category = 'Instants';
  } else if (typesForCategorization.some(t => t.toLowerCase() === 'sorcery')) {
    category = 'Sorceries';
  } else if (typesForCategorization.some(t => t.toLowerCase() === 'battle')) {
    category = 'Battles';
  }
  
  return {
    supertype: supertypesRaw,
    subtypes,
    category,
  };
}

export interface CategorizedCard {
  name: string;
  count: number;
  image_url: string;
  type_line: string;
}

export interface CardCategory {
  name: string;
  icon: string;
  cards: CategorizedCard[];
  totalCount: number;
}

export function categorizeCards(cards: Array<{ name: string; type_line: string; image_url: string }>): CardCategory[] {
  const categoryMap = new Map<string, Map<string, CategorizedCard>>();
  
  // Group cards by category and count duplicates
  cards.forEach(card => {
    const { category } = parseCardType(card.type_line);
    
    if (!categoryMap.has(category)) {
      categoryMap.set(category, new Map());
    }
    
    const categoryCards = categoryMap.get(category)!;
    
    if (categoryCards.has(card.name)) {
      categoryCards.get(card.name)!.count++;
    } else {
      categoryCards.set(card.name, {
        name: card.name,
        count: 1,
        image_url: card.image_url,
        type_line: card.type_line,
      });
    }
  });
  
  // Convert to sorted array with icons
  const categoryIcons: Record<string, string> = {
    'Creatures': '🗡️',
    'Instants': '⚡',
    'Sorceries': '🔥',
    'Enchantments': '✨',
    'Artifacts': '⚙️',
    'Planeswalkers': '👤',
    'Lands': '🏔️',
    'Battles': '⚔️',
    'Other': '📦',
  };
  
  const categoryOrder = ['Creatures', 'Instants', 'Sorceries', 'Enchantments', 'Artifacts', 'Planeswalkers', 'Lands', 'Battles', 'Other'];
  
  const result: CardCategory[] = [];
  
  categoryOrder.forEach(categoryName => {
    if (categoryMap.has(categoryName)) {
      const cards = Array.from(categoryMap.get(categoryName)!.values())
        .sort((a, b) => a.name.localeCompare(b.name));
      
      result.push({
        name: categoryName,
        icon: categoryIcons[categoryName] || '📦',
        cards,
        totalCount: cards.reduce((sum, card) => sum + card.count, 0),
      });
    }
  });
  
  return result;
}
