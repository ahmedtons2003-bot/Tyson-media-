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

export default function PhotographyPage() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [city, setCity] = useState("كل المدن");

  const categories = useMemo(() => {
    if (selectedCategory === "الكل") {
      return photographyCategories;
    }

    return photographyCategories.filter(
      (item) => item.title === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <main dir="rtl" className="min-h-screen bg-[#fbfaf7] text-[#211f1c]">
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
        <div className="overflow-hidden rounded-[2rem] bg-[#211f1c] px-6 py-14 text-center text-white">
          <div className="text-6xl">📸</div>

          <p className="mt-5 text-sm font-bold tracking-wide text-[#d6a66f]">
            TYSON MEDIA
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-6xl">
            كل أنواع التصوير في مكان واحد
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
            اختار نوع التصوير المناسب لك، قارن الخدمات والأسعار،
            واختار مقدم الخدمة المناسب.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border bg-white p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold">
                نوع التصوير
              </label>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border bg-white p-3 outline-none focus:border-[#b87333]"
              >
                <option>الكل</option>

                {photographyCategories.map((item) => (
                  <option key={item.title}>{item.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                المدينة
              </label>

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border bg-white p-3 outline-none focus:border-[#b87333]"
              >
                <option>كل المدن</option>
                <option>الإسكندرية</option>
                <option>القاهرة</option>
                <option>الجيزة</option>
                <option>البحيرة</option>
                <option>الساحل</option>
                <option>الغردقة</option>
                <option>مطروح</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-7">
          <p className="text-sm font-bold text-[#b87333]">
            Photography
          </p>

          <h2 className="mt-2 text-3xl font-black">
            اختار نوع التصوير
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((item) => (
            <button
              key={item.title}
              onClick={() => setSelectedCategory(item.title)}
              className="group rounded-2xl border bg-white p-5 text-right transition hover:-translate-y-1 hover:shadow-lg"
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

      {(selectedCategory === "الكل" ||
        selectedCategory === "تصوير فيديو") && (
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <div className="rounded-3xl bg-[#eee6dc] p-7">
            <p className="text-sm font-bold text-[#b87333]">
              Video Production
            </p>

            <h2 className="mt-2 text-3xl font-black">
              تصوير فيديو بجميع الـ Quality 🎥
            </h2>

            <p className="mt-3 text-[#746f68]">
              اختار الجودة المناسبة لمشروعك أو مناسبتك.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {videoQualities.map((quality) => (
                <div
                  key={quality}
                  className="rounded-xl border bg-white p-4 text-center font-black"
                >
                  {quality}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(selectedCategory === "الكل" ||
        selectedCategory === "تصوير Drone") && (
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <div className="rounded-3xl bg-[#211f1c] p-7 text-white">
            <div className="text-5xl">🚁</div>

            <h2 className="mt-4 text-3xl font-black">
              تصوير Drone
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-white/70">
              تصوير جوي للمناسبات، الأفراح، الفنادق، العقارات،
              الأماكن السياحية والمشروعات.
            </p>

            <Link
              href="/bookings"
              className="mt-6 inline-block rounded-xl bg-[#b87333] px-6 py-3 font-black text-white"
            >
              احجز خدمة التصوير
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border bg-white p-7 text-center">
          <h2 className="text-2xl font-black">
            جاهز تحجز؟
          </h2>

          <p className="mt-2 text-[#746f68]">
            اختار الخدمة المناسبة وتواصل مع مقدم الخدمة.
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