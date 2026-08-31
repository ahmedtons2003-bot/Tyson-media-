"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
};

export default function HandmadeProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const { id } = await params;

        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!url || !key) {
          setMessage("إعدادات Supabase غير موجودة.");
          setLoading(false);
          return;
        }

        const supabase = createClient(url, key);

        const { data, error } = await supabase
          .from("products")
          .select(
            "id, name, description, price, image_url, category_id"
          )
          .eq("id", id)
          .single();

        if (error) {
          setMessage(
            "لم نتمكن من تحميل المنتج: " + error.message
          );
        } else {
          setProduct(data as Product);
        }
      } catch (error) {
        setMessage("حدث خطأ أثناء تحميل المنتج.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params]);

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#f6f4f1]"
      >
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#211f1c] text-3xl">
            🧶
          </div>

          <p className="mt-5 font-black text-[#211f1c]">
            جاري تحميل المنتج...
          </p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#f6f4f1] px-4"
      >
        <div className="w-full max-w-md rounded-3xl border bg-white p-8 text-center shadow-sm">
          <div className="text-7xl">🧶</div>

          <h1 className="mt-5 text-2xl font-black">
            المنتج غير موجود
          </h1>

          <p className="mt-3 text-sm leading-7 text-red-600">
            {message || "المنتج الذي تبحث عنه غير موجود."}
          </p>

          <Link
            href="/handmade"
            className="mt-7 block rounded-2xl bg-[#211f1c] px-5 py-4 font-black text-white"
          >
            العودة إلى متجر الهاند ميد
          </Link>
        </div>
      </main>
    );
  }

  const price = Number(product.price || 0);
  const total = price * quantity;

  function addToCart() {
    try {
      const existing = JSON.parse(
        localStorage.getItem("tyson_cart") || "[]"
      );

      const index = existing.findIndex(
        (item: any) => item.id === product.id
      );

      if (index >= 0) {
        existing[index].quantity += quantity;
      } else {
        existing.push({
          id: product.id,
          name: product.name,
          price,
          image_url: product.image_url,
          quantity,
        });
      }

      localStorage.setItem(
        "tyson_cart",
        JSON.stringify(existing)
      );

      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 2500);
    } catch {
      setMessage("تعذر إضافة المنتج إلى السلة.");
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f6f4f1] text-[#211f1c]"
    >
      {/* Header */}
      <header className="