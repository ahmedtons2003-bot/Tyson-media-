import Link from "next/link";

const providers = [
  {
    name: "استوديو الإبداع",
    type: "تصوير مناسبات",
    city: "الإسكندرية",
    rating: "4.9",
    icon: "📸",
  },
  {
    name: "لمسة هاند ميد",
    type: "منتجات Handmade",
    city: "القاهرة",
    rating: "4.8",
    icon: "🧵",
  },
  {
    name: "تفاصيل جميلة",
    type: "هدايا وتنسيقات",
    city: "الإسكندرية",
    rating: "4.9",
    icon: "🎁",
  },
];

export default function ProvidersPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#fbfaf7]">
      <header className="border-b bg-white px-4 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-2xl font-black">
            Tyson <span className="text-[#b87333]">Media</span>
          </Link>

          <Link
            href="/"
            className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-bold text-white"
          >
            الرئيسية
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-4xl font-black">مقدمو الخدمات</h1>

        <p className="mt-3 text-[#746f68]">
          اكتشف أصحاب الخدمات والمنتجات على Tyson Media.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {providers.map((provider) => (
            <article
              key={provider.name}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="flex h-32 items-center justify-center rounded-2xl bg-[#eee6dc] text-6xl">
                {provider.icon}
              </div>

              <div className="mt-5">
                <div className="text-sm text-[#b87333]">
                  ⭐ {provider.rating}
                </div>

                <h2 className="mt-2 text-xl font-black">
                  {provider.name}
                </h2>

                <p className="mt-2 text-[#746f68]">
                  {provider.type}
                </p>

                <p className="mt-1 text-sm text-[#746f68]">
                  📍 {provider.city}
                </p>

                <Link
                  href="/provider"
                  className="mt-5 block rounded-xl bg-[#211f1c] px-4 py-3 text-center font-bold text-white"
                >
                  عرض الملف
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}