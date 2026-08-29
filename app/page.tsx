export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen bg-white">
      <header className="border-b p-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-2xl font-bold">Tyson Media</h1>
          <a href="/login">تسجيل الدخول</a>
        </div>
      </header>

      <section className="bg-gray-100 px-6 py-20 text-center">
        <h2 className="mb-4 text-4xl font-bold">
          كل الإبداع في مكان واحد
        </h2>

        <p className="mb-8 text-gray-600">
          اكتشف خدمات التصوير ومنتجات الهاند ميد واحجز أو اطلب بسهولة.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/photography"
            className="rounded-xl bg-black px-6 py-3 text-white"
          >
            📸 التصوير
          </a>

          <a
            href="/handmade"
            className="rounded-xl border px-6 py-3"
          >
            🧵 Handmade
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h3 className="mb-6 text-2xl font-bold">اكتشف الأقسام</h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            "📸 التصوير",
            "🎂 جاتوه وحلويات",
            "📿 سلاسل وإكسسوارات",
            "👜 شنط هاند ميد",
            "🎁 هدايا",
            "🌹 ورد وتنسيقات",
            "🕯️ شموع",
            "🎉 توزيعات مناسبات"
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border p-6 text-center font-semibold"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}