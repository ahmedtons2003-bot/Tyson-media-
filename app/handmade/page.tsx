"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Product = {
id: string;
name: string;
description: string | null;
price: number;
image_url: string | null;
category_id: string | null;
};

const handmadeCategories = [
{ name: "شنط هاند ميد", icon: "👜" },
{ name: "خواتم", icon: "💍" },
{ name: "انسيالات", icon: "📿" },
{ name: "سلاسل", icon: "📿" },
{ name: "إكسسوارات", icon: "✨" },
{ name: "هدايا هاند ميد", icon: "🎁" },
{ name: "تطريز", icon: "🧵" },
{ name: "كروشيه", icon: "🧶" },
{ name: "مكرمية", icon: "🪢" },
{ name: "توزيعات مناسبات", icon: "🎀" },
{ name: "ديكورات هاند ميد", icon: "🏠" },
{ name: "شموع", icon: "🕯️" },
];

export default function HandmadePage() {
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);
const [selectedCategory, setSelectedCategory] = useState("الكل");
const [message, setMessage] = useState("");

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
      "id, name, description, price, image_url, category_id"
    )
    .order("created_at", { ascending: false });

  if (error) {
    setMessage("حدث خطأ أثناء تحميل المنتجات: " + error.message);
  } else {
    setProducts((data || []) as Product[]);
  }

  setLoading(false);
}

loadProducts();

}, []);

return (
<main
dir="rtl"
className="min-h-screen bg-[#fbfaf7] text-[#211f1c]"
>
<header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
<Link href="/" className="text-2xl font-black">
Tyson <span className="text-[#b87333]">Media</span>
</Link>

      <Link
        href="/"
        className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-bold text-white"
      >
        الرئيسية
      </Link>
    </div>
  </header>

  <section className="mx-auto max-w-6xl px-4 py-10">
    <div className="rounded-[2rem] bg-[#211f1c] px-6 py-14 text-center text-white md:px-10">
      <div className="text-6xl">🧶</div>

      <p className="mt-5 text-sm font-bold tracking-wide text-[#d6a66f]">
        TYSON MEDIA
      </p>

      <h1 className="mt-3 text-4xl font-black md:text-6xl">
        هاند ميد ومنتجات مصنوعة بحب
      </h1>

      <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
        اكتشف الشنط والإكسسوارات والهدايا والمنتجات
        المصنوعة يدويًا من مختلف مقدمي الخدمات والبائعين.
      </p>
    </div>
  </section>

  <section className="mx-auto max-w-6xl px-4">
    <div className="rounded-3xl border bg-white p-5">
      <h2 className="text-xl font-black">
        تصفح الأقسام
      </h2>

      <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setSelectedCategory("الكل")}
          className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-black ${
            selectedCategory === "الكل"
              ? "bg-[#211f1c] text-white"
              : "bg-[#eee6dc]"
          }`}
        >
          كل المنتجات
        </button>

        {handmadeCategories.map((category) => (
          <button
            key={category.name}
            type="button"
            onClick={() => setSelectedCategory(category.name)}
            className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-black ${
              selectedCategory === category.name
                ? "bg-[#b87333] text-white"
                : "bg-[#eee6dc]"
            }`}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>
    </div>
  </section>

  <section className="mx-auto max-w-6xl px-4 py-10">
    <div className="mb-7">
      <p className="text-sm font-bold text-[#b87333]">
        HANDMADE
      </p>

      <h2 className="mt-2 text-3xl font-black">
        منتجات هاند ميد
      </h2>
    </div>

    {loading ? (
      <div className="rounded-3xl border bg-white p-10 text-center">
        <p className="font-bold">
          جاري تحميل المنتجات...
        </p>
      </div>
    ) : message ? (
      <div className="rounded-3xl border bg-white p-10 text-center">
        <p className="font-bold text-red-600">
          {message}
        </p>
      </div>
    ) : products.length === 0 ? (
      <div className="rounded-3xl border bg-white p-10 text-center">
        <div className="text-5xl">🧶</div>

        <h3 className="mt-4 text-xl font-black">
          لسه مفيش منتجات
        </h3>

        <p className="mt-2 text-sm text-[#746f68]">
          قريبًا هتلاقي هنا منتجات هاند ميد من البائعين.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-48 items-center justify-center bg-[#eee6dc]">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-6xl">🧶</span>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-black">
                {product.name}
              </h3>

              {product.description && (
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#746f68]">
                  {product.description}
                </p>
              )}

              <div className="mt-4 flex items-center justify-between">
                <strong className="text-lg">
                  {Number(product.price).toLocaleString("ar-EG")} ج.م
                </strong>

                <span className="text-sm font-black text-[#b87333]">
                  عرض ←
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
  </section>

  <section className="mx-auto max-w-6xl px-4 pb-16">
    <div className="rounded-3xl bg-[#eee6dc] p-7 text-center">
      <div className="text-5xl">🎁</div>

      <h2 className="mt-4 text-2xl font-black">
        بتبيع هاند ميد؟
      </h2>

      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#746f68]">
        أضف منتجاتك على Tyson Media وخلي العملاء يشوفوا
        منتجاتك ويتواصلوا معاك.
      </p>

      <Link
        href="/dashboard"
        className="mt-5 inline-block rounded-xl bg-[#211f1c] px-6 py-3 font-black text-white"
      >
        لوحة التحكم
      </Link>
    </div>
  </section>
</main>

);
}