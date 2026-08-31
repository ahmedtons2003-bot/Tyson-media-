import Link from "next/link";

const services = [
  { href: "/photography", label: "التصوير" },
  { href: "/venues", label: "القاعات" },
  { href: "/dresses", label: "الفساتين" },
  { href: "/suits", label: "البدلات" },
  { href: "/beauty", label: "بيوتي" },
  { href: "/cars", label: "السيارات" },
  { href: "/handmade", label: "هاند ميد" },
];

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="mt-10 bg-[#211f1c] text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}

          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#b87333] text-sm font-black">
                TM
              </div>

              <div>
                <div className="text-xl font-black">
                  Tyson Media
                </div>

                <div className="mt-1 text-[10px] font-black tracking-[0.3em] text-[#d6a66f]">
                  EVENTS & SERVICES
                </div>
              </div>
            </Link>

            <p className="mt-6 text-sm leading-7 text-white/55">
              منصتك لاكتشاف وحجز خدمات الأفراح
              والمناسبات في مكان واحد.
            </p>
          </div>

          {/* Services */}

          <div>
            <h3 className="text-sm font-black text-[#d6a66f]">
              الخدمات
            </h3>

            <div className="mt-5 grid gap-3">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="w-fit text-sm text-white/60 transition hover:text-white"
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Platform */}

          <div>
            <h3 className="text-sm font-black text-[#d6a66f]">
              المنصة
            </h3>

            <div className="mt-5 grid gap-3">
              <Link
                href="/"
                className="text-sm text-white/60 hover:text-white"
              >
                الرئيسية
              </Link>

              <Link
                href="/providers"
                className="text-sm text-white/60 hover:text-white"
              >
                مقدمو الخدمات
              </Link>

              <Link
                href="/bookings"
                className="text-sm text-white/60 hover:text-white"
              >
                حجوزاتي
              </Link>

              <Link
                href="/register"
                className="text-sm text-white/60 hover:text-white"
              >
                إنشاء حساب
              </Link>

              <Link
                href="/login"
                className="text-sm text-white/60 hover:text-white"
              >
                تسجيل الدخول
              </Link>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-sm font-black text-[#d6a66f]">
              تواصل معنا
            </h3>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs text-white/40">
                  الهاتف
                </p>

                <a
                  href="tel:01208338744"
                  className="mt-1 block text-sm font-bold text-white/75 hover:text-white"
                >
                  01208338744
                </a>
              </div>

              <div>
                <p className="text-xs text-white/40">
                  الهاتف
                </p>

                <a
                  href="tel:01208338919"
                  className="mt-1 block text-sm font-bold text-white/75 hover:text-white"
                >
                  01208338919
                </a>
              </div>

              <div>
                <p className="text-xs text-white/40">
                  الموقع
                </p>

                <p className="mt-1 text-sm font-bold text-white/75">
                  مصر 🇪🇬
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Tyson Media.
            جميع الحقوق محفوظة.
          </p>

          <p>
            منصة خدمات الأفراح والمناسبات 🇪🇬
          </p>
        </div>
      </div>
    </footer>
  );
}