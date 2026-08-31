"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const photographyCategories = [
  {
    icon: "💍",
    title: "تصوير أفراح وWedding",
    description: "تغطية كاملة للفرح من البداية للنهاية.",
  },
  {
    icon: "💐",
    title: "تصوير خطوبة",
    description: "تصوير الخطوبة والاحتفالات واللحظات الخاصة.",
  },
  {
    icon: "👤",
    title: "Portrait",
    description: "جلسات بورتريه فردية وشخصية.",
  },
  {
    icon: "👗",
    title: "Fashion",
    description: "تصوير موديلز وملابس وبراندات وفاشون.",
  },
  {
    icon: "💄",
    title: "Makeup & Beauty",
    description: "تصوير ميك أب أرتيست وBeauty Sessions.",
  },
  {
    icon: "📦",
    title: "تصوير منتجات",
    description: "تصوير احترافي للمنتجات والمتاجر والبراندات.",
  },
  {
    icon: "🎉",
    title: "حفلات ومناسبات",
    description: "تغطية أعياد الميلاد والحفلات والفعاليات.",
  },
  {
    icon: "🏢",
    title: "مؤتمرات وفعاليات",
    description: "تغطية الشركات والمؤتمرات والفعاليات.",
  },
  {
    icon: "🎥",
    title: "تصوير فيديو",
    description: "تصوير فيديو بجميع مستويات الجودة.",
  },
  {
    icon: "🚁",
    title: "تصوير Drone",
    description: "تصوير جوي للمناسبات والأماكن والمشروعات.",
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
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [city, setCity] = useState("كل المحافظات");

  const categories = useMemo(() => {
    if (selectedCategory === "الكل") {
      return photographyCategories;
    }

    return photographyCategories.filter(
      (item) => item.title === selectedCategory
    );
  }, [selectedCategory]);

  function selectCategory(title: string) {
    setSelectedCategory(title);
  }

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
            اختار نوع التصوير والمحافظة المناسبة لك،
            واستكشف الخدمات المتاحة على Tyson Media.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                نوع التصوير
              </label>

              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value)
                }
                className="w-full rounded-xl border bg-white p-3 outline-none focus:border-[#b87333]"
              >
                <option value="الكل">
                  كل أنواع التصوير
                </option>

                {photographyCategories.map((item) => (
                  <option
                    key={item.title}
                    value={item.title}
                  >
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Governorates */}
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
          </div>

          {/* Active Filters */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#eee6dc] px-4 py-2 text-sm font-bold">
              📸 {selectedCategory}
            </span>

            <span className="rounded-full bg-[#eee6dc] px-4 py-2 text-sm font-bold">
              📍 {city}
            </span>

            {(selectedCategory !== "الكل" ||
              city !== "كل المحافظات") && (
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

      {/* Photography Categories */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-7">
          <p className="text-sm font-bold text-[#b87333]">
            PHOTOGRAPHY
          </p>

          <h2 className="mt-2 text-3xl font-black">
            اختار نوع التصوير
          </h2>

          <p className="mt-2 text-sm text-[#746f68]">
            اضغط على أي نوع لعرضه فقط.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((item) => (
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
                اكتشف الخدمات ←
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Video Quality */}
      {(selectedCategory === "الكل" ||
        selectedCategory === "تصوير فيديو") && (
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <div className="rounded-3xl bg-[#eee6dc] p-7">
            <p className="text-sm font-bold text-[#b87333]">
              VIDEO PRODUCTION
            </p>

            <h2 className="mt-2 text-3xl font-black">
              تصوير فيديو بجميع الـ Quality 🎥
            </h2>

            <p className="mt-3 text-[#746f68]">
              اختار جودة التصوير المناسبة لمشروعك أو مناسبتك.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {videoQualities.map((quality) => (
                <Link
                  key={quality}
                  href={`/bookings?service=video&quality=${encodeURIComponent(
                    quality
                  )}`}
                  className="rounded-xl border bg-white p-4 text-center font-black transition hover:-translate-y-1 hover:border-[#b87333] hover:bg-[#fff8f1] hover:shadow-md"
                >
                  {quality}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Drone */}
      {(selectedCategory === "الكل" ||
        selectedCategory === "تصوير Drone") && (
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <div className="rounded-3xl bg-[#211f1c] p-7 text-white md:p-9">
            <div className="text-5xl">
              🚁
            </div>

            <h2 className="mt-4 text-3xl font-black">
              تصوير Drone
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-white/70">
              تصوير جوي للمناسبات، الأفراح، الفنادق،
              العقارات، الأماكن السياحية والمشروعات.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/bookings?service=drone"
                className="rounded-xl bg-[#b87333] px-6 py-3 text-center font-black text-white transition hover:bg-[#d08b4d]"
              >
                احجز خدمة Drone 🚁
              </Link>

              <button
                type="button"
                onClick={() =>
                  setSelectedCategory("تصوير Drone")
                }
                className="rounded-xl border border-white/15 bg-white/10 px-6 py-3 font-black text-white transition hover:bg-white/15"
              >
                عرض خدمات الـ Drone
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Selected Location */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-3xl border bg-white p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold text-[#b87333]">
                LOCATION
              </p>

              <h2 className="mt-2 text-2xl font-black">
                خدمات التصوير في {city}
              </h2>

              <p className="mt-2 text-sm text-[#746f68]">
                سيتم استخدام المحافظة المختارة لتحديد
                مقدمي الخدمة المناسبين.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="rounded-xl bg-[#211f1c] px-6 py-3 text-center font-black text-white"
            >
              حجوزاتي
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border bg-white p-7 text-center">
          <div className="text-5xl">
            📸
          </div>

          <h2 className="mt-4 text-2xl font-black">
            جاهز تحجز؟
          </h2>

          <p className="mt-2 text-[#746f68]">
            اختار نوع التصوير والمحافظة ثم احجز الخدمة
            المناسبة لك.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/bookings"
              className="rounded-xl bg-[#b87333] px-6 py-3 font-black text-white"
            >
              احجز الآن
            </Link>

            <Link
              href="/"
              className="rounded-xl bg-[#211f1c] px-6 py-3 font-black text-white"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

ده يتنسخ كله في:

"app/photography/page.tsx"

والتعديل فيه:

- ✅ جميع محافظات مصر الـ27.
- ✅ اختيار المحافظة شغال.
- ✅ اختيار نوع التصوير شغال.
- ✅ زر مسح الفلاتر.
- ✅ أزرار الـ Quality أصبحت قابلة للضغط.
- ✅ زر Drone أصبح يفتح الحجز مع "service=drone".
- ✅ مفيش "id="drone"" ولا إضافة Category في Supabase مطلوبة للجزء ده.