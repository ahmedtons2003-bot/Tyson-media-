"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type DecorItem = {
  id: number;
  name: string;
  category: string;
  city: string;
  price: number;
  description: string;
  icon: string;
};

const categories = [
  { name: "الكل", icon: "🎀" },
  { name: "ديكور أفراح", icon: "💒" },
  { name: "ديكور خطوبة", icon: "💍" },
  { name: "ديكور أعياد ميلاد", icon: "🎂" },
  { name: "دعوات أفراح", icon: "💌" },
  { name: "دعوات إلكترونية", icon: "📱" },
  { name: "توزيعات", icon: "🎁" },
  { name: "بوكيهات", icon: "💐" },
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

const items: DecorItem[] = [
  {
    id: 1,
    name: "ديكور فرح كامل",
    category: "ديكور أفراح",
    city: "القاهرة",
    price: 12000,
    description:
      "تجهيز ديكور كامل للفرح بتنسيق أنيق ومميز.",
    icon: "💒",
  },
  {
    id: 2,
    name: "ديكور خطوبة",
    category: "ديكور خطوبة",
    city: "الإسكندرية",
    price: 6500,
    description:
      "ديكور خطوبة أنيق مناسب للقاعات والأماكن المفتوحة.",
    icon: "💍",
  },
  {
    id: 3,
    name: "ديكور عيد ميلاد",
    category: "ديكور أعياد ميلاد",
    city: "الجيزة",
    price: 3500,
    description:
      "بالونات وديكور وتجهيز كامل لأعياد الميلاد.",
    icon: "🎂",
  },
  {
    id: 4,
    name: "دعوة فرح فاخرة",
    category: "دعوات أفراح",
    city: "القاهرة",
    price: 1500,
    description:
      "تصميم وطباعة دعوات فرح بتصميم فاخر.",
    icon: "💌",
  },
  {
    id: 5,
    name: "دعوة إلكترونية",
    category: "دعوات إلكترونية",
    city: "الإسكندرية",
    price: 500,
    description:
      "دعوة إلكترونية متحركة قابلة للمشاركة على واتساب.",
    icon: "📱",
  },
  {
    id: 6,
    name: "توزيعات أفراح",
    category: "توزيعات",
    city: "البحيرة",
    price: 1200,
    description:
      "توزيعات مناسبات وهدايا صغيرة للضيوف.",
    icon: "🎁",
  },
  {
    id: 7,
    name: "بوكيه عروسة",
    category: "بوكيهات",
    city: "الإسكندرية",
    price: 1800,
    description:
      "بوكيه عروسة بتنسيق حسب اختيارك.",
    icon: "💐",
  },
  {
    id: 8,
    name: "باكدج ديكور + دعوات",
    category: "ديكور أفراح",
    city: "القاهرة",
    price: 15000,
    description:
      "باكدج متكامل يشمل الديكور والدعوات.",
    icon: "🎀",
  },
];

export default function DecorPage() {
  const [category, setCategory] = useState("الكل");
  const [governorate, setGovernorate] =
    useState("كل المحافظات");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => {
      const matchesCategory =
        category === "الكل" ||
        item.category === category;

      const matchesGovernorate =
        governorate === "كل المحافظات" ||
        item.city === governorate;

      const value = search
        .trim()
        .toLowerCase();

      const matchesSearch =
        !value ||
        item.name.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value) ||
        item.city.toLowerCase().includes(value);

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
              <div className="relative">
                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="ابحث عن ديكور، دعوة، توزيعات..."
                  className="w-full rounded-xl border bg-[#f6f5f3] px-5 py-3 pr-11 font-bold outline-none focus:border-[#b87333]"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                  🔎
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/cart"
                className="rounded-xl border px-3 py-2 font-black transition hover:bg-[#f5f1ec]"
              >
                🛒
              </Link>

              <Link
                href="/login"
                className="rounded-xl bg-[#211f1c] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#b87333]"
              >
                دخول
              </Link>
            </div>
          </div>

          <div className="mt-3 md:hidden">
            <div className="relative">
              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="ابحث عن ديكور أو دعوة..."
                className="w-full rounded-xl border bg-[#f6f5f3] p-3 pr-11 font-bold outline-none focus:border-[#b87333]"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                🔎
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-5 md:py-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#211f1c] px-6 py-12 text-white md:px-12 md:py-16">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-[#e2b783]">
              TYSON MEDIA • DECOR & INVITATIONS
            </span>

            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              تفاصيل مناسبتك
              <br />
              <span className="text-[#d6a66f]">
                تفرق 🎀
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-lg">
              ديكور أفراح وخطوبة، دعوات ورقية
              وإلكترونية، توزيعات وبوكيهات
              لكل مناسبتك.
            </p>

            <Link
              href="#decor"
              className="mt-7 inline-block rounded-xl bg-[#b87333] px-7 py-4 font-black text-white transition hover:bg-[#9d612c]"
            >
              اكتشف الخدمات
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
            الأقسام
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
            تصفية الخدمات
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

      {/* Items */}
      <section
        id="decor"
        className="mx-auto max-w-7xl px-4 pb-16"
      >
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-black text-[#b87333]">
              DECOR & INVITATIONS
            </p>

            <h2 className="mt-1 text-2xl font-black md:text-3xl">
              الديكور والدعوات
            </h2>
          </div>

          <span className="text-sm text-gray-500">
            {filteredItems.length} خدمة
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="rounded-3xl border bg-white p-12 text-center">
            <div className="text-6xl">🎀</div>

            <h3 className="mt-4 text-xl font-black">
              مفيش خدمات مطابقة
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              جرّب تغيير البحث أو المحافظة أو القسم.
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
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-52 items-center justify-center bg-[#eee6dc] text-8xl">
                  {item.icon}
                </div>

                <div className="p-4">
                  <span className="text-xs font-black text-[#b87333]">
                    {item.category}
                  </span>

                  <h3 className="mt-2 line-clamp-2 text-lg font-black">
                    {item.name}
                  </h3>

                  <div className="mt-3 text-xs text-gray-500">
                    📍 {item.city}
                  </div>

                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                    {item.description}
                  </p>

                  <p className="mt-4 text-lg font-black text-[#b87333]">
                    {item.price.toLocaleString(
                      "ar-EG"
                    )}{" "}
                    ج.م
                  </p>

                  <Link
                    href={`/bookings?service=decor-${item.id}&type=decor`}
                    className="mt-4 block rounded-xl bg-[#211f1c] px-3 py-3 text-center text-sm font-black text-white transition hover:bg-[#b87333]"
                  >
                    احجز الخدمة
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
          <div className="text-6xl">🎀</div>

          <h2 className="mt-4 text-2xl font-black md:text-3xl">
            عندك شغل ديكور أو دعوات؟
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
            اعرض خدماتك على Tyson Media
            ووصل لعملاء جدد من مختلف محافظات مصر.
          </p>

          <Link
            href="/register"
            className="mt-6 inline-block rounded-xl bg-[#211f1c] px-7 py-4 font-black text-white transition hover:bg-[#b87333]"
          >
            أضف خدمتك
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

          <div className="mt-4 flex justify-center gap-4 text-sm font-bold text-gray-600">
            <Link href="/photography">
              التصوير
            </Link>

            <Link href="/handmade">
              Handmade
            </Link>

            <Link href="/cars">
              السيارات
            </Link>

            <Link href="/">
              الرئيسية
            </Link>
          </div>

          <div className="mt-6 border-t pt-5 text-xs text-gray-400">
            © {new Date().getFullYear()} Tyson Media
          </div>
        </div>
      </footer>
    </main>
  );
}