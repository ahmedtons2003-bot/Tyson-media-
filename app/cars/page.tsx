"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type Service = {
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

const carCategories = [
  {
    title: "سيارات زفاف فاخرة",
    icon: "🚘",
    keywords: ["زفاف", "فاخرة", "luxury"],
  },
  {
    title: "مرسيدس",
    icon: "🏎️",
    keywords: ["مرسيدس", "mercedes"],
  },
  {
    title: "BMW",
    icon: "🚗",
    keywords: ["bmw"],
  },
  {
    title: "Audi",
    icon: "🚙",
    keywords: ["audi"],
  },
  {
    title: "سيارات كلاسيك",
    icon: "🚘",
    keywords: ["كلاسيك", "classic"],
  },
  {
    title: "ليموزين",
    icon: "🚖",
    keywords: ["ليموزين", "limousine"],
  },
  {
    title: "سيارات مع سائق",
    icon: "👔",
    keywords: ["سائق", "driver"],
  },
  {
    title: "سيارات تصوير",
    icon: "📸",
    keywords: ["تصوير", "photo"],
  },
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

export default function CarsPage() {
  const [services, setServices] =
    useState<Service[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [category, setCategory] =
    useState("الكل");

  const [city, setCity] =
    useState("كل المحافظات");

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    async function loadCars() {
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

      const supabase =
        createClient(url, key);

      const { data, error } =
        await supabase
          .from("services")
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
          .eq("is_active", true)
          .order("created_at", {
            ascending: false,
          });

      if (error) {
        setError(
          "حدث خطأ أثناء تحميل الخدمات: " +
            error.message
        );
      } else {
        setServices(
          (data || []) as unknown as Service[]
        );
      }

      setLoading(false);
    }

    loadCars();
  }, []);

  const filteredCars = useMemo(() => {
    let result = [...services];

    if (search.trim()) {
      const value =
        search.trim().toLowerCase();

      result = result.filter((service) => {
        const text =
          `${service.title} ${
            service.description || ""
          } ${
            service.provider
              ?.business_name || ""
          }`.toLowerCase();

        return text.includes(value);
      });
    }

    if (category !== "الكل") {
      const selected =
        carCategories.find(
          (item) =>
            item.title === category
        );

      if (selected) {
        result = result.filter(
          (service) => {
            const text =
              `${service.title} ${
                service.description || ""
              }`.toLowerCase();

            return selected.keywords.some(
              (keyword) =>
                text.includes(
                  keyword.toLowerCase()
                )
            );
          }
        );
      }
    }

    if (
      city !== "كل المحافظات"
    ) {
      result = result.filter(
        (service) =>
          service.provider?.city === city
      );
    }

    return result;
  }, [
    services,
    category,
    city,
    search,
  ]);

  function resetFilters() {
    setCategory("الكل");
    setCity("كل المحافظات");
    setSearch("");
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f5f2] text-[#211f1c]"
    >
      <Header />

      {/* HERO */}

      <section className="mx-auto max-w-7xl px-4 py-5">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#211f1c] px-6 py-12 text-white md:px-12 md:py-16">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#b87333]/20 blur-3xl" />

          <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#b87333]/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="text-6xl">
              🚘
            </div>

            <p className="mt-5 text-xs font-black tracking-widest text-[#d6a66f]">
              TYSON MEDIA • WEDDING CARS
            </p>

            <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
              سيارات الأفراح
              <br />
              <span className="text-[#d6a66f]">
                خليك داخل مناسبتك بشكل مختلف.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/65 md:text-base">
              اختار سيارتك، شوف الأسعار ومقدم
              الخدمة، وحدد موعد مناسبتك واحجز
              بسهولة.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH */}

      <section className="mx-auto max-w-5xl px-4">
        <div className="rounded-3xl border bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <div className="flex items-center rounded-xl border bg-[#faf9f7] px-4">
              <span className="ml-3 text-xl">
                🔎
              </span>

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="ابحث عن مرسيدس، BMW، ليموزين..."
                className="w-full bg-transparent py-4 text-sm font-bold outline-none"
              />
            </div>

            <select
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              className="rounded-xl border bg-[#faf9f7] px-4 py-3 font-bold outline-none"
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
          </div>
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-7">
          <p className="text-xs font-black tracking-widest text-[#b87333]">
            CAR TYPES
          </p>

          <h2 className="mt-2 text-3xl font-black">
            اختار نوع العربية
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          <button
            type="button"
            onClick={() =>
              setCategory("الكل")
            }
            className={`rounded-2xl border p-4 transition hover:-translate-y-1 hover:shadow-lg ${
              category === "الكل"
                ? "border-[#211f1c] bg-[#211f1c] text-white"
                : "bg-white"
            }`}
          >
            <div className="text-4xl">
              🚗
            </div>

            <p className="mt-3 text-sm font-black">
              الكل
            </p>
          </button>

          {carCategories.map(
            (item) => (
              <button
                key={item.title}
                type="button"
                onClick={() =>
                  setCategory(
                    item.title
                  )
                }
                className={`rounded-2xl border p-4 text-right transition hover:-translate-y-1 hover:shadow-lg ${
                  category === item.title
                    ? "border-[#b87333] bg-[#fff8f1]"
                    : "bg-white"
                }`}
              >
                <div className="text-4xl">
                  {item.icon}
                </div>

                <p className="mt-3 text-sm font-black">
                  {item.title}
                </p>
              </button>
            )
          )}
        </div>
      </section>

      {/* SERVICES */}

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-black tracking-widest text-[#b87333]">
              AVAILABLE CARS
            </p>

            <h2 className="mt-2 text-3xl font-black">
              السيارات المتاحة
            </h2>

            <p className="mt-2 text-sm text-[#746f68]">
              {filteredCars.length} خدمة متاحة
            </p>
          </div>

          {(search ||
            category !== "الكل" ||
            city !==
              "كل المحافظات") && (
            <button
              type="button"
              onClick={resetFilters}
              className="hidden rounded-xl bg-[#eee6dc] px-4 py-2 text-sm font-black md:block"
            >
              مسح الفلاتر
            </button>
          )}
        </div>

        {loading ? (
          <div className="rounded-3xl border bg-white p-16 text-center">
            <div className="text-6xl">
              🚘
            </div>

            <p className="mt-4 font-black">
              جاري تحميل السيارات...
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
        ) : filteredCars.length ===
          0 ? (
          <div className="rounded-3xl border bg-white p-16 text-center">
            <div className="text-7xl">
              🚘
            </div>

            <h3 className="mt-5 text-2xl font-black">
              مفيش سيارات مطابقة
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              جرب تغيير البحث أو المحافظة
              أو نوع السيارة.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-xl bg-[#211f1c] px-7 py-3 font-black text-white"
            >
              عرض كل السيارات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCars.map(
              (car) => (
                <article
                  key={car.id}
                  className="group overflow-hidden rounded-3xl border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-52 overflow-hidden bg-[#eee6dc]">
                    {car.image_url ? (
                      <img
                        src={car.image_url}
                        alt={car.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-7xl">
                        🚘
                      </div>
                    )}

                    <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-black shadow">
                      Wedding Car
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-black">
                      {car.title}
                    </h3>

                    <p className="mt-2 min-h-12 text-sm leading-6 text-[#746f68]">
                      {car.description ||
                        "سيارة مناسبة للأفراح والمناسبات."}
                    </p>

                    <div className="mt-4 space-y-2 text-sm">
                      {car.provider
                        ?.business_name && (
                        <p className="font-bold">
                          🏪{" "}
                          {
                            car.provider
                              .business_name
                          }
                        </p>
                      )}

                      {car.provider
                        ?.city && (
                        <p className="text-gray-500">
                          📍{" "}
                          {
                            car.provider
                              .city
                          }
                        </p>
                      )}
                    </div>

                    <div className="mt-5 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xs text-gray-400">
                          السعر يبدأ من
                        </p>

                        <p className="mt-1 text-xl font-black text-[#b87333]">
                          {Number(
                            car.price || 0
                          ).toLocaleString(
                            "ar-EG"
                          )}{" "}
                          ج.م
                        </p>
                      </div>

                      <Link
                        href={`/bookings?service=${car.id}`}
                        className="rounded-xl bg-[#211f1c] px-4 py-3 text-sm font-black text-white transition hover:bg-[#b87333]"
                      >
                        احجز
                      </Link>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </section>

      {/* INFO */}

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-[2rem] bg-[#eee6dc] p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="text-4xl">
                🚘
              </div>

              <h3 className="mt-4 text-xl font-black">
                اختار العربية
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                شوف السيارات والخدمات المتاحة
                واختار الشكل المناسب لمناسبتك.
              </p>
            </div>

            <div>
              <div className="text-4xl">
                📅
              </div>

              <h3 className="mt-4 text-xl font-black">
                حدد الموعد
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                الحجز متاح قبل موعد المناسبة
                بـ30 يومًا على الأقل.
              </p>
            </div>

            <div>
              <div className="text-4xl">
                ✅
              </div>

              <h3 className="mt-4 text-xl font-black">
                ابعت طلبك
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                أرسل طلب الحجز لمقدم الخدمة
                وتابع حالة الحجز من حسابك.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}