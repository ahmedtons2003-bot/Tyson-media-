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
  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  useEffect(() => {
    async function loadProduct() {
      const { id } = await params;

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

      const supabase =
        createClient(url, key);

      const { data, error } =
        await supabase
          .from("products")
          .select(
            "id, name, description, price, image_url, category_id"
          )
          .eq("id", id)
          .single();

      if (error) {
        setMessage(
          "لم نتمكن من تحميل المنتج: " +
            error.message
        );
      } else {
        setProduct(
          data as Product
        );
      }

      setLoading(false);
    }

    loadProduct();
  }, [params]);

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#f7f7f7]"
      >
        <p className="font-bold">
          جاري تحميل المنتج...
        </p>
      </main>
    );
  }

  if (!product) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#f7f7f7] px-4"
      >
        <div className="w-full max-w-md rounded-3xl border bg-white p-8 text-center">
          <div className="text-6xl">
            🧶
          </div>

          <h1 className="mt-4 text-2xl font-black">
            المنتج غير موجود
          </h1>

          <p className="mt-3 text-sm leading-6 text-red-600">
            {message ||
              "المنتج الذي تبحث عنه غير موجود."}
          </p>

          <Link
            href="/handmade"
            className="mt-6 block rounded-xl bg-[#211f1c] px-5 py-3 font-black text-white"
          >
            العودة للهاند ميد
          </Link>
        </div>
      </main>
    );
  }

  const total =
    Number(product.price) * quantity;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f7f7] text-[#211f1c]"
    >
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-2xl font-black"
          >
            Tyson{" "}
            <span className="text-[#b87333]">
              Media
            </span>
          </Link>

          <Link
            href="/handmade"
            className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-black text-white"
          >
            ← الهاند ميد
          </Link>
        </div>
      </header>

      {/* Product */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Image */}
          <div className="overflow-hidden rounded-3xl border bg-white">
            <div className="flex min-h-[400px] items-center justify-center bg-[#eee6dc]">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full max-h-[600px] w-full object-cover"
                />
              ) : (
                <span className="text-8xl">
                  🧶
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="rounded-3xl border bg-white p-7">
            <span className="inline-block rounded-full bg-[#eee6dc] px-4 py-2 text-xs font-black">
              Handmade
            </span>

            <h1 className="mt-5 text-3xl font-black md:text-4xl">
              {product.name}
            </h1>

            {product.description && (
              <p className="mt-5 leading-8 text-gray-600">
                {product.description}
              </p>
            )}

            <div className="my-7 border-t" />

            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-500">
                السعر
              </span>

              <strong className="text-3xl font-black text-[#b87333]">
                {Number(
                  product.price
                ).toLocaleString(
                  "ar-EG"
                )}{" "}
                ج.م
              </strong>
            </div>

            {/* Quantity */}
            <div className="mt-7">
              <p className="mb-3 text-sm font-black">
                الكمية
              </p>

              <div className="flex w-fit items-center overflow-hidden rounded-xl border">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      Math.max(
                        1,
                        quantity - 1
                      )
                    )
                  }
                  className="px-5 py-3 text-xl font-black hover:bg-gray-100"
                >
                  −
                </button>

                <span className="min-w-14 text-center font-black">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      quantity + 1
                    )
                  }
                  className="px-5 py-3 text-xl font-black hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="mt-6 rounded-2xl bg-[#f7f3ee] p-5">
              <div className="flex items-center justify-between">
                <span className="font-bold">
                  الإجمالي
                </span>

                <strong className="text-2xl font-black">
                  {total.toLocaleString(
                    "ar-EG"
                  )}{" "}
                  ج.م
                </strong>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 grid gap-3">
              <Link
                href={`/bookings?service=${product.id}&type=handmade`}
                className="rounded-xl bg-[#b87333] px-5 py-4 text-center font-black text-white transition hover:bg-[#9f622b]"
              >
                طلب شراء المنتج 🛒
              </Link>

              <Link
                href="/handmade"
                className="rounded-xl border px-5 py-4 text-center font-black transition hover:bg-gray-50"
              >
                متابعة التسوق
              </Link>
            </div>

            <div className="mt-6 rounded-2xl border bg-gray-50 p-4 text-sm leading-6 text-gray-600">
              🛡️ سيتم التواصل مع البائع لتأكيد
              تفاصيل الطلب والتوصيل.
            </div>
          </div>
        </div>
      </section>

      {/* Bottom */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl bg-[#211f1c] p-8 text-center text-white">
          <div className="text-5xl">
            🧶
          </div>

          <h2 className="mt-4 text-2xl font-black">
            اكتشف منتجات Handmade أكثر
          </h2>

          <p className="mt-2 text-white/60">
            اختار من مئات المنتجات والبائعين.
          </p>

          <Link
            href="/handmade"
            className="mt-5 inline-block rounded-xl bg-[#b87333] px-7 py-3 font-black"
          >
            تصفح المنتجات
          </Link>
        </div>
      </section>
    </main>
  );
}