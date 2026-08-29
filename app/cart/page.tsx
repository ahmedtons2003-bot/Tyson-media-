import Link from "next/link";

export default function CartPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#fbfaf7]">
      <header className="border-b bg-white px-4 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-2xl font-black">
            Tyson <span className="text-[#b87333]">Media</span>
          </Link>

          <Link
            href="/handmade"
            className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-bold text-white"
          >
            متابعة التسوق
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-black">🛒 سلة التسوق</h1>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_340px]">
          <div className="rounded-3xl border bg-white p-5">
            <div className="flex gap-4 border-b pb-5">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-[#eee6dc] text-5xl">
                👜
              </div>

              <div className="flex-1">
                <h2 className="font-black">
                  شنطة هاند ميد مميزة
                </h2>

                <p className="mt-2 text-sm text-[#746f68]">
                  شنط هاند ميد
                </p>

                <p className="mt-3 font-black text-[#b87333]">
                  850 ج.م
                </p>
              </div>

              <div className="flex h-10 items-center rounded-xl border">
                <button className="px-3">−</button>
                <span className="px-3">1</span>
                <button className="px-3">+</button>
              </div>
            </div>

            <div className="pt-5">
              <Link
                href="/handmade"
                className="text-sm font-bold text-[#b87333]"
              >
                ← إضافة منتجات أخرى
              </Link>
            </div>
          </div>

          <aside className="h-fit rounded-3xl border bg-white p-6">
            <h2 className="text-xl font-black">
              ملخص الطلب
            </h2>

            <div className="mt-6 flex justify-between">
              <span className="text-[#746f68]">
                المنتجات
              </span>
              <span>850 ج.م</span>
            </div>

            <div className="mt-3 flex justify-between">
              <span className="text-[#746f68]">
                الشحن
              </span>
              <span>50 ج.م</span>
            </div>

            <div className="my-5 border-t" />

            <div className="flex justify-between text-lg font-black">
              <span>الإجمالي</span>
              <span className="text-[#b87333]">
                900 ج.م
              </span>
            </div>

            <Link
              href="/login"
              className="mt-6 block rounded-xl bg-[#211f1c] px-6 py-4 text-center font-black text-white"
            >
              إتمام الطلب
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}