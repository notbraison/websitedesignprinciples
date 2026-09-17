'use client';

import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, IntersectionObserver | null>>({});

  useEffect(() => {
    const createObserver = (id: string) => {
      return new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, id]));
        }
      }, { threshold: 0.1 });
    };

    const sections = ['hero', 'scannability', 'authenticity', 'clarity', 'performance', 'results'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        const observer = createObserver(id);
        observer.observe(element);
        sectionRefs.current[id] = observer;
      }
    });

    return () => {
      Object.values(sectionRefs.current).forEach(observer => {
        if (observer) observer.disconnect();
      });
    };
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section
        id="hero"
        className={`min-h-screen flex items-center justify-center px-4 py-20 transition-opacity duration-700 ${
          isVisible('hero') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
                Web Design Principles
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                The 7 principles of web design that actually convert users
              </p>
              
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden border border-border">
              <Image
                src="/hero-team.jpg"
                alt="Real team at work"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scannability Section */}
      <section
        id="scannability"
        className={`min-h-screen flex items-center justify-center px-4 py-20 bg-secondary/5 transition-opacity duration-700 ${
          isVisible('scannability') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Principle 1: Scannability</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                <span className="font-bold text-accent">Users don&apos;t read websites.</span> They scan them in 0.5 seconds.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                The average person will scan about <span className="font-bold text-foreground">750 websites</span> this year. They have zero patience for walls of text.
              </p>
              <div className="space-y-3 pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span><span className="font-bold">Bold key concepts</span> so eyes land on what matters</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span><span className="font-bold">Break up text</span> with whitespace and hierarchy</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span><span className="font-bold">Lead with value</span> not your company story</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span><span className="font-bold">Use short sentences.</span> Always.</span>
                </div>
              </div>
            </div>

            <Card className="bg-card border-border p-8">
              <h3 className="font-bold text-lg mb-4">The Bad Way</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Welcome to our company. We&apos;ve been in the business for over 20 years and we&apos;ve worked with thousands of clients around the world. Our team of experienced professionals is dedicated to delivering the highest quality services. We believe in innovation and excellence. Our values are centered around customer satisfaction and continuous improvement. We strive to provide solutions that exceed expectations and create lasting relationships with our clients. Contact us today to learn more about how we can help your business grow and succeed.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Authenticity Section */}
      <section
        id="authenticity"
        className={`min-h-screen flex items-center justify-center px-4 py-20 transition-opacity duration-700 ${
          isVisible('authenticity') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-5xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Principle 2: Authenticity</h2>
          <p className="text-center text-xl text-muted-foreground mb-16 text-balance">
            Users can smell fake from a mile away. Real humans trust real people.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-destructive">❌ Soulless Stock Photo</h3>
              <div className="relative h-80 rounded-lg overflow-hidden border border-border bg-muted/20">
                <Image
                  src="/stock-photo.jpg"
                  alt="Generic stock photo"
                  fill
                  className="object-cover grayscale opacity-60"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Nobody believes this. Overly posed. No personality. Immediately triggers skepticism.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-accent">✓ Real Human Photo</h3>
              <div className="relative h-80 rounded-lg overflow-hidden border border-accent/50 bg-secondary/5">
                <Image
                  src="/real-human.jpg"
                  alt="Real authentic human"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-foreground">
                Genuine moment. Natural lighting. Real personality. This builds trust immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clarity Section */}
      <section
        id="clarity"
        className={`min-h-screen flex items-center justify-center px-4 py-20 bg-secondary/5 transition-opacity duration-700 ${
          isVisible('clarity') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-5xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Principle 3: Clarity Over Beauty</h2>
          <p className="text-xl text-muted-foreground mb-16 text-balance">
            A beautiful design that confuses people converts at 0%. A boring design that converts beats it every time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border p-8">
              <h3 className="font-bold text-lg mb-4">Plan Name</h3>
              <p className="text-3xl font-bold text-accent mb-2">$99</p>
              <p className="text-sm text-muted-foreground mb-6">/month or $990/year</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Clear feature</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Another feature</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Third feature</span>
                </li>
              </ul>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Get Started
              </Button>
            </Card>

            <Card className="bg-card border-border p-8 border-2 border-accent">
              <div className="inline-block bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded mb-4">
                MOST POPULAR
              </div>
              <h3 className="font-bold text-lg mb-4">Premium Plan</h3>
              <p className="text-3xl font-bold text-accent mb-2">$199</p>
              <p className="text-sm text-muted-foreground mb-6">/month or $1,990/year</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Everything in Plan</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Get Started
              </Button>
            </Card>
          </div>

          <Card className="bg-card border-border p-8 mt-8">
            <h3 className="font-bold text-lg mb-6">The Price Transparency Rule</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Hidden fees kill trust</p>
                <p className="text-3xl font-bold text-destructive">$0</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Clear costs filter bad leads</p>
                <p className="text-3xl font-bold text-accent">$99-$199</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Result: Only serious buyers</p>
                <p className="text-3xl font-bold text-foreground">+40% Conv.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Performance Section */}
      <section
        id="performance"
        className={`min-h-screen flex items-center justify-center px-4 py-20 transition-opacity duration-700 ${
          isVisible('performance') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Principle 4: Performance Obsession</h2>
          <p className="text-xl text-muted-foreground mb-16 text-balance">
            Every 100ms of latency costs you 1% of conversions. Cut the bloat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card border-border p-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">PageSpeed Score</p>
              <p className="text-6xl font-bold text-accent mb-2">100</p>
              <p className="text-sm text-foreground">/100 Desktop</p>
            </Card>

            <Card className="bg-card border-border p-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">Load Time</p>
              <p className="text-6xl font-bold text-accent mb-2">1.2s</p>
              <p className="text-sm text-foreground">Full page</p>
            </Card>

            <Card className="bg-card border-border p-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">JavaScript</p>
              <p className="text-6xl font-bold text-accent mb-2">15kb</p>
              <p className="text-sm text-foreground">Total footprint</p>
            </Card>
          </div>

          <Card className="bg-secondary/5 border-border p-8 mt-8">
            <h3 className="font-bold text-lg mb-4">What to Cut</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-accent rounded-full"></span>
                Deleted all decorative animations
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-accent rounded-full"></span>
                Optimized images (WebP, lazy-load)
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-accent rounded-full"></span>
                Removed unnecessary dependencies
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-accent rounded-full"></span>
                Minified and inlined critical CSS
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      <section
        id="results"
        className={`min-h-screen flex items-center justify-center px-4 py-20 bg-secondary/5 transition-opacity duration-700 ${
          isVisible('results') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">What Results Look Like</h2>
          <p className="text-center text-xl text-muted-foreground mb-16 text-balance">
            Stop measuring vanity metrics. Focus on outcomes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Card className="bg-card border-border p-8">
                <TrendingUp className="w-8 h-8 text-accent mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Leads Generated</p>
                <p className="text-4xl font-bold mb-2">+40%</p>
                <p className="text-sm text-foreground">Month over month after redesign</p>
              </Card>

              <Card className="bg-card border-border p-8">
                <TrendingUp className="w-8 h-8 text-accent mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Conversion Rate</p>
                <p className="text-4xl font-bold mb-2">3.2%</p>
                <p className="text-sm text-foreground">Up from 1.8% with outdated design</p>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="bg-card border-border p-8">
                <TrendingUp className="w-8 h-8 text-accent mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Avg Session Duration</p>
                <p className="text-4xl font-bold mb-2">3m 42s</p>
                <p className="text-sm text-foreground">Users actually stay and read</p>
              </Card>

              <Card className="bg-card border-border p-8">
                <TrendingUp className="w-8 h-8 text-accent mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Bounce Rate</p>
                <p className="text-4xl font-bold mb-2">-35%</p>
                <p className="text-sm text-foreground">Real clarity keeps people engaged</p>
              </Card>
            </div>
          </div>

          <Card className="bg-card border-2 border-accent p-12 mt-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Stop Guessing?</h3>
            <p className="text-lg text-muted-foreground mb-8">
              These principles work. They&apos;ve been proven across hundreds of websites.
            </p>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg">
              Start Your Transformation
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/10 border-t border-border px-4 py-12">
        <div className="max-w-4xl mx-auto text-center text-muted-foreground">
          <p> Web Design Principles.</p>
        </div>
      </footer>
    </main>
  );
}
