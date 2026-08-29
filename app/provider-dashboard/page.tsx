import Link from "next/link";

export default function ProviderDashboard() {
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

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-3xl bg-[#211f1c] p-7 text-white">
          <p className="text-sm opacity-70">
            لوحة مقدم الخدمة
          </p>

          <h1 className="mt-2 text-3xl font-black">
            أهلاً بك في Tyson Media 👋
          </h1>

          <p className="mt-2 opacity-70">
            تابع حجوزاتك وخدماتك وطلبات العملاء.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              الحجوزات
            </p>
            <p className="mt-2 text-3xl font-black">12</p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              الطلبات
            </p>
            <p className="mt-2 text-3xl font-black">8</p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              التقييم
            </p>
            <p className="mt-2 text-3xl font-black">4.9 ⭐</p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              الإيرادات
            </p>
            <p className="mt-2 text-3xl font-black text-[#b87333]">
              18,500 ج.م
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">
                📅 أحدث الحجوزات
              </h2>

              <span className="text-sm text-[#b87333]">
                عرض الكل
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-[#fbfaf7] p-4">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-bold">
                      حفل خطوبة
                    </p>
                    <p className="mt-1 text-sm text-[#746f68]">
                      أحمد محمد • 15 سبتمبر
                    </p>
                  </div>

                  <span className="h-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                    جديد
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#fbfaf7] p-4">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-bold">
                      جلسة تصوير
                    </p>
                    <p className="mt-1 text-sm text-[#746f68]">
                      محمد علي • 20 سبتمبر
                    </p>
                  </div>

                  <span className="h-fit rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    مؤكد
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#fbfaf7] p-4">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-bold">
                      تصوير مناسبة
                    </p>
                    <p className="mt-1 text-sm text-[#746f68]">
                      سارة أحمد • 25 سبتمبر
                    </p>
                  </div>

                  <span className="h-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    قيد المراجعة
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6">
            <h2 className="text-xl font-black">
              🛍️ أحدث الطلبات
            </h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-[#fbfaf7] p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">
                      شنطة هاند ميد
                    </p>
                    <p className="mt-1 text-sm text-[#746f68]">
                      الكمية: 2
                    </p>
                  </div>

                  <strong className="text-[#b87333]">
                    1,700 ج.م
                  </strong>
                </div>
              </div>

              <div className="rounded-2xl bg-[#fbfaf7] p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">
                      توزيعات مناسبات
                    </p>
                    <p className="mt-1 text-sm text-[#746f68]">
                      الكمية: 30
                    </p>
                  </div>

                  <strong className="text-[#b87333]">
                    1,200 ج.م
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link
            href="/provider"
            className="rounded-2xl bg-[#b87333] p-5 text-center font-black text-white"
          >
            👤 ملفي كمقدم خدمة
          </Link>

          <Link
            href="/photography"
            className="rounded-2xl border bg-white p-5 text-center font-black"
          >
            📸 خدماتي
          </Link>

          <Link
            href="/handmade"
            className="rounded-2xl border bg-white p-5 text-center font-black"
          >
            🧵 منتجاتي
          </Link>
        </div>
      </section>
    </main>
  );
}