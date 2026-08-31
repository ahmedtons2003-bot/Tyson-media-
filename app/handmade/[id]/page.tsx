"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
  created_at: string | null;
};

export default function HandmadeProductPage() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const [added, setAdded] =
    useState(false);

  useEffect(() => {
    async function loadProduct() {
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

      if (!id) {
        setError(
          "معرف المنتج غير موجود."
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
            "id, name, description, price, image_url, category_id, created_at"
          )
          .eq("id", id)
          .single();

      if (error) {
        setError(
          "المنتج غير موجود أو حدث خطأ أثناء تحميله."
        );
      } else {
        setProduct(data as Product);
      }

      setLoading(false);
    }

    loadProduct();
  }, [id]);

  function addToCart() {
    if (!product) return;

    const savedCart =
      localStorage.getItem(
        "tyson_cart"
      );

    let cart: any[] = [];

    try {
      cart = savedCart
        ? JSON.parse(savedCart)
        : [];
    } catch {
      cart = [];
    }

    const existingIndex =
      cart.findIndex(
        (item) =>
          item.id === product.id
      );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity +=
        quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: Number(
          product.price
        ),
        image_url:
          product.image_url,
        quantity,
        type: "handmade",
      });
    }

    localStorage.setItem(
      "tyson_cart",
      JSON.stringify(cart)
    );

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2500);
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-[#f7f5f2]"
      >
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="h-[450px] animate-pulse rounded-[2rem] bg-gray-200" />

            <div className="space-y-4">
              <div className="h-10 animate-pulse rounded bg-gray-200" />
              <div className="h-20 animate-pulse rounded bg-gray-200" />
              <div className="h-16 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-[#f7f5f2]"
      >
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <div className="text-7xl">
            🧶
          </div>

          <h1 className="mt-6 text-3xl font-black">
            المنتج غير موجود
          </h1>

          <p className="mt-3 text-gray-500">
            {error ||
              "لم نتمكن من العثور على هذا المنتج."}
          </p>

          <Link
            href="/handmade"
            className="mt-7 inline-flex rounded-xl bg-[#211f1c] px-7 py-4 font-black text-white"
          >
            العودة للمتجر
          </Link>
        </div>
      </main>
    );
  }

  const total =
    Number(product.price) *
    quantity;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f5f2] text-[#211f1c]"
    >
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-[70px] items-center justify-between gap-3">

            <Link
              href="/"
              className="text-xl font-black sm:text-2xl"
            >
              Tyson{" "}
              <span className="text-[#b87333]">
                Media
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href="/handmade"
                className="hidden rounded-xl border px-4 py-2.5 text-sm font-black sm:block"
              >
                متجر Handmade
              </Link>

              <Link
                href="/cart"
                className="flex h-11 w-11 items-center justify-center rounded-xl border text-lg"
              >
                🛒
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-gray-400">
          <Link
            href="/"
            className="hover:text-[#b87333]"
          >
            الرئيسية
          </Link>

          <span>←</span>

          <Link
            href="/handmade"
            className="hover:text-[#b87333]"
          >
            Handmade
          </Link>

          <span>←</span>

          <span className="text-gray-600">
            {product.name}
          </span>
        </div>
      </div>

      {/* PRODUCT */}
      <section className="mx-auto max-w-7xl px-4 py-6 pb-16">
        <div className="grid gap-6 md:grid-cols-2">

          {/* IMAGE */}
          <div className="overflow-hidden rounded-[2rem] border bg-white shadow-sm">
            <div className="relative h-[400px] bg-[#eee6dc] sm:h-[500px]">

              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[130px]">
                  🧶
                </div>
              )}

              <div className="absolute right-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-black shadow">
                Handmade
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className="flex flex-col rounded-[2rem] border bg-white p-6 shadow-sm sm:p-8">

            <p className="text-xs font-black tracking-widest text-[#b87333]">
              HANDMADE PRODUCT
            </p>

            <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-5">
              <span className="text-sm text-gray-400">
                السعر
              </span>

              <div className="mt-1 text-3xl font-black text-[#b87333]">
                {Number(
                  product.price
                ).toLocaleString(
                  "ar-EG"
                )}{" "}
                <span className="text-base">
                  ج.م
                </span>
              </div>
            </div>

            <div className="my-6 h-px bg-gray-100" />

            {product.description ? (
              <div>
                <h2 className="font-black">
                  وصف المنتج
                </h2>

                <p className="mt-3 whitespace-pre-line text-sm leading-8 text-gray-600">
                  {product.description}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                لا يوجد وصف لهذا المنتج.
              </p>
            )}

            <div className="my-6 h-px bg-gray-100" />

            {/* QUANTITY */}
            <div>
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
                  className="flex h-11 w-11 items-center justify-center text-xl font-black hover:bg-gray-50"
                >
                  −
                </button>

                <div className="flex h-11 w-12 items-center justify-center border-x font-black">
                  {quantity}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      quantity + 1
                    )
                  }
                  className="flex h-11 w-11 items-center justify-center text-xl font-black hover:bg-gray-50"
                >
                  +
                </button>

              </div>
            </div>

            {/* TOTAL */}
            <div className="mt-6 rounded-2xl bg-[#f7f3ee] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-500">
                  الإجمالي
                </span>

                <strong className="text-xl font-black">
                  {total.toLocaleString(
                    "ar-EG"
                  )}{" "}
                  ج.م
                </strong>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">

              <button
                type="button"
                onClick={addToCart}
                className="rounded-xl bg-[#211f1c] px-5 py-4 font-black text-white transition hover:bg-[#b87333]"
              >
                🛒 إضافة للسلة
              </button>

              <Link
                href="/cart"
                className="rounded-xl border px-5 py-4 text-center font-black transition hover:bg-[#f7f3ee]"
              >
                الذهاب للسلة
              </Link>

            </div>

            {added && (
              <div className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-center text-sm font-black text-green-700">
                ✓ تمت إضافة المنتج للسلة
              </div>
            )}

          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-3 sm:grid-cols-3">

          <div className="rounded-2xl border bg-white p-5">
            <div className="text-3xl">
              🛡️
            </div>

            <h3 className="mt-3 font-black">
              شراء من مكان واحد
            </h3>

            <p className="mt-2 text-xs leading-6 text-gray-500">
              اكتشف منتجات وخدمات المناسبات
              من خلال Tyson Media.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <div className="text-3xl">
              📦
            </div>

            <h3 className="mt-3 font-black">
              منتجات مميزة
            </h3>

            <p className="mt-2 text-xs leading-6 text-gray-500">
              منتجات Handmade من بائعين
              مختلفين.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <div className="text-3xl">
              💬
            </div>

            <h3 className="mt-3 font-black">
              تفاصيل واضحة
            </h3>

            <p className="mt-2 text-xs leading-6 text-gray-500">
              شوف السعر والوصف قبل ما
              تضيف المنتج للسلة.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="font-black">
                Tyson{" "}
                <span className="text-[#b87333]">
                  Media
                </span>
              </div>

              <p className="mt-1 text-xs text-gray-400">
                سوق المنتجات والخدمات للمناسبات.
              </p>
            </div>

            <Link
              href="/handmade"
              className="text-sm font-black text-gray-500"
            >
              العودة للمتجر ←
            </Link>

          </div>
        </div>
      </footer>
    </main>
  );
}