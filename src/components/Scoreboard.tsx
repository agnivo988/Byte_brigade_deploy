'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Match } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Clock, PartyPopper, ThumbsUp, Volume2 } from 'lucide-react';

/* ---------------- WIN PROBABILITY ---------------- */

const calculateWinProbability = (a: number, b: number, t: number) => {
  let p = 0.5 + (a - b) * 0.12 + ((90 - t) / 90) * 0.08;
  p = Math.min(Math.max(p, 0.05), 0.95);
  return { teamA: Math.round(p * 100), teamB: 100 - Math.round(p * 100) };
};

/* ---------------- COMPONENT ---------------- */

interface ScoreboardProps {
  initialMatch: Match;
}

export default function Scoreboard({ initialMatch }: ScoreboardProps) {
  const [match, setMatch] = useState(initialMatch);
  const [time, setTime] = useState(45);

  /* Cheer system */
  const [cheerA, setCheerA] = useState(1);
  const [cheerB, setCheerB] = useState(1);
  const [momentum, setMomentum] = useState<number[]>([]);

  /* Audio refs */
  const cheerSoft = useRef<HTMLAudioElement | null>(null);
  const cheerLoud = useRef<HTMLAudioElement | null>(null);
  const ambience = useRef<HTMLAudioElement | null>(null);

  const total = cheerA + cheerB;
  const percentA = Math.round((cheerA / total) * 100);
  const percentB = 100 - percentA;

  /* ---------------- AUDIO INIT ---------------- */

  useEffect(() => {
    cheerSoft.current = new Audio('/sounds/cheer-soft.mp3');
    cheerLoud.current = new Audio('/sounds/cheer-loud.mp3');
    ambience.current = new Audio('/sounds/stadium-ambience.mp3');
    ambience.current.loop = true;
    ambience.current.volume = 0.2;
  }, []);

  /* ---------------- STADIUM ATMOSPHERE ---------------- */

  useEffect(() => {
    if (match.status === 'live') {
      ambience.current?.play();
    } else {
      ambience.current?.pause();
    }
  }, [match.status]);

  /* ---------------- CHEER HANDLER ---------------- */

  const cheer = (team: 'A' | 'B') => {
    if (team === 'A') setCheerA(c => c + 1);
    else setCheerB(c => c + 1);

    const dominance = Math.abs(percentA - percentB);

    const sound = dominance > 25 ? cheerLoud.current : cheerSoft.current;
    if (sound) {
      sound.volume = Math.min(0.2 + dominance / 100, 0.9);
      sound.currentTime = 0;
      sound.play();
    }
  };

  /* ---------------- MOMENTUM TRACKING ---------------- */

  useEffect(() => {
    setMomentum(prev => [...prev.slice(-20), percentA - percentB]);
  }, [cheerA, cheerB]);

  /* ---------------- LIVE MATCH SIM ---------------- */

  useEffect(() => {
    if (match.status !== 'live') return;

    const s = setInterval(() => {
      if (Math.random() > 0.96) {
        setMatch(m =>
          Math.random() > 0.5
            ? { ...m, scoreA: m.scoreA + 1 }
            : { ...m, scoreB: m.scoreB + 1 }
        );
        confetti({ particleCount: 80, spread: 60 });
      }
    }, 5000);

    const t = setInterval(() => {
      setTime(x => (x >= 90 ? 90 : x + 1));
    }, 1000);

    return () => {
      clearInterval(s);
      clearInterval(t);
    };
  }, [match.status]);

  /* ---------------- UI ---------------- */

  return (
    <div
      className={cn(
        'px-4 space-y-10 transition-all',
        percentA > percentB + 20 && 'bg-green-500/5',
        percentB > percentA + 20 && 'bg-blue-500/5'
      )}
    >
      {/* SCOREBOARD */}
      <Card className="max-w-4xl mx-auto shadow-2xl">
        <CardHeader className="bg-muted/50 text-center">
          <div className="flex justify-center gap-4">
            <Badge className="bg-red-600 text-white animate-pulse">LIVE</Badge>
            <div className="flex items-center gap-1 font-mono">
              <Clock className="h-4 w-4" /> {time}'
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
            <Button onClick={() => cheer('A')} variant="outline">
              <ThumbsUp className="text-green-600" />
            </Button>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center">
              <TeamBlock team={match.teamA} ring="ring-green-500/30" />
              <div className="text-5xl font-black font-mono px-6">
                {match.scoreA} - {match.scoreB}
              </div>
              <TeamBlock team={match.teamB} ring="ring-blue-500/30" />
            </div>

            <Button onClick={() => cheer('B')} variant="outline">
              <ThumbsUp className="text-blue-600" />
            </Button>
          </div>

          <div className="flex justify-center mt-6">
            <Button onClick={() => confetti()} className="rounded-full gap-2">
              <PartyPopper /> Celebrate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CROWD SUPPORT */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center font-bold">
          📣 Crowd Support <Volume2 className="inline h-4 ml-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Bar label={match.teamA.name} value={percentA} color="bg-green-500" />
          <Bar label={match.teamB.name} value={percentB} color="bg-blue-500" />
        </CardContent>
      </Card>

      {/* MOMENTUM GRAPH */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center font-bold">
          📈 Crowd Momentum
        </CardHeader>
        <CardContent>
          <svg viewBox="0 0 300 100" className="w-full h-32">
            <polyline
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              points={momentum
                .map((v, i) => `${(i / 20) * 300},${50 - v}`)
                .join(' ')}
            />
            <line x1="0" y1="50" x2="300" y2="50" stroke="#999" />
          </svg>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function TeamBlock({ team, ring }: any) {
  return (
    <div className="text-center space-y-2">
      <div
        className={cn(
          'relative mx-auto w-20 h-20 rounded-full overflow-hidden ring-4 shadow-lg',
          ring
        )}
      >
        <Image src={team.logoUrl} alt="" fill className="object-cover" />
      </div>
      <p className="font-bold text-sm">{team.name}</p>
    </div>
  );
}

function Bar({ label, value, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm font-semibold">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={cn('h-full', color)}
          animate={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
