"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const categories = [
  {
    title: "التصوير",
    subtitle: "أفراح، خطوبة، جلسات ومناسبات",
    icon: "📸",
    href: "/photography",
    label: "خدمات",
  },
  {
    title: "Handmade",
    subtitle: "منتجات يدوية وهدايا مميزة",
    icon: "🧶",
    href: "/handmade",
    label: "متجر",
  },
  {
    title: "السيارات",
    subtitle: "زينة وديكور وتجهيز سيارات",
    icon: "🚗",
    href: "/cars",
    label: "خدمات",
  },
  {
    title: "الفساتين",
    subtitle: "فساتين أفراح ومناسبات",
    icon: "👗",
    href: "/dresses",
    label: "متجر",
  },
  {
    title: "البدل",
    subtitle: "بدل رجالي وإكسسوارات",
    icon: "🤵",
    href: "/suits",
    label: "متجر",
  },
  {
    title: "الجمال",
    subtitle: "ميكاب، شعر وكوافير",
    icon: "💄",
    href: "/beauty",
    label: "حجز",
  },
  {
    title: "القاعات",
    subtitle: "قاعات أفراح ومناسبات",
    icon: "🏛️",
    href: "/venues",
    label: "حجز",
  },
  {
    title: "الديكور",
    subtitle: "ديكور، دعوات وتوزيعات",
    icon: "🎀",
    href: "/decor",
    label: "خدمات",
  },
];

const popularServices = [
  {
    icon: "📸",
    title: "تصوير حفلات الزفاف",
    description:
      "تغطية كاملة للحفل مع صور احترافية وفيديوهات.",
    price: "يبدأ من 1,500 ج.م",
    href: "/photography",
  },
  {
    icon: "💄",
    title: "ميكاب للعروسة",
    description:
      "خدمات ميكاب احترافية للأفراح والمناسبات.",
    price: "يبدأ من 800 ج.م",
    href: "/beauty",
  },
  {
    icon: "🚗",
    title: "تجهيز سيارة الزفاف",
    description:
      "زينة وورد وديكور وتجهيز كامل للسيارة.",
    price: "يبدأ من 600 ج.م",
    href: "/cars",
  },
];

const popularProducts = [
  {
    icon: "👜",
    title: "شنط Handmade",
    description: "شنط مصنوعة يدويًا بتصميمات مختلفة.",
    price: "يبدأ من 450 ج.م",
    href: "/handmade",
  },
  {
    icon: "💍",
    title: "إكسسوارات وهدايا",
    description: "خواتم، انسيالات وسلاسل وهدايا.",
    price: "يبدأ من 150 ج.م",
    href: "/handmade",
  },
  {
    icon: "👗",
    title: "فساتين مناسبات",
    description: "فساتين متنوعة للأفراح والمناسبات.",
    price: "أسعار مختلفة",
    href: "/dresses",
  },
];

const steps = [
  {
    number: "01",
    title: "اختار القسم",
    text: "حدد الخدمة أو المنتج اللي بتدور عليه.",
  },
  {
    number: "02",
    title: "قارن واختار",
    text: "شوف الأسعار والتقييمات ومقدمي الخدمات.",
  },
  {
    number: "03",
    title: "احجز أو اشتري",
    text: "احجز خدمتك أو اطلب المنتج بسهولة.",
  },
];

export default function HomePage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f6f3] text-[#211f1c]"
    >
      <Header />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 pt-5 md:pt-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#211f1c] px-6 py-14 text-white md:px-12 md:py-20 lg:px-16">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-[#e1b37d]">
              <span className="h-2 w-2 rounded-full bg-[#b87333]" />
              TYSON MEDIA
              <span className="text-white/40">
                •
              </span>
              EVENTS MARKETPLACE
            </div>

            <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight md:text-6xl lg:text-7xl">
              كل تفاصيل مناسبتك
              <br />
              <span className="text-[#d6a66f]">
                في مكان واحد.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/65 md:text-lg">
              اكتشف الخدمات والمنتجات، قارن الأسعار،
              شوف التقييمات واحجز كل احتياجات مناسبتك
              من خلال Tyson Media.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#categories"
                className="rounded-xl bg-[#b87333] px-7 py-4 text-center text-sm font-black text-white transition hover:bg-[#9d612c]"
              >
                اكتشف الأقسام
              </Link>

              <Link
                href="/register"
                className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-center text-sm font-black text-white transition hover:bg-white/10"
              >
                انضم للمنصة
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#b87333]/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 right-1/3 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

          <div className="absolute bottom-6 left-6 hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md md:block">
            <p className="text-xs text-white/50">
              EVERYTHING FOR YOUR EVENT
            </p>

            <p className="mt-1 text-sm font-black">
              خدمات • منتجات • حجز
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="relative z-20 mx-auto -mt-6 max-w-5xl px-4">
        <div className="rounded-2xl border bg-white p-3 shadow-xl">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 items-center rounded-xl bg-[#f6f4f1] px-4">
              <span className="text-xl">
                🔎
              </span>

              <input
                type="text"
                placeholder="بتدور على إيه؟ مصور، فستان، قاعة، ديكور..."
                className="w-full bg-transparent px-3 py-4 text-sm font-bold outline-none"
              />
            </div>

            <Link
              href="#categories"
              className="rounded-xl bg-[#211f1c] px-8 py-4 text-center text-sm font-black text-white transition hover:bg-[#b87333]"
            >
              بحث
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 py-16"
      >
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black tracking-widest text-[#b87333]">
              EXPLORE
            </p>

            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              اكتشف أقسام Tyson Media
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#746f68]">
              من أول التصوير والقاعة لحد الفستان والديكور
              والهدايا، كل احتياجات مناسبتك في مكان واحد.
            </p>
          </div>

          <span className="text-sm font-bold text-[#8c857d]">
            8 أقسام رئيسية
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1ebe5] text-3xl transition duration-300 group-hover:scale-110">
                  {category.icon}
                </div>

                <span className="rounded-full bg-[#f6f2ed] px-3 py-1 text-[10px] font-black text-[#8b8177]">
                  {category.label}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-black">
                {category.title}
              </h3>

              <p className="mt-2 min-h-10 text-xs leading-5 text-[#817a73]">
                {category.subtitle}
              </p>

              <div className="mt-5 text-sm font-black text-[#b87333]">
                استكشف القسم ←
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="rounded-[2rem] bg-[#eee7df] p-6 md:p-10">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black tracking-widest text-[#b87333]">
                FEATURED SERVICES
              </p>

              <h2 className="mt-2 text-3xl font-black">
                خدمات عليها إقبال
              </h2>

              <p className="mt-2 text-sm text-[#746f68]">
                اختيارات مناسبة لأهم تفاصيل مناسبتك.
              </p>
            </div>

            <Link
              href="/photography"
              className="text-sm font-black text-[#211f1c]"
            >
              عرض المزيد ←
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {popularServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group overflow-hidden rounded-3xl border border-black/5 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-40 items-center justify-center bg-[#e5dbcf] text-7xl transition group-hover:scale-[1.02]">
                  {service.icon}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-black">
                      {service.title}
                    </h3>

                    <span className="text-[#b87333]">
                      ★
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-[#746f68]">
                    {service.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm font-black">
                      {service.price}
                    </span>

                    <span className="text-sm font-black text-[#b87333]">
                      عرض ←
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black tracking-widest text-[#b87333]">
              TYSON MARKET
            </p>

            <h2 className="mt-2 text-3xl font-black">
              منتجات مميزة
            </h2>

            <p className="mt-2 text-sm text-[#746f68]">
              منتجات وهدايا تناسب كل مناسبة.
            </p>
          </div>

          <Link
            href="/handmade"
            className="text-sm font-black text-[#211f1c]"
          >
            دخول المتجر ←
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {popularProducts.map((product) => (
            <Link
              key={product.title}
              href={product.href}
              className="group overflow-hidden rounded-3xl border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-48 items-center justify-center bg-[#f0e9e1] text-8xl">
                {product.icon}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-black">
                  {product.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#746f68]">
                  {product.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="font-black text-[#b87333]">
                    {product.price}
                  </span>

                  <span className="rounded-xl bg-[#211f1c] px-4 py-2 text-xs font-black text-white transition group-hover:bg-[#b87333]">
                    استكشف
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-[2rem] bg-[#211f1c] p-8 text-white md:p-12">
          <div className="text-center">
            <p className="text-xs font-black tracking-widest text-[#d6a66f]">
              HOW IT WORKS
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              الموضوع أسهل مما تتخيل
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/55">
              دور، قارن، اختار واحجز من مكان واحد.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <span className="text-4xl font-black text-[#b87333]">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-black">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/55">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROVIDER CTA */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="overflow-hidden rounded-[2rem] border bg-white">
          <div className="grid md:grid-cols-2">
            <div className="flex min-h-[330px] items-center justify-center bg-[#e7ddd2] text-[9rem]">
              💼
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="text-xs font-black tracking-widest text-[#b87333]">
                SELL & GROW WITH US
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                عندك خدمة أو منتج؟
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-8 text-[#746f68]">
                اعرض خدماتك ومنتجاتك على Tyson Media،
                وصل لعملاء جدد، وابني حضورك على أكبر
                منصة متخصصة في احتياجات المناسبات.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="rounded-xl bg-[#211f1c] px-7 py-4 text-center text-sm font-black text-white transition hover:bg-[#b87333]"
                >
                  إنشاء حساب
                </Link>

                <Link
                  href="/provider-dashboard"
                  className="rounded-xl border px-7 py-4 text-center text-sm font-black transition hover:bg-[#f5f1ec]"
                >
                  لوحة مقدم الخدمة
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <div className="rounded-2xl border bg-white p-6">
            <div className="text-3xl">
              🔎
            </div>

            <h3 className="mt-4 font-black">
              اختيارات كثيرة
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#746f68]">
              خدمات ومنتجات من تخصصات مختلفة.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <div className="text-3xl">
              ⭐
            </div>

            <h3 className="mt-4 font-black">
              تقييمات العملاء
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#746f68]">
              شوف آراء العملاء قبل ما تختار.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <div className="text-3xl">
              📍
            </div>

            <h3 className="mt-4 font-black">
              في محافظتك
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#746f68]">
              اكتشف مقدمي الخدمات بالقرب منك.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <div className="text-3xl">
              🛒
            </div>

            <h3 className="mt-4 font-black">
              شراء وحجز
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#746f68]">
              منتجات وخدمات من مكان واحد.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}