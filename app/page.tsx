"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Service = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number | null;
  image_url: string | null;
  provider: {
    business_name: string;
    city: string | null;
  } | null;
};

export default function PhotographyPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          duration_minutes,
          image_url,
          provider:providers (
            business_name,
            city
          )
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setServices((data as unknown as Service[]) || []);
      }

      setLoading(false);
    }

    loadServices();
  }, []);

  return (
    <main dir="rtl" className="min-h-screen bg-[#fbfaf7] text-[#211f1c]">
      <header className="border-b bg-white">
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

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-[2rem] bg-[#211f1c] px-6 py-14 text-center text-white">
          <div className="text-6xl">📸</div>

          <h1 className="mt-5 text-4xl font-black md:text-5xl">
            خدمات التصوير
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            اختار خدمة التصوير المناسبة لك واحجز مع مقدم الخدمة.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        {loading && (
          <div className="rounded-2xl border bg-white p-8 text-center font-bold">
            جاري تحميل الخدمات...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center font-bold text-red-700">
            حدث خطأ: {error}
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="rounded-2xl border bg-white p-8 text-center font-bold">
            لا توجد خدمات متاحة حاليًا.
          </div>
        )}

        {!loading && !error && services.length > 0 && (
          <>
            <div className="mb-7">
              <p className="text-sm font-bold text-[#b87333]">
                Photography
              </p>

              <h2 className="mt-2 text-3xl font-black">
                الخدمات المتاحة
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-52 items-center justify-center bg-[#eee6dc] text-7xl">
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

                  <div className="p-6">
                    <div className="mb-2 text-sm font-bold text-[#b87333]">
                      ⭐ 4.9
                    </div>

                    <h3 className="text-xl font-black">
                      {service.title}
                    </h3>

                    <p className="mt-3 min-h-12 text-sm leading-6 text-[#746f68]">
                      {service.description}
                    </p>

                    <div className="mt-5 space-y-2 text-sm text-[#746f68]">
                      <p>
                        🏪{" "}
                        <span className="font-bold text-[#211f1c]">
                          {service.provider?.business_name ||
                            "مقدم خدمة"}
                        </span>
                      </p>

                      {service.provider?.city && (
                        <p>📍 {service.provider.city}</p>
                      )}

                      {service.duration_minutes && (
                        <p>
                         