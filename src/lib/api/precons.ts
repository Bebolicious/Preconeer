import { supabase } from '@/lib/supabase';

export type Precon = {
  id: number;
  created_at: string;
  name: string;
  description: string;
  precon_image: string;
  cards: Array<{
    id: number;
    scryfall_id: string;
    ammount: number;
    type: string;
  }>;
  reworks: any[];
  released_year: number;
};

export const preconsApi = {
  // Fetch all precons
  async fetchAllPrecons(): Promise<Precon[]> {
    const { data, error } = await supabase
      .from('precon')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Add a card to a precon's cards array
  async addCardToPrecon(
    preconId: number,
    cardData: { id: number; scryfall_id: string; ammount: number }
  ): Promise<void> {
    // First, get the current precon
    const { data: precon, error: fetchError } = await supabase
      .from('precon')
      .select('cards')
      .eq('id', preconId)
      .single();

    if (fetchError) throw fetchError;

    // Add the new card to the cards array
    const updatedCards = [...(precon.cards || []), cardData];

    // Update the precon with the new cards array
    const { error: updateError } = await supabase
      .from('precon')
      .update({ cards: updatedCards })
      .eq('id', preconId);

    if (updateError) throw updateError;
  },
};
