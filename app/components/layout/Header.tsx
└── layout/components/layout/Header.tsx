"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/photography", label: "التصوير" },
  { href: "/venues", label: "القاعات" },
  { href: "/dresses", label: "الفساتين" },
  { href: "/suits", label: "البدلات" },
  { href: "/beauty", label: "بيوتي" },
  { href: "/cars", label: "السيارات" },
  { href: "/handmade", label: "هاند ميد" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4">
        {/* Logo */}

        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#211f1c] text-lg text-white shadow-sm transition group-hover:bg-[#b87333]">
            TM
          </div>

          <div className="leading-none">
            <div className="text-lg font-black tracking-tight">
              Tyson
            </div>

            <div className="text-[10px] font-black tracking-[0.25em] text-[#b87333]">
              MEDIA
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 text-sm font-bold text-[#514c46] transition hover:bg-[#f3eee8] hover:text-[#b87333]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-black text-[#211f1c] transition hover:bg-[#f3eee8]"
          >
            دخول
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-[#211f1c] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#b87333]"
          >
            إنشاء حساب
          </Link>
        </div>

        {/* Mobile Menu Button */}

        <button
          type="button"
          aria-label="فتح القائمة"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3eee8] text-xl md:hidden"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="border-t border-black/5 bg-white px-4 pb-5 pt-3 md:hidden">
          <nav className="grid gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-black transition hover:bg-[#f3eee8] hover:text-[#b87333]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-black/5 pt-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-xl border px-4 py-3 text-center text-sm font-black"
            >
              دخول
            </Link>

            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-[#211f1c] px-4 py-3 text-center text-sm font-black text-white"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}