"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const categories = [
  { icon: "🚘", name: "سيارات زفاف" },
  { icon: "🏎️", name: "سيارات فاخرة" },
  { icon: "🚙", name: "سيارات عائلية" },
  { icon: "🎀", name: "زينة السيارات" },
  { icon: "✨", name: "سيارات كلاسيك" },
  { icon: "🚐", name: "نقل الضيوف" },
];

const cars = [
  {
    id: 1,
    title: "سيارة زفاف فاخرة",
    price: "من 2,500 ج.م",
    city: "الإسكندرية",
    icon: "🚘",
  },
  {
    id: 2,
    title: "سيارة كلاسيك للزفاف",
    price: "من 3,000 ج.م",
    city: "القاهرة",
    icon: "✨",
  },
  {
    id: 3,
    title: "سيارة Luxury",
    price: "من 4,000 ج.م",
    city: "الجيزة",
    icon: "🏎️",
  },
];

export default function CarsPage() {
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

          <div className="absolute -bottom-40 right-1/3 h-80 w-80 rounded-full bg-[#b87333]/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="text-6xl">🚘</div>

            <p className="mt-6 text-xs font-black tracking-[0.3em] text-[#d6a66f]">
              WEDDING CARS
            </p>

            <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
              سيارات
              <br />

              <span className="text-[#d6a66f]">
                تليق بدخولك الكبير.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/60">
              اختار سيارة زفافك من السيارات
              الفاخرة والكلاسيك وخدمات الزينة
              ونقل الضيوف.
            </p>

            <Link
              href="#cars"
              className="mt-8 inline-flex rounded-2xl bg-[#b87333] px-6 py-3 text-sm font-black text-white transition hover:bg-[#d6a66f]"
            >
              اكتشف السيارات
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-7">
          <p className="text-xs font-black tracking-[0.25em] text-[#b87333]">
            CATEGORIES
          </p>

          <h2 className="mt-2 text-3xl font-black">
            اختار نوع الخدمة
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((category) => (
            <button
              key={category.name}
              className="rounded-3xl border bg-white p-4 text-right transition hover:-translate-y-1 hover:border-[#b87333] hover:shadow-lg"
            >
              <div className="flex h-24 items-center justify-center rounded-2xl bg-[#eee6dc] text-5xl">
                {category.icon}
              </div>

              <h3 className="mt-4 text-sm font-black">
                {category.name}
              </h3>

              <p className="mt-2 text-xs font-bold text-[#b87333]">
                عرض ←
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Filters */}

      <section className="mx-auto max-w-7xl px-4">
        <div className="rounded-3xl border bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-black">
                نوع السيارة
              </label>

              <select className="w-full rounded-2xl border bg-white p-3 outline-none focus:border-[#b87333]">
                <option>كل السيارات</option>
                <option>سيارات زفاف</option>
                <option>سيارات فاخرة</option>
                <option>سيارات كلاسيك</option>
                <option>سيارات عائلية</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black">
                المحافظة
              </label>

              <select className="w-full rounded-2xl border bg-white p-3 outline-none focus:border-[#b87333]">
                <option>كل المحافظات</option>
                <option>الإسكندرية</option>
                <option>القاهرة</option>
                <option>الجيزة</option>
                <option>البحيرة</option>
                <option>مطروح</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Cars */}

      <section
        id="cars"
        className="mx-auto max-w-7xl px-4 py-14"
      >
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.25em] text-[#b87333]">
              WEDDING CARS
            </p>

            <h2 className="mt-2 text-3xl font-black">
              السيارات المميزة
            </h2>
          </div>

          <span className="rounded-full bg-[#eee6dc] px-4 py-2 text-xs font-black">
            {cars.length} سيارات
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <article
              key={car.id}
              className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-64 items-center justify-center bg-[#eee6dc] text-8xl transition group-hover:scale-105">
                {car.icon}
              </div>

              <div className="p-5">
                <h3 className="text-xl font-black">
                  {car.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#746f68]">
                  سيارة مميزة ومجهزة للمناسبات
                  والأفراح مع إمكانية الحجز حسب
                  الموعد.
                </p>

                <div className="mt-4 space-y-2 text-sm">
                  <p className="font-bold">
                    📍 {car.city}
                  </p>

                  <p className="font-black text-[#b87333]">
                    {car.price}
                  </p>
                </div>

                <Link
                  href="/bookings"
                  className="mt-5 block rounded-xl bg-[#211f1c] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-[#b87333]"
                >
                  احجز الآن
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Booking Notice */}

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-[2rem] bg-[#eee6dc] p-7 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-4xl">📅</div>

              <h2 className="mt-4 text-2xl font-black">
                احجز العربية بدري
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#746f68]">
                يفضل إرسال طلب الحجز قبل موعد
                المناسبة بـ30 يومًا على الأقل لضمان
                توفر السيارة والخدمة في الموعد.
              </p>
            </div>

            <Link
              href="/bookings"
              className="w-fit rounded-xl bg-[#211f1c] px-6 py-3 text-sm font-black text-white"
            >
              ابدأ الحجز
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}