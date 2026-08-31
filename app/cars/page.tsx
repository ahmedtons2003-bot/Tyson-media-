"use client";

import Link from "next/link";

const carCategories = [
  {
    title: "زفة السيارات",
    description: "سيارات فخمة ومميزة للزفاف",
    icon: "🚘",
    href: "/cars/wedding",
  },
  {
    title: "تزيين السيارات",
    description: "تزيين وتجهيز السيارات للمناسبات",
    icon: "🎀",
    href: "/cars/decoration",
  },
  {
    title: "سيارات فاخرة",
    description: "اختار سيارة فاخرة لمناسبتك",
    icon: "🏎️",
    href: "/cars/luxury",
  },
  {
    title: "ليموزين",
    description: "ليموزين وحلول نقل للمناسبات",
    icon: "🚙",
    href: "/cars/limousine",
  },
  {
    title: "سيارات عادية",
    description: "سيارات مناسبة للزفاف والمناسبات",
    icon: "🚗",
    href: "/cars/regular",
  },
  {
    title: "سائقين",
    description: "احجز سيارة مع سائق",
    icon: "🧑‍✈️",
    href: "/cars/drivers",
  },
];

export default function CarsPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f7f7] text-[#211f1c]"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white">
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

          <Link
            href="/"
            className="rounded-xl bg-[#211f1c] px-5 py-3 text-sm font-black text-white"
          >
            الرئيسية
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl bg-[#211f1c] px-6 py-12 text-white md:px-12">
          <p className="font-bold text-[#d6a66f]">
            TYSON MEDIA • CARS
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-6xl">
            سيارات ومواصلات المناسبات 🚘
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
            اختار نوع الخدمة اللي محتاجها،
            واستعرض مقدمي الخدمات والأسعار
            واحجز السيارة المناسبة لمناسبتك.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-6">
          <p className="text-sm font-bold text-[#b87333]">
            CATEGORIES
          </p>

          <h2 className="mt-1 text-3xl font-black">
            اختار الخدمة
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            كل خدمة مستقلة عن التانية.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {carCategories.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-3xl border bg-white p-6 transition hover:-translate-y-1 hover:border-[#b87333] hover:shadow-xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eee6dc] text-4xl">
                {item.icon}
              </div>

              <h3 className="mt-5 text-xl font-black">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {item.description}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-black text-[#b87333]">
                  استعرض الخدمات
                </span>

                <span className="text-xl transition group-hover:-translate-x-1">
                  ←
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-3xl bg-[#eee6dc] p-8 text-center">
          <div className="text-5xl">
            🚘
          </div>

          <h2 className="mt-4 text-2xl font-black">
            عندك سيارة أو خدمة سيارات؟
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-600">
            اعرض خدمتك على Tyson Media
            ووصل لعملاء المناسبات.
          </p>

          <Link
            href="/dashboard"
            className="mt-5 inline-block rounded-xl bg-[#211f1c] px-7 py-3 font-black text-white"
          >
            ابدأ تقديم خدمتك
          </Link>
        </div>
      </section>
    </main>
  );
}