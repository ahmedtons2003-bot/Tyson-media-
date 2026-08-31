"use client";

import Link from "next/link";

const categories = [
{
title: "التصوير",
subtitle: "أفراح • خطوبة • جلسات",
icon: "📸",
href: "/photography",
},
{
title: "Handmade",
subtitle: "شنط • خواتم • إكسسوارات",
icon: "🧶",
href: "/handmade",
},
{
title: "السيارات",
subtitle: "زينة • ديكور • تجهيز",
icon: "🚗",
href: "/cars",
},
{
title: "الفساتين",
subtitle: "فساتين أفراح ومناسبات",
icon: "👗",
href: "/dresses",
},
{
title: "البدل",
subtitle: "بدل رجالي • إكسسوارات",
icon: "🤵",
href: "/suits",
},
{
title: "المكياج والجمال",
subtitle: "ميكاب • شعر • كوافير",
icon: "💄",
href: "/beauty",
},
{
title: "القاعات والمناسبات",
subtitle: "قاعات • أماكن مناسبات",
icon: "🏛️",
href: "/venues",
},
{
title: "الديكور والدعوات",
subtitle: "ديكور • دعوات • توزيعات",
icon: "🎀",
href: "/decor",
},
];

const features = [
{
icon: "🔎",
title: "اختار اللي يناسبك",
text: "قارن بين الخدمات والمنتجات والأسعار بسهولة.",
},
{
icon: "⭐",
title: "تقييمات حقيقية",
text: "شوف تقييمات العملاء قبل ما تختار.",
},
{
icon: "📍",
title: "حسب محافظتك",
text: "اكتشف مقدمي الخدمات والبائعين القريبين منك.",
},
{
icon: "🛒",
title: "شراء وحجز",
text: "اشتري المنتجات واحجز الخدمات من مكان واحد.",
},
];

export default function HomePage() {
return (
<main
dir="rtl"
className="min-h-screen bg-[#f7f7f7] text-[#211f1c]"
>
{/* Header */}
<header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
<div className="mx-auto max-w-7xl px-4">
<div className="flex h-16 items-center justify-between gap-4">
<Link
href="/"
className="shrink-0 text-2xl font-black tracking-tight"
>
Tyson{" "}
<span className="text-[#b87333]">
Media
</span>
</Link>

        <div className="hidden flex-1 md:block md:max-w-xl">
          <div className="relative">
            <input
              placeholder="ابحث عن خدمة، منتج، مصور، قاعة..."
              className="w-full rounded-2xl border bg-[#f6f5f3] px-5 py-3 pr-12 text-sm font-bold outline-none transition focus:border-[#b87333]"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg">
              🔎
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="rounded-xl border px-3 py-2 text-sm font-black"
          >
            🛒
          </Link>

          <Link
            href="/login"
            className="rounded-xl bg-[#211f1c] px-4 py-2.5 text-sm font-black text-white"
          >
            دخول
          </Link>
        </div>
      </div>

      <div className="pb-3 md:hidden">
        <div className="relative">
          <input
            placeholder="ابحث عن خدمة أو منتج..."
            className="w-full rounded-xl border bg-[#f6f5f3] p-3 pr-11 text-sm font-bold outline-none focus:border-[#b87333]"
          />

          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            🔎
          </span>
        </div>
      </div>
    </div>
  </header>

  {/* Hero */}
  <section className="mx-auto max-w-7xl px-4 py-5 md:py-8">
    <div className="relative overflow-hidden rounded-[2rem] bg-[#211f1c] px-6 py-12 text-white md:px-12 md:py-20">
      <div className="relative z-10 max-w-3xl">
        <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black tracking-wide text-[#e2b783]">
          TYSON MEDIA • EVENTS MARKETPLACE
        </span>

        <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
          كل احتياجات مناسبتك
          <br />
          <span className="text-[#d6a66f]">
            في مكان واحد
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-lg">
          احجز خدماتك، اكتشف المنتجات،
          وقارن بين مقدمي الخدمات والبائعين
          بسهولة من خلال Tyson Media.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#categories"
            className="rounded-xl bg-[#b87333] px-7 py-4 text-center font-black text-white transition hover:bg-[#9d612c]"
          >
            اكتشف الأقسام
          </Link>

          <Link
            href="/register"
            className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-center font-black text-white transition hover:bg-white/10"
          >
            ابدأ الآن
          </Link>
        </div>
      </div>

      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#b87333]/15 blur-3xl" />
      <div className="absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
    </div>
  </section>

  {/* Categories */}
  <section
    id="categories"
    className="mx-auto max-w-7xl px-4 py-8"
  >
    <div className="mb-6">
      <p className="text-sm font-black text-[#b87333]">
        EXPLORE
      </p>

      <h2 className="mt-1 text-3xl font-black">
        اكتشف أقسام المنصة
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        كل قسم مستقل بتخصصاته ومنتجاته وخدماته.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.title}
          href={category.href}
          className="group rounded-3xl border bg-white p-5 transition duration-200 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1ebe5] text-3xl transition group-hover:scale-105">
            {category.icon}
          </div>

          <h3 className="mt-5 text-lg font-black">
            {category.title}
          </h3>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            {category.subtitle}
          </p>

          <div className="mt-5 text-sm font-black text-[#b87333]">
            استكشف القسم ←
          </div>
        </Link>
      ))}
    </div>
  </section>

  {/* Handmade Highlight */}
  <section className="mx-auto max-w-7xl px-4 py-6">
    <div className="grid overflow-hidden rounded-[2rem] bg-[#eee6dc] md:grid-cols-2">
      <div className="flex min-h-[300px] items-center justify-center bg-[#e4d8ca] text-9xl">
        🧶
      </div>

      <div className="p-8 md:p-12">
        <p className="text-sm font-black text-[#b87333]">
          TYSON MARKET
        </p>

        <h2 className="mt-3 text-3xl font-black md:text-4xl">
          Handmade
          <br />
          له عالمه الخاص
        </h2>

        <p className="mt-4 leading-7 text-gray-600">
          شنط، خواتم، انسيالات، سلاسل،
          إكسسوارات، كروشيه، تطريز،
          هدايا وديكورات من بائعين مختلفين.
        </p>

        <Link
          href="/handmade"
          className="mt-7 inline-block rounded-xl bg-[#211f1c] px-7 py-4 font-black text-white"
        >
          دخول متجر Handmade
        </Link>
      </div>
    </div>
  </section>

  {/* Features */}
  <section className="mx-auto max-w-7xl px-4 py-10">
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="rounded-2xl border bg-white p-5"
        >
          <div className="text-3xl">
            {feature.icon}
          </div>

          <h3 className="mt-4 font-black">
            {feature.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {feature.text}
          </p>
        </div>
      ))}
    </div>
  </section>

  {/* Providers */}
  <section className="mx-auto max-w-7xl px-4 py-6">
    <div className="rounded-[2rem] bg-[#211f1c] p-8 text-white md:p-12">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-black text-[#d6a66f]">
            FOR PROVIDERS & SELLERS
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            عندك خدمة أو منتج؟
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-white/60">
            اعرض خدماتك ومنتجاتك على Tyson Media
            ووصل لعملاء جدد من مختلف محافظات مصر.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
          <Link
            href="/register"
            className="rounded-xl bg-[#b87333] px-7 py-4 text-center font-black"
          >
            إنشاء حساب
          </Link>

          <Link
            href="/provider-dashboard"
            className="rounded-xl border border-white/10 px-7 py-4 text-center font-black"
          >
            لوحة مقدم الخدمة
          </Link>
        </div>
      </div>
    </div>
  </section>

  {/* Footer */}
  <footer className="mt-12 border-t bg-white">
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xl font-black">
            Tyson{" "}
            <span className="text-[#b87333]">
              Media
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            منصتك لاكتشاف وحجز خدمات ومنتجات المناسبات.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-600">
          <Link href="/photography">
            التصوير
          </Link>

          <Link href="/handmade">
            Handmade
          </Link>

          <Link href="/cars">
            السيارات
          </Link>

          <Link href="/dashboard">
            حسابي
          </Link>
        </div>
      </div>

      <div className="mt-7 border-t pt-5 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Tyson Media
      </div>
    </div>
  </footer>
</main>

);
}