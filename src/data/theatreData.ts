export type MediaType = 'image' | 'video';

export interface Story {
  id: string;
  title: string;      // Meaningful title like "The Royal Mint"
  synopsis: string;
  coverImage: string;
  mediaType: MediaType;
  mediaUrl: string;
  script?: string[];
}

export interface StoryCategory {
  id: string;
  title: string;
  stories: Story[];
}

const generateStories = (category: string): Story[] => {
  const contentMap: Record<string, any> = {
    'Legend': [
      { t: 'TFT', name: 'The Golden Soul', syn: 'The legend of the first golden toffee that glowed with the light of the morning sun.', img: '/Images/asher_glow.png' },
      { t: 'HZT', name: 'The Ancient Root', syn: 'Deep beneath the terraces lies the heart of the wild hazelnut forest.', img: '/Images/nella_nudgepot.png' },
      { t: 'PPT', name: 'The Minty Mist', syn: 'A pure and frosty tale of the peppermint dragon who guards the highest peaks.', img: '/Images/celia_shine.png' },
      { t: 'SST', name: 'The Star Spark', syn: 'Every sprinkle on the beach is a tiny wish fallen from a shooting star.', img: '/Images/milo_spark.png' },
      { t: 'BSB', name: 'The Amber Gift', syn: 'How a saintly act of kindness turned the bay into a sea of liquid butterscotch.', img: '/Images/projector_hero.png' },
    ],
    'Gossip': [
      { t: 'TFT', name: 'The Secret Sip', syn: 'A hush fell over the town when the mayor was seen drinking Cocoa instead of Tea!', img: '/Images/thesecretsip.png' },
      { t: 'HZT', name: 'The Hidden Leaf', syn: 'Whispers in the hazelnut leaves tell of a secret party deep in the woods.', img: '/Images/Thehiddenleaf.png' },
      { t: 'PPT', name: 'The Chilly Chat', syn: 'The peppermint penguins are having a very cool debate about the best ice flavor.', img: '/Images/projector_hero.png' },
      { t: 'SST', name: 'The Beach Buzz', syn: 'The sprinkle sands are glowing brighter tonight—is a star-party happening?', img: '/Images/projector_hero.png' },
      { t: 'BSB', name: 'The Sweet Leak', syn: 'Someone left the butterscotch tap running! The bay is sweeter than ever.', img: '/Images/projector_hero.png' },
    ],
    'Politics': [
      { t: 'TFT', name: 'The Toffee Rule', syn: 'The Nutwood Council is voting on who gets to wear the crown of the harvest.', img: '/Images/Politics_TFT.png' },
      { t: 'HZT', name: 'The Hard Shell', syn: 'The Hazelnut Knights are debating the new laws of the Terrace borders.', img: '/Images/Politics_HZT.png' },
      { t: 'PPT', name: 'The Frost Vote', syn: 'A chilling vote to decide if the Mint Festival should last for a whole month.', img: '/Images/Politics_PPT.png' },
      { t: 'SST', name: 'The Spark Deal', syn: 'Trading star-dust for moon-beams. A very bright political maneuver!', img: '/Images/Politics_SST.png' },
      { t: 'BSB', name: 'The Sweet Bond', syn: 'A new alliance between the Bay and the Peak has been signed in syrup.', img: '/Images/Politics_BSB.png' },
    ],
    'Economy': [
      { t: 'TFT', name: 'The Royal Mint', syn: 'The royal mint is busy pressing new golden coins for the summer trade.', img: '/Images/Economy_TFT.png' },
      { t: 'HZT', name: 'The Rich Crop', syn: 'The hazelnut crop is so bountiful that every kernel is worth its weight in gold.', img: '/Images/Economy_HZT.png' },
      { t: 'PPT', name: 'The Ice Trade', syn: 'Exporting fresh minty frost to the warmer counties of the kingdom.', img: '/Images/Economy_PPT.png' },
      { t: 'SST', name: 'The Sugar Rain', syn: 'A storm of sprinkles has brought unexpected wealth to the sandy shores.', img: '/Images/Economy_SST.png' },
      { t: 'BSB', name: 'The Amber Dew', syn: 'Collecting the morning dew from butterscotch leaves for the elite markets.', img: '/Images/Economy_BSB.png' },
    ],
    'Transport': [
      { t: 'TFT', name: 'The Sugar Rail', syn: 'The fastest sugar-powered locomotive in the realm is ready for boarding.', img: '/Images/Transport_TFT.png' },
      { t: 'HZT', name: 'The Owl Wing', syn: 'Flying across the terraces on the wings of the great hazelnut owls.', img: '/Images/Transport_HZT.png' },
      { t: 'PPT', name: 'The Mint Glide', syn: 'Gliding down the peppermint peaks on a sled made of polished ice.', img: '/Images/Transport_PPT.png' },
      { t: 'SST', name: 'The Cloud Sail', syn: 'Sailing through the sprinkle clouds on a ship made of light and air.', img: '/Images/Transport_SST.png' },
      { t: 'BSB', name: 'The Amber Wave', syn: 'Riding the sweet waves of Butterscotch Bay on a golden surfboard.', img: '/Images/Transport_BSB.png' }
    ]
  };

  const townData = contentMap[category] || [];

  return townData.map((item: any, i: number) => ({
    id: `${category.toLowerCase()}-${item.t.toLowerCase()}`,
    title: item.name,
    synopsis: item.syn,
    coverImage: item.img,
    mediaType: i % 2 === 0 ? 'video' : 'image',
    mediaUrl: item.img,
    script: [
      `A new ${category.toLowerCase()} is being recorded in ${item.t}...`,
      item.syn,
      "The legend continues in ChocoBrook."
    ]
  }));
};

export const theatreCategories: StoryCategory[] = [
  { id: 'legend-files', title: 'Legend Files', stories: generateStories('Legend') },
  { id: 'gossip-files', title: 'Gossip Files', stories: generateStories('Gossip') },
  { id: 'politics-files', title: 'Politics Files', stories: generateStories('Politics') },
  { id: 'economy-files', title: 'Economy Files', stories: generateStories('Economy') },
  { id: 'transport-files', title: 'Transport Files', stories: generateStories('Transport') }
];
