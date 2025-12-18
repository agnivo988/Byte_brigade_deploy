'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Match } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';
import { Clock } from 'lucide-react';

interface ScoreboardProps {
  initialMatch: Match;
}

export default function Scoreboard({ initialMatch }: ScoreboardProps) {
  const [match, setMatch] = useState(initialMatch);
  const [time, setTime] = useState(45); // Simulate match time

  useEffect(() => {
    if (match.status !== 'live') return;

    const scoreInterval = setInterval(() => {
      // Simulate a random score update
      setMatch((prevMatch) => {
        if (Math.random() > 0.95) { // 5% chance to score
          if (Math.random() > 0.5) {
            return { ...prevMatch, scoreA: prevMatch.scoreA + 1 };
          } else {
            return { ...prevMatch, scoreB: prevMatch.scoreB + 1 };
          }
        }
        return prevMatch;
      });
    }, 5000); // Update every 5 seconds

    const timeInterval = setInterval(() => {
        setTime(t => {
            if (t >= 90) {
                clearInterval(scoreInterval);
                clearInterval(timeInterval);
                setMatch(m => ({...m, status: 'completed'}));
                return 90;
            }
            return t + 1;
        });
    }, 1000); // Update every second, simulating faster time for demo

    return () => {
      clearInterval(scoreInterval);
      clearInterval(timeInterval);
    };
  }, [match.status]);

  const getStatusInfo = () => {
    switch (match.status) {
      case 'live':
        return { text: "Live", color: "bg-red-500 text-white animate-pulse" };
      case 'completed':
        return { text: "Full Time", color: "bg-secondary text-secondary-foreground" };
      case 'scheduled':
      default:
        return { text: "Scheduled", color: "bg-muted text-muted-foreground" };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl">
      <CardHeader className="text-center p-4 bg-muted/50 rounded-t-lg">
        <div className="flex justify-center items-center gap-4">
            <Badge className={cn("capitalize text-sm", statusInfo.color)}>{statusInfo.text}</Badge>
            {match.status === 'live' && (
                <div className="flex items-center gap-2 text-sm font-mono text-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{time}'</span>
                </div>
            )}
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-10">
        <div className="grid grid-cols-3 items-center">
          <div className="flex flex-col items-center gap-3">
            <Image
              src={match.teamA.logoUrl}
              alt={match.teamA.name}
              width={100}
              height={100}
              className="rounded-full"
              data-ai-hint={match.teamA.logoImageHint}
            />
            <h2 className="text-xl md:text-2xl font-bold text-center font-headline">{match.teamA.name}</h2>
          </div>
          
          <div className="flex items-center justify-center text-4xl md:text-6xl font-black text-center font-mono">
            <span>{match.scoreA}</span>
            <span className="mx-2 md:mx-4 text-muted-foreground">-</span>
            <span>{match.scoreB}</span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <Image
              src={match.teamB.logoUrl}
              alt={match.teamB.name}
              width={100}
              height={100}
              className="rounded-full"
              data-ai-hint={match.teamB.logoImageHint}
            />
            <h2 className="text-xl md:text-2xl font-bold text-center font-headline">{match.teamB.name}</h2>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center text-muted-foreground">
            <p>Round {match.round}</p>
            <p>{new Date(match.date).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' })}</p>
        </div>
      </CardContent>
    </Card>
  );
}
