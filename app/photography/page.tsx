"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Service = {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  provider: {
    business_name: string;
    city: string | null;
  } | null;
};

const photographyCategories = [
  {
    icon: "💍",
    title: "تصوير أفراح و زفاف",
    keywords: ["أفراح", "زفاف", "wedding"],
  },
  {
    icon: "💐",
    title: "تصوير خطوبة",
    keywords: ["خطوبة", "خطيب"],
  },
  {
    icon: "👤",
    title: "Portrait",
    keywords: ["portrait", "شخصية", "بورتريه"],
  },
  {
    icon: "👗",
    title: "Fashion",
    keywords: ["fashion", "أزياء", "موضة"],
  },
  {
    icon: "💄",
    title: "Makeup & Beauty",
    keywords: ["makeup", "beauty", "مكياج", "جمال"],
  },
  {
    icon: "📦",
    title: "تصوير منتجات",
    keywords: ["منتجات", "product"],
  },
  {
    icon: "🎉",
    title: "حفلات ومناسبات",
    keywords: ["حفلات", "مناسبات", "events"],
  },
  {
    icon: "🏢",
    title: "مؤتمرات وفعاليات",
    keywords: ["مؤتمرات", "فعاليات", "conference"],
  },
  {
    icon: "🎥",
    title: "تصوير فيديو",
    keywords: ["فيديو", "video"],
  },
  {
    icon: "🚁",
    title: "تصوير Drone",
    keywords: ["drone", "درون", "جوي"],
  },
];

const videoQualities = [
  "HD 720p",
  "Full HD 1080p",
  "2K",
  "4K",
  "6K",
  "8K",
];

const egyptGovernorates = [
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
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("الكل");

  const [city, setCity] =
    useState("كل المحافظات");

  useEffect(() => {
    async function loadServices() {
      const url =
        process.env.NEXT_PUBLIC_SUPABASE_URL;

      const key =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setError(
          "إعدادات Supabase غير موجودة."
        );
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
          provider:providers (
            business_name,
            city
          )
        `)
        .eq("is_active", true)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        setError(error.message);
      } else {
        setServices(
          (data || []) as unknown as Service[]
        );
      }

      setLoading(false);
    }

    loadServices();
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const text = `${service.title || ""} ${
        service.description || ""
      }`.toLowerCase();

      let matchesCategory = true;

      if (selectedCategory !== "الكل") {
        const category =
          photographyCategories.find(
            (item) =>
              item.title === selectedCategory
          );

        if (category) {
          matchesCategory =
            category.keywords.some((keyword) =>
              text.includes(
                keyword.toLowerCase()
              )
            );
        }
      }

      let matchesCity = true;

      if (city !== "كل المحافظات") {
        matchesCity =
          service.provider?.city
            ?.trim()
            .toLowerCase() ===
          city.trim().toLowerCase();
      }

      return (
        matchesCategory && matchesCity
      );
    });
  }, [
    services,
    selectedCategory,
    city,
  ]);

  function resetFilters() {
    setSelectedCategory("الكل");
    setCity("كل المحافظات");
  }

  return (
    <main
      dir="rtl"
      class