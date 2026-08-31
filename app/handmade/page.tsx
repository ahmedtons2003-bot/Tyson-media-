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
{ name: "الكل", icon: "🛍️" },
{ name: "شنط", icon: "👜" },
{ name: "خواتم", icon: "💍" },
{ name: "انسيالات", icon: "📿" },
{ name: "سلاسل", icon: "⛓️" },
{ name: "إكسسوارات", icon: "✨" },
{ name: "هدايا", icon: "🎁" },
{ name: "تطريز", icon: "🧵" },
{ name: "كروشيه", icon: "🧶" },
{ name: "مكرمية", icon: "🪢" },
{ name: "توزيعات", icon: "🎀" },
{ name: "ديكورات", icon: "🏠" },
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
      "id, name, description, price, image_url, category_id, created_at"
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
    .replace(
      "هاند ميد",
      ""
    )
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
className="min-h-screen bg-[#f6f5f3] text-[#211f1c]"
>
{/* HEADER */}
<header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
<div className="mx-auto max-w-7xl px-4">
<div className="flex h-16 items-center gap-3">
<Link
href="/"
className="shrink-0 text-2xl font-black"
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
            placeholder="ابحث عن شنطة، خاتم، كروشيه..."
            className="w-full rounded-2xl border bg-[#f5f5f5] px-5 py-3 pr-12 text-sm font-bold outline-none focus:border-[#b87333]"
          />

          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            🔎
          </span>
        </div>

        <Link
          href="/cart"
          className="rounded-xl border px-3 py-2 font-black"
        >
          🛒
        </Link>

        <Link
          href="/dashboard"
          className="rounded-xl bg-[#211f1c] px-4 py-2.5 text-sm font-black text-white"
        >
          حسابي
        </Link>
      </div>

      <div className="pb-3 md:hidden">
        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="ابحث عن منتج..."
          className="w-full rounded-xl border bg-[#f5f5f5] p-3 font-bold outline-none focus:border-[#b87333]"
        />
      </div>
    </div>
  </header>

  {/* HERO */}
  <section className="mx-auto max-w-7xl px-4 py-5">
    <div className="overflow-hidden rounded-[2rem] bg-[#211f1c] px-6 py-10 text-white md:px-12 md:py-14">
      <p className="text-sm font-black text-[#d6a66f]">
        TYSON MEDIA • HANDMADE MARKET
      </p>

      <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
        سوق الهاند ميد
        <br />
        <span className="text-[#d6a66f]">
          كله في مكان واحد 🧶
        </span>
      </h1>

      <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
        اكتشف منتجات مصنوعة يدويًا من
        بائعين مختلفين في جميع أنحاء مصر.
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
          👜 شنط
        </span>

        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
          💍 إكسسوارات
        </span>

        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
          🧶 كروشيه
        </span>

        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
          🎁 هدايا
        </span>
      </div>
    </div>
  </section>

  {/* CATEGORIES */}
  <section className="mx-auto max-w-7xl px-4 py-3">
    <div className="rounded-3xl border bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-black text-[#b87333]">
            SHOP BY CATEGORY
          </p>

          <h2 className="mt-1 text-2xl font-black">
            تصفح الأقسام
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-13">
        {categories.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() =>
              setCategory(item.name)
            }
            className={`rounded-2xl border p-3 text-center transition ${
              category === item.name
                ? "border-[#211f1c] bg-[#211f1c] text-white"
                : "bg-white hover:-translate-y-1 hover:shadow-md"
            }`}
          >
            <div className="text-3xl">
              {item.icon}
            </div>

            <p className="mt-2 text-xs font-black">
              {item.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  </section>

  {/* FILTERS */}
  <section className="mx-auto max-w-7xl px-4 py-4">
    <div className="flex flex-col gap-3 rounded-3xl border bg-white p-4 md:flex-row">
      <select
        value={governorate}
        onChange={(e) =>
          setGovernorate(e.target.value)
        }
        className="flex-1 rounded-xl border bg-white p-3 text-sm font-bold outline-none focus:border-[#b87333]"
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
        className="flex-1 rounded-xl border bg-white p-3 text-sm font-bold outline-none focus:border-[#b87333]"
      >
        <option value="newest">
          الأحدث
        </option>

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
          className="rounded-xl bg-[#eee6dc] px-5 py-3 text-sm font-black"
        >
          مسح الفلاتر
        </button>
      )}
    </div>
  </section>

  {/* PRODUCTS */}
  <section className="mx-auto max-w-7xl px-4 pb-16">
    <div className="mb-5 flex items-end justify-between">
      <div>
        <p className="text-xs font-black text-[#b87333]">
          HANDMADE MARKET
        </p>

        <h2 className="mt-1 text-2xl font-black md:text-3xl">
          المنتجات
        </h2>
      </div>

      <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-500">
        {filteredProducts.length} منتج
      </span>
    </div>

    {loading ? (
      <div className="rounded-3xl border bg-white p-16 text-center">
        <div className="text-5xl">🧶</div>

        <p className="mt-4 font-black">
          جاري تحميل المنتجات...
        </p>
      </div>
    ) : message ? (
      <div className="rounded-3xl border bg-white p-10 text-center">
        <p className="font-bold text-red-600">
          {message}
        </p>
      </div>
    ) : filteredProducts.length === 0 ? (
      <div className="rounded-3xl border bg-white p-16 text-center">
        <div className="text-7xl">🧶</div>

        <h3 className="mt-5 text-2xl font-black">
          مفيش منتجات مطابقة
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          جرّب تغيير البحث أو القسم.
        </p>

        <button
          type="button"
          onClick={resetFilters}
          className="mt-6 rounded-xl bg-[#211f1c] px-7 py-3 font-black text-white"
        >
          مسح الفلاتر
        </button>
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            className="group overflow-hidden rounded-2xl border bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl"
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
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-7xl">
                    🧶
                  </div>
                )}

                <span className="absolute right-2 top-2 rounded-full bg-white/95 px-3 py-1 text-xs font-black shadow-sm">
                  Handmade
                </span>

                <button
                  type="button"
                  onClick={(e) =>
                    e.preventDefault()
                  }
                  className="absolute left-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-lg shadow-sm"
                  aria-label="إضافة للمفضلة"
                >
                  ♡
                </button>
              </div>

              <div className="p-4">
                <h3 className="line-clamp-2 min-h-10 font-black">
                  {product.name}
                </h3>

                {product.description && (
                  <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-gray-500">
                    {product.description}
                  </p>
                )}

                <div className="mt-4 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-xs text-gray-400">
                      السعر
                    </p>

                    <p className="mt-1 text-lg font-black text-[#b87333]">
                      {Number(
                        product.price
                      ).toLocaleString(
                        "ar-EG"
                      )}{" "}
                      ج.م
                    </p>
                  </div>
                </div>

                <span className="mt-4 block rounded-xl bg-[#211f1c] px-3 py-3 text-center text-sm font-black text-white transition group-hover:bg-[#b87333]">
                  عرض المنتج
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    )}
  </section>

  {/* SELLER CTA */}
  <section className="mx-auto max-w-7xl px-4 pb-16">
    <div className="overflow-hidden rounded-[2rem] bg-[#eee6dc] p-8 md:p-12">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-black text-[#b87333]">
            SELL ON TYSON MEDIA
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            عندك شغل هاند ميد؟
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-gray-600">
            اعرض منتجاتك، وصل لعملاء جدد،
            وخلي منتجاتك جزء من سوق
            Tyson Media.
          </p>
        </div>

        <div className="flex justify-start md:justify-end">
          <Link
            href="/dashboard"
            className="rounded-xl bg-[#211f1c] px-7 py-4 font-black text-white"
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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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

        <Link
          href="/"
          className="font-bold text-gray-600"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  </footer>
</main>

);
}