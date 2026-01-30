export interface Venue {
  id: string;
  name: string;
  type: string;
  typeEmoji: string;
  description: string;
  capacity: number;
  sports: string[];
  address: string;
  coordinates: { lat: number; lng: number };
  facilities: string[];
  accessibility: string[];
  image?: string;
}

export const venues: Venue[] = [
  {
    id: 'venue-001',
    name: 'Lusail Stadium',
    type: 'Stadium',
    typeEmoji: '🏟️',
    description: 'The iconic Lusail Stadium, centerpiece of Qatar\'s sporting infrastructure. This magnificent venue hosted the FIFA World Cup 2022 final and will be the main venue for athletics and football at the 2030 Asian Games.',
    capacity: 80000,
    sports: ['Football', 'Athletics'],
    address: 'Lusail City, Qatar',
    coordinates: { lat: 25.4195, lng: 51.4904 },
    facilities: ['VIP Lounges', 'Food Courts', 'First Aid', 'Prayer Rooms', 'Family Areas', 'Parking'],
    accessibility: ['Wheelchair Access', 'Accessible Parking', 'Elevators', 'Audio Description', 'Sign Language'],
  },
  {
    id: 'venue-002',
    name: 'Aquatics Center',
    type: 'Aquatic Center',
    typeEmoji: '🏊',
    description: 'State-of-the-art aquatics facility featuring Olympic-size pools for swimming, diving, and water polo. Equipped with the latest timing systems and underwater cameras.',
    capacity: 15000,
    sports: ['Swimming', 'Diving', 'Water Polo'],
    address: 'Aspire Zone, Doha, Qatar',
    coordinates: { lat: 25.2631, lng: 51.4484 },
    facilities: ['Olympic Pool', 'Diving Pool', 'Warm-up Pool', 'Spectator Areas', 'Media Center'],
    accessibility: ['Wheelchair Access', 'Accessible Seating', 'Elevators', 'Braille Signage'],
  },
  {
    id: 'venue-003',
    name: 'Sports Arena',
    type: 'Arena',
    typeEmoji: '🏀',
    description: 'Multi-purpose indoor arena perfect for basketball, volleyball, handball, and badminton. Features retractable seating and world-class acoustics.',
    capacity: 20000,
    sports: ['Basketball', 'Volleyball', 'Handball', 'Badminton'],
    address: 'Al Rayyan, Qatar',
    coordinates: { lat: 25.2686, lng: 51.4348 },
    facilities: ['VIP Boxes', 'Restaurants', 'Team Rooms', 'Press Conference Room'],
    accessibility: ['Wheelchair Access', 'Hearing Loop', 'Accessible Restrooms'],
  },
  {
    id: 'venue-004',
    name: 'Tennis Complex',
    type: 'Sports Complex',
    typeEmoji: '🎾',
    description: 'World-class tennis facility with multiple courts including a center court with retractable roof. Home to ATP and WTA events.',
    capacity: 12000,
    sports: ['Tennis', 'Badminton'],
    address: 'Khalifa Tennis Complex, Doha',
    coordinates: { lat: 25.2632, lng: 51.4487 },
    facilities: ['Center Court', 'Practice Courts', 'Player Lounges', 'Pro Shop'],
    accessibility: ['Wheelchair Access', 'Accessible Parking', 'Elevators'],
  },
  {
    id: 'venue-005',
    name: 'Velodrome',
    type: 'Velodrome',
    typeEmoji: '🚴',
    description: 'Indoor cycling velodrome with a 250-meter wooden track meeting UCI standards. Perfect for track cycling events.',
    capacity: 6000,
    sports: ['Cycling'],
    address: 'Aspire Zone, Doha',
    coordinates: { lat: 25.2615, lng: 51.4456 },
    facilities: ['Wooden Track', 'Bike Storage', 'Warm-up Area', 'Medical Room'],
    accessibility: ['Wheelchair Access', 'Accessible Seating'],
  },
  {
    id: 'venue-006',
    name: 'Combat Arena',
    type: 'Arena',
    typeEmoji: '🥋',
    description: 'Specialized venue for combat sports including taekwondo, judo, boxing, wrestling, and karate. Multiple competition areas for simultaneous events.',
    capacity: 8000,
    sports: ['Taekwondo', 'Judo', 'Boxing', 'Wrestling', 'Karate'],
    address: 'Lusail Sports Arena, Qatar',
    coordinates: { lat: 25.4123, lng: 51.4876 },
    facilities: ['Competition Mats', 'Boxing Ring', 'Warm-up Areas', 'Weight Rooms'],
    accessibility: ['Wheelchair Access', 'Accessible Parking'],
  },
  {
    id: 'venue-007',
    name: 'Equestrian Center',
    type: 'Sports Complex',
    typeEmoji: '🐴',
    description: 'Premier equestrian facility featuring show jumping, dressage, and eventing arenas. World-class stables and training facilities.',
    capacity: 5000,
    sports: ['Equestrian'],
    address: 'Al Shaqab, Education City',
    coordinates: { lat: 25.3156, lng: 51.4389 },
    facilities: ['Indoor Arena', 'Outdoor Arena', 'Stables', 'Veterinary Center'],
    accessibility: ['Wheelchair Access', 'Accessible Viewing Areas'],
  },
  {
    id: 'venue-008',
    name: 'Shooting Range',
    type: 'Sports Complex',
    typeEmoji: '🎯',
    description: 'Modern shooting sports complex with ranges for rifle, pistol, and shotgun events. Equipped with electronic scoring systems.',
    capacity: 3000,
    sports: ['Shooting'],
    address: 'Lusail Shooting Complex',
    coordinates: { lat: 25.4234, lng: 51.5012 },
    facilities: ['10m Range', '25m Range', '50m Range', 'Shotgun Range', 'Equipment Room'],
    accessibility: ['Wheelchair Access', 'Hearing Protection Provided'],
  },
];

export const getVenueById = (id: string): Venue | undefined => {
  return venues.find(venue => venue.id === id);
};

export const getVenueByName = (name: string): Venue | undefined => {
  return venues.find(venue => venue.name.toLowerCase() === name.toLowerCase());
};
