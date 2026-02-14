import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

// Mock data for hospitals - in production, this would come from MongoDB
const MOCK_HOSPITALS = [
  {
    id: '1',
    name: 'City General Hospital',
    city: 'New York',
    distance: 2.5,
    waitTime: 15,
    availableBeds: 45,
    specializations: ['Cardiology', 'Emergency', 'Orthopedics'],
    rating: 4.5,
    phone: '+1-555-0123',
  },
  {
    id: '2',
    name: 'Metropolitan Medical Center',
    city: 'New York',
    distance: 5.2,
    waitTime: 25,
    availableBeds: 32,
    specializations: ['Neurology', 'Emergency', 'Pediatrics'],
    rating: 4.2,
    phone: '+1-555-0124',
  },
  {
    id: '3',
    name: 'St. Mary Hospital',
    city: 'New York',
    distance: 7.1,
    waitTime: 40,
    availableBeds: 18,
    specializations: ['Oncology', 'Emergency'],
    rating: 3.8,
    phone: '+1-555-0125',
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city');
    const specialization = searchParams.get('specialization');

    let results = MOCK_HOSPITALS;

    if (city) {
      results = results.filter((h) =>
        h.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (specialization) {
      results = results.filter((h) =>
        h.specializations.some((s) =>
          s.toLowerCase().includes(specialization.toLowerCase())
        )
      );
    }

    return NextResponse.json(
      {
        success: true,
        hospitals: results,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch hospitals',
      },
      { status: 500 }
    );
  }
}
