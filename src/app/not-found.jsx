import Link from 'next/link';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-6 bg-white dark:bg-[#0b0f19] transition-colors duration-300">
      <div className="max-w-xl text-center">
        
        {/* 404 Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-black uppercase tracking-wider bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-100/50 dark:border-rose-900/20 mb-6 animate-bounce">
          Error 404
        </div>

        {/* Big Heading */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-4 leading-none">
          Lost in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600">Vault?</span>
        </h1>

        {/* Subtitle / Message */}
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-10 max-w-md mx-auto leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved to a secret compartment. Let&apos;s get you back on track!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Back to Home Button */}
          <Link 
            href="/" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 text-black font-bold text-sm rounded-xl hover:opacity-95 shadow-lg shadow-orange-500/10 active:scale-95 transition-all"
          >
            <Home size={16} strokeWidth={2.5} /> Return Home
          </Link>

          {/* Discover Ideas Button */}
          <Link 
            href="/ideas" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-100 dark:bg-[#131926] border border-gray-200 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-[#1c2538] text-gray-900 dark:text-white font-semibold text-sm rounded-xl active:scale-95 transition-all"
          >
            <Compass size={16} /> Explore Ideas
          </Link>

        </div>

        {/* Dynamic Subtle Background Design Elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-500/5 dark:bg-amber-500/2 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-600/5 dark:bg-orange-600/2 blur-3xl pointer-events-none rounded-full" />

      </div>
    </div>
  );
}