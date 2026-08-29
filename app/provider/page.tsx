import Link from "next/link";

export default function ProviderPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#fbfaf7]">
      <header className="border-b bg-white px-4 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-2xl font-black">
            Tyson <span className="text-[#b87333]">Media</span>
          </Link>

          <Link
            href="/providers"
            className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-bold text-white"
          >
            مقدمو الخدمات
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          <div className="flex h-52 items-center justify-center bg-[#e9dfd2] text-8xl">
            📸
          </div>

          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-[#b87333]">
                  ⭐ 4.9 من 5
                </p>

                <h1 className="mt-2 text-3xl font-black">
                  استوديو الإبداع
                </h1>

                <p className="mt-2 text-[#746f68]">
                  📍 الإسكندرية
                </p>
              </div>

              <Link
                href="/login"
                className="rounded-xl bg-[#211f1c] px-6 py-3 text-center font-bold text-white"
              >
                احجز الآن
              </Link>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-black">
                نبذة عن مقدم الخدمة
              </h2>

              <p className="mt-3 leading-8 text-[#746f68]">
                مقدم خدمة تجريبي متخصص في تصوير الحفلات
                والمناسبات والجلسات الشخصية وتصوير المنتجات.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-black">
                معرض الأعمال
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {["📷", "💍", "🎉", "🌹"].map((item, index) => (
                  <div
                    key={index}
                    className="flex h-32 items-center justify-center rounded-2xl bg-[#eee6dc] text-5xl"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-black">
                الخدمات
              </h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border p-4">
                  <h3 className="font-black">
                    تصوير مناسبات
                  </h3>
                  <p className="mt-2 text-[#b87333]">
                    من 1500 ج.م
                  </p>
                </div>

                <div className="rounded-2xl border p-4">
                  <h3 className="font-black">
                    جلسة بورتريه
                  </h3>
                  <p className="mt-2 text-[#b87333]">
                    من 600 ج.م
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/login"
              className="mt-8 block rounded-xl bg-[#b87333] px-6 py-4 text-center font-black text-white"
            >
              احجز خدمة التصوير
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}