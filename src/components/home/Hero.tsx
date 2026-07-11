"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const SLIDES = [
  { image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200", caption: "Weeknight dinners" },
  { image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200", caption: "Weekend baking" },
  { image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200", caption: "Quick breakfasts" },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[65vh] min-h-[480px] w-full overflow-hidden">
      {SLIDES.map((slide, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? "opacity-100" : "opacity-0"}`}>
          <Image src={slide.image} alt={slide.caption} fill sizes="100vw" priority={i === 0} className="object-cover" />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />

      <div className="relative h-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col justify-center">
        <p className="text-honey-300 text-sm font-medium tracking-wide uppercase mb-3">
          {SLIDES[active].caption}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white max-w-xl leading-tight">
          Recipes worth cooking twice
        </h1>
        <p className="text-white/80 mt-4 max-w-md text-base sm:text-lg">
          Savorly is where home cooks share the dishes that actually made it onto the table again.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link href="/explore" className="bg-honey-400 hover:bg-honey-500 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors">
            Explore recipes
          </Link>
          <Link href="/register" className="bg-white/10 border border-white/30 hover:bg-white/20 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors backdrop-blur-sm">
            Share your own
          </Link>
        </div>

        <div className="flex gap-2 mt-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-honey-400" : "w-4 bg-white/40"}`}
            />
          ))}
        </div>
      </div>

      <ChevronDown className="absolute bottom-5 left-1/2 -translate-x-1/2 w-6 h-6 text-white/70 animate-bounce" />
    </section>
  );
}
