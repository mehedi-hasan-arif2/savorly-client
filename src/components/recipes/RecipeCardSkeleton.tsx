export default function RecipeCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="w-full h-44 bg-slate-200" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="h-3 bg-slate-200 rounded w-full" />
        <div className="h-3 bg-slate-200 rounded w-2/3" />
        <div className="flex justify-between mt-2">
          <div className="h-3 bg-slate-200 rounded w-12" />
          <div className="h-3 bg-slate-200 rounded w-8" />
        </div>
      </div>
    </div>
  );
}
