"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const messages = [
  "احجز مناسبتك بدري ✨",
  "الحجز متاح قبل الموعد بـ 30 يومًا على الأقل 📅",
  "خطط لمناسبتك من بدري ❤️",
  "اختار موعدك المناسب وابدأ الحجز 🎉",
];

export default function BookingsPage() {
  const [showNotice, setShowNotice] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((current) =>
        current === messages.length - 1 ? 0 : current + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f6f3] text-[#211f1c]"
    >
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link
            href="/"
            className="text-2xl font-black"
          >
            Tyson{" "}
            <span className="text-[#b87333]">
              Media
            </span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl">
            {/* Top */}
            <div className="relative bg-[#211f1c] px-6 py-8 text-center text-white">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#b87333]/20 text-4xl">
                📅
              </div>

              <h2 className="mt-5 text-2xl font-black">
                تنبيه مهم قبل الحجز
              </h2>

              <div className="relative mt-5 min-h-[70px] overflow-hidden">
                <p
                  key={messageIndex}
                  className="animate-[fadeSlide_0.6s_ease-in-out] text-lg font-bold leading-8 text-[#e2b783]"
                >
                  {messages[messageIndex]}
                </p>
              </div>

              {/* Animated dots */}
              <div className="mt-3 flex justify-center gap-2">
                {messages.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === messageIndex
                        ? "w-7 bg-[#b87333]"
                        : "w-2 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <div className="rounded-2xl bg-[#f5f0ea] p-5">
                <p className="text-sm font-black leading-7">
                  يجب أن يكون موعد الحجز قبل موعد
                  المناسبة بـ{" "}
                  <span className="text-[#b87333]">
                    30 يومًا على الأقل
                  </span>
                  .
                </p>

                <p className="mt-2 text-xs leading-6 text-gray-500">
                  اختر تاريخًا يسمح بالمدة المطلوبة
                  حتى نتمكن من تجهيز وتأكيد الخدمة.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowNotice(false)}
                className="mt-5 w-full rounded-xl bg-[#211f1c] px-6 py-4 font-black text-white transition hover:bg-[#b87333]"
              >
                فهمت، أريد اختيار الموعد
              </button>

              <Link
                href="/"
                className="mt-3 block text-sm font-bold text-gray-500 hover:text-[#b87333]"
              >
                الرجوع للرئيسية
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Booking Page */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-[2rem] bg-[#211f1c] px-6 py-12 text-center text-white">
          <div className="text-6xl">📅</div>

          <p className="mt-5 text-sm font-black text-[#d6a66f]">
            TYSON MEDIA • BOOKING
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-5xl">
            حجز خدمة
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60">
            اختر الخدمة والتاريخ المناسب لك
            لإرسال طلب الحجز.
          </p>
        </div>

        {/* Booking Form Placeholder */}
        <div className="mt-6 rounded-3xl border bg-white p-6">
          <h2 className="text-2xl font-black">
            بيانات الحجز
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            هنا هنكمل نموذج الحجز وربطه بـ Supabase.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold">
                تاريخ المناسبة
              </label>

              <input
                type="date"
                className="w-full rounded-xl border p-3 outline-none focus:border-[#b87333]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                وقت المناسبة
              </label>

              <input
                type="time"
                className="w-full rounded-xl border p-3 outline-none focus:border-[#b87333]"
              />
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeSlide {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}