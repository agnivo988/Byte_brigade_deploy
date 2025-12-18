import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle } from 'lucide-react';

const features = [
  {
    title: 'Effortless Tournament Creation',
    description: 'Set up your tournaments in minutes with our intuitive creation wizard. Define sports, formats, and schedules with ease.',
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    image: PlaceHolderImages.find(img => img.id === 'feature-management'),
  },
  {
    title: 'Automatic Fixture Generation',
    description: 'Say goodbye to spreadsheets. Automatically generate balanced fixtures for round-robin and knockout stages.',
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    image: PlaceHolderImages.find(img => img.id === 'feature-fixtures'),
  },
  {
    title: 'Live Score Updates',
    description: 'Engage your audience with real-time score updates. Our live match pages keep everyone in the loop, from anywhere.',
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    image: PlaceHolderImages.find(img => img.id === 'feature-realtime'),
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <div className="space-y-24">
      <section className="relative -mt-8 -mx-4">
        <div className="relative h-[60vh] min-h-[400px] w-full">
          {heroImage && (
             <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        </div>
        <div className="container mx-auto px-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-0 md:translate-x-0 text-center md:text-left">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground font-headline">
              The Ultimate Platform for Sports Tournaments
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">
              From local leagues to college championships, ScoreFlow automates fixture generation, live scoring, and team management. Focus on the game, not the paperwork.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg">
                <Link href="/tournaments">Explore Tournaments</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/dashboard">Organizer Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Why ScoreFlow?</h2>
          <p className="mt-2 text-muted-foreground text-lg max-w-3xl mx-auto">
            We solve the real-world problems faced by organizers relying on manual methods like spreadsheets and WhatsApp groups.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-primary/20">
              {feature.image && (
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={feature.image.imageUrl}
                    alt={feature.image.description}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                    data-ai-hint={feature.image.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-start gap-4">
                  {feature.icon}
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center bg-card p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold font-headline">Ready to Elevate Your Tournament?</h2>
        <p className="mt-2 text-muted-foreground text-lg">
          Join hundreds of organizers who trust ScoreFlow to manage their events.
        </p>
        <Button asChild size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/dashboard/create">Create Your First Tournament</Link>
        </Button>
      </section>
    </div>
  );
}
