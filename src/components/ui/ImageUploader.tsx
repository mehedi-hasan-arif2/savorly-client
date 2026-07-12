"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import api from "@/lib/api";

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  max?: number;
}

export default function ImageUploader({ value, onChange, max = 4 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const base64 = await toBase64(file);
      const res = await api.post("/upload", { base64Image: base64 });
      onChange([...value, res.data.url]);
    } catch {
      setError("Upload failed. Try a smaller image or paste a link instead.");
    } finally {
      setUploading(false);
    }
  }

  function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function removeImage(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-slate-700">Recipe image (optional)</label>

      <div className="flex flex-wrap gap-3">
        {value.map((url, i) => (
          <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200">
            <Image src={url} alt="Recipe preview" fill sizes="96px" className="object-cover" />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white hover:bg-black/80"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {value.length < max && (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-basil-400 hover:text-basil-500 transition-colors"
          >
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
            <span className="text-[11px] mt-1">{uploading ? "Uploading" : "Add photo"}</span>
          </button>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
      <p className="text-xs text-slate-400">Uploads go straight to image hosting — no file is stored on our server.</p>
    </div>
  );
}
