import cardRed from "@/assets/card-red.png";
import cardBlue from "@/assets/card-blue.png";
import cardGreen from "@/assets/card-green.png";
import cardWhite from "@/assets/card-white.png";
import cardBlack from "@/assets/card-black.png";

export interface Precon {
  id: string;
  name: string;
  colors: string;
  image: string;
  year: string;
  theme: string;
}

export const preconDecks: Precon[] = [
  {
    id: "draconic-rage",
    name: "Draconic Rage",
    colors: "R/G",
    image: cardRed,
    year: "2021",
    theme: "Dragon tribal with ramp and powerful finishers",
  },
  {
    id: "lorehold-legacies",
    name: "Lorehold Legacies",
    colors: "R/W",
    image: cardWhite,
    year: "2021",
    theme: "Graveyard recursion and artifact synergies",
  },
  {
    id: "quantum-quandrix",
    name: "Quantum Quandrix",
    colors: "U/G",
    image: cardBlue,
    year: "2021",
    theme: "Math-based magic with +1/+1 counters",
  },
  {
    id: "silverquill-statement",
    name: "Silverquill Statement",
    colors: "W/B",
    image: cardBlack,
    year: "2021",
    theme: "Political control with lifegain matters",
  },
  {
    id: "witherbloom-witchcraft",
    name: "Witherbloom Witchcraft",
    colors: "B/G",
    image: cardGreen,
    year: "2021",
    theme: "Life manipulation and sacrifice strategies",
  },
  {
    id: "prismari-performance",
    name: "Prismari Performance",
    colors: "U/R",
    image: cardRed,
    year: "2021",
    theme: "Instant and sorcery spellslinger",
  },
];
