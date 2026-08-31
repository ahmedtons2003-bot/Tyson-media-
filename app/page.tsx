"use client";

import Link from "next/link";

const categories = [
  { title: "التصوير", subtitle: "أفراح • خطوبة • جلسات", icon: "📸", href: "/photography", active: true },
  { title: "Handmade", subtitle: "شنط • إكسسوارات • هدايا", icon: "🧶", href: "/handmade", active: true },
  { title: "السيارات", subtitle: "زينة • ديكور • تجهيز", icon: "🚗", href: "/cars", active: true },
  { title: "الفساتين", subtitle: "فساتين أفراح ومناسبات", icon: "👗", href: "/register", active: false },
  { title: "البدل", subtitle: "بدل رجالي • إكسسوارات", icon: "🤵", href: "/register", active: false },
  { title: "المكياج والجمال", subtitle: "ميكاب • شعر • كوافير", icon: "💄", href: "/register", active: false },
  { title: "القاعات", subtitle: "قاعات • أماكن مناسبات", icon: "🏛️", href: "/register", active: false },
  { title: "الديكور والدعوات", subtitle: "ديكور • دعوات • توزيعات", icon: "🎀", href: "/register", active: false },
];

const popular = [
  { title: "التصوير", text: "احجز مصورك لمناسبتك", icon: "📸", href: "/photography" },
  { title: "Handmade", text: "منتجات وهدايا مميزة", icon: "🧶", href: "/handmade" },
  { title: "زينة السيارات", text: "جهّز عربية المناسبة", icon: "🚗", href: "/cars" },
];

const features = [
  ["🔎", "ابحث بسهولة", "ابحث عن الخدمة أو المنتج اللي محتاجه."],
  ["⭐", "قارن واختار", "شوف الأسعار والتقييمات قبل الحجز."],
  ["📍", "قريب منك", "اكتشف مقدمي الخدمات في محافظتك."],
  ["🛒", "احجز واشتري", "كل احتياجات مناسبتك في مكان واحد."],
];

export default function HomePage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f8f6f3] text-[#201e1b]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-[72px] items-center justify-between gap-4">

            <Link href="/" className="shrink-0 text-2xl font-black tracking-tight">
              Tyson <span className="text-[#b87333]">Media</span>
            </Link>

            <nav className="hidden items-center gap-7 text-sm font-bold lg:flex">
              <Link href="/" className="text-[#b87333]">الرئيسية</Link>
              <Link href="#categories" className="hover:text-[#b87333]">الأقسام</Link>
              <Link href="/photography" className="hover:text-[#b87333]">التصوير</Link>
              <Link href="/handmade" className="hover:text-[#b87333]">Handmade</Link>
              <Link href="/cars" className="hover:text-[#b87333]">السيارات</Link>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/cart"
                className="flex h-11 w-11 items-center justify-center rounded-2xl border bg-white text-lg transition hover:bg-[#f4eee7]"
              >
                🛒
              </Link>

              <Link
                href="/login"
                className="rounded-2xl bg-[#201e1b] px-5 py-3 text-sm font-black text-white transition hover:bg-[#b87333]"
              >
                دخول
              </Link>
            </div>
          </div>

          {/* SEARCH */}
          <div className="pb-4">
            <div className="relative mx-auto max-w-3xl">
              <input
                placeholder="ابحث عن مصور، منتج، قاعة، فستان، خدمة..."
                className="h-14 w-full rounded-2xl border border-black/5 bg-[#f5f3f0] px-5 pr-14 text-sm font-bold outline-none transition focus:border-[#b87333] focus:bg-white"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl">
                🔎
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 py-5 md:py-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#211f1c] px-6 py-12 text-white shadow-2xl md:px-14 md:py-20">

          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#b87333]/20 blur-3xl" />
          <div className="absolute -bottom-40 right-1/3 h-96 w-96 rounded-full bg-[#d6a66f]/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl">

            <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-[#e2b783]">
              TYSON MEDIA • EVENTS MARKETPLACE
            </div>

            <h1 className="mt-6 text-4xl font-black leading-[1.15] md:text-6xl">
              حضّر مناسبتك
              <br />
              <span className="text-[#d6a66f]">
                من مكان واحد.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/65 md:text-lg">
              اكتشف الخدمات والمنتجات، قارن الأسعار،
              شوف التقييمات واحجز اللي يناسبك بسهولة.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#categories"
                className="rounded-2xl bg-[#b87333] px-8 py-4 text-center font-black transition hover:bg-[#9d612c]"
              >
                اكتشف الأقسام
              </Link>

              <Link
                href="/register"
                className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-center font-black transition hover:bg-white/10"
              >
                إنشاء حساب
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-xs text-white/50">
              <span>✓ خدمات متنوعة</span>
              <span>✓ منتجات Handmade</span>
              <span>✓ مقارنة الأسعار</span>
              <span>✓ حجز وشراء</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-10">

        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black tracking-widest text-[#b87333]">
              EXPLORE
            </p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              إنت محتاج إيه؟
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              اختار القسم وابدأ رحلتك.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative overflow-hidden rounded-[1.7rem] border border-black/5 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3ece4] text-3xl transition group-hover:scale-110">
                  {category.icon}
                </div>

                {!category.active && (
                  <span className="rounded-full bg-[#f3eee8] px-2.5 py-1 text-[10px] font-black text-gray-500">
                    قريبًا
                  </span>
                )}
              </div>

              <h3 className="mt-5 text-lg font-black">
                {category.title}
              </h3>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                {category.subtitle}
              </p>

              {category.active && (
                <div className="mt-5 text-sm font-black text-[#b87333]">
                  استكشف ←
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* POPULAR */}
      <section className="mx-auto max-w-7xl px-4 py-6">

        <div className="mb-6">
          <p className="text-xs font-black tracking-widest text-[#b87333]">
            POPULAR
          </p>
          <h2 className="mt-2 text-3xl font-black">
            ابدأ من هنا
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {popular.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex items-center justify-between rounded-[1.7rem] border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                <div className="text-4xl">{item.icon}</div>
                <h3 className="mt-4 text-xl font-black">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {item.text}
                </p>
              </div>

              <div className="text-2xl text-[#b87333] transition group-hover:-translate-x-1">
                ←
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HANDMADE */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#eadfd3]">

          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#b87333]/10 blur-3xl" />

          <div className="grid md:grid-cols-2">

            <div className="flex min-h-[320px] items-center justify-center bg-[#e2d4c5]">
              <div className="text-[120px] drop-shadow-xl transition duration-500 hover:scale-110">
                🧶
              </div>
            </div>

            <div className="relative z-10 p-8 md:p-14">
              <span className="text-xs font-black tracking-widest text-[#b87333]">
                TYSON MARKET
              </span>

              <h2 className="mt-4 text-4xl font-black leading-tight">
                Handmade
                <br />
                <span className="text-[#b87333]">
                  معمول بحب.
                </span>
              </h2>

              <p className="mt-5 max-w-lg leading-8 text-gray-600">
                شنط، خواتم، إكسسوارات، كروشيه،
                تطريز، هدايا وديكورات من بائعين مختلفين.
              </p>

              <Link
                href="/handmade"
                className="mt-7 inline-flex rounded-2xl bg-[#211f1c] px-7 py-4 font-black text-white transition hover:bg-[#b87333]"
              >
                دخول متجر Handmade
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-10">

        <div className="rounded-[2.5rem] bg-white p-6 shadow-sm md:p-8">

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(([icon, title, text]) => (
              <div
                key={title}
                className="rounded-3xl bg-[#f8f6f3] p-6"
              >
                <div className="text-3xl">{icon}</div>

                <h3 className="mt-4 font-black">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PROVIDERS CTA */}
      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#211f1c] p-8 text-white md:p-14">

          <div className="grid gap-10 md:grid-cols-2 md:items-center">

            <div>
              <span className="text-xs font-black tracking-widest text-[#d6a66f]">
                FOR PROVIDERS & SELLERS
              </span>

              <h2 className="mt-4 text-3xl font-black md:text-5xl">
                عندك خدمة أو منتج؟
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-white/60">
                انضم إلى Tyson Media واعرض خدماتك ومنتجاتك
                لعملاء جدد من مختلف محافظات مصر.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link
                href="/register"
                className="rounded-2xl bg-[#b87333] px-7 py-4 text-center font-black transition hover:bg-[#9d612c]"
              >
                ابدأ البيع
              </Link>

              <Link
                href="/provider-dashboard"
                className="rounded-2xl border border-white/10 px-7 py-4 text-center font-black transition hover:bg-white/5"
              >
                لوحة مقدم الخدمة
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-12 border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">

          <div className="grid gap-8 md:grid-cols-3">

            <div>
              <div className="text-2xl font-black">
                Tyson <span className="text-[#b87333]">Media</span>
              </div>

              <p className="mt-3 max-w-sm text-sm leading-7 text-gray-500">
                منصتك لاكتشاف وحجز خدمات ومنتجات المناسبات.
              </p>
            </div>

            <div>
              <h3 className="font-black">الأقسام</h3>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-bold text-gray-500">
                <Link href="/photography">التصوير</Link>
                <Link href="/handmade">Handmade</Link>
                <Link href="/cars">السيارات</Link>
                <Link href="/cart">السلة</Link>
              </div>
            </div>

            <div>
              <h3 className="font-black">حسابك</h3>

              <div className="mt-4 flex flex-col gap-3 text-sm font-bold text-gray-500">
                <Link href="/login">تسجيل الدخول</Link>
                <Link href="/register">إنشاء حساب</Link>
                <Link href="/dashboard">حسابي</Link>
                <Link href="/provider-dashboard">مقدم الخدمة</Link>
              </div>
            </div>

          </div>

          <div className="mt-10 border-t pt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Tyson Media — جميع الحقوق محفوظة
          </div>

        </div>
      </footer>

    </main>
  );
}