"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const categories = [
  { icon: "💐", name: "بوكيهات ورد" },
  { icon: "🎁", name: "هدايا" },
  { icon: "💍", name: "إكسسوارات" },
  { icon: "🕯️", name: "ديكورات" },
  { icon: "🧵", name: "هاند ميد" },
  { icon: "💌", name: "دعوات ومناسبات" },
];

const products = [
  {
    id: 1,
    title: "بوكيه ورد طبيعي",
    price: "من 750 ج.م",
    city: "الإسكندرية",
    icon: "💐",
  },
  {
    id: 2,
    title: "علبة هدايا مخصصة",
    price: "من 600 ج.م",
    city: "القاهرة",
    icon: "🎁",
  },
  {
    id: 3,
    title: "إكسسوارات هاند ميد",
    price: "من 350 ج.م",
    city: "البحيرة",
    icon: "💍",
  },
  {
    id: 4,
    title: "ديكور مناسبات",
    price: "من 1,000 ج.م",
    city: "الجيزة",
    icon: "🕯️",
  },
];

export default function HandmadePage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f5f2] text-[#211f1c]"
    >
      <Header />

      {/* HERO */}

      <section className="mx-auto max-w-7xl px-4 pt-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#211f1c] px-6 py-16 text-white md:px-12 md:py-24">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#b87333]/20 blur-3xl" />

          <div className="absolute -bottom-40 right-1/3 h-80 w-80 rounded-full bg-[#b87333]/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="text-6xl">🧵</div>

            <p className="mt-6 text-xs font-black tracking-[0.3em] text-[#d6a66f]">
              HANDMADE
            </p>

            <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
              هاند ميد
              <br />

              <span className="text-[#d6a66f]">
                تفاصيل معمولة بحب.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/60">
              اكتشف منتجات الهاند ميد والهدايا
              والورد والإكسسوارات والديكورات
              المصنوعة خصيصًا لمناسبتك.
            </p>

            <Link
              href="#handmade"
              className="mt-8 inline-flex rounded-2xl bg-[#b87333] px-6 py-3 text-sm font-black text-white transition hover:bg-[#d6a66f]"
            >
              اكتشف المنتجات
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-7">
          <p className="text-xs font-black tracking-[0.25em] text-[#b87333]">
            CATEGORIES
          </p>

          <h2 className="mt-2 text-3xl font-black">
            اختار اللي يناسبك
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

      {/* FILTERS */}

      <section className="mx-auto max-w-7xl px-4">
        <div className="rounded-3xl border bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-black">
                نوع المنتج
              </label>

              <select className="w-full rounded-2xl border bg-white p-3 outline-none focus:border-[#b87333]">
                <option>كل المنتجات</option>
                <option>بوكيهات ورد</option>
                <option>هدايا</option>
                <option>إكسسوارات</option>
                <option>ديكورات</option>
                <option>هاند ميد</option>
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

      {/* PRODUCTS */}

      <section
        id="handmade"
        className="mx-auto max-w-7xl px-4 py-14"
      >
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.25em] text-[#b87333]">
              HANDMADE
            </p>

            <h2 className="mt-2 text-3xl font-black">
              منتجات مميزة
            </h2>
          </div>

          <span className="rounded-full bg-[#eee6dc] px-4 py-2 text-xs font-black">
            {products.length} منتجات
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-64 items-center justify-center bg-[#eee6dc] text-8xl transition group-hover:scale-105">
                {product.icon}
              </div>

              <div className="p-5">
                <h3 className="text-xl font-black">
                  {product.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#746f68]">
                  منتج مميز مناسب للأفراح
                  والمناسبات ويمكن تنسيقه حسب
                  الطلب.
                </p>

                <div className="mt-4 space-y-2 text-sm">
                  <p className="font-bold">
                    📍 {product.city}
                  </p>

                  <p className="font-black text-[#b87333]">
                    {product.price}
                  </p>
                </div>

                <Link
                  href="/bookings"
                  className="mt-5 block rounded-xl bg-[#211f1c] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-[#b87333]"
                >
                  اطلب الآن
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CUSTOM */}

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-[2rem] bg-[#eee6dc] p-7 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-4xl">🎨</div>

              <h2 className="mt-4 text-2xl font-black">
                عايز حاجة مخصوص؟
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#746f68]">
                اطلب تصميم أو منتج مخصص حسب
                فكرتك وميزانيتك ومناسبة فرحك.
              </p>
            </div>

            <Link
              href="/bookings"
              className="w-fit rounded-xl bg-[#211f1c] px-6 py-3 text-sm font-black text-white"
            >
              اطلب تصميمك
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}