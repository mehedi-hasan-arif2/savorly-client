"use client";

import { Search } from "lucide-react";

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Drinks"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

interface RecipeFiltersProps {
  search: string;
  category: string;
  difficulty: string;
  sort: string;
  onSearchChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onDifficultyChange: (v: string) => void;
  onSortChange: (v: string) => void;
}

export default function RecipeFilters({
  search,
  category,
  difficulty,
  sort,
  onSearchChange,
  onCategoryChange,
  onDifficultyChange,
  onSortChange,
}: RecipeFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search recipes..."
          className="w-full rounded-full border border-slate-200 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-basil-500 focus:ring-1 focus:ring-basil-500"
        />
      </div>

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-full border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-basil-500"
      >
        <option value="">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value)}
        className="rounded-full border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-basil-500"
      >
        <option value="">Any difficulty</option>
        {DIFFICULTIES.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-full border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-basil-500"
      >
        <option value="newest">Newest</option>
        <option value="rating">Top rated</option>
        <option value="cookTime">Quickest to cook</option>
      </select>
    </div>
  );
}
