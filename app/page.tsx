"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Category = {
  id: string;
  name: string;
  slug: string;
  category_type: string;
  image_url: string | null;
};

type Service = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  provider?: {
    business_name: string;
    city: string | null;
  } | null;
};

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHome() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setError("إعدادات Supabase غير موجودة.");
        setLoading(false);
        return;
      }

      const supabase = createClient(url, key);

      const [categoriesResult, servicesResult] =
        await Promise.all([
          supabase
            .from("categories")
            .select(`
              id,
              name,
              slug,
              category_type,
              image_url
            `)
            .order("created_at", {
              ascending: false,
            }),

          supabase
            .from("services")
            .select(`
              id,
              title,
              description,
              price,
              image_url,
              provider:providers (
                business_name,
                city
              )
            `)
            .eq("is_active", true)
            .order("created_at", {
              ascending: false,
            })
            .limit(6),
        ]);

      if (categoriesResult.error) {
        setError(
          "حدث خطأ أثناء تحميل الأقسام: " +
            categoriesResult.error.message
        );
      } else {
        setCategories(
          (categoriesResult.data || []) as Category[]
        );
      }

      if (servicesResult.error) {
        setError(
          "حدث خطأ أثناء تحميل الخدمات: " +
            servicesResult.error.message
        );
      } else {
        setServices(
          (servicesResult.data || []) as unknown as Service[]
        );
      }

      setLoading(false);
    }

    loadHome();
  }, []);

  function categoryLink(category: Category) {
    const slug = category.slug?.toLowerCase().trim() || "";
    const name = category.name?.toLowerCase().trim() || "";

    if (
      slug === "drone" ||
      name.includes("درون")
    ) {
      return "/photography?category=drone";
    }

    if (
      slug === "photography-quality" ||
      name.includes("جودة")
    ) {
      return "/photography?category=video";
    }

    if (
      slug.includes("photo") ||
      slug.includes("photography") ||
      slug.includes("تصوير") ||
      name.includes("تصوير")
    ) {
      return "/photography";
    }

    if (
      slug.includes("hand") ||
      slug.includes("handmade") ||
      slug.includes("هاند") ||
      slug.includes("صناعات") ||
      name.includes("هاند")
    ) {
      return "/handmade";
    }

    return `/category/${category.slug}`;
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#fbfaf7] text-[#211f1c]"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight"
          >
            Tyson{" "}
            <span className="text-[#b87333]">
              Media
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-bold text-[#b87333]"
            >
              الرئيسية
            </Link>

            <Link
              href="/photography"
              className="text-sm font-bold hover:text-[#b87333]"
            >
              التصوير
            </Link>

            <Link
              href="/handmade"
              className="text-sm font-bold hover:text-[#b87333]"
            >
              هاند ميد
            </Link>

            <Link
              href="/dashboard"
              className="text-sm font-bold hover:text-[#b87333]"
            >
              حجوزاتي
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-xl border px-4 py-2 text-sm font-bold"
            >
              دخول
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-bold text-white"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#211f1c] px-6 py-14 text-white md:px-12 md:py-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold">
              ✨ كل خدمات مناسبتك في مكان واحد
            </div>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              خطط مناسبتك
              <br />
              <span className="text-[#d99b63]">
                بسهولة مع Tyson Media
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
              اكتشف المصورين ومقدمي الخدمات والمنتجات
              المناسبة للأفراح والمناسبات واحجز الخدمة
              التي تناسبك بسهولة.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/photography"
                className="rounded-xl bg-[#b87333] px-7 py-4 text-center font-black text-white transition hover:bg-[#d08b4d]"
              >
                اكتشف خدمات التصوير 📸
              </Link>

              <Link
                href="/handmade"
                className="rounded-xl border border-white/15 bg-white/10 px-7 py-4 text-center font-black text-white"
              >
                اكتشف المنتجات 🎁
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm font-black text-[#b87333]">
            EXPLORE
          </p>

          <h2 className="mt-2 text-3xl font-black">
            اكتشف الأقسام
          </h2>

          <p className="mt-2 text-sm text-[#746f68]">
            اختار القسم المناسب لمناسبتك
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border bg-white p-8 text-center font-bold">
            جاري تحميل الأقسام...
          </div>
        ) : categories.length === 0 ? (
          <div className="rounded-2xl border bg-white p-8 text-center text-sm font-bold">
            لا توجد أقسام متاحة حاليًا.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={categoryLink(category)}
                className="group overflow-hidden rounded-3xl border bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-36 items-center justify-center overflow-hidden bg-[#eee6dc] text-5xl">
                  {category.image_url ? (
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    "✨"
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-black">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#746f68]">
                    اكتشف الخدمات
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Main Services */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black text-[#b87333]">
              SERVICES
            </p>

            <h2 className="mt-2 text-3xl font-black">
              أحدث الخدمات
            </h2>

            <p className="mt-2 text-sm text-[#746f68]">
              خدمات مقدمي الخدمة على المنصة
            </p>
          </div>

          <Link
            href="/photography"
            className="hidden rounded-xl bg-[#211f1c] px-5 py-3 text-sm font-black text-white sm:block"
          >
            عرض الكل
          </Link>
        </div>

        {loading ? (
          <div className="rounded-2xl border bg-white p-8 text-center font-bold">
            جاري تحميل الخدمات...
          </div>
        ) : services.length === 0 ? (
          <div className="rounded-2xl border bg-white p-8 text-center font-bold">
            لا توجد خدمات متاحة حاليًا.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-48 items-center justify-center overflow-hidden bg-[#eee6dc] text-6xl">
                  {service.image_url ? (
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "📸"
                  )}
                </div>

                <div className="p-5">
                  <p className="text-sm font-bold text-[#b87333]">
                    ⭐ خدمة مميزة
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    {service.title}
                  </h3>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-[#746f68]">
                    {service.description ||
                      "خدمة احترافية مقدمة من أحد مقدمي الخدمات على Tyson Media."}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-[#746f68]">
                    {service.provider?.business_name && (
                      <p>
                        🏪{" "}
                        <span className="font-bold text-[#211f1c]">
                          {service.provider.business_name}
                        </span>
                      </p>
                    )}

                    {service.provider?.city && (
                      <p>
                        📍 {service.provider.city}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-[#746f68]">
                        السعر يبدأ من
                      </p>

                      <p className="text-xl font-black">
                        {Number(
                          service.price || 0
                        ).toLocaleString("ar-EG")}{" "}
                        ج.م
                      </p>
                    </div>

                    <Link
                      href={`/bookings?service=${service.id}`}
                      className="rounded-xl bg-[#211f1c] px-5 py-3 text-sm font-black text-white transition hover:bg-[#b87333]"
                    >
                      احجز الآن
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <Link
          href="/photography"
          className="mt-5 block rounded-xl bg-[#211f1c] px-5 py-3 text-center text-sm font-black text-white sm:hidden"
        >
          عرض جميع الخدمات
        </Link>
      </section>

      {/* Handmade */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-5 md:grid-cols-2">
          <Link
            href="/handmade"
            className="group rounded-3xl bg-[#e9ddd0] p-7 transition hover:-translate-y-1"
          >
            <div className="text-5xl">🎁</div>

            <h2 className="mt-5 text-2xl font-black">
              هاند ميد وهدايا
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#746f68]">
              هدايا ومنتجات يدوية وإكسسوارات مناسبة
              للأفراح والمناسبات.
            </p>

            <span className="mt-5 inline-block font-black text-[#b87333]">
              اكتشف المنتجات ←
            </span>
          </Link>

          <Link
            href="/photography"
            className="group rounded-3xl bg-[#211f1c] p-7 text-white transition hover:-translate-y-1"
          >
            <div className="text-5xl">📸</div>

            <h2 className="mt-5 text-2xl font-black">
              التصوير والمناسبات
            </h2>

            <p className="mt-3 text-sm leading-7 text-white/60">
              احجز مصورك وخدمة التصوير المناسبة
              لمناسبتك بسهولة.
            </p>

            <span className="mt-5 inline-block font-black text-[#d99b63]">
              احجز الآن ←
            </span>
          </Link>
        </div>
      </section>

      {/* Provider CTA */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-3xl border bg-white p-7 text-center md:p-10">
          <div className="text-5xl">🏪</div>

          <h2 className="mt-4 text-3xl font-black">
            عندك خدمة أو مشروع؟
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#746f68]">
            انضم إلى Tyson Media واعرض خدماتك ومنتجاتك
            أمام العملاء واستقبل طلبات الحجز.
          </p>

          <Link
            href="/register"
            className="mt-6 inline-block rounded-xl bg-[#b87333] px-7 py-4 font-black text-white"
          >
            انضم كمقدم خدمة
          </Link>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="mx-auto max-w-7xl px-4 pb-6">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm font-bold text-red-700">
            {error}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-10 bg-[#211f1c] px-4 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-2xl font-black">
                Tyson{" "}
                <span className="text-[#d99b63]">
                  Media
                </span>
              </p>

              <p className="mt-2 text-sm text-white/50">
                منصتك لخدمات الأفراح والمناسبات.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-bold text-white/70">
              <Link href="/">الرئيسية</Link>

              <Link href="/photography">
                التصوير
              </Link>

              <Link href="/handmade">
                هاند ميد
              </Link>

              <Link href="/login">
                تسجيل الدخول
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Tyson Media — جميع الحقوق محفوظة
          </div>
        </div>
      </footer>
    </main>
  );
}