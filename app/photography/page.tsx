"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Provider = {
  business_name: string | null;
  city: string | null;
};

type Service = {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  created_at: string;
  provider: Provider | null;
};

const photographyCategories = [
  { icon: "💍", title: "تصوير أفراح و زفاف", keywords: ["أفراح", "زفاف", "wedding"] },
  { icon: "💐", title: "تصوير خطوبة", keywords: ["خطوبة", "engagement"] },
  { icon: "👤", title: "بورتريه", keywords: ["بورتريه", "portrait"] },
  { icon: "👗", title: "تصوير فاشون", keywords: ["فاشون", "fashion", "أزياء"] },
  { icon: "💄", title: "تصوير مكياج وجمال", keywords: ["مكياج", "جمال", "beauty", "makeup"] },
  { icon: "📦", title: "تصوير منتجات", keywords: ["منتجات", "product"] },
  { icon: "🎉", title: "الحفلات والمناسبات", keywords: ["حفلات", "مناسبات"] },
  { icon: "🏢", title: "مؤتمرات وفعاليات", keywords: ["مؤتمرات", "فعاليات"] },
  { icon: "🎥", title: "تصوير فيديو", keywords: ["فيديو", "video"] },
  { icon: "🚁", title: "تصوير Drone", keywords: ["drone", "درون", "جوي"] },
];

const governorates = [
  "كل المحافظات",
  "القاهرة",
  "الإسكندرية",
  "الجيزة",
  "القليوبية",
  "الدقهلية",
  "الشرقية",
  "الغربية",
  "المنوفية",
  "البحيرة",
  "كفر الشيخ",
  "دمياط",
  "بورسعيد",
  "الإسماعيلية",
  "السويس",
  "شمال سيناء",
  "جنوب سيناء",
  "البحر الأحمر",
  "الفيوم",
  "بني سويف",
  "المنيا",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
  "الوادي الجديد",
  "مطروح",
];

const videoQualities = [
  "HD 720p",
  "Full HD 1080p",
  "2K",
  "4K",
  "6K",
  "8K",
];

export default function PhotographyPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const [city, setCity] = useState("كل المحافظات");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    async function loadServices() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setError("إعدادات Supabase غير موجودة.");
        setLoading(false);
        return;
      }

      const supabase = createClient(url, key);

      const { data, error } = await supabase
        .from("services")
        .select(`
          id,
          title,
          description,
          price,
          image_url,
          created_at,
          provider:providers (
            business_name,
            city
          )
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        setError("حدث خطأ أثناء تحميل الخدمات: " + error.message);
      } else {
        setServices((data || []) as unknown as Service[]);
      }

      setLoading(false);
    }

    loadServices();
  }, []);

  const filteredServices = useMemo(() => {
    let result = [...services];

    if (search.trim()) {
      const value = search.trim().toLowerCase();

      result = result.filter((service) => {
        const text = `
          ${service.title}
          ${service.description || ""}
          ${service.provider?.business_name || ""}
          ${service.provider?.city || ""}
        `.toLowerCase();

        return text.includes(value);
      });
    }

    if (category !== "الكل") {
      const selected = photographyCategories.find(
        (item) => item.title === category
      );

      if (selected) {
        result = result.filter((service) => {
          const text = `
            ${service.title}
            ${service.description || ""}
          `.toLowerCase();

          return selected.keywords.some((keyword) =>
            text.includes(keyword.toLowerCase())
          );
        });
      }
    }

    if (city !== "كل المحافظات") {
      result = result.filter(
        (service) => service.provider?.city === city
      );
    }

    if (sort === "price_low") {
      result.sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );
    }

    if (sort === "price_high") {
      result.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    }

    if (sort === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );
    }

    return result;
  }, [services, search, category, city, sort]);

  function resetFilters() {
    setSearch("");
    setCategory("الكل");
    setCity("كل المحافظات");
    setSort("newest");
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f6f5f3] text-[#211f1c]"
    >
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center gap-3">
            <Link
              href="/"
              className="shrink-0 text-2xl font-black"
            >
              Tyson{" "}
              <span className="text-[#b87333]">
                Media
              </span>
            </Link>

            <div className="relative hidden flex-1 md:block">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن مصور، أفراح، بورتريه..."
                className="w-full rounded-2xl border bg-[#f5f5f5] px-5 py-3 pr-12 text-sm font-bold outline-none focus:border-[#b87333]"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                🔎
              </span>
            </div>

            <Link
              href="/cart"
              className="rounded-xl border px-3 py-2 font-black"
            >
              🛒
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl bg-[#211f1c] px-4 py-2.5 text-sm font-black text-white"
            >
              حسابي
            </Link>
          </div>

          <div className="pb-3 md:hidden">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن خدمة تصوير..."
                className="w-full rounded-xl border bg-[#f5f5f5] p-3 pr-11 font-bold outline-none focus:border-[#b87333]"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                🔎
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 py-5">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#211f1c] px-6 py-12 text-white md:px-12 md:py-16">
          <div className="relative z-10">
            <p className="text-sm font-black text-[#d6a66f]">
              TYSON MEDIA • PHOTOGRAPHY
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              احجز مصورك
              <br />
              <span className="text-[#d6a66f]">
                لكل لحظة مهمة 📸
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-lg">
              أفراح، خطوبة، بورتريه، فاشون،
              منتجات، فيديو وDrone.
              قارن الخدمات والأسعار واختار المناسب ليك.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                💍 أفراح
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                💐 خطوبة
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                🎥 فيديو
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                🚁 Drone
              </span>
            </div>
          </div>

          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#b87333]/20 blur-3xl" />
          <div className="absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        </div>
      </section>

      {/* FILTERS */}
      <section className="mx-auto max-w-7xl px-4 py-3">
        <div className="rounded-3xl border bg-white p-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-black">
                نوع التصوير
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border bg-white p-3 font-bold outline-none focus:border-[#b87333]"
              >
                <option value="الكل">
                  كل أنواع التصوير
                </option>

                {photographyCategories.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black">
                المحافظة
              </label>

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border bg-white p-3 font-bold outline-none focus:border-[#b87333]"
              >
                {governorates.map((item) => (
                  <option key={item} value={item}>
                    📍 {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black">
                ترتيب الخدمات
              </label>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-xl border bg-white p-3 font-bold outline-none focus:border-[#b87333]"
              >
                <option value="newest">الأحدث</option>
                <option value="price_low">
                  السعر: الأقل أولًا
                </option>
                <option value="price_high">
                  السعر: الأعلى أولًا
                </option>
              </select>
            </div>
          </div>

          {(search ||
            category !== "الكل" ||
            city !== "كل المحافظات" ||
            sort !== "newest") && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 rounded-xl bg-[#eee6dc] px-5 py-3 text-sm font-black"
            >
              مسح الفلاتر
            </button>
          )}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <p className="text-xs font-black text-[#b87333]">
            PHOTOGRAPHY CATEGORIES
          </p>

          <h2 className="mt-1 text-3xl font-black">
            اختار نوع التصوير
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {photographyCategories.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setCategory(item.title)}
              className={`rounded-2xl border p-4 text-right transition hover:-translate-y-1 hover:shadow-lg ${
                category === item.title
                  ? "border-[#b87333] bg-[#fff8f1]"
                  : "bg-white"
              }`}
            >
              <div className="flex h-20 items-center justify-center rounded-xl bg-[#eee6dc] text-4xl">
                {item.icon}
              </div>

              <h3 className="mt-3 text-sm font-black">
                {item.title}
              </h3>

              <p className="mt-2 text-xs font-bold text-[#b87333]">
                عرض الخدمات ←
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-black text-[#b87333]">
              AVAILABLE SERVICES
            </p>

            <h2 className="mt-1 text-3xl font-black">
              خدمات التصوير
            </h2>
          </div>

          <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-500">
            {filteredServices.length} خدمة
          </span>
        </div>

        {loading ? (
          <div className="rounded-3xl border bg-white p-16 text-center">
            <div className="text-5xl">📸</div>

            <p className="mt-4 font-black">
              جاري تحميل الخدمات...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-3xl border bg-red-50 p-10 text-center text-red-700">
            <p className="font-black">
              {error}
            </p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="rounded-3xl border bg-white p-16 text-center">
            <div className="text-6xl">📭</div>

            <h3 className="mt-5 text-2xl font-black">
              مفيش خدمات مطابقة
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              جرّب تغيير البحث أو المحافظة أو نوع التصوير.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-xl bg-[#211f1c] px-7 py-3 font-black text-white"
            >
              عرض كل الخدمات
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                className="group overflow-hidden rounded-3xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Link
                  href={`/photography/${service.id}`}
                  className="block"
                >
                  <div className="relative h-52 overflow-hidden bg-[#eee6dc]">
                    {service.image_url ? (
                      <img
                        src={service.image_url}
                        alt={service.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-7xl">
                        📸
                      </div>
                    )}

                    <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-black">
                      Photography
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="line-clamp-2 text-xl font-black">
                      {service.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-6 text-gray-500">
                      {service.description ||
                        "خدمة تصوير احترافية للمناسبات."}
                    </p>

                    <div className="mt-4 space-y-2 text-sm">
                      {service.provider?.business_name && (
                        <p className="font-bold">
                          🏪 {service.provider.business_name}
                        </p>
                      )}

                      {service.provider?.city && (
                        <p className="text-gray-500">
                          📍 {service.provider.city}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs text-gray-400">
                          السعر يبدأ من
                        </p>

                        <p className="mt-1 text-xl font-black text-[#b87333]">
                          {Number(
                            service.price || 0
                          ).toLocaleString("ar-EG")}{" "}
                          ج.م
                        </p>
                      </div>

                      <span className="rounded-xl bg-[#211f1c] px-5 py-3 text-sm font-black text-white transition group-hover:bg-[#b87333]">
                        عرض الخدمة
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* VIDEO */}
      {(category === "الكل" ||
        category === "تصوير فيديو") && (
        <section className="mx-auto max-w-7xl px-4 pb-12">
          <div className="rounded-[2rem] bg-[#eee6dc] p-7 md:p-10">
            <p className="text-xs font-black text-[#b87333]">
              VIDEO PRODUCTION
            </p>

            <h2 className="mt-2 text-3xl font-black">
              اختار جودة الفيديو 🎥
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              اختار الجودة المناسبة لخدمتك.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {videoQualities.map((quality) => (
                <Link
                  key={quality}
                  href={`/bookings?service=video&quality=${encodeURIComponent(
                    quality
                  )}`}
                  className="rounded-xl bg-white p-4 text-center font-black transition hover:-translate-y-1 hover:shadow-md"
                >
                  {quality}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROVIDER CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-[2rem] bg-[#211f1c] p-8 text-white md:p-12">
          <p className="text-sm font-black text-[#d6a66f]">
            FOR PHOTOGRAPHERS
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            أنت مصور؟ اعرض خدماتك على Tyson Media
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-white/60">
            اعرض الباكدجات والأسعار وأعمالك،
            واستقبل حجوزات من العملاء على المنصة.
          </p>

          <Link
            href="/register"
            className="mt-7 inline-block rounded-xl bg-[#b87333] px-7 py-4 font-black text-white"
          >
            ابدأ كمقدم خدمة
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xl font-black">
                Tyson{" "}
                <span className="text-[#b87333]">
                  Media
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                منصة خدمات ومنتجات المناسبات.
              </p>
            </div>

            <div className="flex gap-4 text-sm font-bold text-gray-600">
              <Link href="/">الرئيسية</Link>
              <Link href="/handmade">Handmade</Link>
              <Link href="/cars">السيارات</Link>
              <Link href="/cart">ال