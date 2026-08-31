import Link from "next/link";

const categories = [
{ icon: "💍", name: "الأفراح والمناسبات", href: "/photography" },
{ icon: "📸", name: "التصوير الاحترافي", href: "/photography" },
{ icon: "🎥", name: "تصوير الفيديو", href: "/photography" },
{ icon: "🚁", name: "تصوير بالدرون", href: "/photography" },
{ icon: "🚗", name: "سيارات المناسبات", href: "/cars" },
{ icon: "💄", name: "Makeup Artist", href: "/providers" },
{ icon: "👗", name: "فاشون وأزياء", href: "/providers" },
{ icon: "🌸", name: "تجهيز وتنسيق الأماكن", href: "/providers" },
{ icon: "🌹", name: "ورد وتنسيقات", href: "/handmade" },
{ icon: "🎁", name: "هدايا وتوزيعات", href: "/handmade" },
{ icon: "🧵", name: "Handmade", href: "/handmade" },
{ icon: "🕯️", name: "شموع وديكور", href: "/handmade" },
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
          href="/cars"
          className="text-[#746f68] hover:text-[#b87333]"
        >
          سيارات المناسبات
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
        جهّز مناسبتك من مكان واحد
      </h1>

      <p className="mx-auto mt-6 max-w-2xl leading-8 text-white/70">
        من التصوير والفيديو والدرون إلى سيارات المناسبات،
        تجهيز الأماكن، الجمال، الأزياء والهدايا.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/photography"
          className="rounded-xl bg-[#b87333] px-7 py-3 font-black text-white"
        >
          📸 اكتشف خدمات التصوير
        </Link>

        <Link
          href="/cars"
          className="rounded-xl border border-white/20 px-7 py-3 font-bold text-white"
        >
          🚗 اختر سيارة مناسبتك
        </Link>
      </div>
    </div>
  </section>

  {/* Categories */}
  <section className="mx-auto max-w-6xl px-4 py-8 md:py-12">

    <div className="mb-7">
      <p className="text-sm font-bold text-[#b87333]">
        استكشف Tyson Media
      </p>

      <h2 className="mt-2 text-3xl font-black">
        كل احتياجات مناسبتك
      </h2>

      <p className="mt-3 text-[#746f68]">
        اختر القسم الذي تبحث عنه وابدأ تجهيز مناسبتك.
      </p>
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
        خدمات المناسبات
      </p>

      <h2 className="mt-2 text-3xl font-black">
        ماذا تريد أن تحجز؟
      </h2>
    </div>

    <div className="grid gap-5 md:grid-cols-3">

      <Link
        href="/photography"
        className="group rounded-3xl border bg-white p-7 transition hover:shadow-lg"
      >
        <div className="text-6xl">📸</div>

        <h3 className="mt-5 text-2xl font-black">
          التصوير الاحترافي
        </h3>

        <p className="mt-3 leading-7 text-[#746f68]">
          تصوير أفراح وخطوبة، فوتوغرافي، بورتريه،
          Fashion، جلسات تصوير ومناسبات.
        </p>

        <span className="mt-6 inline-block font-black text-[#b87333]">
          اكتشف التصوير ←
        </span>
      </Link>

      <Link
        href="/photography"
        className="group rounded-3xl border bg-white p-7 transition hover:shadow-lg"
      >
        <div className="text-6xl">🎥</div>

        <h3 className="mt-5 text-2xl font-black">
          فيديو ودرون
        </h3>

        <p className="mt-3 leading-7 text-[#746f68]">
          تصوير فيديو للمناسبات، Highlights،
          فيديوهات سينمائية، Reels وتصوير بالدرون.
        </p>

        <span className="mt-6 inline-block font-black text-[#b87333]">
          اكتشف الفيديو والدرون ←
        </span>
      </Link>

      <Link
        href="/cars"
        className="group rounded-3xl border bg-white p-7 transition hover:shadow-lg"
      >
        <div className="text-6xl">🚗</div>

        <h3 className="mt-5 text-2xl font-black">
          سيارات المناسبات
        </h3>

        <p className="mt-3 leading-7 text-[#746f68]">
          تصفح السيارات كأنك داخل معرض،
          واختر الماركة ونوع العربية المناسب لزفتك أو مناسبتك.
        </p>

        <span className="mt-6 inline-block font-black text-[#b87333]">
          دخول معرض السيارات ←
        </span>
      </Link>

    </div>
  </section>

  {/* Event Services */}
  <section className="mx-auto max-w-6xl px-4 py-12">

    <div className="rounded-[2rem] bg-[#eee6dc] p-7 md:p-10">

      <p className="text-sm font-bold text-[#b87333]">
        كل تفاصيل المناسبة
      </p>

      <h2 className="mt-2 text-3xl font-black">
        جهّز مناسبتك بالطريقة التي تناسبك
      </h2>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 md:grid-cols-4">

        <div className="rounded-2xl bg-white p-5">
          <div className="text-4xl">💄</div>
          <h3 className="mt-3 font-black">الجمال</h3>
          <p className="mt-2 text-sm text-[#746f68]">
            Makeup Artist وHair Stylist.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5">
          <div className="text-4xl">👗</div>
          <h3 className="mt-3 font-black">الأزياء والفاشون</h3>
          <p className="mt-2 text-sm text-[#746f68]">
            فساتين وأزياء وتجهيزات المناسبات.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5">
          <div className="text-4xl">🌸</div>
          <h3 className="mt-3 font-black">تجهيز الأماكن</h3>
          <p className="mt-2 text-sm text-[#746f68]">
            ديكور وورد وإضاءة وتجهيز المناسبات.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5">
          <div className="text-4xl">🎁</div>
          <h3 className="mt-3 font-black">الهدايا والهاند ميد</h3>
          <p className="mt-2 text-sm text-[#746f68]">
            توزيعات وهدايا وديكورات مميزة.
          </p>
        </div>

      </div>
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
        منصة تجمع كل احتياجات الأفراح والمناسبات في مكان واحد.
      </p>

      <p className="mt-5 text-xs text-[#746f68]">
        © 2026 Tyson Media — جميع الحقوق محفوظة
      </p>

    </div>
  </footer>

</main>

);
}