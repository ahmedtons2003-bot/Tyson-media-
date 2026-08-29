import Link from "next/link";

const categories = [
  { icon: "📸", name: "التصوير", href: "/photography" },
  { icon: "🎂", name: "جاتوه وحلويات", href: "/handmade" },
  { icon: "📿", name: "سلاسل وإكسسوارات", href: "/handmade" },
  { icon: "👜", name: "شنط هاند ميد", href: "/product" },
  { icon: "🎁", name: "هدايا", href: "/handmade" },
  { icon: "🌹", name: "ورد وتنسيقات", href: "/handmade" },
  { icon: "🕯️", name: "شموع", href: "/handmade" },
  { icon: "🎉", name: "توزيعات مناسبات", href: "/handmade" },
];

export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#fbfaf7] text-[#211f1c]">

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

          <Link href="/" className="text-2xl font-black">
            Tyson <span className="text-[#b87333]">Media</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/" className="font-bold">
              الرئيسية
            </Link>

            <Link
              href="/photography"
              className="text-[#746f68] hover:text-[#b87333]"
            >
              التصوير
            </Link>

            <Link
              href="/handmade"
              className="text-[#746f68] hover:text-[#b87333]"
            >
              Handmade
            </Link>

            <Link
              href="/cart"
              className="text-[#746f68] hover:text-[#b87333]"
            >
              🛒 السلة
            </Link>
          </nav>

          <Link
            href="/login"
            className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-bold text-white"
          >
            تسجيل الدخول
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#211f1c] px-6 py-14 text-center text-white md:px-12 md:py-20">

          <p className="mb-4 text-sm font-bold tracking-wide text-[#d6a66f]">
            TYSON MEDIA
          </p>

          <h1 className="mx-auto max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            كل الإبداع في مكان واحد
          </h1>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-white/70">
            اكتشف خدمات التصوير ومنتجات الهاند ميد،
            وقارن واختار واحجز أو اطلب بسهولة.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/photography"
              className="rounded-xl bg-[#b87333] px-7 py-3 font-black text-white"
            >
              📸 اكتشف التصوير
            </Link>

            <Link
              href="/handmade"
              className="rounded-xl border border-white/20 px-7 py-3 font-bold text-white"
            >
              🧵 متجر Handmade
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:py-12">

        <div className="mb-7">
          <p className="text-sm font-bold text-[#b87333]">
            استكشف
          </p>

          <h2 className="mt-2 text-3xl font-black">
            الأقسام
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group rounded-2xl border bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-5xl">
                {category.icon}
              </div>

              <h3 className="mt-4 font-black">
                {category.name}
              </h3>

              <p className="mt-2 text-xs text-[#746f68]">
                اكتشف الآن ←
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Services */}
      <section className="mx-auto max-w-6xl px-4 py-12">

        <div className="mb-7">
          <p className="text-sm font-bold text-[#b87333]">
            Tyson Media
          </p>

          <h2 className="mt-2 text-3xl font-black">
            ماذا تبحث عنه؟
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <Link
            href="/photography"
            className="group rounded-3xl border bg-white p-7 transition hover:shadow-lg"
          >
            <div className="text-6xl">📸</div>

            <h3 className="mt-5 text-2xl font-black">
              خدمات التصوير
            </h3>

            <p className="mt-3 leading-7 text-[#746f68]">
              تصوير حفلات، أفراح، خطوبة، جلسات شخصية
              وتصوير منتجات مع مقدمي خدمات مختلفين.
            </p>

            <span className="mt-6 inline-block font-black text-[#b87333]">
              تصفح خدمات التصوير ←
            </span>
          </Link>

          <Link
            href="/handmade"
            className="group rounded-3xl border bg-white p-7 transition hover:shadow-lg"
          >
            <div className="text-6xl">🧵</div>

            <h3 className="mt-5 text-2xl font-black">
              متجر Handmade
            </h3>

            <p className="mt-3 leading-7 text-[#746f68]">
              هدايا، شنط، إكسسوارات، شموع، ورد،
              توزيعات ومستلزمات المناسبات.
            </p>

            <span className="mt-6 inline-block font-black text-[#b87333]">
              دخول المتجر ←
            </span>
          </Link>

        </div>
      </section>

      {/* Quick Links */}
      <section className="mx-auto max-w-6xl px-4 pb-16">

        <div className="rounded-3xl bg-[#eee6dc] p-7">

          <h2 className="text-2xl font-black">
            حسابك على Tyson Media
          </h2>

          <p className="mt-2 text-[#746f68]">
            تابع حجوزاتك وطلباتك من لوحة التحكم.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <Link
              href="/dashboard"
              className="rounded-xl bg-[#211f1c] px-5 py-3 font-bold text-white"
            >
              👤 لوحة العميل
            </Link>

            <Link
              href="/provider-dashboard"
              className="rounded-xl border border-[#211f1c]/20 bg-white px-5 py-3 font-bold"
            >
              🧑‍💼 لوحة مقدم الخدمة
            </Link>

            <Link
              href="/cart"
              className="rounded-xl border border-[#211f1c]/20 bg-white px-5 py-3 font-bold"
            >
              🛒 السلة
            </Link>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center">

          <div className="text-xl font-black">
            Tyson <span className="text-[#b87333]">Media</span>
          </div>

          <p className="mt-2 text-sm text-[#746f68]">
            منصة تجمع خدمات التصوير ومنتجات الهاند ميد في مكان واحد.
          </p>

          <p className="mt-5 text-xs text-[#746f68]">
            © 2026 Tyson Media — جميع الحقوق محفوظة
          </p>

        </div>
      </footer>

    </main>
  );
}