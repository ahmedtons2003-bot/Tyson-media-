"use client";

import Link from "next/link";
import { useState } from "react";

const categories = [
  { name: "الكل", icon: "🏛️" },
  { name: "قاعات أفراح", icon: "💍" },
  { name: "قاعات خطوبة", icon: "🥂" },
  { name: "فنادق", icon: "🏨" },
  { name: "أماكن مفتوحة", icon: "🌳" },
  { name: "حفلات صغيرة", icon: "🎉" },
];

const venues = [
  {
    id: 1,
    name: "قاعة رويال للاحتفالات",
    category: "قاعات أفراح",
    city: "الإسكندرية",
    price: 15000,
    capacity: "حتى 300 فرد",
    icon: "🏛️",
  },
  {
    id: 2,
    name: "قاعة ليالي",
    category: "قاعات أفراح",
    city: "القاهرة",
    price: 22000,
    capacity: "حتى 500 فرد",
    icon: "💍",
  },
  {
    id: 3,
    name: "قاعة جاردن",
    category: "أماكن مفتوحة",
    city: "الجيزة",
    price: 18000,
    capacity: "حتى 250 فرد",
    icon: "🌳",
  },
  {
    id: 4,
    name: "قاعة جراند هوتيل",
    category: "فنادق",
    city: "القاهرة",
    price: 30000,
    capacity: "حتى 600 فرد",
    icon: "🏨",
  },
  {
    id: 5,
    name: "قاعة روز",
    category: "قاعات خطوبة",
    city: "الإسكندرية",
    price: 10000,
    capacity: "حتى 180 فرد",
    icon: "🥂",
  },
  {
    id: 6,
    name: "Garden Party",
    category: "حفلات صغيرة",
    city: "البحيرة",
    price: 7500,
    capacity: "حتى 100 فرد",
    icon: "🎉",
  },
];

export default function VenuesPage() {
  const [category, setCategory] = useState("الكل");
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("كل المحافظات");

  const filteredVenues = venues.filter((venue) => {
    const matchesCategory =
      category === "الكل" ||
      venue.category === category;

    const matchesSearch =
      venue.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCity =
      city === "كل المحافظات" ||
      venue.city === city;

    return (
      matchesCategory &&
      matchesSearch &&
      matchesCity
    );
  });

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f7f7] text-[#211f1c]"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="text-2xl font-black"
            >
              Tyson{" "}
              <span className="text-[#b87333]">
                Media
              </span>
            </Link>

            <div className="hidden flex-1 md:block md:max-w-xl">
              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="ابحث عن قاعة أو مكان مناسبات..."
                className="w-full rounded-xl border bg-[#f6f5f3] px-5 py-3 font-bold outline-none focus:border-[#b87333]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/cart"
                className="rounded-xl border px-3 py-2 font-black"
              >
                🛒
              </Link>

              <Link
                href="/login"
                className="rounded-xl bg-[#211f1c] px-4 py-2.5 text-sm font-black text-white"
              >
                دخول
              </Link>
            </div>
          </div>

          <div className="mt-3 md:hidden">
            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="ابحث عن قاعة..."
              className="w-full rounded-xl border bg-[#f6f5f3] p-3 font-bold outline-none focus:border-[#b87333]"
            />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-5 md:py-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#211f1c] px-6 py-12 text-white md:px-12 md:py-16">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black text-[#e2b783]">
              TYSON MEDIA • VENUES
            </span>

            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              المكان المناسب
              <br />
              <span className="text-[#d6a66f]">
                لمناسبتك 🏛️
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-lg">
              اكتشف قاعات الأفراح والخطوبة
              والفنادق والأماكن المفتوحة
              واحجز المكان اللي يناسب مناسبتك.
            </p>

            <Link
              href="#venues"
              className="mt-7 inline-block rounded-xl bg-[#b87333] px-7 py-4 font-black text-white transition hover:bg-[#9d612c]"
            >
              اكتشف القاعات
            </Link>
          </div>

          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#b87333]/20 blur-3xl" />

          <div className="absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl border bg-white p-4">
          <h2 className="mb-4 text-xl font-black">
            نوع المكان
          </h2>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() =>
                  setCategory(item.name)
                }
                className={`flex min-w-fit items-center gap-2 rounded-full px-5 py-3 text-sm font-black transition ${
                  category === item.name
                    ? "bg-[#211f1c] text-white"
                    : "bg-[#f0ece7] hover:bg-[#e6ddd4]"
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-4 py-5">
        <div className="grid gap-3 md:grid-cols-2">
          <select
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            className="rounded-xl border bg-white p-3 font-bold outline-none focus:border-[#b87333]"
          >
            <option>كل المحافظات</option>
            <option>القاهرة</option>
            <option>الإسكندرية</option>
            <option>الجيزة</option>
            <option>البحيرة</option>
          </select>

          <select
            className="rounded-xl border bg-white p-3 font-bold outline-none focus:border-[#b87333]"
            defaultValue="newest"
          >
            <option value="newest">
              الأحدث
            </option>
            <option value="price_low">
              السعر: من الأقل للأعلى
            </option>
            <option value="price_high">
              السعر: من الأعلى للأقل
            </option>
          </select>
        </div>
      </section>

      {/* Venues */}
      <section
        id="venues"
        className="mx-auto max-w-7xl px-4 pb-16"
      >
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-black text-[#b87333]">
              VENUES MARKET
            </p>

            <h2 className="mt-1 text-2xl font-black md:text-3xl">
              القاعات والأماكن
            </h2>
          </div>

          <span className="text-sm text-gray-500">
            {filteredVenues.length} مكان
          </span>
        </div>

        {filteredVenues.length === 0 ? (
          <div className="rounded-3xl border bg-white p-12 text-center">
            <div className="text-6xl">🏛️</div>

            <h3 className="mt-4 text-xl font-black">
              مفيش نتائج
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              جرّب تغيير البحث أو الفلاتر.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredVenues.map((venue) => (
              <article
                key={venue.id}
                className="overflow-hidden rounded-3xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative flex h-56 items-center justify-center bg-[#eee6dc] text-8xl">
                  {venue.icon}

                  <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-black">
                    {venue.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-black">
                    {venue.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <span>📍</span>
                    {venue.city}
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <span>👥</span>
                    {venue.capacity}
                  </div>

                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-gray-500">
                        يبدأ من
                      </p>

                      <p className="mt-1 text-xl font-black text-[#b87333]">
                        {venue.price.toLocaleString(
                          "ar-EG"
                        )}{" "}
                        ج.م
                      </p>
                    </div>

                    <span className="text-sm">
                      ⭐ 4.8
                    </span>
                  </div>

                  <Link
                    href={`/bookings?service=venue-${venue.id}&type=venue`}
                    className="mt-5 block rounded-xl bg-[#211f1c] px-4 py-3 text-center font-black text-white transition hover:bg-[#b87333]"
                  >
                    احجز المكان
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-[2rem] bg-[#eee6dc] p-8 text-center md:p-12">
          <div className="text-6xl">🏛️</div>

          <h2 className="mt-4 text-2xl font-black md:text-3xl">
            عندك قاعة أو مكان مناسبات؟
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
            أضف قاعتك على Tyson Media
            واستقبل طلبات الحجز من العملاء.
          </p>

          <Link
            href="/register"
            className="mt-6 inline-block rounded-xl bg-[#211f1c] px-7 py-4 font-black text-white transition hover:bg-[#b87333]"
          >
            أضف مكانك
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-7 text-center">
          <div className="text-xl font-black">
            Tyson{" "}
            <span className="text-[#b87333]">
              Media
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            كل احتياجات مناسبتك في مكان واحد.
          </p>

          <Link
            href="/"
            className="mt-4 inline-block text-sm font-black text-[#b87333]"
          >
            العودة للرئيسية
          </Link>
        </div>
      </footer>
    </main>
  );
}