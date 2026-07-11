import Link from "next/link";
import { ChefHat, Mail, MapPin, Link as LinkIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-basil-900 text-basil-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-white mb-3">
            <ChefHat className="w-5 h-5 text-honey-400" />
            Savorly
          </Link>
          <p className="text-sm text-basil-200 leading-relaxed">
            A community kitchen where home cooks share recipes worth making again.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Explore</h3>
          <ul className="space-y-2 text-sm text-basil-200">
            <li><Link href="/explore" className="hover:text-honey-400">All Recipes</Link></li>
            <li><Link href="/explore?category=Breakfast" className="hover:text-honey-400">Breakfast</Link></li>
            <li><Link href="/explore?category=Dinner" className="hover:text-honey-400">Dinner</Link></li>
            <li><Link href="/explore?category=Dessert" className="hover:text-honey-400">Dessert</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-basil-200">
            <li><Link href="/about" className="hover:text-honey-400">About</Link></li>
            <li><Link href="/contact" className="hover:text-honey-400">Contact</Link></li>
            <li><Link href="/register" className="hover:text-honey-400">Join Savorly</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Get in touch</h3>
          <ul className="space-y-2.5 text-sm text-basil-200">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@savorly.app</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Dhaka, Bangladesh</li>
          </ul>
          <div className="flex flex-col gap-2 mt-4 text-xs">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-honey-400 flex items-center gap-1.5"><LinkIcon className="w-3.5 h-3.5" /> Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-honey-400 flex items-center gap-1.5"><LinkIcon className="w-3.5 h-3.5" /> Facebook</a>
          </div>
        </div>
      </div>

      <div className="border-t border-basil-800 py-5 text-center text-xs text-basil-300">
        © {new Date().getFullYear()} Savorly. All rights reserved.
      </div>
    </footer>
  );
}