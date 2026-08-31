"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
};

const categories = [
  { name: "الكل", icon: "🛍️" },
  { name: "شنط هاند ميد", icon: "👜" },
  { name: "خواتم", icon: "💍" },
  { name: "انسيالات", icon: "📿" },
  { name: "سلاسل", icon: "⛓️" },
  { name: "إكسسوارات", icon: "✨" },
  { name: "هدايا هاند ميد", icon: "🎁" },
  { name: "تطريز", icon: "🧵" },
  { name: "كروشيه", icon: "🧶" },
  { name: "مكرمية", icon: "🪢" },
  { name: "توزيعات مناسبات", icon: "🎀" },
  { name: "ديكورات هاند ميد", icon: "🏠" },
  { name: "شموع", icon: "🕯️" },
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

export default function HandmadePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const [governorate, setGovernorate] =
    useState("كل المحافظات");

  const [sort, setSort] = useState("newest");

  useEffect(() => {
    async function loadProducts() {
      const url =
        process.env.NEXT_PUBLIC_SUPABASE_URL;

      const key =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setMessage(
          "إعدادات Supabase غير موجودة."
        );
        setLoading(false);
        return;
      }

      const supabase = createClient(url, key);

      const { data, error } = await supabase
        .from("products")
        .select(
          "id, name, description, price, image_url, category_id"
        )
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        setMessage(
          "حدث خطأ أثناء تحميل المنتجات: " +
            error.message
        );
      } else {
        setProducts(
          (data || []) as Product[]
        );
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const value =
        search.trim().toLowerCase();

      result = result.filter((product) =>
        `${product.name} ${
          product.description || ""
        }`
          .toLowerCase()
          .includes(value)
      );
    }

    if (category !== "الكل") {
      const searchCategory = category
        .replace("هاند ميد", "")
        .trim()
        .toLowerCase();

      result = result.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchCategory)
      );
    }

    if (sort === "price_low") {
      result.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );
    }

    if (sort === "price_high") {
      result.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );
    }

    return result;
  }, [products, search, category, sort]);

  function clearFilters() {
    setSearch("");
    setCategory("الكل");
    setGovernorate("كل المحافظات");
    setSort("newest");
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f7f7] text-[#211f1c]"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
             