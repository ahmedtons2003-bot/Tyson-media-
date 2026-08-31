"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

type Brand = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
};

type CarType = {
  id: string;
  brand_id: string;
  name: string;
  slug: string;
};

export default function CarsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [types, setTypes] = useState<CarType[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCars() {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!url || !key) {
          setError("إعدادات Supabase غير موجودة.");
          return;
        }

        const supabase = createClient(url, key);

        const { data: brandsData, error: brandsError } = await supabase
          .from("car_brands")
          .select("id, name, slug, image_url")
          .order("name");

        if (brandsError) {
          setError(brandsError.message);
          return;
        }

        const { data: typesData, error: typesError } = await supabase
          .from("car_types")
          .select("id, brand_id, name, slug")
          .order("name");

        if (typesError) {
          setError(typesError.message);
          return;
        }

        setBrands(brandsData || []);
        setTypes(typesData || []);
      } catch {
        setError("حدث خطأ أثناء تحميل السيارات.");
      } finally {
        setLoading(false);
      }
    }

    loadCars();
  }, []);

  const brandTypes = selectedBrand
    ? types.filter((type) => type.brand_id === selectedBrand.id)
    : [];

  return (
    <main dir="rtl" className="min-h-screen bg-[#fbfaf7] text-[#211f1c]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
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

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-[2rem] bg-[#211f1c] px-6 py-12 text-center text-white">
          <div className="text-6xl">🚘</div>

          <h1 className="mt-5 text-4xl font-black md:text-5xl">
            سيارات المناسبات
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/70">
            اختار العربية المناسبة لزفتك أو مناسبتك وكأنك داخل معرض سيارات.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        {loading && (
          <div className="rounded-2xl border bg-white p-8 text-center font-bold">
            جاري تحميل السيارات...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center font-bold text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Brands */}
            <div className="mb-8">
              <div className="mb-5">
                <p className="text-sm font-bold text-[#b87333]">
                  اختر الماركة
                </p>

                <h2 className="mt-1 text-3xl font-black">
                  ماركات السيارات
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand)}
                    className={`overflow-hidden rounded-2xl border bg-white text-right transition hover:-translate-y-1 hover:shadow-lg ${
                      selectedBrand?.id === brand.id
                        ? "border-[#b87333] ring-2 ring-[#b87333]/20"
                        : ""
                    }`}
                  >
                    <div className="flex h-36 items-center justify-center bg-[#eee6dc] text-6xl">
                      {brand.image_url ? (
                        <img
                          src={brand.image_url}
                          alt={brand.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        "🚘"
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-black">
                        {brand.name}
                      </h3>

                      <p className="mt-1 text-xs text-[#746f68]">
                        عرض الأنواع ←
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Types */}
            {selectedBrand && (
              <div className="mt-12">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#b87333]">
                      {selectedBrand.name}
                    </p>

                    <h2 className="mt-1 text-3xl font-black">
                      اختر نوع العربية
                    </h2>
                  </div>

                  <button
                    onClick={() => setSelectedBrand(null)}
                    className="rounded-xl border bg-white px-4 py-2 text-sm font-bold"
                  >
                    تغيير الماركة
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {brandTypes.map((type) => (
                    <div
                      key={type.id}
                      className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex h-40 items-center justify-center bg-[#eee6dc] text-6xl">
                        {type.slug === "suv"
                          ? "🚙"
                          : type.slug === "cabriolet"
                          ? "🏎️"
                          : type.slug === "coupe"
                          ? "🏎️"
                          : "🚘"}
                      </div>

                      <div className="p-5 text-center">
                        <h3 className="text-xl font-black">
                          {type.name}
                        </h3>

                        <button className="mt-4 w-full rounded-xl bg-[#211f1c] px-4 py-3 font-bold text-white">
                          اختيار العربية
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!selectedBrand && brands.length > 0 && (
              <div className="mt-8 rounded-3xl bg-[#eee6dc] p-7 text-center">
                <div className="text-4xl">👆</div>

                <h2 className="mt-3 text-2xl font-black">
                  اختار الماركة الأول
                </h2>

                <p className="mt-2 text-[#746f68]">
                  وبعدها هنظهر لك أنواع العربيات المتاحة.
                </p>
              </div>
            )}
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center">
          <div className="text-xl font-black">
            Tyson <span className="text-[#b87333]">Media</span>
          </div>

          <p className="mt-2 text-sm text-[#746f68]">
            سيارات المناسبات — اختار عربيتك للمناسبة.
          </p>
        </div>
      </footer>
    </main>
  );
}