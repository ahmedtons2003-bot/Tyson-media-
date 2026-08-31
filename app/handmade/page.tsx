"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
  created_at?: string;
};

const categories = [
  { name: "الكل", icon: "✦" },
  { name: "شنط", icon: "👜" },
  { name: "خواتم", icon: "💍" },
  { name: "إكسسوارات", icon: "✨" },
  { name: "كروشيه", icon: "🧶" },
  { name: "هدايا", icon: "🎁" },
  { name: "تطريز", icon: "🧵" },
  { name: "شموع", icon: "🕯️" },
  { name: "ديكورات", icon: "🏠" },
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
  "البحر الأحمر",
  "مطروح",
];

export default function HandmadePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const [governorate, setGovernorate] =
    useState("كل المحافظات");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    async function loadProducts() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setMessage("إعدادات Supabase غير موجودة.");
        setLoading(false);
        return;
      }

      const supabase = createClient(url, key);

      const { data, error } = await supabase
        .from("products")
        .select(
          "id, name, description, price, image_url, category_id, created_at"
        )
        .order("created_at", { ascending: false });

      if (error) {
        setMessage(
          "حدث خطأ أثناء تحميل المنتجات: " +
            error.message
        );
      } else {
        setProducts((data || []) as Product[]);
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const value = search.trim().toLowerCase();

      result = result.filter((product) =>
        `${product.name} ${
          product.description || ""
        }`
          .toLowerCase()
          .includes(value)
      );
    }

    if (category !== "الكل") {
      const categoryText = category.toLowerCase();

      result = result.filter((product) =>
        `${product.name} ${
          product.description || ""
        }`
          .toLowerCase()
          .includes(categoryText)
      );
    }

    if (sort === "price_low") {
      result.sort(
        (a, b) =>
          Number(a.price) - Number(b.price)
      );
    }

    if (sort === "price_high") {
      result.sort(
        (a, b) =>
          Number(b.price) - Number(a.price)
      );
    }

    return result;
  }, [products, search, category, sort]);

  function resetFilters() {
    setSearch("");
    setCategory("الكل");
    setGovernorate("كل المحافظات");
    setSort("newest");
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f5f2] text-[#211f1c]"
    >
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-[70px] items-center gap-3">
            <Link
              href="/"
              className="shrink-0 text-xl font-black sm:text-2xl"
            >
              Tyson{" "}
              <span className="text-[#b87333]">
                Media
              </span>
            </Link>

            <div className="relative hidden flex-1 md:block">
              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="ابحث في متجر Handmade..."
                className="h-11 w-full rounded-2xl border border-black/5 bg-[#f6f4f1] px-5 pr-11 text-sm font-bold outline-none transition focus:border-[#b87333] focus:bg-white"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                🔎
              </span>
            </div>

            <Link
              href="/cart"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border bg-white text-lg transition hover:bg-[#f4eee7]"
            >
              🛒
            </Link>

            <Link
              href="/dashboard"
              className="hidden rounded-2xl bg-[#211f1c] px-5 py-3 text-sm font-black text-white transition hover:bg-[#b87333] sm:block"
            >
              حسابي
            </Link>
          </div>

          <div className="pb-3 md:hidden">
            <div className="relative">
              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="ابحث عن منتج..."
                className="h-12 w-full rounded-xl border bg-[#f6f4f1] px-4 pr-11 text-sm font-bold outline-none focus:border-[#b87333]"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                🔎
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 py-5 md:py-7">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#211f1c] px-6 py-10 text-white md:px-12 md:py-14">

          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#b87333]/20 blur-3xl" />

          <div className="absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-[#d6a66f]/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-[#d6a66f]">
              TYSON MARKET • HANDMADE
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              حاجات معمولة
              <br />
              <span className="text-[#d6a66f]">
                بإيدين أصحابها 🧶
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/65 md:text-base">
              اكتشف منتجات Handmade مميزة،
              من شنط وإكسسوارات وهدايا
              لحد الكروشيه والديكورات.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {["👜 شنط", "💍 إكسسوارات", "🧶 كروشيه", "🎁 هدايا"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="mx-auto max-w-7xl px-4 py-3">
        <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <p className="text-xs font-black tracking-widest text-[#b87333]">
              CATEGORIES
            </p>

            <h2 className="mt-1 text-2xl font-black">
              اختار اللي بتدور عليه
            </h2>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() =>
                  setCategory(item.name)
                }
                className={`min-w-[88px] rounded-2xl border p-3 text-center transition ${
                  category === item.name
                    ? "border-[#211f1c] bg-[#211f1c] text-white shadow-lg"
                    : "border-black/5 bg-[#faf9f7] hover:-translate-y-1 hover:shadow-md"
                }`}
              >
                <div className="text-2xl">
                  {item.icon}
                </div>

                <div className="mt-2 whitespace-nowrap text-[11px] font-black">
                  {item.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex flex-col gap-3 rounded-[1.7rem] border border-black/5 bg-white p-4 shadow-sm md:flex-row">

          <select
            value={governorate}
            onChange={(e) =>
              setGovernorate(e.target.value)
            }
            className="h-12 flex-1 rounded-xl border bg-white px-4 text-sm font-bold outline-none focus:border-[#b87333]"
          >
            {governorates.map((item) => (
              <option key={item}>
                📍 {item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="h-12 flex-1 rounded-xl border bg-white px-4 text-sm font-bold outline-none focus:border-[#b87333]"
          >
            <option value="newest">الأحدث</option>
            <option value="price_low">
              السعر: الأقل أولًا
            </option>
            <option value="price_high">
              السعر: الأعلى أولًا
            </option>
          </select>

          {(search ||
            category !== "الكل" ||
            governorate !==
              "كل المحافظات") && (
            <button
              type="button"
              onClick={resetFilters}
              className="h-12 rounded-xl bg-[#eee6dc] px-6 text-sm font-black"
            >
              مسح الفلاتر
            </button>
          )}
        </div>
      </section>

      {/* PRODUCTS HEADER */}
      <section className="mx-auto max-w-7xl px-4 pt-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-black tracking-widest text-[#b87333]">
              HANDMADE SHOP
            </p>

            <h2 className="mt-1 text-2xl font-black md:text-3xl">
              أحدث المنتجات
            </h2>
          </div>

          <div className="rounded-full bg-white px-4 py-2 text-xs font-black text-gray-500 shadow-sm">
            {filteredProducts.length} منتج
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-6 pb-16">
        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border bg-white"
              >
                <div className="h-52 animate-pulse bg-[#eee8e1]" />
                <div className="space-y-3 p-4">
                  <div className="h-4 animate-pulse rounded bg-[#eee8e1]" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-[#eee8e1]" />
                  <div className="h-10 animate-pulse rounded-xl bg-[#eee8e1]" />
                </div>
              </div>
            ))}
          </div>
        ) : message ? (
          <div className="rounded-[2rem] border bg-white p-12 text-center">
            <div className="text-5xl">⚠️</div>
            <p className="mt-4 font-black text-red-600">
              {message}
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-[2rem] border bg-white p-16 text-center">
            <div className="text-7xl">🧶</div>

            <h3 className="mt-5 text-2xl font-black">
              لسه مفيش منتجات
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              جرّب تغيير البحث أو اختيار قسم مختلف.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-xl bg-[#211f1c] px-7 py-3 font-black text-white"
            >
              عرض كل المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[1.5rem] border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Link
                  href={`/handmade/${product.id}`}
                  className="block"
                >
                  <div className="relative h-52 overflow-hidden bg-[#eee6dc]">

                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-7xl">
                        🧶
                      </div>
                    )}

                    <div className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black shadow-sm">
                      Handmade
                    </div>

                    <button
                      type="button"
                      onClick={(e) =>
                        e.preventDefault()
                      }
                      className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-lg shadow-sm transition hover:scale-110"
                      aria-label="إضافة للمفضلة"
                    >
                      ♡
                    </button>
                  </div>

                  <div className="p-4">

                    <h3 className="line-clamp-2 min-h-10 text-sm font-black leading-5">
                      {product.name}
                    </h3>

                    {product.description && (
                      <p className="mt-2 line-clamp-2 min-h-9 text-[11px] leading-5 text-gray-500">
                        {product.description}
                      </p>
                    )}

                    <div className="mt-4">
                      <p className="text-[10px] text-gray-400">
                        السعر
                      </p>

                      <p className="mt-1 text-lg font-black text-[#b87333]">
                        {Number(
                          product.price
                        ).toLocaleString("ar-EG")}{" "}
                        <span className="text-xs">
                          ج.م
                        </span>
                      </p>
                    </div>

                    <div className="mt-4 rounded-xl bg-[#211f1c] px-3 py-3 text-center text-xs font-black text-white transition group-hover:bg-[#b87333]">
                      عرض التفاصيل
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* SELLER CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#e9dfd4] p-8 md:p-12">

          <div className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-[#b87333]/10 blur-3xl" />

          <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">

            <div>
              <p className="text-xs font-black tracking-widest text-[#b87333]">
                SELL ON TYSON MEDIA
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                بتعمل Handmade؟
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600">
                اعرض منتجاتك على Tyson Media
                ووصل بمنتجاتك لعملاء جدد.
              </p>
            </div>

            <div className="md:text-left">
              <Link
                href="/dashboard"
                className="inline-flex rounded-2xl bg-[#211f1c] px-7 py-4 font-black text-white transition hover:bg-[#b87333]"
              >
                ابدأ البيع الآن
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <div className="text-xl font-black">
                Tyson{" "}
                <span className="text-[#b87333]">
                  Media
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                سوق المنتجات والخدمات للمناسبات.
              </p>
            </div>

            <div className="flex flex-wrap gap-5 text-sm font-bold text-gray-500">
              <Link href="/">الرئيسية</Link>
              <Link href="/photography">التصوير</Link>
              <Link href="/cars">السيارات</Link>
              <Link href="/cart">السلة</Link>
              <Link href="/dashboard">حسابي</Link>
            </div>

          </div>

          <div className="mt-7 border-t pt-5 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Tyson Media
          </div>

        </div>
      </footer>
    </main>
  );
}