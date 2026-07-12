"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { Recipe } from "@/types";
import { Eye, Trash2, ShieldCheck } from "lucide-react";

export default function ManageRecipesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const isAdmin = user?.role === "admin";

  const fetchRecipes = useCallback(async () => {
    // Admins see every recipe for moderation; regular users see only their own
    const query = isAdmin ? "limit=50" : "mine=true&limit=50";
    const res = await api.get(`/recipes?${query}`);
    setRecipes(res.data.recipes || []);
    setLoading(false);
  }, [isAdmin]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }
    if (user) fetchRecipes();
  }, [authLoading, user, router, fetchRecipes]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this recipe? This can't be undone.")) return;
    setDeletingId(id);
    try {
      await api.delete(`/recipes/${id}`);
      setRecipes((prev) => prev.filter((r) => r._id !== id));
      toast.success("Recipe deleted");
    } catch {
      toast.error("Could not delete recipe");
    } finally {
      setDeletingId(null);
    }
  }

  if (authLoading || loading) {
    return <div className="max-w-5xl mx-auto px-4 py-24 text-center text-slate-400">Loading recipes...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <div className="flex items-center gap-2 mb-1">
        <h1 className="font-display text-3xl font-semibold text-slate-800">
          {isAdmin ? "Manage all recipes" : "Manage your recipes"}
        </h1>
        {isAdmin && (
          <span className="flex items-center gap-1 text-xs font-medium text-honey-600 bg-honey-50 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" /> Admin
          </span>
        )}
      </div>
      <p className="text-slate-500 mb-8">
        {isAdmin ? "Every recipe on the platform, from every cook." : "Everything you've shared with the community."}
      </p>

      {recipes.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl">
          <p className="text-slate-400 mb-4">
            {isAdmin ? "No recipes have been posted yet." : "You haven't posted any recipes yet."}
          </p>
          {!isAdmin && <Link href="/items/add" className="text-basil-700 font-medium text-sm">Add your first recipe →</Link>}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="flex gap-4 border border-slate-100 rounded-2xl p-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <Image
                  src={recipe.images?.[0] || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=200"}
                  alt={recipe.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 truncate">{recipe.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{recipe.category} · {recipe.cookTimeMinutes} min</p>
                <div className="flex gap-3 mt-3">
                  <Link href={`/recipes/${recipe._id}`} className="flex items-center gap-1 text-xs font-medium text-basil-700">
                    <Eye className="w-3.5 h-3.5" /> View
                  </Link>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    disabled={deletingId === recipe._id}
                    className="flex items-center gap-1 text-xs font-medium text-red-500 disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> {deletingId === recipe._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
