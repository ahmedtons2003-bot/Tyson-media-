import Link from "next/link";

const links = [
  { label: "التصوير", href: "/photography" },
  { label: "Handmade", href: "/handmade" },
  { label: "السيارات", href: "/cars" },
  { label: "الفساتين", href: "/dresses" },
  { label: "البدل", href: "/suits" },
  { label: "الجمال", href: "/beauty" },
  { label: "القاعات", href: "/venues" },
  { label: "الديكور", href: "/decor" },
];

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="border-t border-black/5 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="text-2xl font-black"
            >
              Tyson{" "}
              <span className="text-[#b87333]">
                Media
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#746f68]">
              منصة تجمع كل احتياجات الأفراح والمناسبات
              في مكان واحد، من الخدمات إلى المنتجات
              والحجز والتواصل مع مقدمي الخدمات.
            </p>
          </div>

          <div>
            <h3 className="font-black">
              اكتشف المنصة
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-bold text-[#746f68] transition hover:text-[#b87333]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black">
              عندك مشروع؟
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#746f68]">
              انضم إلى Tyson Media واعرض خدماتك
              ومنتجاتك أمام عملاء جدد.
            </p>

            <Link
              href="/register"
              className="mt-5 inline-flex rounded-xl bg-[#211f1c] px-5 py-3 text-sm font-black text-white transition hover:bg-[#b87333]"
            >
              ابدأ الآن
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-black/5 pt-6 text-sm text-[#9a948d] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Tyson Media
          </p>

          <div className="flex gap-4">
            <Link href="/privacy">
              الخصوصية
            </Link>

            <Link href="/terms">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}