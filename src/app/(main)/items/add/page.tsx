"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ImageUploader from "@/components/ui/ImageUploader";

interface FormValues {
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  difficulty: string;
  cookTimeMinutes: number;
  servings: number;
  ingredientsText: string;
  stepsText: string;
}

export default function AddRecipePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [images, setImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { category: "Dinner", difficulty: "Easy", servings: 2 },
  });

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [authLoading, user, router]);

  if (authLoading || !user) {
    return <div className="max-w-2xl mx-auto px-4 py-24 text-center text-slate-400">Loading...</div>;
  }

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const res = await api.post("/recipes", {
        ...values,
        cookTimeMinutes: Number(values.cookTimeMinutes),
        servings: Number(values.servings),
        ingredients: values.ingredientsText.split("\n").map((i) => i.trim()).filter(Boolean),
        steps: values.stepsText.split("\n").map((i) => i.trim()).filter(Boolean),
        images,
      });
      toast.success("Recipe published");
      router.push(`/recipes/${res.data.recipe._id}`);
    } catch (err) {
      const message = axiosError(err);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="font-display text-3xl font-semibold text-slate-800 mb-1">Add a recipe</h1>
      <p className="text-slate-500 mb-8">Share a dish you make often — the more specific the better.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input label="Title" {...register("title", { required: "Title is required" })} error={errors.title?.message} placeholder="e.g. Garlic Butter Shrimp Pasta" />
        <Textarea label="Short description" {...register("shortDescription", { required: "Short description is required" })} error={errors.shortDescription?.message} rows={2} placeholder="One or two lines for the recipe card" />
        <Textarea label="Full description" {...register("fullDescription", { required: "Full description is required" })} error={errors.fullDescription?.message} rows={4} placeholder="What makes this recipe worth making — background, tips, variations" />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Category</label>
            <select {...register("category")} className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-basil-500">
              {["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Drinks"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Difficulty</label>
            <select {...register("difficulty")} className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-basil-500">
              {["Easy", "Medium", "Hard"].map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Cook time (minutes)" type="number" {...register("cookTimeMinutes", { required: "Enter a valid cook time", min: { value: 1, message: "Must be at least 1 minute" } })} error={errors.cookTimeMinutes?.message} />
          <Input label="Servings" type="number" {...register("servings")} />
        </div>

        <Textarea label="Ingredients (one per line)" {...register("ingredientsText")} rows={4} placeholder={"2 cups flour\n1 tsp salt"} />
        <Textarea label="Steps (one per line)" {...register("stepsText")} rows={4} placeholder={"Preheat oven to 180C\nMix dry ingredients"} />

        <ImageUploader value={images} onChange={setImages} />

        <Button type="submit" loading={submitting} className="mt-2 self-start">Submit recipe</Button>
      </form>
    </div>
  );
}

function axiosError(err: unknown): string {
  if (err && typeof err === "object" && "response" in err) {
    const response = (err as { response?: { data?: { error?: string } } }).response;
    return response?.data?.error || "Something went wrong";
  }
  return "Something went wrong";
}
