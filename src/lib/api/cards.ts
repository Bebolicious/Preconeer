import { supabase, type Card } from '@/lib/supabase';

export const cardsApi = {
  // Fetch all cards
  async fetchAllCards(): Promise<Card[]> {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Fetch a single card by ID
  async fetchCardById(id: number): Promise<Card | null> {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Fetch cards by name (search)
  async searchCardsByName(name: string): Promise<Card[]> {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .ilike('name', `%${name}%`)
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Add a new card
  async addCard(card: Omit<Card, 'id' | 'created_at'>): Promise<Card> {
    const { data, error } = await supabase
      .from('cards')
      .insert([card])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Add multiple cards
  async addCards(cards: Omit<Card, 'id' | 'created_at'>[]): Promise<Card[]> {
    const { data, error } = await supabase
      .from('cards')
      .insert(cards)
      .select();

    if (error) throw error;
    return data || [];
  },
};
