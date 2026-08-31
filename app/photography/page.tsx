"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type Service = {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  provider: {
    business_name: string | null;
    city: string | null;
  } | null;
};

const categories = [
  ["💍", "تصوير أفراح", ["أفراح", "زفاف", "wedding"]],
  ["💐", "تصوير خطوبة", ["خطوبة"]],
  ["👤", "بورتريه", ["بورتريه", "portrait"]],
  ["👗", "فاشون", ["فاشون", "fashion", "أزياء"]],
  ["💄", "جمال ومكياج", ["مكياج", "جمال", "beauty"]],
  ["📦", "تصوير منتجات", ["منتجات", "product"]],
  ["🎉", "حفلات ومناسبات", ["حفلات", "مناسبات"]],
  ["🏢", "مؤتمرات وفعاليات", ["مؤتمرات", "فعاليات"]],
  ["🎥", "تصوير فيديو", ["فيديو", "video"]],
  ["🚁", "تصوير Drone", ["drone", "درون", "جوي"]],
] as const;

const governorates = [
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

export default function PhotographyPage() {
  const [selected, setSelected] = useState("الكل");
  const [city, setCity] = useState("الكل");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setError("إعدادات Supabase غير موجودة.");
        setLoading(false);
        return;
      }

      const supabase = createClient(url, key);

      const { data, error: queryError } = await supabase
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
        .order("created_at", { ascending: false });

      if (queryError) {
        setError(queryError.message);
      } else {
        setServices((data || []) as unknown as Service[]);
      }

      setLoading(false);
    }

    load();
  }, []);

  const filtered = useMemo(() => {
    let result = [...services];

    if (selected !== "الكل") {
      const category = categories.find(
        (item) => item[1] === selected
      );

      if (category) {
        result = result.filter((service) => {
          const text =
            `${service.title} ${service.description || ""}`.toLowerCase();

          return category[2].some((keyword) =>
            text.includes(keyword.toLowerCase())
          );
        });
      }
    }

    if (city !== "الكل") {
      result = result.filter(
        (service) => service.provider?.city === city
      );
    }

    return result;
  }, [services, selected, city]);

  function reset() {
    setSelected("الكل");
    setCity("الكل");
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f5f2] text-[#211f1c]"
    >
      <Header />

      {/* Hero */}

      <section className="mx-auto max-w-7xl px-4 pt-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#211f1c] px-6 py-14 text-white md:px-12 md:py-20">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#b87333]/20 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="text-6xl">📸</div>

            <p className="mt-6 text-xs font-black tracking-[0.25em] text-[#d6a66f]">
              PHOTOGRAPHY
            </p>

            <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
              التصوير
              <br />
              <span className="text-[#d6a66f]">
                لكل لحظة مهمة.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/60">
              اكتشف مصورين وخدمات تصوير حقيقية
              للأفراح والخطوبة والبورتريه والمنتجات
              والفيديو والفعاليات.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}

      <section className="mx-auto max-w-7xl px-4 pt-8">
        <div className="rounded-3xl border bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-black">
                نوع التصوير
              </label>

              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="w-full rounded-2xl border bg-white p-3 outline-none focus:border-[#b87333]"
              >
                <option value="الكل">
                 