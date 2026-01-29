/**
 * Shared TypeScript types for Hayyak Asia 2030
 */

// ============================================
// User Types
// ============================================

export interface User {
  id: string;
  email: string;
  phone?: string;
  preferredLocale: string;
  preferredLanguages: string[];
  accessibilityPreferences: AccessibilityPreferences;
  notificationPreferences: NotificationPreferences;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface UserProfile {
  userId: string;
  displayName?: string;
  avatarUrl?: string;
  nationality?: string;
  dateOfBirth?: Date;
  interests: string[];
  dietaryPreferences: string[];
  mobilityRequirements: string[];
}

export interface AccessibilityPreferences {
  wheelchairAccess: boolean;
  hearingAssistance: boolean;
  visualAssistance: boolean;
  mobilityAssistance: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  largerText: boolean;
}

export interface NotificationPreferences {
  eventReminders: boolean;
  scoreUpdates: boolean;
  transportAlerts: boolean;
  emergencyAlerts: boolean; // Always true
  marketingEmails: boolean;
}

// ============================================
// Event Types
// ============================================

export interface Sport {
  id: string;
  code: string;
  iconUrl?: string;
  isParalympic: boolean;
  name: string; // Translated
  description?: string; // Translated
}

export interface Event {
  id: string;
  sportId: string;
  venueId: string;
  eventType: EventType;
  startTime: Date;
  endTime: Date;
  status: EventStatus;
  isMedalEvent: boolean;
  gender: 'men' | 'women' | 'mixed';
  ticketPriceRange: PriceRange;
  capacity: number;
  seatsAvailable: number;
  liveStreamUrl?: string;
  name: string; // Translated
  description?: string; // Translated
  sport?: Sport;
  venue?: Venue;
}

export type EventType = 'preliminary' | 'semifinal' | 'final' | 'group_stage' | 'knockout';
export type EventStatus = 'scheduled' | 'live' | 'completed' | 'cancelled' | 'postponed';

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

export interface EventParticipant {
  id: string;
  eventId: string;
  countryCode: string;
  athleteName?: string;
  teamName?: string;
  resultPosition?: number;
  resultTime?: string;
  resultScore?: number;
  medal?: 'gold' | 'silver' | 'bronze';
}

// ============================================
// Venue Types
// ============================================

export interface Venue {
  id: string;
  code: string;
  location: GeoPoint;
  address: Address;
  capacity: number;
  venueType: VenueType;
  accessibilityFeatures: string[];
  amenities: string[];
  imageUrls: string[];
  openingHours: OpeningHours;
  name: string; // Translated
  description?: string; // Translated
  directions?: string; // Translated
}

export type VenueType = 'stadium' | 'arena' | 'aquatic_center' | 'velodrome' | 'sports_complex';

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface Address {
  street?: string;
  city: string;
  postalCode?: string;
  country: string;
}

export interface OpeningHours {
  [day: string]: {
    open: string;
    close: string;
  };
}

export interface VenueSection {
  id: string;
  venueId: string;
  sectionCode: string;
  sectionType: 'vip' | 'standard' | 'accessible';
  capacity: number;
  priceTier: number;
  accessibilityLevel: number; // 1-5
  viewQuality: number; // 1-5
  svgPath?: string;
}

export interface VenueSeat {
  id: string;
  sectionId: string;
  rowNumber: string;
  seatNumber: string;
  seatType: 'standard' | 'wheelchair' | 'companion';
  isAvailable: boolean;
}

// ============================================
// Ticket Types
// ============================================

export interface Ticket {
  id: string;
  userId: string;
  eventId: string;
  seatId?: string;
  ticketType: 'standard' | 'vip' | 'accessible';
  price: number;
  currency: string;
  status: TicketStatus;
  qrCodeData: string;
  purchasedAt: Date;
  usedAt?: Date;
  event?: Event;
  seat?: VenueSeat;
}

export type TicketStatus = 'active' | 'used' | 'expired' | 'cancelled' | 'refunded';

// ============================================
// Transport Types
// ============================================

export interface TransportRoute {
  id: string;
  routeCode: string;
  transportType: TransportType;
  isEcoFriendly: boolean;
  carbonRating: number; // 1-5
  operatingHours: OpeningHours;
  frequencyMinutes: number;
  stops: TransportStop[];
  polyline?: string;
  name: string; // Translated
  description?: string; // Translated
}

export type TransportType = 'metro' | 'bus' | 'shuttle' | 'bicycle' | 'walking' | 'taxi';

export interface TransportStop {
  id: string;
  name: string;
  location: GeoPoint;
  order: number;
}

export interface TransportRealtime {
  id: string;
  routeId: string;
  vehicleId: string;
  currentLocation: GeoPoint;
  nextStopId: string;
  etaMinutes: number;
  occupancyLevel: number; // 1-5
  lastUpdated: Date;
}

// ============================================
// Cultural Content Types
// ============================================

export interface Country {
  code: string; // ISO 3166-1 alpha-3
  flagUrl: string;
  region: AsianRegion;
  capitalCity: string;
  population: number;
  languagesSpoken: string[];
  featuredImageUrl: string;
  galleryUrls: string[];
  videoUrl?: string;
  name: string; // Translated
  description?: string; // Translated
  funFacts?: string; // Translated
}

export type AsianRegion = 'east_asia' | 'south_asia' | 'southeast_asia' | 'west_asia' | 'central_asia';

export interface CulturalHighlight {
  id: string;
  countryCode: string;
  highlightType: 'tradition' | 'cuisine' | 'art' | 'sport';
  imageUrl?: string;
  videoUrl?: string;
  displayOrder: number;
  title: string; // Translated
  description: string; // Translated
}

// ============================================
// Notification Types
// ============================================

export interface Notification {
  id: string;
  userId: string;
  notificationType: NotificationType;
  priority: NotificationPriority;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  isPushed: boolean;
  createdAt: Date;
  readAt?: Date;
  expiresAt?: Date;
}

export type NotificationType =
  | 'event_reminder'
  | 'score_update'
  | 'transport_alert'
  | 'ticket_update'
  | 'emergency';

export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

// ============================================
// Emergency Types
// ============================================

export interface EmergencyContact {
  id: string;
  contactType: EmergencyContactType;
  countryCode?: string; // For embassy contacts
  phoneNumber: string;
  isPrimary: boolean;
  location?: GeoPoint;
  operatingHours?: OpeningHours;
  name: string; // Translated
  description?: string; // Translated
}

export type EmergencyContactType =
  | 'police'
  | 'ambulance'
  | 'fire'
  | 'embassy'
  | 'lost_found'
  | 'medical_center'
  | 'security';

export interface EmergencyAlert {
  id: string;
  userId: string;
  alertType: 'medical' | 'security' | 'lost';
  location: GeoPoint;
  status: 'active' | 'resolved';
  resolvedAt?: Date;
  createdAt: Date;
}

// ============================================
// Recommendation Types
// ============================================

export interface UserInteraction {
  id: string;
  userId: string;
  entityType: 'event' | 'venue' | 'culture';
  entityId: string;
  interactionType: 'view' | 'favorite' | 'book' | 'share';
  durationSeconds?: number;
  context?: InteractionContext;
  createdAt: Date;
}

export interface InteractionContext {
  source: string;
  position?: number;
  searchQuery?: string;
}

export interface Recommendation {
  entityType: 'event' | 'venue' | 'culture';
  entityId: string;
  score: number;
  reason: string;
  entity?: Event | Venue | Country;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  data: T;
  meta?: ApiMeta;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: ApiListMeta;
}

export interface ApiMeta {
  timestamp: string;
}

export interface ApiListMeta extends ApiMeta {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
