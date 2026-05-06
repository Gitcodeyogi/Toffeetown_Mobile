export interface TownData {
  id: string;
  name: string;
  slogan: string;
  tagline: string;
}

export interface CountyData {
  name: string;
  emoji: string;
  color: string;
  desc: string;
  towns: TownData[];
}

export const KINGDOM_DATA: CountyData[] = [
  { 
    name: 'Nutwood County', 
    emoji: '🌰', 
    color: '#fbbf24', 
    desc: 'Wholesome orchards of nutty delight',
    towns: [
      { id: 'hazelnut-terrace', name: 'Hazelnut Terrace', tagline: 'The nuttiest view in the realm', slogan: 'Layers of nutty elegance.' },
      { id: 'peanut-butter-falls', name: 'Peanut Butter Falls', tagline: 'Rapids of nutty adventure', slogan: 'Rapids of nutty adventure.' },
      { id: 'nougat-node', name: 'Nougat Node', tagline: 'The chewy hub of roasted nuts', slogan: 'The chewy hub of roasted nuts.' },
      { id: 'praline-port', name: 'Praline Port', tagline: 'The sea gate of nutty treasures', slogan: 'The docks of nutty delights.' }
    ]
  },
  { 
    name: 'Creamwood County', 
    emoji: '🍦', 
    color: '#c084fc', 
    desc: 'Cool peaks and creamy dreams',
    towns: [
      { id: 'peppermint-peak', name: 'Peppermint Peak', tagline: 'Where frost meets mint delight', slogan: 'Where frost meets mint delight.' },
      { id: 'banoffee-valley', name: 'Banoffee Valley', tagline: 'The tapestry of banana sweetness', slogan: 'The valley of banana-toffee sweetness.' },
      { id: 'creme-tunnels', name: 'Creme Tunnels', tagline: 'Glow of the subterranean dairy', slogan: 'Glow of creamy caves.' },
      { id: 'eclair-square', name: 'Eclair Square', tagline: 'The glitzy plaza of high pastry', slogan: 'Pastry paths filled with joy.' }
    ]
  },
  { 
    name: 'Cocoawood County', 
    emoji: '🍫', 
    color: '#fb923c', 
    desc: 'Rich lands of molten chocolate',
    towns: [
      { id: 'ganache-grove', name: 'Ganache Grove', tagline: 'Forest of silky chocolate secrets', slogan: 'Forest of silky chocolate secrets.' },
      { id: 'cocoa-canyon', name: 'Cocoa Canyon', tagline: 'Mines of the richest mocha veins', slogan: 'Mines of the richest cocoa veins.' },
      { id: 'lava-cake-lake', name: 'Lava Cake Lake', tagline: 'Molten heart of dessert bliss', slogan: 'Molten heart of dessert bliss.' },
      { id: 'butterscotch-bay', name: 'Butterscotch Bay', tagline: 'The golden gate to the cocoa sea', slogan: 'Golden waves of caramel delight.' }
    ]
  },
  { 
    name: 'Honeywood County', 
    emoji: '🍯', 
    color: '#4ade80', 
    desc: 'Golden shores of sweetness',
    towns: [
      { id: 'honeycomb-heights', name: 'Honeycomb Heights', tagline: 'Towers of amber cliffs', slogan: 'Towers of golden sweetness.' },
      { id: 'caramel-cove', name: 'Caramel Cove', tagline: 'Surfing on sticky golden waves', slogan: 'Surfing on sticky golden waves.' },
      { id: 'sprinkle-sands', name: 'Sprinkle Sands', tagline: 'Rainbow shores of playful sugar', slogan: 'Rainbow shores of playful sweetness.' },
      { id: 'brownie-crossroads', name: 'Brownie Crossroads', tagline: 'Where every path meet the bake', slogan: 'Where all paths crumble meet.' }
    ]
  }
];
