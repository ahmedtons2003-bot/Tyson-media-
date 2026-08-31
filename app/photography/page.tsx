"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Service = {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  duration_minutes: number | null;
  image_url: string | null;
  provider_id: string;
  provider: {
    business_name: string;
    city: string | null;
  } | null;
};

const photographyCategories = [
  {
    icon: "💍",
    title: "تصوير أفراح وWedding",
    description: "تغطية كاملة للفرح من البداية للنهاية.",
    keywords: ["فرح", "افراح", "wedding"],
  },
  {
    icon: "💐",
    title: "تصوير خطوبة",
    description: "تصوير الخطوبة والاحتفالات واللحظات الخاصة.",
    keywords: ["خطوبة", "engagement"],
  },
  {
    icon: "👤",
    title: "Portrait",
    description: "جلسات بورتريه فردية وشخصية.",
    keywords: ["portrait", "بورتريه"],
  },
  {
    icon: "👗",
    title: "Fashion",
    description: "تصوير موديلز وملابس وبراندات وفاشون.",
    keywords: ["fashion", "فاشون", "موديل"],
  },
  {
    icon: "💄",
    title: "Makeup & Beauty",
    description: "تصوير ميك أب أرتيست وBeauty Sessions.",
    keywords: ["makeup", "beauty", "ميكب", "ميكاب"],
  },
  {
    icon: "📦",
    title: "تصوير منتجات",
    description: "تصوير احترافي للمنتجات والمتاجر والبراندات.",
    keywords: ["منتجات", "product"],
  },
  {
    icon: "🎉",
    title: "حفلات ومناسبات",
    description: "تغطية أعياد الميلاد والحفلات والفعاليات.",
    keywords: ["حفلات", "حفلة", "party", "مناسبات"],
  },
  {
    icon: "🏢",
    title: "مؤتمرات وفعاليات",
    description: "تغطية الشركات والمؤتمرات والفعاليات.",
    keywords: ["مؤتمر", "مؤتمرات", "فعاليات", "events"],
  },
  {
    icon: "🎥",
    title: "تصوير فيديو",
    description: "تصوير فيديو بجميع مستويات الجودة.",
    keywords: ["فيديو", "video"],
  },
  {
    icon: "🚁",
    title: "تصوير Drone",
    description: "تصوير جوي للمناسبات والأماكن والمشروعات.",
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
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [city, setCity] = useState("كل المحافظات");
  const [quality, setQuality] = useState("كل الجودات");

  useEffect(() => {
    async function loadServices() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setError("إعدادات Supabase غير موجودة.");
        setLoading(false);
        return;
      }

      const supabase = createClient(url, key);

      const { data, error } = await supabase
        .from("services")
        .select(`
          id,
          title,
          description,
          price,
          duration_minutes,
          image_url,
          provider_id,
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
          "حدث خطأ أثناء تحميل خدمات التصوير: " +
            error.message
        );
        setServices([]);
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
    return services.filter((service) => {
      const title = (service.title || "").toLowerCase();
      const description = (
        service.description || ""
      ).toLowerCase();

      const fullText = `${title} ${description}`;

      // فلترة المحافظة
      const cityMatch =
        city === "كل المحافظات" ||
        service.provider?.city === city;

      if (!cityMatch) {
        return false;
      }

      // فلترة نوع التصوير
      if (selectedCategory !== "الكل") {
        const category = photographyCategories.find(
          (item) => item.title === selectedCategory
        );

        if (!category) {
          return false;
        }

        const categoryMatch = category.keywords.some(
          (keyword) =>
            fullText.includes(keyword.toLowerCase())
        );

        if (!categoryMatch) {
          return false;
        }
      }

      // فلترة الجودة
      if (quality !== "كل الجودات") {
        if (!fullText.includes(quality.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [services, city, selectedCategory, quality]);

  function resetFilters() {
    setSelectedCategory("الكل");
    setCity("كل المحافظات");
    setQuality("كل الجودات");
  }

  function selectCategory(title: string) {
    setSelectedCategory(title);

    if (title !== "تصوير فيديو") {
      setQuality("كل الجودات");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#fbfaf7] text-[#211f1c]"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-2xl font-black"
          >
            Tyson{" "}
            <span className="text-[#b87333]">
              Media
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="rounded-xl border px-4 py-2 text-sm font-bold"
            >
              حجوزاتي
            </Link>

            <Link
              href="/"
              className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-bold text-white"
            >
              الرئيسية
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <div className="overflow-hidden rounded-[2rem] bg-[#211f1c] px-6 py-14 text-center text-white md:px-10 md:py-20">
          <div className="text-6xl">
            📸
          </div>

          <p className="mt-5 text-sm font-bold tracking-wide text-[#d6a66f]">
            TYSON MEDIA
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-6xl">
            كل أنواع التصوير في مكان واحد
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
            اختار نوع التصوير والمحافظة والجودة،
            وشوف الخدمات المناسبة ليك.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="rounded-3xl border bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                نوع التصوير
              </label>

              <select
                value={selectedCategory}
                onChange={(e) =>
                  selectCategory(e.target.value)
                }
                className="w-full rounded-xl border bg-white p-3 outline-none focus:border-[#b87333]"
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

            {/* Governorate */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                المحافظة
              </label>

              <select
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                className="w-full rounded-xl border bg-white p-3 outline-none focus:border-[#b87333]"
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

            {/* Quality */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                جودة الفيديو
              </label>

              <select
                value={quality}
                onChange={(e) =>
                  setQuality(e.target.value)
                }
                className="w-full rounded-xl border bg-white p-3 outline-none focus:border-[#b87333]"
              >
                <option value="كل الجودات">
                  كل الجودات
                </option>

                {videoQualities.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Active filters */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#eee6dc] px-4 py-2 text-sm font-bold">
              📸 {selectedCategory}
            </span>

            <span className="rounded-full bg-[#eee6dc] px-4 py-2 text-sm font-bold">
              📍 {city}
            </span>

            {quality !== "كل الجودات" && (
              <span className="rounded-full bg-[#eee6dc] px-4 py-2 text-sm font-bold">
                🎥 {quality}
              </span>
            )}

            {(selectedCategory !== "الكل" ||
              city !== "كل المحافظات" ||
              quality !== "كل الجودات") && (
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full bg-[#211f1c] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#b87333]"
              >
                مسح الفلاتر
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-7">
          <p className="text-sm font-bold text-[#b87333]">
            PHOTOGRAPHY
          </p>

          <h2 className="mt-2 text-3xl font-black">
            اختار نوع التصوير
          </h2>

          <p className="mt-2 text-sm text-[#746f68]">
            اضغط على القسم لعرض الخدمات الخاصة به.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {photographyCategories.map(
            (item) => (
              <button
                key={item.title}
                type="button"
                onClick={() =>
                  selectCategory(item.title)
                }
                className={`group rounded-2xl border p-5 text-right transition hover:-translate-y-1 hover:shadow-lg ${
                  selectedCategory === item.title
                    ? "border-[#b87333] bg-[#fff8f1] ring-2 ring-[#b87333]/20"
                    : "bg-white"
                }`}
              >
                <div className="flex h-28 items-center justify-center rounded-xl bg-[#eee6dc] text-5xl">
                  {item.icon}
                </div>

                <h3 className="mt-4 font-black">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#746f68]">
                  {item.description}
                </p>

                <span className="mt-4 block text-sm font-black text-[#b87333]">
                  عرض الخدمات ←
                </span>
              </button>
            )
          )}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-[#b87333]">
              SERVICES
            </p>

            <h2 className="mt-2 text-3xl font-black">
              الخدمات المتاحة
            </h2>

            <p className="mt-2 text-sm text-[#746f68]">
              {city === "كل المحافظات"
                ? "كل المحافظات"
                : `الخدمات في ${city}`}
            </p>
          </div>

          <span className="rounded-full bg-[#eee6dc] px-4 py-2 text-sm font-black">
            {loading
              ? "..."
              : `${filteredServices.length} خدمة`}
          </span>
        </div>

        {loading ? (
          <div className="rounded-3xl border bg-white p-10 text-center font-bold">
            جاري تحميل خدمات التصوير...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center font-bold text-red-700">
            {error}
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="rounded-3xl border bg-white p-10 text-center">
            <div className="text-5xl">
              🔍
            </div>

            <h3 className="mt-4 text-xl font-black">
              لا توجد خدمات مطابقة
            </h3>

            <p className="mt-2 text-sm text-[#746f68]">
              جرّب تغيير نوع التصوير أو المحافظة أو الجودة.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-[#b87333] px-6 py-3 font-black text-white"
            >
              مسح الفلاتر
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map(
              (service) => (
                <article
                  key={service.id}
                  className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-52 items-center justify-center overflow-hidden bg-[#eee6dc] text-7xl">
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

                  <div className="p-6">
                    <p className="text-sm font-bold text-[#b87333]">
                      ⭐ خدمة تصوير
                    </p>

                    <h3 className="mt-2 text-xl font-black">
                      {service.title}
                    </h3>

                    <p className="mt-3 min-h-12 text-sm leading-6 text-[#746f68]">
                      {service.description ||
                        "خدمة تصوير احترافية على Tyson Media."}
                    </p>

                    <div className="mt-5 space-y-2 text-sm text-[#746f68]">
                      {service.provider?.business_name && (
                        <p>
                          🏪{" "}
                          <span className="font-bold text-[#211f1c]">
                            {
                              service.provider
                                .business_name
                            }
                          </span>
                        </p>
                      )}

                      {service.provider?.city && (
                        <p>
                          📍{" "}
                          {service.provider.city}
                        </p>
                      )}

                      {service.duration_minutes && (
                        <p>
                          ⏱️{" "}
                          {service.duration_minutes} دقيقة
                        </p>
                      )}
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs text-[#746f68]">
                          السعر
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
                        className="rounded-xl bg-[#211f1c] px-5 py-3 text-sm font-black text-white transition hover:bg-[#b87333]"
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

      {/* Video Quality */}
      {(selectedCategory === "الكل" ||
        selectedCategory === "تصوير فيديو") && (
        <section className="mx-auto max-w-7xl px-4 pb-10">
          <div className="rounded-3xl bg-[#eee6dc] p-7 md:p-9">
            <p className="text-sm font-bold text-[#b87333]">
              VIDEO PRODUCTION
            </p>

            <h2 className="mt-2 text-3xl font-black">
              تصوير فيديو بجميع الـ Quality 🎥
            </h2>

            <p className="mt-3 text-[#746f68]">
              اضغط على الجودة لعرض خدمات الفيديو المتاحة بها.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {videoQualities.map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(
                        "تصوير فيديو"
                      );
                      setQuality(item);

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className={`rounded-xl border p-4 text-center font-black transition hover:-translate-y-1 hover:border-[#b87333] hover:bg-[#fff8f1] hover:shadow-md ${
                      quality === item
                        ? "border-[#b87333] bg-[#fff8f1]"
                        : "bg-white"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Drone */}
      {(selectedCategory === "الكل" ||
        selectedCategory === "تصوير Drone") && (
        <section className="mx-auto max-w-7xl px-4 pb-10">
          <div className="rounded-3xl bg-[#211f1c] p-7 text-white md:p-9">
            <div className="text-5xl">
              🚁
            </div>

        