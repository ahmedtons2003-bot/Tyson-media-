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

  const supabase =
    createClient(url, key);

  const { data, error } =
    await supabase
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

const filteredProducts =
useMemo(() => {
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

  /*
   * تصفية التصنيف:
   * حاليًا category_id موجود في جدول المنتجات،
   * لذلك نعرض التصنيف كفلتر واجهة.
   * الربط الحقيقي بالتصنيفات سنعمله في الخطوة التالية.
   */
  if (category !== "الكل") {
    result = result.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(
            category.replace(
              "هاند ميد",
              ""
            ).trim().toLowerCase()
          )
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
  governorate,
  sort,
]);

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
          <div className="relative">
            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="ابحث عن شنطة، خاتم، إكسسوار..."
              className="w-full rounded-xl border bg-[#f5f5f5] px-5 py-3 pr-5 outline-none focus:border-[#b87333]"
            />

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
              🔎
            </span>
          </div>
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
    <div className="overflow-hidden rounded-3xl bg-[#211f1c] px-6 py-10 text-white md:px-10">
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
            <span>
              {item.icon}
            </span>

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
          setGovernorate(
            e.target.value
          )
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
    ) : filteredProducts.length ===
      0 ? (
      <div className="rounded-2xl border bg-white p-12 text-center">
        <div className="text-6xl">
          🧶
        </div>

        <h3 className="mt-4 text-xl font-black">
          مفيش منتجات مطابقة
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          جرّب تغيير البحث أو القسم.
        </p>

        <button
          type="button"
          onClick={() => {
            setSearch("");
            setCategory("الكل");
            setGovernorate(
              "كل المحافظات"
            );
          }}
          className="mt-5 rounded-xl bg-[#211f1c] px-6 py-3 font-black text-white"
        >
          مسح البحث والفلاتر
        </button>
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredProducts.map(
          (product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative flex h-48 items-center justify-center bg-[#eee6dc]">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-6xl">
                    🧶
                  </span>
                )}

                <span className="absolute right-2 top-2 rounded-full bg-white/95 px-3 py-1 text-xs font-black">
                  Handmade
                </span>
              </div>

              <div className="p-4">
                <h3 className="line-clamp-2 font-black">
                  {product.name}
                </h3>

                {product.description && (
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                    {product.description}
                  </p>
                )}

                <div className="mt-4">
                  <p className="text-lg font-black">
                    {Number(
                      product.price
                    ).toLocaleString(
                      "ar-EG"
                    )}{" "}
                    ج.م
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "صفحة المنتج والتفاصيل هنجهزها في الخطوة التالية."
                      )
                    }
                    className="mt-3 w-full rounded-xl bg-[#211f1c] px-3 py-3 text-sm font-black text-white transition hover:bg-[#b87333]"
                  >
                    عرض المنتج
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    )}
  </section>

  {/* Seller CTA */}
  <section className="mx-auto max-w-7xl px-4 pb-16">
    <div className="rounded-3xl bg-[#eee6dc] p-7 text-center">
      <div className="text-5xl">
        🏪
      </div>

      <h2 className="mt-3 text-2xl font-black">
        عندك منتجات هاند ميد؟
      </h2>

      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-600">
        اعرض منتجاتك على Tyson Media
        ووصل لعملاء من جميع محافظات مصر.
      </p>

      <Link
        href="/dashboard"
        className="mt-5 inline-block rounded-xl bg-[#211f1c] px-6 py-3 font-black text-white"
      >
        ابدأ البيع
      </Link>
    </div>
  </section>
</main>

);
}