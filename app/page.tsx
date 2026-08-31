"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const categories = [
  {
    href: "/photography",
    icon: "📸",
    title: "التصوير",
    description: "أفراح • خطوبة • مناسبات • فيديو",
  },
  {
    href: "/venues",
    icon: "🏛️",
    title: "قاعات الأفراح",
    description: "اختار القاعة المناسبة لمناسبتك",
  },
  {
    href: "/dresses",
    icon: "👗",
    title: "فساتين",
    description: "زفاف • خطوبة • سواريه • تفصيل",
  },
  {
    href: "/suits",
    icon: "🤵",
    title: "بدلات رجالي",
    description: "زفاف • خطوبة • إيجار • تفصيل",
  },
  {
    href: "/beauty",
    icon: "💄",
    title: "بيوتي",
    description: "ميكب • شعر • عناية وجمال",
  },
  {
    href: "/cars",
    icon: "🚘",
    title: "سيارات",
    description: "زفاف • ليموزين • سيارات فاخرة",
  },
  {
    href: "/handmade",
    icon: "🧵",
    title: "هاند ميد",
    description: "هدايا • إكسسوارات • منتجات يدوية",
  },
  {
    href: "/providers",
    icon: "⭐",
    title: "مقدمو الخدمات",
    description: "اكتشف أفضل مقدمي الخدمات",
  },
];

const features = [
  {
    icon: "🔎",
    title: "اختار الخدمة",
    text: "ابحث عن كل ما تحتاجه لمناسبتك في مكان واحد.",
  },
  {
    icon: "⚖️",
    title: "قارن بسهولة",
    text: "شوف الأسعار والخدمات والتقييمات قبل ما تختار.",
  },
  {
    icon: "📅",
    title: "احجز أونلاين",
    text: "ابعت طلب الحجز وتابع حالته من المنصة.",
  },
];

export default function HomePage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f5f2] text-[#211f1c]"
    >
      <Header />

      {/* HERO */}

      <section className="mx-auto max-w-7xl px-4 pt-5">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#211f1c] px-6 py-16 text-white md:px-12 md:py-24">
          {/* Decorative circles */}

          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#b87333]/20 blur-3xl" />

          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#b87333]/10 blur-3xl" />

          <div className="absolute right-1/2 top-10 hidden h-40 w-40 translate-x-1/2 rounded-full border border-[#b87333]/20 md:block" />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-5xl backdrop-blur">
              💍
            </div>

            <p className="mt-7 text-xs font-black tracking-[0.3em] text-[#d6a66f]">
              TYSON MEDIA
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight md:text-7xl">
              كل تفاصيل مناسبتك
              <br />
              <span className="text-[#d6a66f]">
                في مكان واحد.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-white/65 md:text-base">
              منصة مصرية تجمع لك خدمات الأفراح
              والمناسبات من تصوير وقاعات وفساتين
              وبدلات وبيوتي وسيارات وهاند ميد.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="#categories"
                className="rounded-2xl bg-[#b87333] px-7 py-4 text-sm font-black text-white transition hover:scale-[1.02] hover:bg-[#c7864b]"
              >
                اكتشف الخدمات
              </Link>

              <Link
                href="/register"
                className="rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-sm font-black backdrop-blur transition hover:bg-white/15"
              >
                انضم كمقدم خدمة
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}

      <section className="mx-auto max-w-5xl px-4">
        <div className="-mt-6 relative z-10 grid grid-cols-2 overflow-hidden rounded-3xl border bg-white shadow-xl md:grid-cols-4">
          <div className="border-b p-5 text-center md:border-b-0 md:border-l">
            <p className="text-2xl font-black">7+</p>
            <p className="mt-1 text-xs text-gray-500">
              أقسام رئيسية
            </p>
          </div>

          <div className="border-b p-5 text-center md:border-b-0 md:border-l">
            <p className="text-2xl font-black">100%</p>
            <p className="mt-1 text-xs text-gray-500">
              أونلاين
            </p>
          </div>

          <div className="p-5 text-center md:border-l">
            <p className="text-2xl font-black">
              🇪🇬
            </p>
            <p className="mt-1 text-xs text-gray-500">
              داخل مصر
            </p>
          </div>

          <div className="p-5 text-center">
            <p className="text-2xl font-black">24/7</p>
            <p className="mt-1 text-xs text-gray-500">
              تصفح وحجز
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}

      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 py-20"
      >
        <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black tracking-[0.25em] text-[#b87333]">
              EXPLORE SERVICES
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              اختار اللي محتاجه
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#746f68]">
              كل قسم معمول مخصوص علشان تلاقي
              الخدمة المناسبة لمناسبتك بسرعة.
            </p>
          </div>

          <span className="w-fit rounded-full bg-[#eee6dc] px-4 py-2 text-xs font-black">
            كل خدمات المناسبات
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group rounded-3xl border bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-[#b87333]/40 hover:shadow-xl"
            >
              <div className="flex h-32 items-center justify-center rounded-2xl bg-[#eee6dc] text-6xl transition duration-300 group-hover:scale-[1.02]">
                {category.icon}
              </div>

              <div className="px-1 pb-1 pt-5">
                <h3 className="text-lg font-black">
                  {category.title}
                </h3>

                <p className="mt-2 text-xs leading-6 text-[#746f68]">
                  {category.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-black text-[#b87333]">
                    اكتشف القسم
                  </span>

                  <span className="text-lg transition group-hover:-translate-x-1">
                    ←
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="rounded-[2rem] bg-[#eee6dc] p-7 md:p-12">
          <div className="text-center">
            <p className="text-xs font-black tracking-[0.25em] text-[#b87333]">
              HOW IT WORKS
            </p>

            <h2 className="mt-3 text-3xl font-black">
              الحجز أسهل مما تتخيل
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-600">
              ثلاث خطوات بسيطة وتكون بدأت ترتب
              مناسبتك.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="relative rounded-3xl bg-white p-7"
              >
                <span className="absolute left-5 top-5 text-xs font-black text-[#b87333]">
                  0{index + 1}
                </span>

                <div className="text-5xl">
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-xl font-black">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING NOTICE */}

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#211f1c] p-8 text-white md:p-12">
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#b87333]/20 blur-3xl" />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 text-4xl">
                📅
              </div>

              <h2 className="text-2xl font-black md:text-3xl">
                خطط لمناسبتك بدري
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/60">
                علشان نضمن لك أفضل اختيار، الحجز
                على المنصة يكون قبل موعد المناسبة
                بـ30 يومًا على الأقل.
              </p>
            </div>

            <Link
              href="/bookings"
              className="w-fit rounded-2xl bg-[#b87333] px-7 py-4 text-sm font-black transition hover:bg-[#c7864b]"
            >
              ابدأ الحجز
            </Link>
          </div>
        </div>
      </section>

      {/* PROVIDER CTA */}

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="rounded-[2rem] border bg-white p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-black tracking-[0.25em] text-[#b87333]">
                FOR SERVICE PROVIDERS
              </p>

              <h2 className="mt-3 text-3xl font-black">
                عندك خدمة؟
                <br />
                خلّي الناس تلاقيك.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500">
                أضف نشاطك وخدماتك وأسعارك وخلي
                العملاء يوصلوا لك من خلال Tyson
                Media.
              </p>

              <Link
                href="/register"
                className="mt-7 inline-flex rounded-2xl bg-[#211f1c] px-7 py-4 text-sm font-black text-white transition hover:bg-[#b87333]"
              >
                سجّل كمقدم خدمة
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl bg-[#eee6dc] p-6">
                <div className="text-4xl">
                  📋
                </div>

                <p className="mt-4 font-black">
                  أضف خدماتك
                </p>
              </div>

              <div className="rounded-3xl bg-[#211f1c] p-6 text-white">
                <div className="text-4xl">
                  📈
                </div>

                <p className="mt-4 font-black">
                  زوّد عملاءك
                </p>
              </div>

              <div className="rounded-3xl bg-[#211f1c] p-6 text-white">
                <div className="text-4xl">
                  ⭐
                </div>

                <p className="mt-4 font-black">
                  اجمع تقييمات
                </p>
              </div>

              <div className="rounded-3xl bg-[#eee6dc] p-6">
                <div className="text-4xl">
                  📅
                </div>

                <p className="mt-4 font-black">
                  استقبل حجوزات
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="rounded-[2rem] bg-[#b87333] px-6 py-12 text-center text-white md:px-12">
          <div className="text-5xl">
            💍
          </div>

          <h2 className="mt-5 text-3xl font-black md:text-4xl">
            جاهز تبدأ ترتب مناسبتك؟
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/80">
            استكشف الأقسام واختار الخدمات اللي
            تناسبك.
          </p>

          <Link
            href="#categories"
            className="mt-7 inline-flex rounded-2xl bg-[#211f1c] px-8 py-4 text-sm font-black text-white"
          >
            استكشف المنصة
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}