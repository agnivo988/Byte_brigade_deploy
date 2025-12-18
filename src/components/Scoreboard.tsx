'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Match } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';
import { Clock, PartyPopper } from 'lucide-react';

interface ScoreboardProps {
  initialMatch: Match;
}

const quiz = {
  question: 'Who won the last World Cup?',
  options: ['Brazil', 'France', 'Argentina', 'Germany'],
  answer: 'Argentina',
};

export default function Scoreboard({ initialMatch }: ScoreboardProps) {
  const [match, setMatch] = useState(initialMatch);
  const [time, setTime] = useState(45);
  const [selected, setSelected] = useState<string | null>(null);
  const scoreRef = useRef<HTMLDivElement>(null);

  /* 🎉 CONFETTI FUNCTION */
  const confettiBlast = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  /* Smooth scroll on score change + auto confetti */
  useEffect(() => {
    scoreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    confettiBlast();
  }, [match.scoreA, match.scoreB]);

  useEffect(() => {
    if (match.status !== 'live') return;

    const scoreInterval = setInterval(() => {
      setMatch((prev) => {
        if (Math.random() > 0.95) {
          return Math.random() > 0.5
            ? { ...prev, scoreA: prev.scoreA + 1 }
            : { ...prev, scoreB: prev.scoreB + 1 };
        }
        return prev;
      });
    }, 5000);

    const timeInterval = setInterval(() => {
      setTime((t) => {
        if (t >= 90) {
          clearInterval(scoreInterval);
          clearInterval(timeInterval);
          setMatch((m) => ({ ...m, status: 'completed' }));
          return 90;
        }
        return t + 1;
      });
    }, 1000);

    return () => {
      clearInterval(scoreInterval);
      clearInterval(timeInterval);
    };
  }, [match.status]);

  const statusInfo = {
    live: { text: 'Live', color: 'bg-red-700 text-white animate-pulse' },
    completed: { text: 'Full Time', color: 'bg-secondary text-secondary-foreground' },
    scheduled: { text: 'Scheduled', color: 'bg-muted text-muted-foreground' },
  }[match.status];

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
      {/* ================= SCOREBOARD ================= */}
      <Card className="w-full max-w-4xl mx-auto shadow-2xl">
        <CardHeader className="text-center p-4 bg-muted/50">
          <div className="flex justify-center items-center gap-4">
            <Badge className={cn('capitalize text-sm', statusInfo.color)}>
              {statusInfo.text}
            </Badge>

            {match.status === 'live' && (
              <motion.div
                className="flex items-center gap-2 text-sm font-mono"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                <Clock className="h-4 w-4" />
                <span>{time}'</span>
              </motion.div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <div className="grid grid-cols-3 items-center">
            {/* Team A */}
            <motion.div whileHover={{ scale: 1.05 }} className="text-center">
              <Image src={match.teamA.logoUrl} alt="" width={90} height={90} />
              <h2 className="font-bold">{match.teamA.name}</h2>
            </motion.div>

            {/* Score */}
            <div
              ref={scoreRef}
              className="flex justify-center text-5xl font-black font-mono"
            >
              <AnimatePresence mode="popLayout">
                <motion.span key={match.scoreA} initial={{ scale: 0.6 }} animate={{ scale: 1 }}>
                  {match.scoreA}
                </motion.span>
              </AnimatePresence>
              <span className="mx-3 text-muted-foreground">-</span>
              <AnimatePresence mode="popLayout">
                <motion.span key={match.scoreB} initial={{ scale: 0.6 }} animate={{ scale: 1 }}>
                  {match.scoreB}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Team B */}
            <motion.div whileHover={{ scale: 1.05 }} className="text-center">
              <Image src={match.teamB.logoUrl} alt="" width={90} height={90} />
              <h2 className="font-bold">{match.teamB.name}</h2>
            </motion.div>
          </div>

          {/* 🎉 PARTY POPPER BUTTON */}
          <div className="flex justify-center mt-8">
            <Button
              onClick={confettiBlast}
              className="gap-2 rounded-full text-lg"
            >
              <PartyPopper /> Celebrate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ================= QUIZ SECTION ================= */}
      <motion.div
        className="max-w-4xl mx-auto mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Card className="shadow-xl">
          <CardHeader>
            <h3 className="text-xl font-bold text-center">⚽ Match Quiz</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center font-medium">{quiz.question}</p>

            <div className="grid grid-cols-2 gap-4">
              {quiz.options.map((opt) => (
                <motion.button
                  key={opt}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelected(opt);
                    if (opt === quiz.answer) confettiBlast();
                  }}
                  className={cn(
                    'p-3 rounded-xl border text-center font-semibold',
                    selected === opt && opt === quiz.answer
                      ? 'bg-green-500 text-white'
                      : selected === opt
                      ? 'bg-red-500 text-white'
                      : 'hover:bg-muted'
                  )}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
