"use client";

import Link from "next/link";
import { useState } from "react";

export default function BookingPage() {
  const [showNotice, setShowNotice] = useState(true);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f5f2] text-[#211f1c]"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight"
          >
            Tyson{" "}
            <span className="text-[#b87333]">Media</span>
          </Link>

          <Link
            href="/"
            className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-black text-white"
          >
            الرئيسية
          </Link>
        </div>
      </header>

      {/* Booking Notice */}
      {showNotice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white p-7 text-center shadow-2xl">
            
            {/* Close */}
            <button
              type="button"
              onClick={() => setShowNotice(false)}
              className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f1ee] text-lg font-black text-gray-600 transition hover:bg-[#211f1c] hover:text-white"
              aria-label="إغلاق"
            >
              ×
            </button>

            {/* Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f1e6da] text-4xl">
              📅
            </div>

            {/* Title */}
            <h1 className="mt-6 text-2xl font-black">
              تنبيه مهم