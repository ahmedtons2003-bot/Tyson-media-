"use client";

import Link from "next/link";
import { useState } from "react";

const categories = [
  { name: "الكل", icon: "🤵" },
  { name: "بدل أفراح", icon: "💍" },
  { name: "بدل خطوبة", icon: "🥂" },
  { name: "بدل كلاسيك", icon: "🕴️" },
  { name: "بدل مودرن", icon: "✨" },
  { name: "بدل محجبين؟", icon: "👔" },
];

const suits = [
  {
    id: 1,
    name: "بدلة كلاسيك سوداء",
    category: "بدل أفراح",
    price: 4500,
    type: "إيجار / بيع",
    icon: "🤵",
  },
  {
    id: 2,
    name: "بدلة خطوبة شيك",
    category: "بدل خطوبة",
    price: 3500,
    type: "إيجار / بيع",
    icon: "🕴️",
  },
  {
    id: 3,
    name: "بدلة كلاسيك كحلي",
    category: "بدل كلاسيك",
    price: 4000,
    type: "إيجار",
    icon: "🤵",
  },
  {
    id: 4,
    name: "بدلة مودرن رمادي",
    category: "بدل مودرن",
    price: 3800,
    type: "إيجار / بيع",
    icon: "✨",
  },
  {
    id: 5,
    name: "بدلة زفاف كاملة",
    category: "بدل أفراح",
    price: 5500,
    type: "إيجار",
    icon: "🤵",
  },
  {
    id: 6,
    name: "بدلة رسمية فاخرة",
    category: "بدل كلاسيك",
    price: 5000,
    type: "بيع",
    icon: "🕴️",
  },
];

export default function SuitsPage() {
  const [category, setCategory] = useState("الكل");
  const [search, setSearch] = useState("");

  const filteredSuits = suits.filter((suit) => {
    const matchesCategory =
      category === "الكل" ||
      suit.category === category;

    const matchesSearch =
      suit.name
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
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
                placeholder="ابحث عن بدلة..."
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
              placeholder="ابحث عن بدلة..."
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
              TYSON MEDIA • MEN SUITS
            </span>

            <h1 className="mt-5 text-4xl font-black md:text-6xl">
              أناقة العريس
              <br />
              <span className="text-[#d6a66f]">
                تبدأ من هنا 🤵
              </span>
            </h1>

            <p className="mt-5 max-w-2xl leading-7 text-white/65 md:text-lg">
              اكتشف بدل الأفراح والخطوبة
              والبدل الكلاسيك والمودرن،
              واختر اللوك المناسب لمناسبتك.
            </p>
          </div>

          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#b87333]/20 blur-3xl" />

          <div className="absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl border bg-white p-4">
          <h2 className="mb-4 text-xl font-black">
            أنواع البدل
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

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-black text-[#b87333]">
              MEN SUITS MARKET
            </p>

            <h2 className="mt-1 text-2xl font-black md:text-3xl">
              البدل الرجالي
            </h2>
          </div>

          <span className="text-sm text-gray-500">
            {filteredSuits.length} بدلة
          </span>
        </div>

        {filteredSuits.length === 0 ? (
          <div className="rounded-3xl border bg-white p-12 text-center">
            <div className="text-6xl">🤵</div>

            <h3 className="mt-4 text-xl font-black">
              مفيش نتائج
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              جرّب تغيير البحث أو القسم.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredSuits.map((suit) => (
              <article
                key={suit.id}
                className="overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-52 items-center justify-center bg-[#eee6dc] text-8xl">
                  {suit.icon}
                </div>

                <div className="p-4">
                  <span className="text-xs font-black text-[#b87333]">
                    {suit.category}
                  </span>

                  <h3 className="mt-2 line-clamp-2 font-black">
                    {suit.name}
                  </h3>

                  <p className="mt-3 text-xs text-gray-500">
                    {suit.type}
                  </p>

                  <p className="mt-3 text-lg font-black text-[#b87333]">
                    {suit.price.toLocaleString(
                      "ar-EG"
                    )}{" "}
                    ج.م
                  </p>

                  <Link
                    href={`/bookings?service=suit-${suit.id}&type=suit`}
                    className="mt-4 block rounded-xl bg-[#211f1c] px-3 py-3 text-center text-sm font-black text-white transition hover:bg-[#b87333]"
                  >
                    طلب البدلة
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
          <div className="text-6xl">🤵</div>

          <h2 className="mt-4 text-2xl font-black md:text-3xl">
            عندك محل بدل رجالي؟
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
            اعرض البدل والإكسسوارات الخاصة بك
            على Tyson Media ووصل لعملاء جدد.
          </p>

          <Link
            href="/register"
            className="mt-6 inline-block rounded-xl bg-[#211f1c] px-7 py-4 font-black text-white"
          >
            ابدأ البيع على المنصة
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