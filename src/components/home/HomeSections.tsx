"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { ChefHat, Search, UtensilsCrossed, Star, Mail } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import RecipeCard from "@/components/recipes/RecipeCard";
import RecipeCardSkeleton from "@/components/recipes/RecipeCardSkeleton";
import { Recipe } from "@/types";

const CATEGORIES = [
  { name: "Breakfast", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400" },
  { name: "Dinner", image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400" },
  { name: "Dessert", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400" },
  { name: "Drinks", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400" },
];

const TESTIMONIALS = [
  { name: "Nusrat J.", quote: "The cook-time filter alone has saved me on so many busy weeknights.", role: "Home cook, Dhaka" },
  { name: "Rafiq H.", quote: "First recipe site where the ratings actually mean something.", role: "Weekend baker" },
  { name: "Priya M.", quote: "I found three dinners on repeat rotation within a week of joining.", role: "Student" },
];

const FAQS = [
  { q: "Do I need an account to browse recipes?", a: "No — anyone can search, filter, and read full recipe details without signing up. An account is only needed to post or manage your own recipes." },
  { q: "Can I upload a photo with my recipe?", a: "Yes, the add-recipe form lets you upload a photo directly, or paste an image link if you already have one hosted somewhere." },
  { q: "Is Savorly free to use?", a: "Completely free. There's no premium tier — just a place to share and find recipes." },
];

export default function HomeSections() {
  const [featured, setFeatured] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{ categoryCounts: { category: string; count: number }[]; totalRecipes: number; avgRating: string }>({
    categoryCounts: [],
    totalRecipes: 0,
    avgRating: "0",
  });

  useEffect(() => {
    api.get("/recipes?sort=rating&limit=4")
      .then((res) => setFeatured(res.data.recipes))
      .finally(() => setLoading(false));

    api.get("/stats")
      .then((res) => setStats(res.data));
  }, []);

  return (
    <>
      {/* Featured Recipes */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-semibold text-slate-800">Featured this week</h2>
            <p className="text-slate-500 mt-1">The highest-rated dishes from the community right now.</p>
          </div>
          <Link href="/explore" className="text-sm font-medium text-basil-700 hidden sm:block">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <RecipeCardSkeleton key={i} />)
            : featured.map((r, index) => <RecipeCard key={r._id} recipe={r} priority={index === 0} />)}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-basil-50/60 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-slate-800 mb-8">Browse by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/explore?category=${cat.name}`}
                className="relative h-40 rounded-2xl overflow-hidden group"
              >
                <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/35 flex items-end p-4">
                  <span className="text-white font-display font-semibold">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="font-display text-3xl font-semibold text-slate-800 mb-10 text-center">How Savorly works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Search, title: "Find a recipe", desc: "Filter by category, difficulty, or cook time to find something that fits tonight." },
            { icon: UtensilsCrossed, title: "Cook it", desc: "Follow clear step-by-step instructions with ingredient amounts built in." },
            { icon: Star, title: "Share your own", desc: "Post the recipes you keep coming back to, so others can enjoy them too." },
          ].map((step) => (
            <div key={step.title} className="text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-basil-100 flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6 text-basil-700" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community Stats with chart */}
      <section className="bg-basil-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold mb-4">A growing community kitchen</h2>
            <p className="text-basil-200 mb-8">Recipes shared and rated by home cooks, not brands.</p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-display text-4xl font-semibold text-honey-400">{stats.totalRecipes}</p>
                <p className="text-sm text-basil-200 mt-1">Recipes shared</p>
              </div>
              <div>
                <p className="font-display text-4xl font-semibold text-honey-400">{stats.avgRating}</p>
                <p className="text-sm text-basil-200 mt-1">Average rating</p>
              </div>
            </div>
          </div>
          <div className="h-56 bg-white/5 rounded-2xl p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.categoryCounts}>
                <XAxis dataKey="category" stroke="#dceddd" fontSize={12} />
                <YAxis stroke="#dceddd" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: "#1e3a20", border: "none", borderRadius: 8, color: "white" }} />
                <Bar dataKey="count" fill="#eaa62b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="font-display text-3xl font-semibold text-slate-800 mb-10 text-center">What cooks are saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl border border-slate-100 p-6">
              <ChefHat className="w-6 h-6 text-honey-400 mb-4" />
              <p className="text-slate-600 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
              <p className="text-xs text-slate-400">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter + FAQ */}
      <section className="bg-honey-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <Mail className="w-8 h-8 text-honey-500 mb-4" />
            <h2 className="font-display text-2xl font-semibold text-slate-800 mb-2">Get a new recipe weekly</h2>
            <p className="text-slate-500 text-sm mb-5">No spam — just one good recipe worth trying, every week.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Subscribed! Watch your inbox.");
                (e.target as HTMLFormElement).reset();
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-honey-500"
              />
              <button className="bg-honey-500 hover:bg-honey-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                Subscribe
              </button>
            </form>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-slate-800 mb-4">Frequently asked</h2>
            <div className="flex flex-col divide-y divide-slate-200">
              {FAQS.map((faq) => (
                <details key={faq.q} className="py-3 group">
                  <summary className="text-sm font-medium text-slate-700 cursor-pointer list-none flex justify-between items-center">
                    {faq.q}
                    <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-sm text-slate-500 mt-2">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-800 mb-4">
          Got a recipe worth sharing?
        </h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Join the community and put your best dish in front of people looking for exactly that.
        </p>
        <Link href="/register" className="bg-basil-600 hover:bg-basil-700 text-white px-7 py-3 rounded-full text-sm font-medium transition-colors">
          Create your account
        </Link>
      </section>
    </>
  );
}