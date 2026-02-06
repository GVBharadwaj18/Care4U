'use client';

import { useState } from 'react';
import { EmergencyActions } from "@/components/dashboard/emergency-actions";
import { NearbyHospitals } from "@/components/dashboard/nearby-hospitals";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Bot, CornerDownLeft, Loader2, Mic, Sparkles, AlertTriangle, ShieldAlert, UserCheck, Stethoscope } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { findHospitalsBySymptoms, SymptomBasedHospitalFinderOutput } from '@/ai/flows/symptom-based-hospital-finder';
import { mockHospitals } from '@/lib/data';
import type { Hospital } from '@/lib/types';
import { HospitalCard } from '@/components/hospitals/hospital-card';
import { VoiceAssistantModal } from '@/components/voice/voice-assistant-modal';
import { cn } from '@/lib/utils';

function AiSymptomChecker() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [aiResult, setAiResult] = useState<SymptomBasedHospitalFinderOutput | null>(null);

  const handleSearch = async (e: React.FormEvent, symptoms?: string) => {
    e.preventDefault();
    const currentQuery = symptoms || query;
    if (!currentQuery) return;

    setIsLoading(true);
    setError('');
    setAiResult(null);

    try {
      const result = await findHospitalsBySymptoms({ symptoms: currentQuery });
      setAiResult(result);
    } catch (err) {
      console.error(err);
      setError('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetSearch = () => {
    setQuery('');
    setAiResult(null);
    setError('');
  };

  const hasResults = aiResult !== null;
  const recommendedHospitals = aiResult?.recommendedHospitals?.map(rec => {
        const hospital = mockHospitals.find(h => h.id === rec.hospitalId);
        if (hospital) {
          return {
            ...hospital,
            isAiRecommended: true,
            aiRecommendationReason: rec.reason,
          };
        }
        return null;
      }).filter((h): h is Hospital => h !== null) || [];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="text-center p-6 md:p-8">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
              <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
            </div>
            <CardTitle className="font-headline text-3xl sm:text-4xl font-bold tracking-tight">AI Emergency Assistant</CardTitle>
            <CardDescription className="max-w-lg mx-auto text-base pt-2">
              Get instant guidance to choose the right hospital based on symptoms. Describe a condition below.
            </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 md:px-8 pb-6 md:pb-8">
           <form onSubmit={handleSearch} className="flex items-center gap-2 sm:gap-3">
              <Input
                placeholder='e.g., "headache, dizziness"'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
                className="h-14 text-base"
              />
              <VoiceAssistantModal>
                <Button type="button" variant="outline" size="icon" className="h-14 w-14 hidden sm:inline-flex">
                    <Mic className="h-6 w-6" />
                </Button>
              </VoiceAssistantModal>
              <Button type="submit" size="icon" className="h-14 w-14 flex-shrink-0" disabled={isLoading || !query}>
                  {isLoading ? <Loader2 className="animate-spin h-6 w-6" /> : <CornerDownLeft className='h-6 w-6' />}
              </Button>
          </form>
        </CardContent>
      </Card>
      
      {isLoading && (
         <div className="flex flex-col items-center justify-center text-center space-y-4 py-16">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-muted-foreground">Analyzing symptoms and finding hospitals...</p>
        </div>
      )}

      {error && (
         <p className="text-destructive text-center">{error}</p>
      )}

      {hasResults && !isLoading && aiResult && (
        <div className="space-y-8">
             {aiResult.urgency === 'clarification-needed' && aiResult.clarifyingQuestions && (
                 <Card className="bg-blue-50 border-blue-400 border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 font-headline text-xl text-blue-800">
                           <Bot /> To better assist you, I have a few questions:
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         <p>{aiResult.analysis}</p>
                        <ul className="list-disc list-inside space-y-2 font-medium">
                           {aiResult.clarifyingQuestions.map((q, i) => <li key={i}>{q}</li>)}
                        </ul>
                         <p className="text-sm text-muted-foreground pt-2">Please add more details to your search above and try again.</p>
                    </CardContent>
                </Card>
            )}

            {aiResult.urgency !== 'clarification-needed' && aiResult.suggestedSteps && aiResult.suggestedSteps.length > 0 && (
              <Card className={cn(
                  'border-2',
                  aiResult.urgency === 'critical' && 'bg-destructive/10 border-destructive',
                  aiResult.urgency === 'high' && 'bg-amber-50 border-amber-400',
                  (aiResult.urgency === 'medium' || aiResult.urgency === 'low') && 'bg-blue-50 border-blue-400'
              )}>
                  <CardHeader>
                      <CardTitle className={cn(
                          "flex items-center gap-3 font-headline text-xl",
                          aiResult.urgency === 'critical' && 'text-destructive',
                          aiResult.urgency === 'high' && 'text-amber-800',
                          (aiResult.urgency === 'medium' || aiResult.urgency === 'low') && 'text-blue-800'
                      )}>
                          {aiResult.urgency === 'critical' ? <AlertTriangle className="animate-pulse" /> : <ShieldAlert />}
                          Urgency: <span className="capitalize">{aiResult.urgency}</span> - Suggested Next Steps
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <ol className="list-decimal list-inside space-y-2 text-foreground/90">
                          {aiResult.suggestedSteps.map((step, index) => (
                              <li key={index} className={cn(index === 0 && (aiResult.urgency === 'critical' || aiResult.urgency === 'high') && 'font-bold')}>{step}</li>
                          ))}
                      </ol>
                  </CardContent>
              </Card>
            )}

            {aiResult.analysis && aiResult.urgency !== 'clarification-needed' && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline text-xl">
                            <Sparkles className="text-primary" />
                            AI Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{aiResult.analysis}</p>
                    </CardContent>
                </Card>
            )}
            
            {aiResult.recommendedDoctors && aiResult.recommendedDoctors.length > 0 && (
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2 font-headline text-xl">
                          <UserCheck />
                          Recommended Specialists (Mock Data)
                      </CardTitle>
                      <CardDescription>
                          Based on your symptoms, these specialists may be suitable. This is a demonstration feature.
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      {aiResult.recommendedDoctors.map((doctor, index) => (
                          <div key={index} className="flex items-center gap-4 rounded-lg border bg-secondary/30 p-3">
                               <div className="bg-primary/10 p-3 rounded-full">
                                  <Stethoscope className="h-6 w-6 text-primary" />
                              </div>
                              <div className="flex-1">
                                  <p className="font-bold">{doctor.name}</p>
                                  <p className="text-sm text-muted-foreground">{doctor.specialty} at {doctor.hospitalName}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{doctor.reason}</p>
                              </div>
                          </div>
                      ))}
                  </CardContent>
              </Card>
            )}

            {recommendedHospitals.length > 0 && (
                <div>
                     <h2 className="text-2xl font-bold font-headline mb-4 text-center">Recommended Hospitals</h2>
                     <p className="text-center text-muted-foreground mb-6 -mt-2">
                        Chosen based on emergency readiness and facilities, not ratings.
                     </p>
                     <div className="grid gap-6 md:grid-cols-1">
                        {recommendedHospitals.map(hospital => (
                            <HospitalCard key={hospital.id} hospital={hospital} />
                        ))}
                     </div>
                </div>
            )}
            
            <div className="text-center">
                <Button variant="outline" onClick={resetSearch}>
                    Start a New Search
                </Button>
            </div>
        </div>
      )}

      <div className="text-center mt-12 text-xs text-muted-foreground">
        <p>This assistant provides guidance only. It is not a substitute for professional medical advice.</p>
        <p>In a life-threatening emergency, always call your local emergency number immediately.</p>
      </div>
    </div>
  );
}


export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-10">
        <Alert variant="destructive" className="bg-red-50 border-red-200 mb-8">
          <AlertCircle className="h-4 w-4 !text-red-600" />
          <AlertTitle className="font-bold !text-red-800">For Emergencies: Call Your Local Emergency Number</AlertTitle>
          <AlertDescription className="!text-red-700">
            This tool is for informational purposes only. All data is estimated.
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
                <AiSymptomChecker />
            </div>
            <div className="space-y-12">
                <EmergencyActions />
                <NearbyHospitals />
            </div>
        </div>
    </div>
  );
}
