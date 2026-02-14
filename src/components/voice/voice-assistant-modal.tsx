'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mic, Loader2, Bot, User, CornerDownLeft } from 'lucide-react';
import { Input } from '../ui/input';
import { voiceAssistedHospitalSearch } from '@/ai/flows/voice-assisted-hospital-search';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';

export function VoiceAssistantModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'success' | 'error'>('idle');
  const [userMessage, setUserMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState('');
  const [typedQuery, setTypedQuery] = useState('');

  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    setStatus('listening');
    setError('');
    
    // Check for browser support.
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Voice recognition is not supported by your browser. Please type your request below.');
      setStatus('error');
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setStatus('listening');
      setUserMessage('');
      setAiResponse('');
      setTypedQuery('');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      submitQuery(transcript);
    };

    recognition.onerror = (event: any) => {
      let errorMessage = 'An error occurred during voice recognition.';
      if (event.error === 'no-speech') {
        errorMessage = 'I didn\'t hear anything. Please try speaking again, or type your request.';
      } else if (event.error === 'audio-capture') {
        errorMessage = 'I can\'t access your microphone. Please check your browser permissions.';
      } else if (event.error === 'not-allowed') {
        errorMessage = 'Microphone access was denied. You can type your request instead.';
      }
      setError(errorMessage);
      setStatus('error');
    };

    recognition.onend = () => {
      if (status === 'listening') {
        setStatus('idle');
      }
    };
    
    recognition.start();
  };

  const submitQuery = async (query: string) => {
    if (!query) return;

    setStatus('processing');
    setUserMessage(query);
    setAiResponse('');
    setError('');
    setTypedQuery(''); // Clear typed query when submitting

    try {
      const result = await voiceAssistedHospitalSearch({ spokenCondition: query });
      setAiResponse(result.hospitalRecommendations);
      setStatus('success');
    } catch (err) {
      setError('Sorry, I encountered a problem getting recommendations. Please try again.');
      setStatus('error');
      console.error(err);
    }
  };

  const handleTypedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuery(typedQuery);
  };
  
  useEffect(() => {
    if (isOpen) {
      startListening();
    } else {
      // Cleanup when modal is closed
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      // Reset state after closing animation
      setTimeout(() => {
        setStatus('idle');
        setUserMessage('');
        setAiResponse('');
        setError('');
        setTypedQuery('');
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const renderContent = () => {
    const isProcessing = status === 'processing';
    const showResults = status === 'success' || status === 'error' || status === 'idle' || isProcessing;

    if (status === 'listening') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <div className="relative flex items-center justify-center w-40 h-40">
            <div className="absolute w-full h-full bg-primary/5 rounded-full animate-pulse" />
            <div className="absolute w-2/3 h-2/3 bg-primary/10 rounded-full animate-pulse [animation-delay:200ms]" />
            <Mic className="h-20 w-20 text-primary" />
          </div>
          <p className="text-lg font-medium text-muted-foreground mt-8">Listening...</p>
        </div>
      );
    }
    
    if (showResults) {
       return (
          <div className="p-6 space-y-4">
            {userMessage && (
              <div className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3">
                <User className="h-5 w-5 flex-shrink-0 text-muted-foreground mt-1" />
                <p className="flex-grow text-sm">{userMessage}</p>
              </div>
            )}
            {isProcessing && (
              <div className="flex items-center justify-center space-x-2 pt-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-muted-foreground">Finding best options for you...</p>
              </div>
            )}
            {aiResponse && status === 'success' && (
              <>
                <Separator />
                <div className="flex items-start gap-3 rounded-lg bg-primary/10 p-3">
                  <Bot className="h-5 w-5 flex-shrink-0 text-primary mt-1" />
                  <p className="flex-grow text-sm">{aiResponse}</p>
                </div>
              </>
            )}
            {error && (
              <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>
            )}
            {!userMessage && status === 'idle' && !error && (
               <div className="text-center text-muted-foreground p-8 flex flex-col items-center justify-center space-y-4 border bg-secondary/50 rounded-lg h-full">
                  <Bot size={48} className="text-primary" />
                  <p>Speak your symptoms or condition, like "stroke" or "severe chest pain".</p>
              </div>
            )}
          </div>
       );
    }
    
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="flex items-center gap-2 font-headline text-2xl">
            <Mic /> AI Voice Assistant
          </DialogTitle>
          <DialogDescription>
            I can help you find the right hospital. Just tell me the symptoms or condition.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-[20rem] flex flex-col justify-center">
            {renderContent()}
        </div>

        <DialogFooter className="p-6 pt-4 border-t bg-background/80 backdrop-blur-sm">
          <div className="w-full flex items-center gap-2">
             <Button onClick={startListening} disabled={status === 'listening'} className="outline">
                <Mic className="mr-2 h-4 w-4" /> Speak Again
            </Button>
            <form onSubmit={handleTypedSubmit} className="w-full flex items-center gap-2">
              <Input
                placeholder="Or type here..."
                value={typedQuery}
                onChange={(e) => setTypedQuery(e.target.value)}
                disabled={status === 'processing'}
              />
              <Button type="submit" className="h-10 w-10 p-0" disabled={status === 'processing' || !typedQuery}>
                {status === 'processing' ? <Loader2 className="h-4 w-4 animate-spin" /> : <CornerDownLeft className="h-4 w-4" />}
              </Button>
            </form>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
