'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle } from 'lucide-react';

/* ---------------- ANIMATIONS ---------------- */

const pageAnim = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const sectionAnim = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      staggerChildren: 0.15,
    },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

/* ---------------- DATA ---------------- */

const features = [
  {
    title: 'Effortless Tournament Creation',
    description: 'Set up tournaments in minutes with ease.',
    icon: <CheckCircle className="h-6 w-6 text-orange-500" />,
    image: PlaceHolderImages.find(i => i.id === 'feature-management'),
  },
  {
    title: 'Automatic Fixture Generation',
    description: 'Balanced fixtures generated automatically.',
    icon: <CheckCircle className="h-6 w-6 text-orange-500" />,
    image: PlaceHolderImages.find(i => i.id === 'feature-fixtures'),
  },
  {
    title: 'Live Score Updates',
    description: 'Real-time match updates anywhere.',
    icon: <CheckCircle className="h-6 w-6 text-orange-500" />,
    image: PlaceHolderImages.find(i => i.id === 'feature-realtime'),
  },
];

/* ---------------- PAGE ---------------- */

export default function Home() {
  const [count, setCount] = useState(3);
  const [court, setCourt] = useState<'Street' | 'Indoor'>('Street');

  return (
    <motion.main
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      className="space-y-28"
    >

      {/* ================= HERO ================= */}
      <motion.section className="relative rounded-[32px] overflow-hidden border">
        <div className="grid lg:grid-cols-2 min-h-[540px]">

          {/* LEFT */}
          <div className="p-12 lg:p-16 flex flex-col justify-center z-10">
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-6xl font-black leading-tight"
            >
              It&apos;s Time To <br />
              Find Your <br />
              <span className="italic">Teammates</span> & <br />
              Common Court!
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-lg text-muted-foreground  max-w-xl"
            >
              Connect with local players, find the perfect court, and jump
              straight into the game. No calls, no chaos — just play.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                asChild
                className="mt-8 w-fit rounded-full px-10 py-6 text-lg hover:scale-105 transition"
              >
                <Link href="/tournaments">Enter Into The Court →</Link>
              </Button>
            </motion.div>
          </div>

          {/* RIGHT VIDEO */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <motion.video
              src="/videos/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-background/70 via-background/20 to-transparent" />
          </motion.div>
        </div>
      </motion.section>

      {/* ================= STEPS ================= */}
      <motion.section
        variants={sectionAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6"
      >

        {/* STEP 1 */}
        <motion.div variants={itemAnim}>
  <div className="bg-white text-black border-[6px] border-black
    shadow-[12px_12px_0_#000]
    hover:shadow-[17px_17px_0_#000]
    hover:-translate-x-[5px] hover:-translate-y-[5px]
    transition-all duration-300 p-6"
  >
    <p className="font-bold uppercase">Step 1</p>

    <h3 className="text-2xl font-black uppercase mt-3">
      How many teammates?
    </h3>

    <div className="flex items-center gap-4 mt-8">
      <Button size="icon" onClick={() => setCount(c => Math.max(1, c - 1))}>
        –
      </Button>

      <motion.span
        key={count}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="text-3xl font-black w-10 text-center"
      >
        {count}
      </motion.span>

      <Button size="icon" onClick={() => setCount(c => c + 1)}>
        +
      </Button>
    </div>
  </div>
</motion.div>


        {/* STEP 2 */}
        <motion.div variants={itemAnim}>
          <div className="bg-orange-400 border-[6px] border-black shadow-[12px_12px_0_#000]
            hover:shadow-[17px_17px_0_#000] hover:-translate-x-[5px]  hover:-translate-y-[5px]
            transition-all duration-300 p-6">
            <p className="font-bold uppercase opacity-80">Step 2</p>
            <h3 className="text-2xl font-black uppercase mt-3">
              Choose Court 
            </h3>

            <div className="flex gap-4 mt-8">
              {['Street', 'Indoor'].map(opt => (
                <motion.button
                  key={opt}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCourt(opt as 'Street' | 'Indoor')}
                  className={`px-6 py-2 rounded-full font-bold uppercase border-[3px] border-black
                    ${court === opt ? 'bg-black text-white' : 'bg-transparent'}`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* STEP 3 */}
        <motion.div variants={itemAnim}>
  <div className="bg-white text-black border-[6px] border-black
    shadow-[12px_12px_0_#000]
    hover:shadow-[17px_17px_0_#000]
    hover:-translate-x-[5px] hover:-translate-y-[5px]
    transition-all duration-300 p-6"
  >
    <p className="font-bold uppercase">Step 3</p>

    <h3 className="text-2xl font-black uppercase mt-3">
      Allow Location Access
    </h3>

    <Button
      variant="outline"
      className="mt-8 border-[3px] border-black font-bold uppercase
        text-black hover:bg-black hover:text-white transition-colors"
    >
      Enable →
    </Button>
  </div>
</motion.div>

      </motion.section>

      {/* ================= FEATURES ================= */}
      <motion.section
        variants={sectionAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8"
      >
        {features.map(feature => (
          <motion.div
            key={feature.title}
            variants={itemAnim}
            className="bg-white border-[6px] border-black shadow-[12px_12px_0_#000]
              hover:shadow-[17px_17px_0_#000] hover:-translate-x-[5px] hover:-translate-y-[5px]
              transition-all duration-300 overflow-hidden"
          >
            {feature.image && (
              <Image
                src={feature.image.imageUrl}
                alt={feature.image.description}
                width={600}
                height={400}
                className="h-48 w-full object-cover"
              />
            )}

            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                {feature.icon}
                <h3 className="font-black uppercase">{feature.title}</h3>
              </div>
              <p className="mt-3 text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </motion.div>
        ))}
      </motion.section>

      {/* ================= CTA ================= */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center border rounded-3xl p-12"
      >
        <h2 className="text-4xl font-black">
          Ready to Elevate Your Tournament?
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Join hundreds of organizers who trust ScoreFlow.
        </p>

        <Button
          asChild
          size="lg"
          className="mt-8 rounded-full px-10 hover:scale-105 transition"
        >
          <Link href="/dashboard/create">
            Create Your First Tournament
          </Link>
        </Button>
      </motion.section>

    </motion.main>
  );
}
