'use client';

import { useState, useMemo } from 'react';
import type { Hospital } from '@/lib/types';
import { HospitalCard } from './hospital-card';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Card, CardContent } from '../ui/card';
import { Frown, Search, Map } from 'lucide-react';
import Image from 'next/image';

type SearchClientProps = {
  hospitals: Hospital[];
};

export function SearchClient({ hospitals }: SearchClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('distance');

  const allSpecialties = useMemo(() => {
    const specialties = new Set<string>();
    hospitals.forEach((h) => {
      h.capabilities.specialties.forEach((s) => specialties.add(s));
    });
    return Array.from(specialties).sort();
  }, [hospitals]);

  const displayedHospitals = useMemo(() => {
    let filtered = hospitals.filter((hospital) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const searchTermMatch =
        hospital.name.toLowerCase().includes(lowerSearchTerm) ||
        hospital.address.toLowerCase().includes(lowerSearchTerm) ||
        hospital.capabilities.specialties.some(s => s.toLowerCase().includes(lowerSearchTerm));

      const specialtyMatch =
        specialty === 'all' ||
        hospital.capabilities.specialties.includes(specialty);
      return searchTermMatch && specialtyMatch;
    });

    // Separate AI recommended from others
    const recommended = filtered.find(h => h.isAiRecommended);
    let others = filtered.filter(h => !h.isAiRecommended);

    // Sort the other hospitals
    others.sort((a, b) => {
      if (sortBy === 'distance') {
        return a.distance - b.distance;
      }
      if (sortBy === 'wait-time') {
        return a.estimatedWaitTime - b.estimatedWaitTime;
      }
      return 0;
    });

    // Put the recommended one at the top if it exists and matches the search
    const finalResults = (recommended && (!searchTerm || searchTermMatch(recommended, searchTerm))) ? [recommended, ...others] : (recommended ? [recommended, ...others] : others);

    return finalResults.slice(0, 5);
  }, [hospitals, searchTerm, specialty, sortBy]);

  const searchTermMatch = (hospital: Hospital, term: string) => {
    const lowerTerm = term.toLowerCase();
    return hospital.name.toLowerCase().includes(lowerTerm) ||
           hospital.address.toLowerCase().includes(lowerTerm) ||
           hospital.capabilities.specialties.some(s => s.toLowerCase().includes(lowerTerm));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:h-[calc(100vh-15rem)]">
      {/* Left: Map */}
      <div className="hidden md:block rounded-lg overflow-hidden relative border">
        <Image
          src="https://picsum.photos/seed/map123/1200/1200"
          alt="Map of hospital locations"
          data-ai-hint="map hospitals"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <h3 className="font-bold flex items-center gap-2">
            <Map /> Map View
          </h3>
          <p className="text-sm text-muted-foreground">
            Hospital locations are marked here.
          </p>
        </div>
      </div>

      {/* Right: Search and Results */}
      <div className="flex flex-col gap-4 h-full">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, condition, etc..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {allSpecialties.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Sort by Distance</SelectItem>
                  <SelectItem value="wait-time">Sort by Wait Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 overflow-y-auto flex-1 pr-2">
          {displayedHospitals.length > 0 ? (
            displayedHospitals.map((hospital) => (
              <HospitalCard key={hospital.id} hospital={hospital} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-secondary/30 p-12 text-center h-full">
              <Frown className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold text-muted-foreground">
                No Hospitals Found
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
