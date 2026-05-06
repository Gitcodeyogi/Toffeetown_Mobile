export const TOWNS = [
  { id: 1,  name: 'Toffee Town',        emoji: '🏰', county: 'Nutwood County',   color: '#fbbf24', activity: 'Government',    slogan: 'Where every policy is caramel-coated.' },
  { id: 2,  name: 'Praline Port',       emoji: '⚓',  county: 'Nutwood County',   color: '#fbbf24', activity: 'Shipping',      slogan: 'The world\'s busiest nut-and-nougat hub.' },
  { id: 3,  name: 'Hazelnut Terrace',   emoji: '🌰', county: 'Nutwood County',   color: '#fbbf24', activity: 'Trading',       slogan: 'The nuttiest views and best trades in the realm.' },
  { id: 4,  name: 'Nougat Node',        emoji: '🍬', county: 'Nutwood County',   color: '#fbbf24', activity: 'Logistics',     slogan: 'The chewy hub of all roasted nut commerce.' },
  { id: 5,  name: 'Peanut Butter Falls',emoji: '🥜', county: 'Nutwood County',   color: '#fbbf24', activity: 'Hydro-Power',   slogan: 'Rapids of nutty adventure and roaring falls.' },
  { id: 6,  name: 'Peppermint Peak',    emoji: '⛰️', county: 'Creamwood County', color: '#c084fc', activity: 'Research',      slogan: 'Where frost meets the most minty delight.' },
  { id: 7,  name: 'Banoffee Valley',    emoji: '🍌', county: 'Creamwood County', color: '#c084fc', activity: 'Farming',       slogan: 'The tapestry of banana sweetness and creamy hills.' },
  { id: 8,  name: 'Creme Tunnels',      emoji: '💡', county: 'Creamwood County', color: '#c084fc', activity: 'Mining',        slogan: 'Glow of the subterranean dairy caverns.' },
  { id: 9,  name: 'Eclair Square',      emoji: '🥐', county: 'Creamwood County', color: '#c084fc', activity: 'Commerce',      slogan: 'The glitzy plaza of high pastry and fashion.' },
  { id: 10, name: 'Cocoa Canyon',       emoji: '🏜️', county: 'Cocoawood County', color: '#fb923c', activity: 'Exploration',   slogan: 'Ancient chocolate ruins hidden in the dust.' },
  { id: 11, name: 'Ganache Grove',      emoji: '🌳', county: 'Cocoawood County', color: '#fb923c', activity: 'Craft',         slogan: 'Forest of silky chocolate secrets.' },
  { id: 12, name: 'Lava Cake Lake',     emoji: '🌋', county: 'Cocoawood County', color: '#fb923c', activity: 'Hydro-Power',   slogan: 'Molten heart of dessert bliss.' },
  { id: 13, name: 'Butterscotch Bay',   emoji: '🚢', county: 'Cocoawood County', color: '#fb923c', activity: 'Port',          slogan: 'The golden gate to the cocoa sea.' },
  { id: 14, name: 'Honeycomb Heights',  emoji: '🐝', county: 'Honeywood County', color: '#4ade80', activity: 'Architecture',  slogan: 'Towers of amber cliffs and honeycomb spires.' },
  { id: 15, name: 'Caramel Cove',       emoji: '🏖️', county: 'Honeywood County', color: '#4ade80', activity: 'Tourism',       slogan: 'Surfing on sticky golden waves.' },
  { id: 16, name: 'Sprinkle Sands',     emoji: '🎨', county: 'Honeywood County', color: '#4ade80', activity: 'Recreation',    slogan: 'Rainbow shores of playful sugar and colour.' },
  { id: 17, name: 'Brownie Crossroads', emoji: '🍫', county: 'Honeywood County', color: '#4ade80', activity: 'Crossroads',    slogan: 'Where every path meets the bake.' },
];

export const COUNTIES = [
  { id: 1, name: 'Nutwood County',   emoji: '🌰', color: '#fbbf24', desc: 'Wholesome orchards of nutty delight.' },
  { id: 2, name: 'Creamwood County', emoji: '🍦', color: '#c084fc', desc: 'Cool peaks and creamy dreams.' },
  { id: 3, name: 'Cocoawood County', emoji: '🍫', color: '#fb923c', desc: 'Rich lands of molten chocolate.' },
  { id: 4, name: 'Honeywood County', emoji: '🍯', color: '#4ade80', desc: 'Golden shores of sweetness.' },
];

export const STORIES = [
  { id: 'S1', title: 'The Great Toffee Pull',  town: 'Toffee Town',    emoji: '🏰', desc: 'A sticky situation turns into a province-wide celebration of strength and sugar.' },
  { id: 'S2', title: 'The Praline Prophecy',   town: 'Praline Port',   emoji: '⚓',  desc: 'An ancient shell whispers secrets of a lost treasure hidden beneath the nougat tides.' },
  { id: 'S3', title: 'Ganache Grove Rescue',   town: 'Ganache Grove',  emoji: '🌳', desc: 'Milo must brave the silky chocolate forest to save a group of stranded explorers.' },
  { id: 'S4', title: 'Crest of the Caramel',   town: 'Peppermint Peak',emoji: '⛰️', desc: 'A legendary climber discovers a vein of pure gold-sugar at the highest peak.' },
  { id: 'S5', title: 'The Sprinkle Sparkle',   town: 'Sprinkle Sands', emoji: '🎨', desc: 'Lumi finds a magical crystal that changes colors based on the town\'s mood.' },
];

export const LEGENDS = [
  { id: 'L1', title: 'The Cocoa King',    county: 'Cocoawood County', emoji: '👑', desc: 'The first ruler of ChocoBrook who carved the realm from a giant cocoa pod.' },
  { id: 'L2', title: 'Minty the Ancient', county: 'Creamwood County', emoji: '🐲', desc: 'A dragon made of ice and peppermint who guards the high mountain passes.' },
  { id: 'L3', title: 'The Golden Tide',   county: 'Honeywood County', emoji: '🌅', desc: 'When the sea turned into liquid gold for one night, bringing luck to all.' },
  { id: 'L4', title: 'Caramel Guardian',  county: 'Nutwood County',   emoji: '🛡️', desc: 'A giant statue that comes to life to protect the province from intruders.' },
];

export const COUNTY_LEGENDS = [
  { id: 'L1', title: 'The Cocoa King',    county: 'Cocoawood County', emoji: '👑', desc: 'The first ruler of ChocoBrook who carved the realm from a giant cocoa pod.',    color: '#fb923c', runtime: '12m', genre: 'History', towns: ['Cocoa Canyon'] },
  { id: 'L2', title: 'Minty the Ancient', county: 'Creamwood County', emoji: '🐲', desc: 'A dragon made of ice and peppermint who guards the high mountain passes.',      color: '#c084fc', runtime: '15m', genre: 'Myth',    towns: ['Peppermint Peak'] },
  { id: 'L3', title: 'The Golden Tide',   county: 'Honeywood County', emoji: '🌅', desc: 'When the sea turned into liquid gold for one night, bringing luck to all.',     color: '#4ade80', runtime: '10m', genre: 'Fable',   towns: ['Sprinkle Sands'] },
  { id: 'L4', title: 'Caramel Guardian',  county: 'Nutwood County',   emoji: '🛡️', desc: 'A giant statue that comes to life to protect the province from intruders.',    color: '#fbbf24', runtime: '18m', genre: 'Action',  towns: ['Toffee Town'] },
];

export const BOSSES = [
  {
    id: 'b1', name: 'Mayor Pompelmoose', emoji: '🎩', role: 'Executive Leader', clan: 'Bosses', color: '#a855f7',
    image: '/Characters/Boss_Mayor_Pompelmooose.png',
    tagline: 'Prosperity through Administration!', quote: 'Prosperity is not merely achieved — it is administratively organized!',
    desc: 'Charismatic, theatrical, and deeply convinced that leadership needs excellent stage presence. He practices speeches in front of a mirror and applauds his own phrasing.',
    funFacts: ['Practices "The Executive Wink" daily.', 'Has a collection of 42 identical top hats.', 'Once tried to tax the wind.'],
    dialogues: ['A well-organized town is a happy town! Now, where is my mirror?'],
    stats: { influence: 95, righteousness: 10, mischief: 15, style: 95 }
  },
  {
    id: 'b2', name: 'Sheriff Stautwood', emoji: '🤠', role: 'High Enforcer', clan: 'Bosses', color: '#dc2626',
    tagline: 'Polishing the badge of Justice!', quote: 'Now son… you can explain this barrel… or we can wait while I polish my badge.',
    desc: 'Calm, disciplined, and built like a fortress that learned how to walk. He polishes his sheriff badge whenever thinking deeply.',
    stats: { influence: 90, righteousness: 85, mischief: 10, style: 75 }
  },
  {
    id: 'b3', name: 'Bramble Mortimer', emoji: '👨‍🍳', role: 'Grand Provisioner', clan: 'Bosses', color: '#f59e0b',
    tagline: 'Bread is the Foundation!', quote: 'No argument cannot be softened by a good cinnamon roll.',
    desc: 'A cheerful giant of a baker who believes bread is the foundation of civilization. Controls grain supply across the province.',
    stats: { influence: 85, righteousness: 80, mischief: 20, style: 60 }
  },
  {
    id: 'b4', name: 'Sir Goldwhistle', emoji: '📜', role: 'Tax Architect', clan: 'Bosses', color: '#eab308',
    tagline: 'Numbers are Poetry!', quote: 'This is not a new tax… merely an enhancement.',
    desc: 'Loves numbers with a passion normally reserved for music. Designs highly efficient (and annoying) taxation systems.',
    stats: { influence: 92, righteousness: 90, mischief: 5, style: 80 }
  },
  {
    id: 'b5', name: 'Lady Grimshade', emoji: '🔮', role: 'Arcane Strategist', clan: 'Bosses', color: '#4f46e5',
    image: '/Characters/Boss_Madam_Grimshade.png',
    tagline: 'Fascinated by Currents!', quote: 'Fascinating… this potion may stabilize the leyline… or turn us into pigeons.',
    desc: 'Observant and fascinated by magical currents. Her experiments occasionally produce glowing smoke or floating furniture.',
    stats: { influence: 85, righteousness: 90, mischief: 10, style: 40 }
  },
  {
    id: 'b6', name: 'Finley Syntax', emoji: '🎓', role: 'Strategic Analyst', clan: 'Bosses', color: '#6366f1',
    tagline: 'Statistically Speaking!', quote: 'Statistically speaking… this meeting will become confusing.',
    desc: 'Brilliant but absent-minded. Predicts trade trends with models, then forgets where he left the notes.',
    stats: { influence: 75, righteousness: 80, mischief: 5, style: 30 }
  },
  {
    id: 'b7', name: 'Marshal Frill', emoji: '💣', role: 'Artillery Commander', clan: 'Bosses', color: '#f97316',
    tagline: 'Boom with Elegance!', quote: 'Allow me to introduce Lady Butterscotch the Third!',
    desc: 'Enthusiastic and delighted by cannons. Names every artillery piece and introduces them proudly to visitors.',
    stats: { influence: 80, righteousness: 85, mischief: 40, style: 50 }
  },
  {
    id: 'b8', name: 'Marshal Qrill', emoji: '🚨', role: 'Field Warden', clan: 'Bosses', color: '#3b82f6',
    tagline: 'Suspicion is a Virtue!', quote: 'Interesting… and these twelve barrels contain… only pickles?',
    desc: 'Patient and suspicious. Treats every barrel as a puzzle waiting to reveal its secrets at the checkpoint.',
    stats: { influence: 78, righteousness: 92, mischief: 10, style: 40 }
  },
  {
    id: 'b9', name: 'Crumblewise', emoji: '🔨', role: 'Master Smith', clan: 'Bosses', color: '#78716c',
    tagline: 'Solved with Gears!', quote: 'What if we solved this problem with gears?',
    desc: 'A cheerful engineering genius who treats machinery the way artists treat paint. Builds gadgets during meetings.',
    stats: { influence: 82, righteousness: 75, mischief: 30, style: 60 }
  },
  {
    id: 'b10', name: 'Lady Flutterby', emoji: '🦋', role: 'Intelligence Matriarch', clan: 'Bosses', color: '#f472b6',
    tagline: 'Secrets like Flowers!', quote: 'Ah yes… you were about to mention the caravan delay.',
    desc: 'Graceful and perceptive. Collects secrets like flowers. Rumored to know what you will say before you say it.',
    stats: { influence: 88, righteousness: 70, mischief: 20, style: 90 }
  },
  {
    id: 'b11', name: 'Dr. Fossoway', emoji: '📋', role: 'Chief Advisor', clan: 'Bosses', color: '#ef4444',
    image: '/Characters/Boss_Dr. Stefon_Fossoway.png',
    tagline: 'Theoretical Recovery!', quote: 'Your recovery is proceeding within acceptable theoretical margins.',
    desc: 'The illusion of intelligence in action. Speaks like a book that forgot it is talking to actual humans.',
    stats: { influence: 85, righteousness: 75, mischief: 5, style: 90 }
  },
  {
    id: 'b12', name: 'Dottie Ticktockwell', emoji: '🔔', role: 'Curfew Warden', clan: 'Bosses', color: '#8b5cf6',
    image: '/Characters/Boss_Dottie_Ticktockwell.png',
    tagline: 'Rest is not Optional!', quote: 'You are 6 minutes past acceptable existence. Go home.',
    desc: 'The human embodiment of bedtime. Walks like a ticking clock and once fined a rooster for crowing early.',
    stats: { influence: 85, righteousness: 98, mischief: 5, style: 95 }
  }
];

export const REBELS = [
  {
    id: 'r1', name: 'Whiskerton', emoji: '🍵', role: 'Head Strategist', clan: 'Rebels', color: '#10b981',
    image: '/Characters/Rebel_Mastermind_Whiskerton.png',
    tagline: 'Checkmate is Patience!', quote: 'You planned today. I planned your tomorrow.',
    desc: 'The calm brain of the resistance. Takes a sip of tea before delivering devastatingly accurate conclusions.',
    stats: { influence: 85, righteousness: 90, mischief: 20, style: 50 }
  },
  {
    id: 'r2', name: 'Archer Chucklebop', emoji: '🏹', role: 'Field Executor', clan: 'Rebels', color: '#f59e0b',
    tagline: 'Accidental Genius!', quote: 'It looks like a joke... until it works.',
    desc: 'The spark that makes things happen. A prankster who turns every "Oops" into a victory. Animals follow him.',
    stats: { influence: 70, righteousness: 85, mischief: 95, style: 65 }
  },
  {
    id: 'r3', name: 'Fisherman Whimsley', emoji: '🛶', role: 'River Smuggler', clan: 'Rebels', color: '#0ea5e9',
    image: '/Characters/Rebel_Fisherman_Whimsley.png',
    tagline: 'River Teaches Patience!', quote: 'If you rush the current, you only end up wet.',
    desc: 'Keeper of quiet wisdom. Guided by dharma and the belief that doing the right thing matters most.',
    stats: { influence: 65, righteousness: 92, mischief: 65, style: 40 }
  },
  {
    id: 'r4', name: 'Tibbin Quickstep', emoji: '🏃', role: 'Lightning Messenger', clan: 'Rebels', color: '#3b82f6',
    image: '/Characters/Rebel_Tibbin_Quickstep.png',
    tagline: 'Wind with Shoes!', quote: 'Message delivered! Where do I run next?',
    desc: 'A whirlwind disguised as a boy. Messenger who reaches destinations in minutes using laundry lines.',
    stats: { influence: 40, righteousness: 70, mischief: 85, style: 55 }
  },
  {
    id: 'r5', name: 'Nella Nudgepot', emoji: '📓', role: 'Silent Recorder', clan: 'Rebels', color: '#8b5cf6',
    image: '/Characters/Rebel_Nella_Nudgepot.png',
    tagline: 'Saving what you said!', quote: 'You were speaking. I was saving it.',
    desc: 'The eyes and ears of the rebellion. Stands so still that people forget she is there. Keeps a shorthand notebook.',
    stats: { influence: 50, righteousness: 85, mischief: 30, style: 45 }
  },
  {
    id: 'r6', name: 'Lanternella Glowfern', emoji: '✨', role: 'Light Guardian', clan: 'Rebels', color: '#fbbf24',
    image: '/Characters/Rebel_Lanternella Glowfen.png',
    tagline: 'Light is Patient!', quote: 'Darkness is clever, but light is patient.',
    desc: 'Night Watcher and Scout. Her lantern reveals hidden traps and magical traces of the Bosses.',
    stats: { influence: 60, righteousness: 95, mischief: 40, style: 75 }
  },
  {
    id: 'r7', name: 'Bounce McDrizzle', emoji: '🎪', role: 'Chaos Specialist', clan: 'Rebels', color: '#ec4899',
    tagline: 'Glitter Cannon Logic!', quote: 'Don\'t worry, it only explodes a little.',
    desc: 'Inventor of Unnecessary Genius. Where some see obstacles, he sees glitter cannon opportunities.',
    stats: { influence: 45, righteousness: 50, mischief: 98, style: 80 }
  },
  {
    id: 'r8', name: 'Mrs. Petalworth', emoji: '🌸', role: 'The Velvet Spy', clan: 'Rebels', color: '#f472b6',
    image: '/Characters/Rebel_Madam petalworth.png',
    tagline: 'Flowers hear everything!', quote: 'Flowers hear everything… you simply have to listen carefully.',
    desc: 'Graceful flower merchant. Uses symbolic arrangements to signal messages to the Underground.',
    stats: { influence: 75, righteousness: 95, mischief: 70, style: 95 }
  },
  {
    id: 'r9', name: 'Timber Rowanridge', emoji: '🪵', role: 'Rebel Builder', clan: 'Rebels', color: '#d97706',
    tagline: 'Walls keep secrets!', quote: 'A good wall keeps secrets.',
    desc: 'Pathmaster who solves problems with tools and patience. Taps doorways three times for luck.',
    stats: { influence: 65, righteousness: 85, mischief: 15, style: 40 }
  },
  {
    id: 'r10', name: 'Beni Banana', emoji: '🍌', role: 'Organizer', clan: 'Rebels', color: '#fbbf24',
    tagline: 'Have a Banana!', quote: 'A hungry crowd is an unhappy crowd. Have a banana.',
    desc: 'Voice of the Orchards. Offering banana slices successfully ends most political arguments.',
    stats: { influence: 88, righteousness: 95, mischief: 10, style: 45 }
  },
  {
    id: 'r11', name: 'Greta Sweetloop', emoji: '🌀', role: 'Underground Courier', clan: 'Rebels', color: '#6366f1',
    tagline: 'Always three ways!', quote: 'There are always three ways through a city. Most notice one.',
    desc: 'Master of Routes. Uses colored ribbons to organize hidden paths without writing anything down.',
    stats: { influence: 60, righteousness: 80, mischief: 50, style: 55 }
  },
  {
    id: 'r12', name: 'Marmalade Merriweather', emoji: '🍯', role: 'People\'s Physician', clan: 'Rebels', color: '#f97316',
    tagline: 'Cure begins with listening!', quote: 'A good cure begins with listening.',
    desc: 'Relies on experience to cure citizens. Successfully cures patients Dr. Fossoway could not help.',
    stats: { influence: 92, righteousness: 98, mischief: 25, style: 45 }
  }
];

export const GAMES_LIST = [
  { id: 1, title: 'Toffee Town Racing',   emoji: '🏇', desc: 'Gallop through Nutwood County and dodge the caramel mud!', bg: 'linear-gradient(135deg, #fbbf24, #d97706)', color: '#fbbf24', badge: 'Popular' },
  { id: 2, title: 'Choco Tower Defense', emoji: '🏰', desc: 'Protect Cocoawood County from the rival candy raids!',     bg: 'linear-gradient(135deg, #f472b6, #db2777)', color: '#f472b6', badge: 'Action' },
  { id: 3, title: 'Sugar-stone Match',   emoji: '💎', desc: 'Match 3 magical crystals to unlock the Honeywood vault!',  bg: 'linear-gradient(135deg, #38bdf8, #0284c7)', color: '#38bdf8', badge: 'Puzzle' },
  { id: 4, title: 'Lumi\'s Riddle Run',  emoji: '🦊', desc: 'Answer the fox\'s riddles to find the hidden path!',       bg: 'linear-gradient(135deg, #4ade80, #16a34a)', color: '#4ade80', badge: 'Trivia' },
];

export const CHARACTERS = [...BOSSES, ...REBELS];
