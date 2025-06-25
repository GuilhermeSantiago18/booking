'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IUser } from '../../types/IUser';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { menuItems, IMenuItem } from './MenuItems';


export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<IUser | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  if (!user) return null;

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(user.role));

  return (
    <>
      <div className="md:hidden p-2 mt-2">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-black border px-3 py-1 rounded"
        >
          Menu
        </button>
      </div>

      <aside
        className={`bg-gray-100 h-screen md:w-64 fixed top-0 left-0 transform ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out z-40`}
      >
        <div className="flex flex-col h-full p-4 justify-between">
          <nav className="flex flex-col gap-4">
            {filteredMenuItems.map((link: IMenuItem) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-4 py-2 rounded hover:bg-gray-200 ${
                  pathname === link.href ? 'bg-black text-white' : 'text-black'
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="text-sm text-gray-700 mt-8 border-t pt-4">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="w-full flex justify-between items-center font-semibold focus:outline-none"
              aria-expanded={isUserDropdownOpen}
              aria-haspopup="true"
              type="button"
            >
              <span>{user.firstName} {user.lastName}</span>
              {isUserDropdownOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {isUserDropdownOpen && (
              <div className="mt-2 text-xs capitalize">
                {user.role}
              </div>
            )}
          </div>
        </div>
      </aside>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
