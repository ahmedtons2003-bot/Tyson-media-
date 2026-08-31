"use client";

import Link from "next/link";
import { useState } from "react";

const categories = [
  { name: "الكل", icon: "💄" },
  { name: "ميكاب", icon: "💋" },
  { name: "كوافير", icon: "💇‍♀️" },
  { name: "تسريحات", icon: "💇" },
  { name: "ميكاب عرايس", icon: "👰" },
  { name: "عناية بالبشرة", icon: "✨" },
  { name: "أظافر", icon: "💅" },
];

const services = [
  {
    id: 1,
    name: "ميكاب عروسة كامل",
    category: "ميكاب عرايس",
    price: 2500,
    duration: "3 ساعات",
    icon: "👰",
  },
  {
    id: 2,
    name: "ميكاب سوفت",
    category: "ميكاب",
    price: 1000,
    duration: "ساعة ونصف",
    icon: "💄",
  },
  {
    id: 3,
    name: "ميكاب سهرة",
    category: "ميكاب",
    price: 1300,
    duration: "ساعتان",
    icon: "💋",
  },
  {
    id: 4,
    name: "تسريحة عروسة",
    category: "تسريحات",
    price: 1800,
    duration: "ساعتان",
    icon: "💇‍♀️",
  },
  {
    id: 5,
    name: "تسريحة مناسبات",
    category: "تسريحات",
    price: 800,
    duration: "ساعة",
    icon: "💇",
  },
  {
    id: 6,
    name: "عناية وتنظيف بشرة",
    category: "عناية بالبشرة",
    price: 600,
    duration: "ساعة",
    icon: "✨",
  },
  {
    id: 7,
    name: "مانيكير وباديكير",
    category: "أظافر",
    price: 500,
    duration: "ساعة",
    icon: "💅",
  },
  {
    id: 8,
    name: "باكدج العروسة الكامل",
    category: "ميكاب عرايس",
    price: 4500,
    duration: "حسب الخدمات",
    icon: "👰",
  },
];

export default function BeautyPage() {
  const [category, setCategory] = useState("الكل");
  const [search, setSearch] = useState("");

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      category === "الكل" ||
      service.category === category;

    const matchesSearch =
      service.name
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f8f6f4] text-[#211f1c]"
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
                placeholder="ابحث عن ميكاب، كوافير، تسريحة..."
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
              placeholder="ابحث عن خدمة..."
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
              TYSON MEDIA • BEAUTY
            </span>

            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              جمالك في يومك
              <br />
              <span className="text-[#d6a66f]">
                المميز 💄
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-lg">
              اكتشفي خدمات الميكاب والكوافير
              والتسريحات والعناية بالبشرة
              وتجهيز العروسة في مكان واحد.
            </p>

            <Link
              href="#services"
              className="mt-7 inline-block rounded-xl bg-[#b87333] px-7 py-4 font-black text-white transition hover:bg-[#9d612c]"
            >
              اكتشفي الخدمات
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
            خدمات الجمال
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

      {/* Services */}
      <section
        id="services"
        className="mx-auto max-w-7xl px-4 py-8"
      >
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-black text-[#b87333]">
              BEAUTY MARKET
            </p>

            <h2 className="mt-1 text-2xl font-black md:text-3xl">
              خدمات المكياج والجمال
            </h2>
          </div>

          <span className="text-sm text-gray-500">
            {filteredServices.length} خدمة
          </span>
        </div>

        {filteredServices.length === 0 ? (
          <div className="rounded-3xl border bg-white p-12 text-center">
            <div className="text-6xl">💄</div>

            <h3 className="mt-4 text-xl font-black">
              مفيش نتائج
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              جرّبي تغيير البحث أو القسم.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                className="overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-52 items-center justify-center bg-[#eee6dc] text-8xl">
                  {service.icon}
                </div>

                <div className="p-4">
                  <span className="text-xs font-black text-[#b87333]">
                    {service.category}
                  </span>

                  <h3 className="mt-2 line-clamp-2 font-black">
                    {service.name}
                  </h3>

                  <p className="mt-3 text-xs text-gray-500">
                    ⏱️ {service.duration}
                  </p>

                  <p className="mt-3 text-lg font-black text-[#b87333]">
                    {service.price.toLocaleString(
                      "ar-EG"
                    )}{" "}
                    ج.م
                  </p>

                  <Link
                    href={`/bookings?service=beauty-${service.id}&type=beauty`}
                    className="mt-4 block rounded-xl bg-[#211f1c] px-3 py-3 text-center text-sm font-black text-white transition hover:bg-[#b87333]"
                  >
                    احجزي الخدمة
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Bride CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-[2rem] bg-[#eee6dc] p-8 text-center md:p-12">
          <div className="text-6xl">👰</div>

          <h2 className="mt-4 text-2xl font-black md:text-3xl">
            عروسة وبتجهزي ليومك؟
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
            اختاري الميكاب والتسريحة والعناية
            المناسبة ليكي واحجزي كل خدماتك.
          </p>

          <Link
            href="/register"
            className="mt-6 inline-block rounded-xl bg-[#211f1c] px-7 py-4 font-black text-white transition hover:bg-[#b87333]"
          >
            ابدئي دلوقتي
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