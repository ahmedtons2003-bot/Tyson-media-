import Link from "next/link";

export default function DashboardPage() {
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
            أهلاً بك 👋
          </p>

          <h1 className="mt-2 text-3xl font-black">
            لوحة التحكم
          </h1>

          <p className="mt-2 opacity-70">
            تابع حجوزاتك وطلباتك من مكان واحد.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              الحجوزات
            </p>
            <p className="mt-2 text-3xl font-black">
              2
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              الطلبات
            </p>
            <p className="mt-2 text-3xl font-black">
              3
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              المفضلة
            </p>
            <p className="mt-2 text-3xl font-black">
              5
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border bg-white p-6">
            <h2 className="text-xl font-black">
              📸 آخر الحجوزات
            </h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-[#fbfaf7] p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">
                      تصوير مناسبة
                    </p>
                    <p className="mt-1 text-sm text-[#746f68]">
                      15 سبتمبر 2026
                    </p>
                  </div>

                  <span className="h-fit rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    مؤكد
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#fbfaf7] p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">
                      جلسة بورتريه
                    </p>
                    <p className="mt-1 text-sm text-[#746f68]">
                      20 سبتمبر 2026
                    </p>
                  </div>

                  <span className="h-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                    قيد المراجعة
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6">
            <h2 className="text-xl font-black">
              🛍️ آخر الطلبات
            </h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-[#fbfaf7] p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">
                      شنطة هاند ميد
                    </p>
                    <p className="mt-1 text-sm text-[#746f68]">
                      900 ج.م
                    </p>
                  </div>

                  <span className="h-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    قيد التجهيز
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#fbfaf7] p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">
                      باقة ورد
                    </p>
                    <p className="mt-1 text-sm text-[#746f68]">
                      650 ج.م
                    </p>
                  </div>

                  <span className="h-fit rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    تم التسليم
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/handmade"
          className="mt-8 block rounded-xl bg-[#b87333] px-6 py-4 text-center font-black text-white"
        >
          اكتشف المزيد من الخدمات والمنتجات
        </Link>
      </section>
    </main>
  );
}