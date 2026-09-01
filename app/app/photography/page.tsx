"use client";

import { useState } from "react";
import Link from "next/link";

type Package = {
  name: string;
  price: string;
  duration: string;
  photos: string;
  features: string[];
  featured?: boolean;
};

type Category = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  packages: Package[];
};

const categories: Category[] = [
  {
    id: "weddings",
    title: "أفراح وزفاف",
    subtitle: "تغطية سينمائية لأهم يوم في حياتك",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85",
    packages: [
      {
        name: "SILVER",
        price: "3,500 ج.م",
        duration: "4 ساعات",
        photos: "150 صورة معدلة",
        features: ["ألبوم 20×30", "20 صفحة", "تسليم الصور بجودة عالية"],
      },
      {
        name: "GOLD",
        price: "6,000 ج.م",
        duration: "يوم كامل",
        photos: "300 صورة معدلة",
        features: [
          "ألبوم 30×40",
          "30 صفحة",
          "Highlights لمدة 3 دقائق",
          "تغطية كاملة",
        ],
        featured: true,
      },
      {
        name: "PREMIUM",
        price: "حسب الطلب",
        duration: "يوم كامل",
        photos: "تغطية مفتوحة",
        features: [
          "Photo + Video",
          "فيديو سينمائي",
          "Highlights",
          "ألبوم فاخر",
        ],
      },
      {
        name: "PLATINUM",
        price: "حسب الطلب",
        duration: "تغطية كاملة",
        photos: "صور + فيديو",
        features: [
          "تغطية متعددة الكاميرات",
          "فيديو سينمائي كامل",
          "ألبوم Premium",
          "Drone حسب المكان",
        ],
      },
    ],
  },

  {
    id: "engagement",
    title: "خطوبة",
    subtitle: "تفاصيل صغيرة تستحق أن تعيش للأبد",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=85",
    packages: [
      {
        name: "SILVER",
        price: "1,500 ج.م",
        duration: "ساعتين",
        photos: "50 صورة معدلة",
        features: ["كل الصور Soft Copy"],
      },
      {
        name: "GOLD",
        price: "2,500 ج.م",
        duration: "4 ساعات",
        photos: "120 صورة معدلة",
        features: ["تغطية كاملة", "تعديل احترافي", "Soft Copy"],
        featured: true,
      },
      {
        name: "PREMIUM",
        price: "حسب الطلب",
        duration: "حسب المناسبة",
        photos: "صور + فيديو",
        features: ["تصوير سينمائي", "Highlights", "تغطية كاملة"],
      },
      {
        name: "PLATINUM",
        price: "حسب الطلب",
        duration: "حسب المناسبة",
        photos: "تغطية كاملة",
        features: ["Photo + Video", "Drone", "فيديو سينمائي", "Album"],
      },
    ],
  },

  {
    id: "portrait",
    title: "Portrait",
    subtitle: "صورتك بأسلوب سينمائي مختلف",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1800&q=85",
    packages: [
      {
        name: "SILVER",
        price: "600 ج.م",
        duration: "30 دقيقة",
        photos: "10 صور معدلة",
        features: ["Location واحد"],
      },
      {
        name: "GOLD",
        price: "1,000 ج.م",
        duration: "ساعة",
        photos: "20 صورة معدلة",
        features: ["Location واحد", "Outfit Change"],
        featured: true,
      },
      {
        name: "PREMIUM",
        price: "1,600 ج.م",
        duration: "ساعتين",
        photos: "40 صورة معدلة",
        features: ["Locationين", "2 Outfit", "تعديل احترافي"],
      },
      {
        name: "PLATINUM",
        price: "حسب الطلب",
        duration: "حسب الطلب",
        photos: "جلسة كاملة",
        features: ["عدة Locations", "ستايل كامل", "Creative Direction"],
      },
    ],
  },

  {
    id: "fashion",
    title: "Fashion",
    subtitle: "تصوير Editorial بإحساس المجلات",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=85",
    packages: [
      {
        name: "SILVER",
        price: "حسب الطلب",
        duration: "ساعة",
        photos: "15 صورة",
        features: ["Location واحد", "Retouch"],
      },
      {
        name: "GOLD",
        price: "حسب الطلب",
        duration: "ساعتين",
        photos: "30 صورة",
        features: ["2 Outfit", "Retouch احترافي"],
        featured: true,
      },
      {
        name: "PREMIUM",
        price: "حسب الطلب",
        duration: "4 ساعات",
        photos: "50 صورة",
        features: ["Creative Direction", "عدة Looks", "Retouch"],
      },
      {
        name: "PLATINUM",
        price: "حسب الطلب",
        duration: "حسب المشروع",
        photos: "Production كاملة",
        features: ["Concept", "Lighting", "Video", "Production"],
      },
    ],
  },
];

export default function PhotographyPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0a0a0a] text-white"
    >
      {/* NAVBAR */}

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="text-xl font-black tracking-tight">
            TYSON <span className="text-[#c89b63]">MEDIA</span>
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-bold transition hover:bg-white hover:text-black"
          >
            الرئيسية
          </Link>
        </div>
      </header>

      {/* HERO */}

      <section className="relative min-h-[92vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=90')",
          }}
        />

        <div className="absolute inset-0 bg-black/65" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-end px-5 pb-20 md:pb-28">
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-black tracking-[0.45em] text-[#d4ad7b]">
              TYSON MEDIA • PHOTOGRAPHY
            </p>

            <h1 className="text-5xl font-black leading-[1.05] md:text-8xl">
              لحظتك...
              <br />
              <span className="text-[#d4ad7b]">
                بأسلوب سينمائي.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
              اختار نوع التصوير، شوف الباكدجات المتاحة،
              وقارن التفاصيل قبل ما تحجز.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#packages"
                className="rounded-full bg-[#c89b63] px-7 py-4 text-sm font-black text-black transition hover:scale-105"
              >
                استكشف الباكدجات
              </a>

              <a
                href="#categories"
                className="rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-black backdrop-blur transition hover:bg-white hover:text-black"
              >
                أنواع التصوير
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}

      <section
        id="categories"
        className="mx-auto max-w-7xl px-5 py-24"
      >
        <div className="mb-10">
          <p className="text-xs font-black tracking-[0.3em] text-[#c89b63]">
            PHOTOGRAPHY
          </p>

          <h2 className="mt-3 text-4xl font-black md:text-6xl">
            اختار عالمك
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category)}
              className={`group relative h-72 overflow-hidden rounded-[2rem] text-right ${
                activeCategory.id === category.id
                  ? "ring-2 ring-[#c89b63]"
                  : ""
              }`}
            >
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-2xl font-black">
                  {category.title}
                </h3>

                <p className="mt-2 text-xs text-white/60">
                  {category.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* PACKAGES */}

      <section
        id="packages"
        className="mx-auto max-w-7xl px-5 pb-28"
      >
        <div className="mb-12 text-center">
          <p className="text-xs font-black tracking-[0.35em] text-[#c89b63]">
            {activeCategory.title.toUpperCase()}
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-6xl">
            اختار الباكدج
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/50">
            كل باكدج مصمم بمستوى مختلف من التغطية
            والخدمات عشان تختار المناسب ليك.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          {activeCategory.packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`relative flex flex-col rounded-[2rem] border p-7 transition duration-500 hover:-translate-y-2 ${
                pkg.featured
                  ? "border-[#c89b63] bg-[#15120f]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {pkg.featured && (
                <div className="absolute right-5 top-5 rounded-full bg-[#c89b63] px-3 py-1 text-[10px] font-black text-black">
                  MOST POPULAR
                </div>
              )}

              <p className="text-xs font-black tracking-[0.3em] text-[#c89b63]">
                {pkg.name}
              </p>

              <h3 className="mt-5 text-3xl font-black">
                {pkg.name === "SILVER" && "البداية"}
                {pkg.name === "GOLD" && "الاختيار الذهبي"}
                {pkg.name === "PREMIUM" && "تجربة Premium"}
                {pkg.name === "PLATINUM" && "التجربة الكاملة"}
              </h3>

              <div className="mt-7 text-3xl font-black">
                {pkg.price}
              </div>

              <div className="my-7 h-px bg-white/10" />

              <div className="space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-white/40">المدة</span>
                  <strong>{pkg.duration}</strong>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-white/40">الصور</span>
                  <strong>{pkg.photos}</strong>
                </div>
              </div>

              <div className="my-7 h-px bg-white/10" />

              <ul className="flex-1 space-y-3">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm text-white/65"
                  >
                    <span className="text-[#c89b63]">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={`/bookings?category=${activeCategory.id}&package=${encodeURIComponent(
                  pkg.name
                )}`}
                className={`mt-8 block rounded-xl px-5 py-4 text-center text-sm font-black transition ${
                  pkg.featured
                    ? "bg-[#c89b63] text-black hover:bg-white"
                    : "bg-white text-black hover:bg-[#c89b63]"
                }`}
              >
                احجز الباكدج
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="border-t border-white/10 px-5 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black tracking-[0.35em] text-[#c89b63]">
            TYSON MEDIA
          </p>

          <h2 className="mt-5 text-4xl font-black md:text-6xl">
            جاهز نوثق لحظتك؟
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/50">
            اختار الباكدج المناسبة ليك وابدأ طلب الحجز.
          </p>

          <Link
            href={`/bookings?category=${activeCategory.id}`}
            className="mt-8 inline-block rounded-full bg-[#c89b63] px-9 py-4 font-black text-black transition hover:scale-105"
          >
            ابدأ الحجز
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Tyson Media. All rights reserved.
      </footer>
    </main>
  );
}