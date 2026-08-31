"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const categories = [
  { icon: "🏛️", name: "قاعات أفراح" },
  { icon: "🌿", name: "أماكن مفتوحة" },
  { icon: "🏨", name: "فنادق" },
  { icon: "🌊", name: "على البحر" },
  { icon: "🌳", name: "حدائق" },
  { icon: "✨", name: "أماكن فاخرة" },
];

const venues = [
  {
    id: 1,
    title: "قاعة أفراح فاخرة",
    price: "من 25,000 ج.م",
    city: "الإسكندرية",
    icon: "🏛️",
  },
  {
    id: 2,
    title: "قاعة كلاسيك",
    price: "من 18,000 ج.م",
    city: "القاهرة",
    icon: "✨",
  },
  {
    id: 3,
    title: "قاعة على البحر",
    price: "من 30,000 ج.م",
    city: "الساحل الشمالي",
    icon: "🌊",
  },
  {
    id: 4,
    title: "حديقة مناسبات",
    price: "من 15,000 ج.م",
    city: "الجيزة",
    icon: "🌳",
  },
];

export default function VenuesPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f5f2] text-[#211f1c]"
    >
      <Header />

      {/* HERO */}

      <section className="mx-auto max-w-7xl px-4 pt-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#211f1c] px-6 py-16 text-white md:px-12 md:py-24">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#b87333]/20 blur-3xl" />

          <div className="absolute -bottom-40 right-1/3 h-80 w-80 rounded-full bg-[#b87333]/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="text-6xl">🏛️</div>

            <p className="mt-6 text-xs font-black tracking-[0.3em] text-[#d6a66f]">
              WEDDING VENUES
            </p>

            <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
              قاعات الأفراح
              <br />

              <span className="text-[#d6a66f]">
                مكان يليق بفرحتك.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/60">
              اختار المكان المناسب لفرحك أو
              مناسبتك، وقارن بين القاعات والأسعار
              والمواقع والخدمات.
            </p>

            <Link
              href="#venues"
              className="mt-8 inline-flex rounded-2xl bg-[#b87333] px-6 py-3 text-sm font-black text-white transition hover:bg-[#d6a66f]"
            >
              اكتشف القاعات
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-7">
          <p className="text-xs font-black tracking-[0.25em] text-[#b87333]">
            VENUES
          </p>

          <h2 className="mt-2 text-3xl font-black">
            اختار المكان
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((category) => (
            <button
              key={category.name}
              className="rounded-3xl border bg-white p-4 text-right transition hover:-translate-y-1 hover:border-[#b87333] hover:shadow-lg"
            >
              <div className="flex h-24 items-center justify-center rounded-2xl bg-[#eee6dc] text-5xl">
                {category.icon}
              </div>

              <h3 className="mt-4 text-sm font-black">
                {category.name}
              </h3>

              <p className="mt-2 text-xs font-bold text-[#b87333]">
                عرض ←
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* FILTERS */}

      <section className="mx-auto max-w-7xl px-4">
        <div className="rounded-3xl border bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-black">
                نوع المكان
              </label>

              <select className="w-full rounded-2xl border bg-white p-3 outline-none focus:border-[#b87333]">
                <option>كل الأماكن</option>
                <option>قاعات أفراح</option>
                <option>أماكن مفتوحة</option>
                <option>فنادق</option>
                <option>على البحر</option>
                <option>حدائق</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black">
                المحافظة
              </label>

              <select className="w-full rounded-2xl border bg-white p-3 outline-none focus:border-[#b87333]">
                <option>كل المحافظات</option>
                <option>الإسكندرية</option>
                <option>القاهرة</option>
                <option>الجيزة</option>
                <option>البحيرة</option>
                <option>مطروح</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black">
                عدد الضيوف
              </label>

              <select className="w-full rounded-2xl border bg-white p-3 outline-none focus:border-[#b87333]">
                <option>أي عدد</option>
                <option>حتى 100 شخص</option>
                <option>100 - 250 شخص</option>
                <option>250 - 500 شخص</option>
                <option>أكثر من 500 شخص</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* VENUES */}

      <section
        id="venues"
        className="mx-auto max-w-7xl px-4 py-14"
      >
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.25em] text-[#b87333]">
              WEDDING VENUES
            </p>

            <h2 className="mt-2 text-3xl font-black">
              أماكن مميزة
            </h2>
          </div>

          <span className="rounded-full bg-[#eee6dc] px-4 py-2 text-xs font-black">
            {venues.length} أماكن
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {venues.map((venue) => (
            <article
              key={venue.id}
              className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-64 items-center justify-center bg-[#eee6dc] text-8xl transition group-hover:scale-105">
                {venue.icon}
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-center gap-1 text-sm">
                  <span>★★★★★</span>

                  <span className="text-xs text-gray-400">
                    تقييم ممتاز
                  </span>
                </div>

                <h3 className="text-xl font-black">
                  {venue.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#746f68]">
                  مكان مناسب للأفراح والمناسبات
                  مع إمكانية اختيار الخدمات حسب
                  احتياجاتك.
                </p>

                <div className="mt-4 space-y-2 text-sm">
                  <p className="font-bold">
                    📍 {venue.city}
                  </p>

                  <p className="font-black text-[#b87333]">
                    {venue.price}
                  </p>
                </div>

                <Link
                  href="/bookings"
                  className="mt-5 block rounded-xl bg-[#211f1c] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-[#b87333]"
                >
                  احجز الآن
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BOOKING NOTICE */}

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-[2rem] bg-[#eee6dc] p-7 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-4xl">📅</div>

              <h2 className="mt-4 text-2xl font-black">
                احجز القاعة بدري
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#746f68]">
                يفضل الحجز قبل موعد المناسبة
                بـ30 يومًا على الأقل لضمان توفر
                المكان والموعد المناسب.
              </p>
            </div>

            <Link
              href="/bookings"
              className="w-fit rounded-xl bg-[#211f1c] px-6 py-3 text-sm font-black text-white"
            >
              ابدأ الحجز
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}