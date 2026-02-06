import type { Hospital, User, MedicalProfile, HistoryLog, Doctor } from './types';

export const mockHospitals: Hospital[] = [
  {
    id: 'city-general-hospital',
    name: 'City General Hospital',
    address: '123 Main St, Metropolis, USA',
    location: { lat: 34.0522, lng: -118.2437 },
    capabilities: {
      bedsAvailable: 12,
      icuBedsAvailable: 3,
      operatingRoomsAvailable: 2,
      specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Trauma'],
      hasHelicopterLandingPad: true,
    },
    estimatedWaitTime: 45,
    distance: 5.2,
  },
  {
    id: 'mercy-medical-center',
    name: 'Mercy Medical Center',
    address: '456 Oak Ave, Metropolis, USA',
    location: { lat: 34.0622, lng: -118.2537 },
    capabilities: {
      bedsAvailable: 5,
      icuBedsAvailable: 1,
      operatingRoomsAvailable: 1,
      specialties: ['Pediatrics', 'Oncology', 'General Surgery'],
      hasHelicopterLandingPad: false,
    },
    estimatedWaitTime: 90,
    distance: 8.1,
  },
  {
    id: 'st-jude-regional',
    name: 'St. Jude Regional',
    address: '789 Pine Ln, Suburbia, USA',
    location: { lat: 34.1522, lng: -118.3437 },
    capabilities: {
      bedsAvailable: 25,
      icuBedsAvailable: 8,
      operatingRoomsAvailable: 4,
      specialties: ['Trauma', 'Burn Center', 'Neurosurgery'],
      hasHelicopterLandingPad: true,
    },
    estimatedWaitTime: 25,
    distance: 15.6,
    isAiRecommended: true,
    aiRecommendationReason: 'Shortest wait time and has a dedicated Trauma center.',
  },
  {
    id: 'community-health-clinic',
    name: 'Community Health Clinic',
    address: '101 Maple Dr, Metropolis, USA',
    location: { lat: 34.0422, lng: -118.2337 },
    capabilities: {
      bedsAvailable: 2,
      icuBedsAvailable: 0,
      operatingRoomsAvailable: 0,
      specialties: ['Family Medicine', 'Urgent Care'],
      hasHelicopterLandingPad: false,
    },
    estimatedWaitTime: 60,
    distance: 3.4,
  },
   {
    id: 'university-trauma-center',
    name: 'University Trauma Center',
    address: '202 University Ave, Metropolis, USA',
    location: { lat: 34.0722, lng: -118.2637 },
    capabilities: {
      bedsAvailable: 18,
      icuBedsAvailable: 6,
      operatingRoomsAvailable: 5,
      specialties: ['Trauma', 'Stroke Center', 'Cardiovascular Surgery'],
      hasHelicopterLandingPad: true,
    },
    estimatedWaitTime: 35,
    distance: 7.5,
  },
  {
    id: 'river-valley-hospital',
    name: 'River Valley Hospital',
    address: '303 River Rd, Riverside, USA',
    location: { lat: 33.9533, lng: -117.3962 },
    capabilities: {
      bedsAvailable: 8,
      icuBedsAvailable: 2,
      operatingRoomsAvailable: 1,
      specialties: ['Orthopedics', 'Maternity', 'General Surgery'],
      hasHelicopterLandingPad: false,
    },
    estimatedWaitTime: 70,
    distance: 12.3,
  },
  {
    id: 'mountain-view-general',
    name: 'Mountain View General',
    address: '500 Grant Rd, Mountain View, USA',
    location: { lat: 37.3861, lng: -122.0839 },
    capabilities: {
      bedsAvailable: 20,
      icuBedsAvailable: 5,
      operatingRoomsAvailable: 3,
      specialties: ['Cardiology', 'Orthopedics', 'General Surgery', 'Urology'],
      hasHelicopterLandingPad: false,
    },
    estimatedWaitTime: 55,
    distance: 25.1,
  },
  {
    id: 'bayside-medical',
    name: 'Bayside Medical',
    address: '800 Bay Ave, Metropolis, USA',
    location: { lat: 34.0322, lng: -118.2837 },
    capabilities: {
      bedsAvailable: 7,
      icuBedsAvailable: 2,
      operatingRoomsAvailable: 1,
      specialties: ['Dermatology', 'Family Medicine'],
      hasHelicopterLandingPad: false,
    },
    estimatedWaitTime: 80,
    distance: 9.5,
  },
  {
    id: 'suburban-general',
    name: 'Suburban General',
    address: '950 Quiet Pl, Suburbia, USA',
    location: { lat: 34.1622, lng: -118.3537 },
    capabilities: {
      bedsAvailable: 15,
      icuBedsAvailable: 4,
      operatingRoomsAvailable: 2,
      specialties: ['Maternity', 'Pediatrics', 'General Surgery'],
      hasHelicopterLandingPad: true,
    },
    estimatedWaitTime: 40,
    distance: 18.2,
  },
];

export const mockUser: User = {
  id: 'user-123',
  name: 'Kalki',
  email: 'kalki2898@example.com',
  avatarUrl: 'https://www.masala.com/cloud/2024/06/11/Kalki-2898-AD.png',
};

export const mockProfile: MedicalProfile = {
  userId: 'user-123',
  conditions: ['Hypertension', 'Type 2 Diabetes'],
  allergies: ['Penicillin'],
  emergencyContacts: [
    {
      name: 'Kalki',
      phone: '1234567890',
      relationship: '...',
    },
  ],
};

export const mockHistory: HistoryLog[] = [
    { id: 'h-1', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), action: "Searched for 'stroke'", details: '2 hospitals found' },
    { id: 'h-2', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), action: "Viewed 'City General Hospital'"},
    { id: 'h-3', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), action: "Used Voice Assistant", details: "Query: 'Hospitals near me for chest pain'" },
    { id: 'h-4', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), action: "Viewed 'Mercy Medical Center'"},
    { id: 'h-5', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), action: "Updated Profile", details: "Added new allergy" },
];

export const mockDoctors: Doctor[] = [
    { id: 'doc-1', name: 'Dr. Emily Carter', specialty: 'Cardiology', hospitalId: 'city-general-hospital', successRate: 0.98, experienceYears: 15 },
    { id: 'doc-2', name: 'Dr. Ben Hanson', specialty: 'Neurology', hospitalId: 'city-general-hospital', successRate: 0.95, experienceYears: 12 },
    { id: 'doc-3', name: 'Dr. Sarah Jenkins', specialty: 'Trauma', hospitalId: 'st-jude-regional', successRate: 0.99, experienceYears: 20 },
    { id: 'doc-4', name: 'Dr. Michael Ramirez', specialty: 'Neurosurgery', hospitalId: 'st-jude-regional', successRate: 0.96, experienceYears: 18 },
    { id: 'doc-5', name: 'Dr. Olivia Chen', specialty: 'Cardiovascular Surgery', hospitalId: 'university-trauma-center', successRate: 0.97, experienceYears: 14 },
    { id: 'doc-6', name: 'Dr. James Rodriguez', specialty: 'Stroke Center', hospitalId: 'university-trauma-center', successRate: 0.98, experienceYears: 16 },
];
