import Link from "next/link";

export default function ProductPage() {
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
            متجر Handmade
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid overflow-hidden rounded-3xl border bg-white shadow-sm md:grid-cols-2">

          <div className="flex min-h-[350px] items-center justify-center bg-[#eee6dc] text-9xl">
            👜
          </div>

          <div className="p-7">
            <p className="text-sm font-bold text-[#b87333]">
              شنط هاند ميد
            </p>

            <h1 className="mt-3 text-3xl font-black">
              شنطة هاند ميد مميزة
            </h1>

            <div className="mt-4">
              ⭐ 4.8 من 5
            </div>

            <div className="mt-5 text-3xl font-black text-[#b87333]">
              850 ج.م
            </div>

            <p className="mt-5 leading-8 text-[#746f68]">
              منتج تجريبي من منتجات Tyson Media.
              تصميم يدوي مميز مناسب للهدايا والمناسبات.
            </p>

            <div className="mt-6 rounded-2xl bg-[#fbfaf7] p-4">
              <p className="font-bold">المتوفر</p>
              <p className="mt-1 text-sm text-[#746f68]">
                منتج تجريبي — سيتم ربط المخزون لاحقًا.
              </p>
            </div>

            <button className="mt-6 w-full rounded-xl bg-[#211f1c] px-6 py-4 font-black text-white">
              🛒 أضف للسلة
            </button>

            <Link
              href="/handmade"
              className="mt-3 block w-full rounded-xl border px-6 py-4 text-center font-bold"
            >
              العودة للمتجر
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}