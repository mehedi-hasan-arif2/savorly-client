"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Clock, Star, Users, ChefHat } from "lucide-react";
import api from "@/lib/api";
import RecipeCard from "@/components/recipes/RecipeCard";
import { Recipe } from "@/types";

export default function RecipeDetailsPage() {
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [related, setRelated] = useState<Recipe[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/recipes/${params.id}`)
      .then((res) => {
        setRecipe(res.data.recipe);
        setRelated(res.data.related || []);
      })
      .catch(() => setRecipe(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-24 text-center text-slate-400">Loading recipe...</div>;
  }

  if (!recipe) {
    return <div className="max-w-4xl mx-auto px-4 py-24 text-center text-slate-400">Recipe not found.</div>;
  }

  const images = recipe.images.length ? recipe.images : ["https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=900"];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <div className="relative w-full h-80 rounded-2xl overflow-hidden mb-3">
            <Image src={images[activeImage]} alt={recipe.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 ${i === activeImage ? "border-basil-600" : "border-transparent"}`}
                >
                  <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="text-xs font-medium text-basil-700 bg-basil-100 px-2.5 py-1 rounded-full">{recipe.category}</span>
          <h1 className="font-display text-3xl font-semibold text-slate-800 mt-3 mb-3">{recipe.title}</h1>
          <p className="text-slate-600 mb-5">{recipe.shortDescription}</p>

          <div className="flex flex-wrap gap-5 text-sm text-slate-500 mb-6">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {recipe.cookTimeMinutes} min</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {recipe.servings} servings</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-honey-400 text-honey-400" /> {recipe.rating?.toFixed(1) || "New"}</span>
            <span className="flex items-center gap-1.5"><ChefHat className="w-4 h-4" /> {recipe.difficulty}</span>
          </div>

          <h2 className="font-semibold text-slate-800 mb-2">Ingredients</h2>
          <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
            {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
          </ul>
        </div>
      </div>

      {/* Overview */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-slate-800 mb-3">Overview</h2>
        <p className="text-slate-600 leading-relaxed whitespace-pre-line">{recipe.fullDescription}</p>
      </section>

      {/* Steps */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-slate-800 mb-4">Method</h2>
        <ol className="space-y-4">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="w-7 h-7 rounded-full bg-basil-600 text-white text-sm flex items-center justify-center shrink-0">{i + 1}</span>
              <p className="text-slate-600 text-sm leading-relaxed pt-0.5">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Specifications / Nutrition */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-slate-800 mb-4">Nutrition (per serving)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Calories", value: recipe.nutrition.calories },
            { label: "Protein", value: `${recipe.nutrition.protein}g` },
            { label: "Carbs", value: `${recipe.nutrition.carbs}g` },
            { label: "Fat", value: `${recipe.nutrition.fat}g` },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-basil-50 p-4 text-center">
              <p className="font-display text-xl font-semibold text-basil-700">{item.value}</p>
              <p className="text-xs text-slate-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="mb-14">
        <h2 className="font-display text-xl font-semibold text-slate-800 mb-4">Reviews</h2>
        {recipe.reviews.length === 0 ? (
          <p className="text-sm text-slate-400">No reviews yet — be the first to try it.</p>
        ) : (
          <div className="space-y-4">
            {recipe.reviews.map((review, i) => (
              <div key={i} className="border border-slate-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-medium text-sm text-slate-800">{review.userName}</span>
                  <span className="flex items-center gap-1 text-xs text-honey-500">
                    <Star className="w-3.5 h-3.5 fill-honey-400 text-honey-400" /> {review.rating}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="font-display text-xl font-semibold text-slate-800 mb-4">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((r) => <RecipeCard key={r._id} recipe={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
