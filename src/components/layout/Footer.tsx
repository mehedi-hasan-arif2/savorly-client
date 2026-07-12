import Link from "next/link";
import { ChefHat, Mail, Phone, MapPin } from "lucide-react";

// Social Media Icons
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.25-1.5 1.55-1.5H16.5V4.3C16.2 4.26 15.2 4.17 14 4.17c-2.4 0-4 1.47-4 4.17V10.5H7.5v3H10V21h3.5z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-basil-900 text-basil-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* COL 1: BRAND */}
        <div>
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-white mb-3">
            <ChefHat className="w-5 h-5 text-honey-400" />
            Savorly
          </Link>
          <p className="text-sm text-basil-200 leading-relaxed mb-4">
            A community kitchen where home cooks share recipes worth making again.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2 bg-basil-800 hover:bg-honey-400 hover:text-basil-900 rounded-lg transition-colors duration-200"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 bg-basil-800 hover:bg-honey-400 hover:text-basil-900 rounded-lg transition-colors duration-200"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="p-2 bg-basil-800 hover:bg-honey-400 hover:text-basil-900 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <XIcon />
            </a>
          </div>
        </div>

        {/* COL 2: EXPLORE */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Explore</h3>
          <ul className="space-y-2 text-sm text-basil-200">
            <li><Link href="/explore" className="hover:text-honey-400">All Recipes</Link></li>
            <li><Link href="/explore?category=Breakfast" className="hover:text-honey-400">Breakfast</Link></li>
            <li><Link href="/explore?category=Dinner" className="hover:text-honey-400">Dinner</Link></li>
            <li><Link href="/explore?category=Dessert" className="hover:text-honey-400">Dessert</Link></li>
          </ul>
        </div>

        {/* COL 3: COMPANY */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-basil-200">
            <li><Link href="/about" className="hover:text-honey-400">About</Link></li>
            <li><Link href="/contact" className="hover:text-honey-400">Contact</Link></li>
            <li><Link href="/register" className="hover:text-honey-400">Join Savorly</Link></li>
          </ul>
        </div>

        {/* COL 4: GET IN TOUCH */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Get in touch</h3>
          <ul className="space-y-2.5 text-sm text-basil-200">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-honey-400 shrink-0" /> hello@savorly.app
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-honey-400 shrink-0" /> +880 1533648004
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-honey-400 shrink-0 mt-0.5" /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-basil-800 py-5 text-center text-xs text-basil-300">
        © {new Date().getFullYear()} Savorly. All rights reserved.
      </div>
    </footer>
  );
}