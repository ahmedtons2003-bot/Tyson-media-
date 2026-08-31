"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type Product = {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  provider: {
    business_name: string | null;
    city: string | null;
  } | null;
};

const categories = [
  ["🤵", "بدلات زفاف"],
  ["🕴️", "بدلات كلاسيك"],
  ["✨", "بدلات سواريه"],
  ["👔", "بدلات رسمية"],
  ["🧵", "تفصيل"],
  ["👞", "إكسسوارات"],
] as const;

const cities = [
  "القاهرة",
  "الإسكندرية",
  "الجيزة",
  "القليوبية",
  "البحيرة",
  "الدقهلية",
  "الشرقية",
  "الغربية",
  "المنوفية",
  "كفر الشيخ",
  "دمياط",
  "بورسعيد",
  "الإسماعيلية",
  "السويس",
  "مطروح",
  "البحر الأحمر",
];

export default function SuitsPage() {
  const [category, setCategory] = useState("الكل");
  const [city, setCity] = useState("الكل");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setError("إعدادات قاعدة البيانات غير موجودة.");
        setLoading(false);
        return;
      }

      const supabase = createClient(url, key);

      const { data, error: queryError } = await supabase
        .from("products")
        .select(`
          id,
          title,
          description,
          price,
          image_url,
          provider:providers (
            business_name,
            city
          )
        `)
        .order("created_at", { ascending: false });

      if (queryError) {
        setError(queryError.message);
      } else {
        setProducts((data || []) as unknown as Product[]);
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "الكل") {
      result = result.filter((product) => {
        const text =
          `${product.title} ${product.description || ""}`.toLowerCase();

        const words: Record<string, string[]> = {
          "بدلات زفاف": ["زفاف", "عرس", "wedding", "groom"],
          "بدلات كلاسيك": ["كلاسيك", "classic"],
          "بدلات سواريه": ["سواريه", "سهرة", "evening"],
          "بدلات رسمية": ["رسمي", "formal"],
          تفصيل: ["تفصيل", "custom"],
          إكسسوارات: [
            "إكسسوارات",
            "اكسسوارات",
            "accessories",
          ],
        };

        return (words[category] || []).some((word) =>
          text.includes(word.toLowerCase())
        );
      });
    }

    if (city !== "الكل") {
      result = result.filter(
        (product) => product.provider?.city === city
      );
    }

    return result;
  }, [products, category, city]);

  function resetFilters() {
    setCategory("الكل");
    setCity("الكل");
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f5f2] text-[#211f1c]"
    >
      <Header />

      {/* HERO */}

      <section className="mx-auto max-w-7xl px-4 pt-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#211f1c] px-6 py-14 text-white md:px-12 md:py-20">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#b87333]/20 blur-3xl" />

          <div className="absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-[#b87333]/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="text-6xl">🤵</div>

            <p className="mt-6 text-xs font-black tracking-[0.25em] text-[#d6a66f]">
              MEN'S SUITS
            </p>

            <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
              البدلات
              <br />
              <span className="text-[#d6a66f]">
                أناقة تليق بالمناسبة.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/60">
              اكتشف بدلات الزفاف والبدلات الرسمية
              والكلاسيك والسواريه والتفصيل من مقدمي
              الخدمات على Tyson Media.
            </p>
          </div>
        </div>
      </section>

      {/* FILTERS */}

      <section className="mx-auto max-w-7xl px-4 pt-8">
        <div className="rounded-3xl border bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-black">
                نوع البدلة
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border bg-white p-3 outline-none focus:border-[#b87333]"
              >
                <option value="الكل">
                  كل البدلات
                </option>

                {categories.map((item) => (
                  <option key={item[1]} value={item[1]}>
                    {item[1]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black">
                المحافظة
              </label>

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-2xl border bg-white p-3 outline-none focus:border-[#b87333]"
              >
                <option value="الكل">
                  كل المحافظات
                </option>

                {cities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(category !== "الكل" || city !== "الكل") && (
            <button
              onClick={resetFilters}
              className="mt-4 rounded-xl bg-[#211f1c] px-5 py-3 text-sm font-black text-white"
            >
              مسح الفلاتر
            </button>
          )}
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-7">
          <p className="text-xs font-black tracking-[0.25em] text-[#b87333]">
            COLLECTION
          </p>

          <h2 className="mt-2 text-3xl font-black">
            اختار ستايلك
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((item) => (
            <button
              key={item[1]}
              onClick={() => setCategory(item[1])}
              className={`rounded-3xl border p-4 text-right transition hover:-translate-y-1 hover:shadow-lg ${
                category === item[1]
                  ? "border-[#b87333] bg-[#fff8f1]"
                  : "bg-white"
              }`}
            >
              <div className="flex h-24 items-center justify-center rounded-2xl bg-[#eee6dc] text-5xl">
                {item[0]}
              </div>

              <h3 className="mt-4 text-sm font-black">
                {item[1]}
              </h3>
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.25em] text-[#b87333]">
              SUITS
            </p>

            <h2 className="mt-2 text-3xl font-black">
              البدلات المتاحة
            </h2>
          </div>

          {!loading && (
            <span className="rounded-full bg-[#eee6dc] px-4 py-2 text-xs font-black">
              {filteredProducts.length} نتيجة
            </span>
          )}
        </div>

        {loading ? (
          <div className="rounded-3xl border bg-white p-12 text-center font-black">
            جاري تحميل البدلات...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
            حدث خطأ أثناء تحميل البدلات.
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-3xl border bg-white p-12 text-center">
            <div className="text-5xl">🤵</div>

            <h3 className="mt-4 text-xl font-black">
              مفيش بدلات مطابقة حاليًا
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              جرّب تغيير نوع البدلة أو المحافظة.
            </p>

            <button
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-[#211f1c] px-6 py-3 text-sm font-black text-white"
            >
              عرض الكل
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-72 overflow-hidden bg-[#eee6dc]">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-7xl">
                      🤵
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-black">
                    {product.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#746f68]">
                    {product.description ||
                      "بدلة أنيقة لمناسبتك."}
                  </p>

                  {product.provider?.business_name && (
                    <p className="mt-4 text-xs font-bold text-gray-500">
                      🏪 {product.provider.business_name}
                    </p>
                  )}

                  {product.provider?.city && (
                    <p className="mt-2 text-xs font-bold text-gray-500">
                      📍 {product.provider.city}
                    </p>
                  )}

                  <div className="mt-5 flex items-end justify-between border-t pt-4">
                    <div>
                      <p className="text-[11px] text-gray-500">
                        يبدأ من
                      </p>

                      <p className="mt-1 text-lg font-black">
                        {Number(product.price || 0).toLocaleString(
                          "ar-EG"
                        )}{" "}
                        ج.م
                      </p>
                    </div>

                    <Link
                      href={`/product/${product.id}`}
                      className="rounded-xl bg-[#211f1c] px-4 py-3 text-xs font-black text-white transition hover:bg-[#b87333]"
                    >
                      التفاصيل
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* NOTICE */}

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-[2rem] bg-[#eee6dc] p-7 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-4xl">📅</div>

              <h2 className="mt-4 text-2xl font-black">
                احجز بدري
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#746f68]">
                يفضل إرسال طلب الحجز قبل موعد
                المناسبة بـ30 يومًا على الأقل لضمان
                وقت كافي للاختيار والتجهيز.
              </p>
            </div>

            <Link
              href="/bookings"
              className="w-fit rounded-xl bg-[#211f1c] px-6 py-3 text-sm font-black text-white"
            >
              ابدأ الحجز
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}