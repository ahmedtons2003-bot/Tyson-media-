"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type Package = {
name: string;
price: string;
duration: string;
photos: string;
extras: string[];
popular?: boolean;
};

type PhotographyCategory = {
id: string;
icon: string;
title: string;
description: string;
packages: Package[];
};

const photographyCategories: PhotographyCategory[] = [
{
id: "wedding",
icon: "💍",
title: "أفراح وخطوبة",
description: "باكدجات مميزة لتوثيق أجمل لحظاتك.",
packages: [
{
name: "باكدج خطوبة",
price: "1,500 ج.م",
duration: "ساعتين",
photos: "50 صورة معدلة",
extras: ["كل الصور Soft Copy"],
},
{
name: "باكدج فضي",
price: "3,500 ج.م",
duration: "4 ساعات",
photos: "150 صورة معدلة",
extras: ["ألبوم 20×30", "20 صفحة"],
popular: true,
},
{
name: "باكدج ذهبي",
price: "6,000 ج.م",
duration: "يوم كامل",
photos: "300 صورة معدلة",
extras: [
"ألبوم 30×40",
"30 صفحة",
"فيديو Highlights لمدة 3 دقائق",
],
},
],
},

{
id: "portrait",
icon: "👤",
title: "جلسات تصوير شخصية",
description: "جلسات احترافية للصور الشخصية والبورتريه.",
packages: [
{
name: "Mini Session",
price: "600 ج.م",
duration: "نصف ساعة",
photos: "10 صور معدلة",
extras: ["مكان واحد"],
},
{
name: "Standard Session",
price: "1,000 ج.م",
duration: "ساعة",
photos: "20 صورة معدلة",
extras: ["مكان واحد", "تغيير Outfit واحد"],
popular: true,
},
{
name: "Premium Session",
price: "1,600 ج.م",
duration: "ساعتين",
photos: "40 صورة معدلة",
extras: ["مكانين", "تغييرين Outfit"],
},
],
},

{
id: "events",
icon: "🎉",
title: "تصوير مناسبات",
description: "تصوير أعياد الميلاد والحفلات والمناسبات الخاصة.",
packages: [
{
name: "Basic",
price: "يحدد مع مقدم الخدمة",
duration: "حسب المناسبة",
photos: "حسب الباكدج",
extras: ["تصوير المناسبة"],
},
{
name: "Standard",
price: "يحدد مع مقدم الخدمة",
duration: "حسب المناسبة",
photos: "صور معدلة",
extras: ["تصوير المناسبة", "تعديل الصور"],
popular: true,
},
{
name: "Premium",
price: "يحدد مع مقدم الخدمة",
duration: "حسب المناسبة",
photos: "تصوير كامل",
extras: ["تصوير", "فيديو", "مونتاج"],
},
],
},

{
id: "video",
icon: "🎥",
title: "تصوير فيديو",
description: "تصوير ومونتاج فيديو للمناسبات والأفراح.",
packages: [
{
name: "Basic Video",
price: "يحدد مع مقدم الخدمة",
duration: "حسب الطلب",
photos: "فيديو فقط",
extras: ["تصوير فيديو"],
},
{
name: "Highlights",
price: "يحدد مع مقدم الخدمة",
duration: "حسب المناسبة",
photos: "فيديو Highlights",
extras: ["تصوير", "مونتاج"],
popular: true,
},
{
name: "Premium Video",
price: "يحدد مع مقدم الخدمة",
duration: "يوم كامل",
photos: "تغطية كاملة",
extras: ["تصوير كامل", "مونتاج احترافي", "Highlights"],
},
],
},

{
id: "commercial",
icon: "🏢",
title: "تصوير تجاري",
description: "تصوير المنتجات والشركات والمطاعم والمشاريع.",
packages: [
{
name: "Starter",
price: "يحدد مع مقدم الخدمة",
duration: "حسب المشروع",
photos: "حسب الطلب",
extras: ["تصوير أساسي"],
},
{
name: "Business",
price: "يحدد مع مقدم الخدمة",
duration: "حسب المشروع",
photos: "صور احترافية",
extras: ["تصوير", "تعديل احترافي"],
popular: true,
},
{
name: "Premium",
price: "يحدد مع مقدم الخدمة",
duration: "حسب المشروع",
photos: "باكدج كاملة",
extras: ["تصوير", "فيديو", "مونتاج"],
},
],
},
];

export default function PhotographyPage() {
const [selectedCategory, setSelectedCategory] =
useState<PhotographyCategory>(photographyCategories[0]);

return (
<main
dir="rtl"
className="min-h-screen bg-[#f7f5f2] text-[#211f1c]"
>
<Header />

  {/* Hero */}
  <section className="mx-auto max-w-7xl px-4 pt-6">
    <div className="relative overflow-hidden rounded-[2.5rem] bg-[#211f1c] px-6 py-16 text-white md:px-12 md:py-24">
      <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#b87333]/20 blur-3xl" />

      <div className="relative max-w-3xl">
        <div className="text-6xl">📸</div>

        <p className="mt-6 text-xs font-black tracking-[0.3em] text-[#d6a66f]">
          PHOTOGRAPHY
        </p>

        <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
          اختار نوع التصوير
          <br />

          <span className="text-[#d6a66f]">
            واختار الباكدج المناسب ليك.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-8 text-white/60">
          باكدجات مختلفة تناسب الأفراح والخطوبة
          والجلسات الشخصية والمناسبات والتصوير
          التجاري.
        </p>
      </div>
    </div>
  </section>

  {/* Categories */}
  <section className="mx-auto max-w-7xl px-4 py-14">
    <div className="mb-7">
      <p className="text-xs font-black tracking-[0.25em] text-[#b87333]">
        PHOTOGRAPHY SERVICES
      </p>

      <h2 className="mt-2 text-3xl font-black">
        اختار نوع التصوير
      </h2>
    </div>

    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {photographyCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category)}
          className={`rounded-3xl border p-4 text-right transition ${
            selectedCategory.id === category.id
              ? "border-[#b87333] bg-[#fff8f1] shadow-lg"
              : "bg-white hover:-translate-y-1 hover:border-[#b87333]"
          }`}
        >
          <div className="flex h-24 items-center justify-center rounded-2xl bg-[#eee6dc] text-5xl">
            {category.icon}
          </div>

          <h3 className="mt-4 text-sm font-black">
            {category.title}
          </h3>

          <p className="mt-2 text-xs text-[#746f68]">
            {category.description}
          </p>
        </button>
      ))}
    </div>
  </section>

  {/* Selected Category */}
  <section className="mx-auto max-w-7xl px-4 pb-14">
    <div className="mb-8 text-center">
      <div className="text-5xl">
        {selectedCategory.icon}
      </div>

      <h2 className="mt-4 text-3xl font-black">
        {selectedCategory.title}
      </h2>

      <p className="mt-3 text-sm text-[#746f68]">
        {selectedCategory.description}
      </p>
    </div>

    {/* Packages */}
    <div className="grid gap-5 md:grid-cols-3">
      {selectedCategory.packages.map((pkg) => (
        <article
          key={pkg.name}
          className={`relative overflow-hidden rounded-[2rem] border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
            pkg.popular
              ? "border-[#b87333] ring-1 ring-[#b87333]"
              : ""
          }`}
        >
          {pkg.popular && (
            <div className="absolute left-4 top-4 rounded-full bg-[#b87333] px-4 py-2 text-xs font-black text-white">
              الأكثر اختيارًا
            </div>
          )}

          <h3 className="text-2xl font-black">
            {pkg.name}
          </h3>

          <p className="mt-5 text-3xl font-black text-[#b87333]">
            {pkg.price}
          </p>

          <div className="my-6 h-px bg-gray-100" />

          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#746f68]">
                ⏱️ مدة التصوير
              </span>

              <strong>{pkg.duration}</strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#746f68]">
                📸 الصور
              </span>

              <strong>{pkg.photos}</strong>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-black">
              يشمل الباكدج:
            </p>

            <ul className="space-y-3">
              {pkg.extras.map((extra) => (
                <li
                  key={extra}
                  className="flex items-center gap-2 text-sm text-[#746f68]"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eee6dc] text-xs">
                    ✓
                  </span>

                  {extra}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={`/bookings?category=${selectedCategory.id}&package=${encodeURIComponent(
              pkg.name
            )}`}
            className="mt-8 block rounded-2xl bg-[#211f1c] px-5 py-4 text-center text-sm font-black text-white transition hover:bg-[#b87333]"
          >
            احجز الباكدج
          </Link>
        </article>
      ))}
    </div>
  </section>

  {/* Booking Notice */}
  <section className="mx-auto max-w-7xl px-4 pb-16">
    <div className="rounded-[2rem] bg-[#eee6dc] p-7 text-center md:p-10">
      <div className="text-4xl">📅</div>

      <h2 className="mt-4 text-2xl font-black">
        احجز بدري
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#746f68]">
        يفضل إرسال طلب الحجز قبل موعد المناسبة
        بـ30 يومًا على الأقل لضمان توفر الموعد
        والمصور المناسب.
      </p>
    </div>
  </section>

  <Footer />
</main>

);
}