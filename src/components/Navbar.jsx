'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sun, Moon, ArrowRight, User, LogOut, LayoutDashboard } from 'lucide-react';
import { authClient } from "@/lib/auth-client"; 

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user; 

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', isPrivate: false },
    { name: 'Ideas', href: '/ideas', isPrivate: false },
    { name: 'Add Idea', href: '/add-idea', isPrivate: true },
    { name: 'My Ideas', href: '/my-ideas', isPrivate: true },
    { name: 'My Interactions', href: '/my-interactions', isPrivate: true },
  ];


  const handleLogOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setDropdownOpen(false);
            console.log("Logged out successfully!");
           
            router.push("/");
            router.refresh();
          }
        }
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white dark:bg-[#0b0f19] text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800/60 sticky top-0 z-50 px-6 py-3.5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-xl text-black font-black text-lg shadow-md shadow-orange-600/20">
            IV
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Idea<span className="text-amber-500">Vault</span>
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center bg-gray-100 dark:bg-[#131926]/60 border border-gray-200 dark:border-gray-800/40 p-1.5 rounded-xl gap-1">
          {navLinks.map((link) => {
            if (link.isPrivate && !user) return null;

            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-white dark:bg-[#1c2538] text-indigo-600 dark:text-white shadow-sm' 
                    : 'hover:text-indigo-600 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-[#151d2e]/50'
                }`}
              >
                {link.name}
                {link.isPrivate && (
                  <span className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
     
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-[#131926] border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700 transition-colors"
            aria-label="Toggle Theme"
          >
            {mounted && (theme === 'dark' ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-gray-700" />
            ))}
          </button>

        
          {isPending || !user ? (
            <>
              <Link href="/login" className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gray-100 dark:bg-[#131926] border border-gray-200 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-[#1c2538] text-gray-900 dark:text-white transition-all">
                Login
              </Link>

              <Link href="/register" className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 text-black hover:opacity-90 shadow-lg shadow-orange-500/10 transition-all active:scale-95">
                Get Started <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3 relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 p-[2px] cursor-pointer shadow-md active:scale-95 transition-transform"
              >
                <div className="w-full h-full bg-white dark:bg-[#0b0f19] rounded-[10px] flex items-center justify-center font-bold text-gray-900 dark:text-white text-sm overflow-hidden">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name ? user.name.charAt(0).toUpperCase() : 'U'
                  )}
                </div>
              </button>

              <button 
                onClick={handleLogOut}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl border border-rose-200 dark:border-rose-900/30 bg-rose-50/50 dark:bg-rose-950/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/30 transition-all"
              >
                <LogOut size={15} /> <span className="hidden sm:inline">Logout</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-[90px] top-full mt-2 w-52 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800/60">
                    <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                  </div>

                  <Link 
                    href="/profile" 
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1c2538] transition-colors"
                  >
                    <User size={16} /> Profile Management
                  </Link>

                  <Link 
                    href="/dashboard" 
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1c2538] transition-colors"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;