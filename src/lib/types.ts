export type Hospital = {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  capabilities: {
    bedsAvailable: number;
    icuBedsAvailable: number;
    operatingRoomsAvailable: number;
    specialties: string[];
    hasHelicopterLandingPad: boolean;
  };
  estimatedWaitTime: number; // in minutes
  distance: number; // in miles
  isAiRecommended?: boolean;
  aiRecommendationReason?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
};

export type MedicalProfile = {
  userId: string;
  conditions: string[];
  allergies: string[];
  emergencyContacts: {
    name: string;
    phone: string;
    relationship: string;
  }[];
};

export type HistoryLog = {
  id: string;
  timestamp: Date;
  action: string;
  details?: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  hospitalId: string;
  successRate: number; // 0-1
  experienceYears: number;
};
