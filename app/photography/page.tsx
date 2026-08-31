"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

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

const photographyCategories = [
  {
    icon: "💍",
    title: "تصوير أفراح و زفاف",
    keywords: ["أفراح", "زفاف", "wedding"],
  },
  {
    icon: "💐",
    title: "تصوير خطوبة",
    keywords: ["خطوبة"],
  },
  {
    icon: "👤",
    title: "بورتريه",
    keywords: ["بورتريه", "portrait", "ملامح شخصية"],
  },
  {
    icon: "👗",
    title: "تصوير فاشون",
    keywords: ["فاشون", "fashion", "أزياء"],
  },
  {
    icon: "💄",
    title: "تصوير مكياج وجمال",
    keywords: ["مكياج", "جمال", "beauty", "makeup"],
  },
  {
    icon: "📦",
    title: "تصوير منتجات",
    keywords: ["منتجات", "product"],
  },
  {
    icon: "🎉",
    title: "الحفلات والمناسبات",
    keywords: ["حفلات", "مناسبات"],
  },
  {
    icon: "🏢",
    title: "مؤتمرات وفعاليات",
    keywords: ["مؤتمرات", "فعاليات"],
  },
  {
    icon: "🎥",
    title: "تصوير فيديو",
    keywords: ["فيديو", "video"],
  },
  {
    icon: "🚁",
    title: "تصوير Drone",
    keywords: ["drone", "درون", "جوي"],
  },
];

const videoQualities = [
  "HD 720p",
  "Full HD 1080p",
  "2K",
  "4K",
  "6K",
  "8K",
];

const egyptGovernorates = [
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

export default function PhotographyPage() {
  const [selectedCategory, setSelectedCategory] =
    useState("الكل");

  const [city, setCity] =
    useState("كل المحافظات");

  const [services, setServices] =
    useState<Service[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadServices() {
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

    loadServices();
  }, []);

  const filteredServices = useMemo(() => {
    let result = [...services];

    if (selectedCategory !== "الكل") {
      const category =
        photographyCategories.find(
          (item) =>
            item.title === selectedCategory
        );

      if (category) {
        result = result.filter(
          (service) => {
            const text =
              `${service.title} ${service.description || ""}`
                .toLowerCase();

            return category.keywords.some(
              (keyword) =>
                text.includes(
                  keyword.toLowerCase()
                )
            );
          }
        );
      }
    }

    if (city !== "كل المحافظات") {
      result = result.filter(
        (service) =>
          service.provider?.city === city
      );
    }

    return result;
  }, [
    services,
    selectedCategory,
    city,
  ]);

  function resetFilters() {
    setSelectedCategory("الكل");

    setCity("كل المحافظات");
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#fbfaf7] text-[#211f1c]"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-2xl font-black"
          >
            Tyson{" "}
            <span className="text-[#b87333]">
              Media
            </span>
          </Link>

          <Link
            href="/"
            className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-bold text-white"
          >
            الرئيسية
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-[2rem] bg-[#211f1c] px-6 py-14 text-center text-white">
          <div className="text-6xl">
            📸
          </div>

          <p className="mt-5 text-sm font-bold text-[#d6a66f]">
            TYSON MEDIA
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-6xl">
            كل أنواع التصوير في مكان واحد
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
            اختار نوع التصوير والمحافظة واستكشف
            الخدمات الحقيقية المتاحة على المنصة.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border bg-white p-5">
          <div className="grid gap-4 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-bold">
                نوع التصوير
              </label>

              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border bg-white p-3"
              >
                <option value="الكل">
                  كل أنواع التصوير
                </option>

                {photographyCategories.map(
                  (item) => (
                    <option
                      key={item.title}
                      value={item.title}
                    >
                      {item.title}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-bold">
                المحافظة
              </label>

              <select
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                className="w-full rounded-xl border bg-white p-3"
              >
                <option value="كل المحافظات">
                  كل محافظات مصر
                </option>

                {egyptGovernorates.map(
                  (governorate) => (
                    <option
                      key={governorate}
                      value={governorate}
                    >
                      {governorate}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {(selectedCategory !== "الكل" ||
            city !== "كل المحافظات") && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 rounded-xl bg-[#211f1c] px-5 py-3 font-bold text-white"
            >
              مسح الفلاتر
            </button>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-6 text-3xl font-black">
          اختار نوع التصوير
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {photographyCategories.map(
            (item) => (
              <button
                key={item.title}
                type="button"
                onClick={() =>
                  setSelectedCategory(
                    item.title
                  )
                }
                className={`rounded-2xl border p-5 text-right transition hover:-translate-y-1 hover:shadow-lg ${
                  selectedCategory === item.title
                    ? "border-[#b87333] bg-[#fff8f1]"
                    : "bg-white"
                }`}
              >
                <div className="flex h-24 items-center justify-center rounded-xl bg-[#eee6dc] text-5xl">
                  {item.icon}
                </div>

                <h3 className="mt-4 font-black">
                  {item.title}
                </h3>

                <span className="mt-3 block text-sm font-bold text-[#b87333]">
                  عرض الخدمات ←
                </span>
              </button>
            )
          )}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="mb-6">
          <p className="font-bold text-[#b87333]">
            SERVICES
          </p>

          <h2 className="mt-2 text-3xl font-black">
            الخدمات المتاحة
          </h2>

          <p className="mt-2 text-sm text-[#746f68]">
            {filteredServices.length} خدمة متاحة
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border bg-white p-10 text-center font-bold">
            جاري تحميل الخدمات...
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="rounded-2xl border bg-white p-10 text-center">
            <div className="text-5xl">
              📭
            </div>

            <h3 className="mt-4 text-xl font-black">
              لا توجد خدمات مطابقة
            </h3>

            <p className="mt-2 text-sm text-[#746f68]">
              جرب تغيير نوع التصوير أو المحافظة.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-[#211f1c] px-6 py-3 font-bold text-white"
            >
              عرض كل الخدمات
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map(
              (service) => (
                <article
                  key={service.id}
                  className="overflow-hidden rounded-3xl border bg-white shadow-sm"
                >
                  <div className="flex h-48 items-center justify-center overflow-hidden bg-[#eee6dc] text-6xl">
                    {service.image_url ? (
                      <img
                        src={service.image_url}
                        alt={service.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      "📸"
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-black">
                      {service.title}
                    </h3>

                    <p className="mt-2 min-h-12 text-sm leading-6 text-[#746f68]">
                      {service.description ||
                        "خدمة تصوير احترافية."}
                    </p>

                    <div className="mt-4 space-y-2 text-sm">
                      {service.provider
                        ?.business_name && (
                        <p>
                          🏪{" "}
                          {
                            service.provider
                              .business_name
                          }
                        </p>
                      )}

                      {service.provider
                        ?.city && (
                        <p>
                          📍{" "}
                          {
                            service.provider
                              .city
                          }
                        </p>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#746f68]">
                          السعر يبدأ من
                        </p>

                        <p className="text-xl font-black">
                          {Number(
                            service.price || 0
                          ).toLocaleString(
                            "ar-EG"
                          )}{" "}
                          ج.م
                        </p>
                      </div>

                      <Link
                        href={`/bookings?service=${service.id}`}
                        className="rounded-xl bg-[#211f1c] px-5 py-3 text-sm font-black text-white"
                      >
                        احجز الآن
                      </Link>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </section>

      {/* Video */}
      {(selectedCategory === "الكل" ||
        selectedCategory === "تصوير فيديو") && (
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <div className="rounded-3xl bg-[#eee6dc] p-7">
            <h2 className="text-2xl font-black">
              جودة تصوير الفيديو 🎥
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {videoQualities.map(
                (quality) => (
                  <Link
                    key={quality}
                    href={`/bookings?service=video&quality=${encodeURIComponent(
                      quality
                    )}`}
                    className="rounded-xl bg-white p-4 text-center font-black"
                  >
                    {quality}
                  </Link>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Error */}
      {error && (
        <div className="mx-auto max-w-6xl px-4 pb-10">
          <div className="rounded-xl bg-red-50 p-4 text-center text-red-700">
            {error}
          </div>
        </div>
      )}
    </main>
  );
}