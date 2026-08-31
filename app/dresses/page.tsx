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

const dressCategories = [
  { name: "الكل", icon: "👗" },
  { name: "فساتين زفاف", icon: "👰" },
  { name: "فساتين خطوبة", icon: "💍" },
  { name: "فساتين سواريه", icon: "✨" },
  { name: "فساتين سهرة", icon: "🌙" },
  { name: "فساتين أطفال", icon: "👧" },
  { name: "إكسسوارات", icon: "💎" },
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

export default function DressesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setError(
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
        setError(
          "حدث خطأ أثناء تحميل الفساتين: " +
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
      const keywords: Record<
        string,
        string[]
      > = {
        "فساتين زفاف": [
          "زفاف",
          "فرح",
          "wedding",
        ],
        "فساتين خطوبة": [
          "خطوبة",
          "engagement",
        ],
        "فساتين سواريه": [
          "سواريه",
          "swarovski",
        ],
        "فساتين سهرة": [
          "سهرة",
          "سهرة",
          "evening",
        ],
        "فساتين أطفال": [
          "أطفال",
          "اطفال",
          "kids",
        ],
        إكسسوارات: [
          "إكسسوارات",
          "اكسسوارات",
          "accessories",
        ],
      };

      const selectedKeywords =
        keywords[category] || [];

      result = result.filter(
        (product) => {
          const text =
            `${product.name} ${
              product.description || ""
            }`.toLowerCase();

          return selectedKeywords.some(
            (keyword) =>
              text.includes(
                keyword.toLowerCase()
              )
          );
        }
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
    setGovernorate(
      "كل المحافظات"
    );
    setSort("newest");
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#faf8f5] text-[#211f1c]"
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
                placeholder="ابحث عن فستان، زفاف، خطوبة..."
                className="w-full rounded-2xl border bg-[#f6f5f3] px-5 py-3 pr-12 text-sm font-bold outline-none focus:border-[#b87333]"
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
              placeholder="ابحث عن فستان..."
              className="w-full rounded-xl border bg-[#f6f5f3] p-3 pr-4 font-bold outline-none focus:border-[#b87333]"
            />
          </div>
        </div>
      </header>

      {/* HERO */}

      <section className="mx-auto max-w-7xl px-4 py-5">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#211f1c] px-6 py-12 text-white md:px-12 md:py-16">
          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-black text-[#d6a66f]">
              TYSON MEDIA • DRESSES
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              فستانك المثالي
              <br />
              <span className="text-[#d6a66f]">
                يبدأ من هنا 👗
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
              اكتشفي فساتين الزفاف والخطوبة
              والسهرات والمناسبات من بائعين
              مختلفين على Tyson Media.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                👰 زفاف
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                💍 خطوبة
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                ✨ سواريه
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                💎 إكسسوارات
              </span>
            </div>
          </div>

          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#b87333]/20 blur-3xl" />

          <div className="absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="mx-auto max-w-7xl px-4 py-3">
        <div className="rounded-3xl border bg-white p-5">
          <p className="text-xs font-black text-[#b87333]">
            SHOP BY CATEGORY
          </p>

          <h2 className="mt-1 text-2xl font-black">
            تصفحي الفساتين
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {dressCategories.map(
              (item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() =>
                    setCategory(
                      item.name
                    )
                  }
                  className={`rounded-2xl border p-4 text-center transition hover:-translate-y-1 hover:shadow-md ${
                    category ===
                    item.name
                      ? "border-[#211f1c] bg-[#211f1c] text-white"
                      : "bg-white"
                  }`}
                >
                  <div className="text-4xl">
                    {item.icon}
                  </div>

                  <p className="mt-2 text-xs font-black">
                    {item.name}
                  </p>
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* FILTERS */}

      <section className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex flex-col gap-3 rounded-3xl border bg-white p-4 md:flex-row">
          <select
            value={governorate}
            onChange={(e) =>
              setGovernorate(
                e.target.value
              )
            }
            className="flex-1 rounded-xl border bg-white p-3 text-sm font-bold outline-none focus:border-[#b87333]"
          >
            {governorates.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  📍 {item}
                </option>
              )
            )}
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
              onClick={
                resetFilters
              }
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
              DRESS MARKET
            </p>

            <h2 className="mt-1 text-2xl font-black md:text-3xl">
              الفساتين المتاحة
            </h2>
          </div>

          <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-500">
            {filteredProducts.length} منتج
          </span>
        </div>

        {loading ? (
          <div className="rounded-3xl border bg-white p-16 text-center">
            <div className="text-6xl">
              👗
            </div>

            <p className="mt-4 font-black">
              جاري تحميل الفساتين...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-3xl border bg-white p-10 text-center">
            <div className="text-5xl">
              ⚠️
            </div>

            <p className="mt-4 font-bold text-red-600">
              {error}
            </p>
          </div>
        ) : filteredProducts.length ===
          0 ? (
          <div className="rounded-3xl border bg-white p-16 text-center">
            <div className="text-7xl">
              👗
            </div>

            <h3 className="mt-5 text-2xl font-black">
              مفيش فساتين مطابقة
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              جربي تغيير البحث أو القسم أو
              المحافظة.
            </p>

            <button
              type="button"
              onClick={
                resetFilters
              }
              className="mt-6 rounded-xl bg-[#211f1c] px-7 py-3 font-black text-white"
            >
              عرض كل الفساتين
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredProducts.map(
              (product) => (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link
                    href={`/dresses/${product.id}`}
                    className="block"
                  >
                    <div className="relative h-64 overflow-hidden bg-[#eee6dc]">
                      {product.image_url ? (
                        <img
                          src={
                            product.image_url
                          }
                          alt={
                            product.name
                          }
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-7xl">
                          👗
                        </div>
                      )}

                      <span className="absolute right-2 top-2 rounded-full bg-white/95 px-3 py-1 text-xs font-black shadow-sm">
                        Dresses
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
                        {
                          product.name
                        }
                      </h3>

                      {product.description && (
                        <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-gray-500">
                          {
                            product.description
                          }
                        </p>
                      )}

                      <div className="mt-4">
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

                      <span className="mt-4 block rounded-xl bg-[#211f1c] px-3 py-3 text-center text-sm font-black text-white transition group-hover:bg-[#b87333]">
                        عرض الفستان
                      </span>
                    </div>
                  </Link>
                </article>
              )
            )}
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
                عندك فساتين؟
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-gray-600">
                اعرض فساتينك ومنتجاتك على
                Tyson Media ووصل لعملاء
                جدد من جميع أنحاء مصر.
              </p>
            </div>

            <div className="flex justify-start md:justify-end">
              <Link
                href="/dashboard"
                className="rounded-xl bg-[#211f1c] px-7 py-4 font-black text-white transition hover:bg-[#b87333]"
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
                سوق الفساتين ومنتجات المناسبات.
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