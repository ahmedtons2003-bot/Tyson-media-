"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const categories = [
  {
    title: "التصوير",
    description: "أفراح، خطوبة، بورتريه، فيديو وDrone",
    icon: "📸",
    href: "/photography",
  },
  {
    title: "فساتين الزفاف",
    description: "فساتين زفاف وسهرة للإيجار والشراء",
    icon: "👗",
    href: "/dresses",
  },
  {
    title: "سيارات الأفراح",
    description: "سيارات زفاف مميزة مع سائق",
    icon: "🚘",
    href: "/cars",
  },
  {
    title: "القاعات",
    description: "قاعات أفراح ومناسبات في كل مصر",
    icon: "🏛️",
    href: "/halls",
  },
  {
    title: "ميكب وكوافير",
    description: "خبراء المكياج وتصفيف الشعر",
    icon: "💄",
    href: "/beauty",
  },
  {
    title: "الورود",
    description: "بوكيهات وتنسيقات ورود للمناسبات",
    icon: "💐",
    href: "/flowers",
  },
  {
    title: "الديكور",
    description: "ديكورات وتجهيزات الأفراح والحفلات",
    icon: "✨",
    href: "/decoration",
  },
  {
    title: "Handmade",
    description: "منتجات هاند ميد وهدايا مميزة",
    icon: "🧶",
    href: "/handmade",
  },
  {
    title: "الطباعة",
    description: "دعوات وكروت وطباعة مناسبات",
    icon: "🖨️",
    href: "/printing",
  },
  {
    title: "الهدايا والتوزيعات",
    description: "هدايا وتوزيعات لكل مناسبة",
    icon: "🎁",
    href: "/gifts",
  },
];

const features = [
  {
    icon: "🔎",
    title: "اختار بسهولة",
    text: "قارن بين الخدمات والأسعار واختار الأنسب ليك.",
  },
  {
    icon: "📍",
    title: "في كل المحافظات",
    text: "اكتشف مقدمي الخدمات القريبين منك في مصر.",
  },
  {
    icon: "⭐",
    title: "تقييمات حقيقية",
    text: "شوف تقييمات العملاء قبل ما تحجز.",
  },
  {
    icon: "📅",
    title: "حجز منظم",
    text: "حدد الموعد وابعت طلب الحجز بسهولة.",
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
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#211f1c] px-6 py-14 text-white md:px-12 md:py-20">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#b87333]/20 blur-3xl" />

          <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#b87333]/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black text-[#d6a66f]">
              TYSON MEDIA
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
              كل خدمات مناسبتك
              <br />
              <span className="text-[#d6a66f]">
                في مكان واحد.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/65 md:text-base">
              من أول القاعة والتصوير لحد الفستان
              والورد والديكور والهدايا.
              اكتشف، قارن، واختار واحجز كل اللي
              محتاجه لمناسبتك من Tyson Media.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#categories"
                className="rounded-xl bg-[#b87333] px-7 py-4 text-center font-black text-white transition hover:bg-[#d09152]"
              >
                اكتشف الخدمات
              </Link>

              <Link
                href="/register"
                className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-center font-black text-white transition hover:bg-white/10"
              >
                ابدأ كمقدم خدمة
              </Link>
            </div>
          </div>

          <div className="relative mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["📸", "تصوير"],
              ["👗", "فساتين"],
              ["🚘", "سيارات"],
              ["💐", "ورود"],
            ].map(([icon, title]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur"
              >
                <div className="text-3xl">{icon}</div>

                <p className="mt-2 text-sm font-black">
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK SEARCH */}

      <section className="mx-auto max-w-5xl px-4">
        <div className="-mt-1 rounded-3xl border bg-white p-4 shadow-lg md:-mt-8 md:relative">
          <div className="grid gap-3 md:grid-cols-[1fr_220px_150px]">
            <div className="flex items-center rounded-xl border bg-[#faf9f7] px-4">
              <span className="ml-3 text-xl">
                🔎
              </span>

              <input
                placeholder="بتدور على إيه؟ تصوير، قاعة، فستان..."
                className="w-full bg-transparent py-4 text-sm font-bold outline-none"
              />
            </div>

            <select className="rounded-xl border bg-[#faf9f7] px-4 py-3 font-bold outline-none">
              <option>كل المحافظات</option>
              <option>القاهرة</option>
              <option>الإسكندرية</option>
              <option>الجيزة</option>
              <option>البحيرة</option>
              <option>الدقهلية</option>
              <option>مطروح</option>
            </select>

            <button
              type="button"
              className="rounded-xl bg-[#211f1c] px-6 py-3 font-black text-white transition hover:bg-[#b87333]"
            >
              بحث
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}

      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 py-16"
      >
        <div className="mb-8">
          <p className="text-xs font-black tracking-widest text-[#b87333]">
            EXPLORE SERVICES
          </p>

          <div className="mt-2 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-black md:text-4xl">
                اختار اللي محتاجه
              </h2>

              <p className="mt-2 text-sm text-[#746f68]">
                كل خدمات المناسبات في مكان واحد.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group rounded-3xl border bg-white p-4 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-28 items-center justify-center rounded-2xl bg-[#eee6dc] text-5xl transition group-hover:scale-[1.02]">
                {category.icon}
              </div>

              <h3 className="mt-4 font-black">
                {category.title}
              </h3>

              <p className="mt-2 min-h-10 text-xs leading-5 text-[#746f68]">
                {category.description}
              </p>

              <span className="mt-4 block text-sm font-black text-[#b87333]">
                اكتشف القسم ←
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY TYSON */}

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-[2rem] bg-[#eee6dc] p-7 md:p-12">
          <div className="max-w-2xl">
            <p className="text-xs font-black tracking-widest text-[#b87333]">
              WHY TYSON MEDIA
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              ليه Tyson Media؟
            </h2>

            <p className="mt-4 leading-7 text-[#746f68]">
              بنجمع لك خدمات ومنتجات المناسبات
              في منصة واحدة عشان توفر وقتك
              وتوصل لأفضل اختيار بسهولة.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-5"
              >
                <div className="text-3xl">
                  {feature.icon}
                </div>

                <h3 className="mt-4 font-black">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#746f68]">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="overflow-hidden rounded-[2rem] bg-[#211f1c] p-8 text-white md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-black tracking-widest text-[#d6a66f]">
                PLAN YOUR EVENT
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                مناسبتك تستاهل تتجهز صح.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
                اختار الخدمات اللي محتاجها،
                وقارن بين الاختيارات، وابعت طلب
                الحجز لمقدم الخدمة.
              </p>
            </div>

            <div className="flex md:justify-end">
              <Link
                href="/bookings"
                className="rounded-xl bg-[#b87333] px-7 py-4 font-black text-white transition hover:bg-[#d09152]"
              >
                ابدأ الحجز الآن
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SELLER CTA */}

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-[2rem] border bg-white p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-black tracking-widest text-[#b87333]">
                JOIN TYSON MEDIA
              </p>

              <h2 className="mt-3 text-3xl font-black">
                عندك خدمة أو منتج؟
              </h2>

              <p className="mt-4 leading-7 text-[#746f68]">
                اعرض شغلك على Tyson Media،
                ووصل لعملاء بيدوروا على خدمات
                ومنتجات المناسبات.
              </p>
            </div>

            <div className="flex md:justify-end">
              <Link
                href="/register"
                className="rounded-xl bg-[#211f1c] px-7 py-4 font-black text-white transition hover:bg-[#b87333]"
              >
                سجل كمقدم خدمة
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}