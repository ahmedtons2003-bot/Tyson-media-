import Link from "next/link";

const services = [
  {
    title: "تصوير حفلات ومناسبات",
    provider: "مقدم خدمة تجريبي",
    city: "الإسكندرية",
    price: "من 1500 ج.م",
  },
  {
    title: "جلسات بورتريه",
    provider: "مصور تجريبي",
    city: "القاهرة",
    price: "من 600 ج.م",
  },
  {
    title: "تصوير منتجات",
    provider: "استوديو تجريبي",
    city: "الإسكندرية",
    price: "من 800 ج.م",
  },
];

export default function PhotographyPage() {
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
        <h1 className="text-4xl font-black">خدمات التصوير 📸</h1>

        <p className="mt-3 text-[#746f68]">
          اكتشف خدمات التصوير وقارن بين مقدمي الخدمات والأسعار.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <select className="rounded-xl border bg-white p-3">
            <option>كل المدن</option>
            <option>الإسكندرية</option>
            <option>القاهرة</option>
          </select>

          <select className="rounded-xl border bg-white p-3">
            <option>كل الأسعار</option>
            <option>أقل من 1000 ج.م</option>
            <option>1000 - 3000 ج.م</option>
            <option>أكثر من 3000 ج.م</option>
          </select>

          <select className="rounded-xl border bg-white p-3">
            <option>الأعلى تقييمًا</option>
            <option>الأحدث</option>
            <option>السعر الأقل</option>
          </select>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm"
            >
              <div className="flex h-48 items-center justify-center bg-[#e9dfd2] text-6xl">
                📷
              </div>

              <div className="p-5">
                <div className="mb-2 text-sm text-[#b87333]">
                  ⭐ 4.9
                </div>

                <h2 className="text-xl font-black">
                  {service.title}
                </h2>

                <p className="mt-2 text-sm text-[#746f68]">
                  {service.provider}
                </p>

                <p className="mt-1 text-sm text-[#746f68]">
                  📍 {service.city}
                </p>

                <p className="mt-4 font-bold text-[#b87333]">
                  {service.price}
                </p>

                <Link
                  href="/providers"
                  className="mt-5 block rounded-xl bg-[#211f1c] px-4 py-3 text-center font-bold text-white"
                >
                  عرض التفاصيل
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}