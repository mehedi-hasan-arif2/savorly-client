"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Mail, MapPin, Phone } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  function onSubmit() {
    toast.success("Message sent — we'll get back to you soon");
    reset();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-14">
      <div>
        <h1 className="font-display text-3xl font-semibold text-slate-800 mb-3">Get in touch</h1>
        <p className="text-slate-500 mb-8">Questions, feedback, or a recipe idea you want featured — we'd love to hear it.</p>

        <div className="flex flex-col gap-5 text-sm text-slate-600">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-basil-100 flex items-center justify-center"><Mail className="w-4 h-4 text-basil-700" /></span>
            hello@savorly.app
          </div>
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-basil-100 flex items-center justify-center"><Phone className="w-4 h-4 text-basil-700" /></span>
            +880 1XXX-XXXXXX
          </div>
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-basil-100 flex items-center justify-center"><MapPin className="w-4 h-4 text-basil-700" /></span>
            Dhaka, Bangladesh
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Your name" {...register("name", { required: "Name is required" })} error={errors.name?.message} />
        <Input label="Email" type="email" {...register("email", { required: "Email is required" })} error={errors.email?.message} />
        <Textarea label="Message" rows={5} {...register("message", { required: "Message is required" })} error={errors.message?.message} />
        <Button type="submit" className="self-start mt-2">Send message</Button>
      </form>
    </div>
  );
}
