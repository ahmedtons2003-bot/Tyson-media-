import Link from "next/link";

const products = [
  {
    name: "سلسلة هاند ميد",
    price: "450 ج.م",
    category: "سلاسل وإكسسوارات",
    icon: "📿",
  },
  {
    name: "شنطة هاند ميد",
    price: "850 ج.م",
    category: "شنط هاند ميد",
    icon: "👜",
  },
  {
    name: "شمعة ديكورية",
    price: "250 ج.م",
    category: "شموع",
    icon: "🕯️",
  },
  {
    name: "بوكس هدايا",
    price: "600 ج.م",
    category: "هدايا",
    icon: "🎁",
  },
  {
    name: "جاتوه مناسبات",
    price: "700 ج.م",
    category: "جاتوه وحلويات",
    icon: "🎂",
  },
  {
    name: "تنسيق ورد",
    price: "500 ج.م",
    category: "ورد وتنسيقات",
    icon: "🌹",
  },
];

export default function HandmadePage() {
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
        <h1 className="text-4xl font-black">متجر Handmade 🧵</h1>

        <p className="mt-3 text-[#746f68]">
          اكتشف منتجات هاند ميد مميزة من صناع ومقدمي خدمات تجريبيين.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <select className="rounded-xl border bg-white p-3">
            <option>كل التصنيفات</option>
            <option>جاتوه وحلويات</option>
            <option>سلاسل وإكسسوارات</option>
            <option>شنط هاند ميد</option>
            <option>هدايا</option>
            <option>ورد وتنسيقات</option>
            <option>شموع</option>
          </select>

          <select className="rounded-xl border bg-white p-3">
            <option>كل الأسعار</option>
            <option>أقل من 500 ج.م</option>
            <option>500 - 1000 ج.م</option>
            <option>أكثر من 1000 ج.م</option>
          </select>

          <input
            type="search"
            placeholder="ابحث عن منتج..."
            className="rounded-xl border bg-white p-3 outline-none"
          />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm"
            >
              <div className="flex h-44 items-center justify-center bg-[#eee6dc] text-6xl">
                {product.icon}
              </div>

              <div className="p-4">
                <p className="text-xs text-[#746f68]">
                  {product.category}
                </p>

                <h2 className="mt-2 font-black">
                  {product.name}
                </h2>

                <div className="mt-2 text-sm">
                  ⭐ 4.8
                </div>

                <div className="mt-3 font-black text-[#b87333]">
                  {product.price}
                </div>

                <button className="mt-4 w-full rounded-xl bg-[#211f1c] px-4 py-3 font-bold text-white">
                  أضف للسلة
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}