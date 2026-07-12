"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import RecipeCard from "@/components/recipes/RecipeCard";
import RecipeCardSkeleton from "@/components/recipes/RecipeCardSkeleton";
import RecipeFilters from "@/components/recipes/RecipeFilters";
import { Recipe } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ExploreContent() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [difficulty, setDifficulty] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      search,
      category,
      difficulty,
      sort,
      page: page.toString(),
      limit: "8",
    });
    const res = await api.get(`/recipes?${params}`);
    setRecipes(res.data.recipes);
    setTotalPages(res.data.totalPages || 1);
    setLoading(false);
  }, [search, category, difficulty, sort, page]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  useEffect(() => {
    setPage(1);
  }, [search, category, difficulty, sort]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-slate-800">Explore recipes</h1>
        <p className="text-slate-500 mt-1">Search and filter to find your next meal.</p>
      </div>

      <RecipeFilters
        search={search}
        category={category}
        difficulty={difficulty}
        sort={sort}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onDifficultyChange={setDifficulty}
        onSortChange={setSort}
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => <RecipeCardSkeleton key={i} />)}
        </div>
      ) : recipes.length === 0 ? (
        <p className="text-center text-slate-400 py-20">No recipes match your filters yet. Try a different search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recipes.map((r) => <RecipeCard key={r._id} recipe={r} />)}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-full border border-slate-200 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-slate-500">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-full border border-slate-200 disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={null}>
      <ExploreContent />
    </Suspense>
  );
}
