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
};

const categories = [
  { name: "الكل", icon: "🛍️" },
  { name: "شنط هاند ميد", icon: "👜" },
  { name: "خواتم", icon: "💍" },
  { name: "انسيالات", icon: "📿" },
  { name: "سلاسل", icon: "⛓️" },
  { name: "إكسسوارات", icon: "✨" },
  { name: "هدايا هاند ميد", icon: "🎁" },
  { name: "تطريز", icon: "🧵" },
  { name: "كروشيه", icon: "🧶" },
  { name: "مكرمية", icon: "🪢" },
  { name: "توزيعات مناسبات", icon: "🎀" },
  { name: "ديكورات هاند ميد", icon: "🏠" },
  { name: "شموع", icon: "🕯️" },
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
  "شمال سيناء",
  "جنوب سيناء",
  "البحر الأحمر",
  "الفيوم",
  "بني سويف",
  "المنيا",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
  "الوادي الجديد",
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
      const url =
        process.env.NEXT_PUBLIC_SUPABASE_URL;

      const key =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setMessage(
          "إعدادات Supabase غير موجودة."
        );
        setLoading(false);
        return;
      }

      const supabase = createClient(url, key);

      const { data, error } = await supabase
        .from("products")
        .select(
          "id, name, description, price, image_url, category_id"
        )
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        setMessage(
          "حدث خطأ أثناء تحميل المنتجات: " +
            error.message
        );
      } else {
        setProducts(
          (data || []) as Product[]
        );
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const value =
        search.trim().toLowerCase();

      result = result.filter((product) =>
        `${product.name} ${
          product.description || ""
        }`
          .toLowerCase()
          .includes(value)
      );
    }

    if (category !== "الكل") {
      const categoryText = category
        .replace("هاند ميد", "")
        .trim()
        .toLowerCase();

      result = result.filter((product) =>
        product.name
          .toLowerCase()
          .includes(categoryText)
      );
    }

    if (sort === "price_low") {
      result.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );
    }

    if (sort === "price_high") {
      result.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );
    }

    return result;
  }, [
    products,
    search,
    category,
    sort,
  ]);

  function resetFilters() {
    setSearch("");
    setCategory("الكل");
    setGovernorate("كل المحافظات");
    setSort("newest");
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f7f7] text-[#211f1c]"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="shrink-0 text-2xl font-black"
            >
              Tyson{" "}
              <span className="text-[#b87333]">
                Media
              </span>
            </Link>

            <div className="hidden flex-1 md:block">
              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="ابحث عن شنطة، خاتم، إكسسوار..."
                className="w-full rounded-xl border bg-[#f5f5f5] px-5 py-3 outline-none focus:border-[#b87333]"
              />
            </div>

            <Link
              href="/dashboard"
              className="rounded-xl bg-[#211f1c] px-4 py-3 text-sm font-black text-white"
            >
              حسابي
            </Link>
          </div>

          <div className="mt-3 md:hidden">
            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="ابحث عن منتج..."
              className="w-full rounded-xl border bg-[#f5f5f5] p-3 outline-none focus:border-[#b87333]"
            />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="rounded-3xl bg-[#211f1c] px-6 py-10 text-white md:px-10">
          <p className="text-sm font-bold text-[#d6a66f]">
            TYSON MEDIA • HANDMADE
          </p>

          <h1 className="mt-3 max-w-3xl text-3xl font-black md:text-5xl">
            كل الهاند ميد في مكان واحد 🧶
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-white/70">
            شنط، خواتم، انسيالات، سلاسل،
            إكسسوارات، هدايا ومنتجات مصنوعة
            يدويًا من بائعين مختلفين.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl border bg-white p-4">
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

        {(search ||
          category !== "الكل" ||
          governorate !== "كل المحافظات") && (
          <button
            type="button"
            onClick={resetFilters}
            className="mt-3 rounded-xl bg-[#211f1c] px-5 py-2 text-sm font-black text-white"
          >
            مسح الفلاتر
          </button>
        )}
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold text-[#b87333]">
              HANDMADE MARKET
            </p>

            <h2 className="mt-1 text-2xl font-black md:text-3xl">
              منتجات مميزة
            </h2>
          </div>

          <span className="text-sm text-gray-500">
            {filteredProducts.length} منتج
          </span>
        </div>

        {loading ? (
          <div className="rounded-2xl border bg-white p-12 text-center">
            <p className="font-bold">
              جاري تحميل المنتجات...
            </p>
          </div>
        ) : message ? (
          <div className="rounded-2xl border bg-white p-12 text-center">
            <p className="font-bold text-red-600">
              {message}
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl border bg-white p-12 text-center">
            <div className="text-6xl">🧶</div>

            <h3 className="mt-4 text-xl font-black">
              مفيش منتجات مطابقة
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              جرّب تغيير البحث أو القسم.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt