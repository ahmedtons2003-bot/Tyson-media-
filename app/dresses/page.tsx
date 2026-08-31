"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type Product = {
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
  ["👰", "فساتين زفاف"],
  ["💍", "فساتين خطوبة"],
  ["✨", "سواريه"],
  ["🧵", "تفصيل"],
  ["👗", "إيجار"],
  ["💎", "إكسسوارات"],
] as const;

const cities = [
  "القاهرة",
  "الإسكندرية",
  "الجيزة",
  "القليوبية",
  "البحيرة",
  "الدقهلية",
  "الشرقية",
  "الغربية",
  "المنوفية",
  "كفر الشيخ",
  "دمياط",
  "بورسعيد",
  "الإسماعيلية",
  "السويس",
  "مطروح",
  "البحر الأحمر",
];

export default function DressesPage() {
  const [category, setCategory] = useState("الكل");
  const [city, setCity] = useState("الكل");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setError("إعدادات قاعدة البيانات غير موجودة.");
        setLoading(false);
        return;
      }

      const supabase = createClient(url, key);

      const { data, error: queryError } = await supabase
        .from("products")
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
        .order("created_at", { ascending: false });

      if (queryError) {
        setError(queryError.message);
      } else {
        setProducts((data || []) as unknown as Product[]);
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "الكل") {
      result = result.filter((product) => {
        const text =
          `${product.title} ${product.description || ""}`.toLowerCase();

        const words: Record<string, string[]> = {
          "فساتين زفاف": ["زفاف", "