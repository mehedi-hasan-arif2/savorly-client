import Image from "next/image";
import { Users, Heart, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-display text-4xl font-semibold text-slate-800 mb-4">About Savorly</h1>
      <p className="text-slate-600 leading-relaxed mb-10 max-w-2xl">
        Savorly started as a simple idea: most recipe sites are optimized for ads, not for actually
        helping you cook dinner. We wanted a place where recipes are shared by real home cooks,
        rated by people who actually made the dish, and easy to filter by how much time you have.
      </p>

      <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-12">
        <Image src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200" alt="Cooking together" fill className="object-cover" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-14">
        {[
          { icon: Users, title: "Community-driven", desc: "Every recipe comes from a real person who cooks it regularly." },
          { icon: Heart, title: "No clutter", desc: "No life stories before the ingredients list. Just the recipe." },
          { icon: Sparkles, title: "Built for real life", desc: "Filter by cook time and difficulty for busy weeknights." },
        ].map((item) => (
          <div key={item.title}>
            <item.icon className="w-6 h-6 text-basil-600 mb-3" />
            <h3 className="font-semibold text-slate-800 mb-1.5">{item.title}</h3>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-2xl font-semibold text-slate-800 mb-3">Why we built this</h2>
      <p className="text-slate-600 leading-relaxed">
        This project began as a full-stack TypeScript build meant to demonstrate real production
        practices — clean architecture, secure authentication, and an interface people would
        actually enjoy using. Food felt like the right subject because everyone has a recipe
        worth sharing.
      </p>
    </div>
  );
}
