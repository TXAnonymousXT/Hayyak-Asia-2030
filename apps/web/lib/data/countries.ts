export interface Country {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  region: 'east-asia' | 'south-asia' | 'southeast-asia' | 'west-asia' | 'central-asia';
  capital: string;
  population: string;
  language: string;
  currency: string;
  description: string;
  highlights: string[];
  traditions: { name: string; description: string }[];
  cuisine: { name: string; description: string; emoji: string }[];
  sports: string[];
  athletes: { name: string; sport: string; achievement: string }[];
  facts: string[];
}

export const countries: Country[] = [
  {
    id: 'qatar',
    name: 'Qatar',
    nativeName: 'قطر',
    flag: '🇶🇦',
    region: 'west-asia',
    capital: 'Doha',
    population: '2.9 million',
    language: 'Arabic',
    currency: 'Qatari Riyal (QAR)',
    description: 'Qatar, the host nation of the 2030 Asian Games, is a peninsula in the Persian Gulf known for its futuristic skyline, traditional markets, and warm hospitality. The word "Hayyak" means "Welcome" in Qatari Arabic.',
    highlights: ['Museum of Islamic Art', 'Souq Waqif', 'The Pearl-Qatar', 'Katara Cultural Village', 'Desert Safari'],
    traditions: [
      { name: 'Majlis', description: 'Traditional gathering place for socializing and discussing community matters' },
      { name: 'Arabic Coffee', description: 'Serving gahwa (Arabic coffee) with dates is a symbol of hospitality' },
      { name: 'Falconry', description: 'Ancient hunting tradition and national sport, symbol of Bedouin heritage' },
    ],
    cuisine: [
      { name: 'Machboos', description: 'Spiced rice with meat, the national dish of Qatar', emoji: '🍚' },
      { name: 'Harees', description: 'Wheat and meat porridge, popular during Ramadan', emoji: '🥣' },
      { name: 'Luqaimat', description: 'Sweet fried dumplings drizzled with date syrup', emoji: '🍩' },
    ],
    sports: ['Football', 'Camel Racing', 'Falconry', 'Tennis', 'Golf'],
    athletes: [
      { name: 'Mutaz Essa Barshim', sport: 'High Jump', achievement: 'Olympic Gold Medalist' },
      { name: 'Femi Ogunode', sport: 'Sprinting', achievement: 'Asian Games Gold Medalist' },
    ],
    facts: ['Qatar will host the first Asian Games in the Gulf region', 'Doha hosted the 2006 Asian Games', 'Qatar has the highest GDP per capita in the world'],
  },
  {
    id: 'japan',
    name: 'Japan',
    nativeName: '日本',
    flag: '🇯🇵',
    region: 'east-asia',
    capital: 'Tokyo',
    population: '125 million',
    language: 'Japanese',
    currency: 'Japanese Yen (¥)',
    description: 'Japan seamlessly blends ancient traditions with cutting-edge technology. From serene temples to bustling cities, Japan offers a unique cultural experience that has captivated the world.',
    highlights: ['Mount Fuji', 'Kyoto Temples', 'Tokyo Tower', 'Cherry Blossoms', 'Traditional Onsen'],
    traditions: [
      { name: 'Tea Ceremony', description: 'Ceremonial preparation and presentation of matcha green tea' },
      { name: 'Hanami', description: 'The traditional custom of enjoying the beauty of cherry blossoms' },
      { name: 'Matsuri', description: 'Traditional festivals celebrating seasons and local deities' },
    ],
    cuisine: [
      { name: 'Sushi', description: 'Fresh fish and seafood on vinegared rice', emoji: '🍣' },
      { name: 'Ramen', description: 'Noodles in savory broth with various toppings', emoji: '🍜' },
      { name: 'Tempura', description: 'Lightly battered and deep-fried seafood and vegetables', emoji: '🍤' },
    ],
    sports: ['Baseball', 'Sumo', 'Judo', 'Karate', 'Kendo'],
    athletes: [
      { name: 'Yuzuru Hanyu', sport: 'Figure Skating', achievement: 'Two-time Olympic Gold Medalist' },
      { name: 'Naomi Osaka', sport: 'Tennis', achievement: 'Four-time Grand Slam Champion' },
      { name: 'Shohei Ohtani', sport: 'Baseball', achievement: 'MLB MVP' },
    ],
    facts: ['Japan has hosted the Asian Games twice (1958, 1994)', 'Has won the most medals in Asian Games history', 'Home to over 100,000 Shinto shrines'],
  },
  {
    id: 'china',
    name: 'China',
    nativeName: '中国',
    flag: '🇨🇳',
    region: 'east-asia',
    capital: 'Beijing',
    population: '1.4 billion',
    language: 'Mandarin Chinese',
    currency: 'Chinese Yuan (¥)',
    description: 'China, with its 5,000-year-old civilization, offers an incredible journey through ancient history and modern innovation. From the Great Wall to modern megacities, China\'s diversity is unmatched.',
    highlights: ['Great Wall of China', 'Forbidden City', 'Terracotta Army', 'Li River', 'Shanghai Skyline'],
    traditions: [
      { name: 'Chinese New Year', description: 'The most important traditional festival celebrating the lunar new year' },
      { name: 'Dragon Boat Festival', description: 'Racing dragon boats and eating zongzi rice dumplings' },
      { name: 'Mid-Autumn Festival', description: 'Family reunions under the full moon with mooncakes' },
    ],
    cuisine: [
      { name: 'Peking Duck', description: 'Crispy roasted duck served with pancakes and hoisin sauce', emoji: '🦆' },
      { name: 'Dim Sum', description: 'Variety of small dishes served in steamer baskets', emoji: '🥟' },
      { name: 'Kung Pao Chicken', description: 'Spicy stir-fried chicken with peanuts', emoji: '🍗' },
    ],
    sports: ['Table Tennis', 'Badminton', 'Diving', 'Gymnastics', 'Wushu'],
    athletes: [
      { name: 'Ma Long', sport: 'Table Tennis', achievement: 'Five-time World Champion' },
      { name: 'Lin Dan', sport: 'Badminton', achievement: 'Two-time Olympic Gold Medalist' },
      { name: 'Yao Ming', sport: 'Basketball', achievement: 'NBA All-Star, Hall of Famer' },
    ],
    facts: ['China has hosted the Asian Games three times', 'Dominates diving and table tennis globally', 'Invented gunpowder, paper, printing, and the compass'],
  },
  {
    id: 'south-korea',
    name: 'South Korea',
    nativeName: '대한민국',
    flag: '🇰🇷',
    region: 'east-asia',
    capital: 'Seoul',
    population: '52 million',
    language: 'Korean',
    currency: 'South Korean Won (₩)',
    description: 'South Korea is a dynamic nation where K-pop meets traditional palaces, and cutting-edge technology coexists with ancient customs. The Korean Wave has spread its culture globally.',
    highlights: ['Gyeongbokgung Palace', 'Bukchon Hanok Village', 'Jeju Island', 'DMZ', 'Myeongdong'],
    traditions: [
      { name: 'Chuseok', description: 'Korean harvest festival celebrating ancestors and family' },
      { name: 'Seollal', description: 'Korean New Year with traditional games and food' },
      { name: 'Hanbok', description: 'Traditional Korean clothing worn on special occasions' },
    ],
    cuisine: [
      { name: 'Kimchi', description: 'Fermented vegetables, a staple in every Korean meal', emoji: '🥬' },
      { name: 'Bibimbap', description: 'Mixed rice bowl with vegetables, meat, and gochujang', emoji: '🍚' },
      { name: 'Korean BBQ', description: 'Grilled meat at the table with various side dishes', emoji: '🥩' },
    ],
    sports: ['Taekwondo', 'Archery', 'Short Track Speed Skating', 'Esports', 'Baseball'],
    athletes: [
      { name: 'Kim Yuna', sport: 'Figure Skating', achievement: 'Olympic Gold Medalist' },
      { name: 'Son Heung-min', sport: 'Football', achievement: 'Premier League Golden Boot Winner' },
      { name: 'Lee Dae-hoon', sport: 'Taekwondo', achievement: 'Multiple World Champion' },
    ],
    facts: ['Hosted the 2014 Asian Games in Incheon', 'Birthplace of Taekwondo', 'K-pop industry worth over $10 billion'],
  },
  {
    id: 'india',
    name: 'India',
    nativeName: 'भारत',
    flag: '🇮🇳',
    region: 'south-asia',
    capital: 'New Delhi',
    population: '1.4 billion',
    language: 'Hindi, English, +21 official languages',
    currency: 'Indian Rupee (₹)',
    description: 'India is a land of incredible diversity - from the Himalayan peaks to tropical beaches, from ancient temples to modern tech hubs. Its rich heritage spans thousands of years.',
    highlights: ['Taj Mahal', 'Jaipur Pink City', 'Kerala Backwaters', 'Varanasi Ghats', 'Golden Temple'],
    traditions: [
      { name: 'Diwali', description: 'Festival of Lights celebrating the victory of good over evil' },
      { name: 'Holi', description: 'Festival of Colors celebrating spring and love' },
      { name: 'Yoga', description: 'Ancient practice of physical, mental, and spiritual disciplines' },
    ],
    cuisine: [
      { name: 'Biryani', description: 'Fragrant spiced rice with meat or vegetables', emoji: '🍚' },
      { name: 'Butter Chicken', description: 'Creamy tomato-based curry with tender chicken', emoji: '🍗' },
      { name: 'Masala Dosa', description: 'Crispy crepe filled with spiced potatoes', emoji: '🥞' },
    ],
    sports: ['Cricket', 'Hockey', 'Kabaddi', 'Badminton', 'Wrestling'],
    athletes: [
      { name: 'Neeraj Chopra', sport: 'Javelin Throw', achievement: 'Olympic Gold Medalist' },
      { name: 'PV Sindhu', sport: 'Badminton', achievement: 'Two-time Olympic Medalist' },
      { name: 'Virat Kohli', sport: 'Cricket', achievement: 'One of the greatest batsmen' },
    ],
    facts: ['India has the most diverse medal count at Asian Games', 'Birthplace of chess, yoga, and zero', 'Has 22 official languages'],
  },
  {
    id: 'thailand',
    name: 'Thailand',
    nativeName: 'ประเทศไทย',
    flag: '🇹🇭',
    region: 'southeast-asia',
    capital: 'Bangkok',
    population: '70 million',
    language: 'Thai',
    currency: 'Thai Baht (฿)',
    description: 'Known as the "Land of Smiles," Thailand enchants visitors with its ornate temples, tropical beaches, and world-famous cuisine. Thai hospitality is legendary.',
    highlights: ['Grand Palace', 'Phi Phi Islands', 'Chiang Mai Temples', 'Floating Markets', 'Ayutthaya'],
    traditions: [
      { name: 'Songkran', description: 'Thai New Year water festival in April' },
      { name: 'Loy Krathong', description: 'Festival of Lights floating lanterns on water' },
      { name: 'Wai Greeting', description: 'Traditional Thai greeting with palms pressed together' },
    ],
    cuisine: [
      { name: 'Pad Thai', description: 'Stir-fried rice noodles with shrimp and peanuts', emoji: '🍜' },
      { name: 'Tom Yum Goong', description: 'Spicy and sour shrimp soup', emoji: '🍲' },
      { name: 'Green Curry', description: 'Coconut-based curry with Thai basil', emoji: '🍛' },
    ],
    sports: ['Muay Thai', 'Football', 'Badminton', 'Volleyball', 'Sepak Takraw'],
    athletes: [
      { name: 'Panipak Wongpattanakit', sport: 'Taekwondo', achievement: 'Olympic Gold Medalist' },
      { name: 'Ratchanok Intanon', sport: 'Badminton', achievement: 'World Champion' },
    ],
    facts: ['Bangkok hosted the first Asian Games in 1966', 'Muay Thai is the national sport', 'Thailand has never been colonized'],
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    nativeName: 'Indonesia',
    flag: '🇮🇩',
    region: 'southeast-asia',
    capital: 'Jakarta',
    population: '275 million',
    language: 'Indonesian',
    currency: 'Indonesian Rupiah (Rp)',
    description: 'The world\'s largest archipelago with over 17,000 islands, Indonesia offers incredible biodiversity, from Komodo dragons to orangutans, and rich cultural traditions.',
    highlights: ['Bali Temples', 'Komodo National Park', 'Borobudur Temple', 'Raja Ampat', 'Mount Bromo'],
    traditions: [
      { name: 'Batik Making', description: 'Traditional fabric dyeing technique, UNESCO heritage' },
      { name: 'Wayang Puppet Shows', description: 'Traditional shadow puppet performances' },
      { name: 'Gamelan Music', description: 'Traditional ensemble music with gongs and metallophones' },
    ],
    cuisine: [
      { name: 'Nasi Goreng', description: 'Indonesian fried rice with sweet soy sauce', emoji: '🍳' },
      { name: 'Satay', description: 'Grilled meat skewers with peanut sauce', emoji: '🍢' },
      { name: 'Rendang', description: 'Slow-cooked spicy beef, voted world\'s best dish', emoji: '🥘' },
    ],
    sports: ['Badminton', 'Football', 'Pencak Silat', 'Weightlifting', 'Archery'],
    athletes: [
      { name: 'Greysia Polii & Apriyani Rahayu', sport: 'Badminton', achievement: 'Olympic Gold Medalists' },
      { name: 'Eko Yuli Irawan', sport: 'Weightlifting', achievement: 'Multiple Olympic Medalist' },
    ],
    facts: ['Jakarta hosted the 2018 Asian Games', 'World\'s largest Muslim-majority country', 'Has the second-highest level of biodiversity'],
  },
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia',
    nativeName: 'المملكة العربية السعودية',
    flag: '🇸🇦',
    region: 'west-asia',
    capital: 'Riyadh',
    population: '35 million',
    language: 'Arabic',
    currency: 'Saudi Riyal (SAR)',
    description: 'The birthplace of Islam and home to its two holiest cities, Saudi Arabia is undergoing a remarkable transformation while preserving its rich heritage and traditions.',
    highlights: ['Mecca & Medina', 'Al-Ula Ancient City', 'Edge of the World', 'Red Sea Coast', 'Diriyah'],
    traditions: [
      { name: 'Hajj Pilgrimage', description: 'Annual Islamic pilgrimage to Mecca' },
      { name: 'Arabic Hospitality', description: 'Generous welcome with coffee and dates' },
      { name: 'Ardah Dance', description: 'Traditional sword dance performed at celebrations' },
    ],
    cuisine: [
      { name: 'Kabsa', description: 'Spiced rice with meat, the national dish', emoji: '🍚' },
      { name: 'Mandi', description: 'Rice and meat cooked in underground oven', emoji: '🍖' },
      { name: 'Dates', description: 'Premium dates, especially Ajwa and Medjool', emoji: '🌴' },
    ],
    sports: ['Football', 'Camel Racing', 'Falconry', 'Horse Racing', 'Motor Sports'],
    athletes: [
      { name: 'Yasser Al-Qahtani', sport: 'Football', achievement: 'Asian Cup Winner' },
      { name: 'Hadi Soua\'an', sport: 'Athletics', achievement: 'Olympic Silver Medalist' },
    ],
    facts: ['Will host the 2034 Asian Games', 'Home to the world\'s largest sand desert', 'Vision 2030 is transforming tourism'],
  },
  {
    id: 'iran',
    name: 'Iran',
    nativeName: 'ایران',
    flag: '🇮🇷',
    region: 'west-asia',
    capital: 'Tehran',
    population: '87 million',
    language: 'Persian (Farsi)',
    currency: 'Iranian Rial (IRR)',
    description: 'Iran, ancient Persia, is a treasure trove of history with stunning architecture, poetry, and hospitality. Persian culture has influenced art, science, and literature worldwide.',
    highlights: ['Persepolis', 'Isfahan Mosques', 'Shiraz Gardens', 'Yazd Old Town', 'Tabriz Bazaar'],
    traditions: [
      { name: 'Nowruz', description: 'Persian New Year celebrating spring equinox' },
      { name: 'Yalda Night', description: 'Winter solstice celebration with poetry and pomegranates' },
      { name: 'Ta\'arof', description: 'Complex system of politeness and hospitality' },
    ],
    cuisine: [
      { name: 'Chelo Kabab', description: 'Saffron rice with grilled kebabs', emoji: '🍢' },
      { name: 'Ghormeh Sabzi', description: 'Herb stew with kidney beans and lamb', emoji: '🥘' },
      { name: 'Tahdig', description: 'Crispy golden rice crust', emoji: '🍚' },
    ],
    sports: ['Wrestling', 'Football', 'Weightlifting', 'Volleyball', 'Polo'],
    athletes: [
      { name: 'Hassan Yazdani', sport: 'Wrestling', achievement: 'Olympic Gold Medalist' },
      { name: 'Behdad Salimi', sport: 'Weightlifting', achievement: 'Olympic Gold Medalist' },
    ],
    facts: ['Iran has hosted the Asian Games twice (1974)', 'Wrestling is the most successful Olympic sport', 'Persian is one of the oldest languages still spoken'],
  },
  {
    id: 'philippines',
    name: 'Philippines',
    nativeName: 'Pilipinas',
    flag: '🇵🇭',
    region: 'southeast-asia',
    capital: 'Manila',
    population: '114 million',
    language: 'Filipino, English',
    currency: 'Philippine Peso (₱)',
    description: 'An archipelago of 7,641 islands, the Philippines is known for pristine beaches, warm hospitality, and a unique blend of Asian and Western cultures.',
    highlights: ['Boracay Beach', 'Palawan', 'Chocolate Hills', 'Intramuros', 'Banaue Rice Terraces'],
    traditions: [
      { name: 'Sinulog Festival', description: 'Grand festival honoring the Santo Niño' },
      { name: 'Bayanihan', description: 'Community spirit of helping neighbors' },
      { name: 'Mano Po', description: 'Respectful greeting to elders by touching forehead' },
    ],
    cuisine: [
      { name: 'Adobo', description: 'Meat braised in vinegar, soy sauce, and garlic', emoji: '🍗' },
      { name: 'Lechon', description: 'Whole roasted pig, crispy and succulent', emoji: '🐷' },
      { name: 'Halo-Halo', description: 'Shaved ice dessert with various toppings', emoji: '🍧' },
    ],
    sports: ['Basketball', 'Boxing', 'Volleyball', 'Billiards', 'Arnis'],
    athletes: [
      { name: 'Manny Pacquiao', sport: 'Boxing', achievement: 'Eight-division World Champion' },
      { name: 'Hidilyn Diaz', sport: 'Weightlifting', achievement: 'First Filipino Olympic Gold Medalist' },
      { name: 'Carlos Yulo', sport: 'Gymnastics', achievement: 'World Champion' },
    ],
    facts: ['Basketball is the most popular sport', 'English is widely spoken', 'Known as the texting capital of the world'],
  },
];

export const getCountryById = (id: string): Country | undefined => {
  return countries.find(country => country.id === id);
};

export const getCountriesByRegion = (region: string): Country[] => {
  return countries.filter(country => country.region === region);
};
