"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Venue = {
  id: number;
  name: string;
  type: string;
  city: string;
  price: number;
  capacity: string;
  description: string;
  icon: string;
};

const categories = [
  { name: "الكل", icon: "🏛️" },
  { name: "قاعات أفراح", icon: "💒" },
  { name: "قاعات فنادق", icon: "🏨" },
  { name: "أماكن مفتوحة", icon: "🌿" },
  { name: "نادي", icon: "🏟️" },
  { name: "حفلات خطوبة", icon: "💍" },
  { name: "أعياد ميلاد", icon: "🎂" },
];

const governorates = [
  "كل المحافظات",
  "القاهرة",
  "الإسكندرية",
  "الجيزة",
  "القليوبية",
  "الدقهلية",
  "الشرقية",
  "الغربية",
  "المنوفية",
  "البحيرة",
  "كفر الشيخ",
  "دمياط",
  "بورسعيد",
  "الإسماعيلية",
  "السويس",
  "مطروح",
  "البحر الأحمر",
];

const venues: Venue[] = [
  {
    id: 1,
    name: "قاعة Royal Palace",
    type: "قاعات أفراح",
    city: "القاهرة",
    price: 25000,
    capacity: "300 - 500 فرد",
    description: "قاعة فخمة للأفراح والمناسبات الكبيرة.",
    icon: "🏛️",
  },
  {
    id: 2,
    name: "قاعة Wedding Garden",
    type: "أماكن مفتوحة",
    city: "الإسكندرية",
    price: 18000,
    capacity: "150 - 300 فرد",
    description: "مكان مفتوح مناسب للأفراح والخطوبة.",
    icon: "🌿",
  },
  {
    id: 3,
    name: "قاعة Grand Hotel",
    type: "قاعات فنادق",
    city: "القاهرة",
    price: 35000,
    capacity: "300 - 600 فرد",
    description: "قاعة داخل فندق بتجهيزات متكاملة.",
    icon: "🏨",
  },
  {
    id: 4,
    name: "نادي النخبة",
    type: "نادي",
    city: "الجيزة",
    price: 15000,
    capacity: "100 - 250 فرد",
    description: "مكان مناسب للحفلات والمناسبات العائلية.",
    icon: "🏟️",
  },
  {
    id: 5,
    name: "قاعة ليلة العمر",
    type: "قاعات أفراح",
    city: "الإسكندرية",
    price: 22000,
    capacity: "250 - 450 فرد",
    description: "قاعة مجهزة للأفراح وحفلات الزفاف.",
    icon: "💒",
  },
  {
    id: 6,
    name: "مكان خطوبتك",
    type: "حفلات خطوبة",
    city: "البحيرة",
    price: 9000,
    capacity: "50 - 150 فرد",
    description: "مكان هادئ ومناسب لحفلات الخطوبة.",
    icon: "💍",
  },
  {
    id: 7,
    name: "Birthday Hall",
    type: "أعياد ميلاد",
    city: "الإسكندرية",
    price: 6000,
    capacity: "30 - 100 فرد",
    description: "قاعة صغيرة لأعياد الميلاد والحفلات الخاصة.",
    icon: "🎂",
  },
  {
    id: 8,
    name: "Royal Garden",
    type: "أماكن مفتوحة",
    city: "القاهرة",
    price: 20000,
    capacity: "150 - 350 فرد",
    description: "حديقة مجهزة للحفلات والمناسبات.",
    icon: "🌿",
  },
];

export default function VenuesPage() {
  const [category, setCategory] = useState("الكل");
  const [governorate, setGovernorate] =
    useState("كل المحافظات");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filteredVenues = useMemo(() => {
    let result = venues.filter((venue) => {
      const matchesCategory =
        category === "الكل" ||
        venue.type === category;

      const matchesGovernorate =
        governorate === "كل المحافظات" ||
        venue.city === governorate;

      const matchesSearch =
        venue.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        venue.city
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchesCategory &&
        matchesGovernorate &&
        matchesSearch
      );
    });

    if (sort === "price_low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price_high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [category, governorate, search, sort]);

  function resetFilters() {
    setCategory("الكل");
    setGovernorate("كل المحافظات");
    setSearch("");
    setSort("default");
  }

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
              className="shrink-0 text-2xl font-black"
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
                placeholder="ابحث عن قاعة أو مكان..."
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
              اكتشف قاعات الأفراح والفنادق والأماكن
              المفتوحة والنوادي واحجز المكان
              المناسب لمناسبتك.
            </p>

            <Link
              href="#venues"
              className="mt-7 inline-block rounded-xl bg-[#b87333] px-7 py-4 font-black text-white transition hover:bg-[#9d612c]"
            >
              اكتشف الأماكن
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
        <div className="rounded-2xl border bg-white p-4">
          <h2 className="mb-4 text-xl font-black">
            تصفية الأماكن
          </h2>

          <div className="grid gap-3 md:grid-cols-2">
            <select
              value={governorate}
              onChange={(e) =>
                setGovernorate(e.target.value)
              }
              className="rounded-xl border bg-white p-3 font-bold outline-none focus:border-[#b87333]"
            >
              {governorates.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  📍 {item}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="rounded-xl border bg-white p-3 font-bold outline-none focus:border-[#b87333]"
            >
              <option value="default">
                الترتيب الافتراضي
              </option>

              <option value="price_low">
                السعر: من الأقل للأعلى
              </option>

              <option value="price_high">
                السعر: من الأعلى للأقل
              </option>
            </select>
          </div>

          {(search ||
            category !== "الكل" ||
            governorate !==
              "كل المحافظات" ||
            sort !== "default") && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 rounded-xl bg-[#211f1c] px-5 py-3 text-sm font-black text-white"
            >
              مسح الفلاتر
            </button>
          )}
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
              VENUES
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
              مفيش أماكن مطابقة
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              جرّب تغيير المحافظة أو نوع المكان.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-[#211f1c] px-6 py-3 font-black text-white"
            >
              مسح الفلاتر
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {filteredVenues.map((venue) => (
              <article
                key={venue.id}
                className="overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-52 items-center justify-center bg-[#eee6dc] text-8xl">
                  {venue.icon}
                </div>

                <div className="p-4">
                  <span className="text-xs font-black text-[#b87333]">
                    {venue.type}
                  </span>

                  <h3 className="mt-2 line-clamp-2 text-lg font-black">
                    {venue.name}
                  </h3>

                  <div className="mt-3 space-y-2 text-xs text-gray-500">
                    <p>📍 {venue.city}</p>
                    <p>👥 {venue.capacity}</p>
                  </div>

                  <p className="mt-4 text-lg font-black text-[#b87333]">
                    يبدأ من{" "}
                    {venue.price.toLocaleString(
                      "ar-EG"
                    )}{" "}
                    ج.م
                  </p>

                  <Link
                    href={`/bookings?service=venue-${venue.id}&type=venue`}
                    className="mt-4 block rounded-xl bg-[#211f1c] px-3 py-3 text-center text-sm font-black text-white transition hover:bg-[#b87333]"
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
            أضف مكانك إلى Tyson Media ووصل
            لعملاء يبحثون عن أماكن لمناسباتهم.
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