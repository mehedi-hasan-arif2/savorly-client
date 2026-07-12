import Link from "next/link";
import Image from "next/image";
import { Star, Clock } from "lucide-react";
import { Recipe } from "@/types";

interface RecipeCardProps {
  recipe: Recipe;
  priority?: boolean;
}

export default function RecipeCard({ recipe, priority = false }: RecipeCardProps) {
  const image = recipe.images?.[0] || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600";

  return (
    <Link
      href={`/recipes/${recipe._id}`}
      className="flex flex-col rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-lg transition-shadow h-full"
    >
      <div className="relative w-full h-44">
        <Image
          src={image}
          alt={recipe.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
          priority={priority}
        />
        <span className="absolute top-3 left-3 bg-white/90 text-xs font-medium px-2.5 py-1 rounded-full text-basil-700">
          {recipe.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-display font-semibold text-slate-800 mb-1 line-clamp-1">{recipe.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-3 flex-1">{recipe.shortDescription}</p>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {recipe.cookTimeMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-honey-400 text-honey-400" /> {recipe.rating?.toFixed(1) || "New"}
          </span>
        </div>
      </div>
    </Link>
  );
}