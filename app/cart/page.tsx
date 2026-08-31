"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image_url?: string | null;
  quantity: number;
};

const CART_KEY = "tyson_media_cart";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      setItems([]);
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      CART_KEY,
      JSON.stringify(items)
    );
  }, [items, loaded]);

  const total = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum +
        Number(item.price) *
          Number(item.quantity),
      0
    );
  }, [items]);

  const updateQuantity = (
    id: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  function removeItem(id: string) {
    setItems((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f6f5f3] text-[#211f1c]"
    >
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
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
              href="/dashboard"
              className="rounded-xl bg-[#211f1c] px-4 py-2.5 text-sm font-black text-white"
            >
              حسابي
            </Link>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="mb-8">
          <p className="text-sm font-black text-[#b87333]">
            TYSON MEDIA
          </p>

          <h1 className="mt-2 text-3xl font-black md:text-4xl">
            سلة المشتريات 🛒
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            راجع منتجاتك قبل إتمام الطلب.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[2rem] border bg-white p-12 text-center md:p-20">
            <div className="text-7xl">
              🛒
            </div>

            <h2 className="mt-6 text-2xl font-black">
              السلة فاضية
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              لسه مفيش منتجات مضافة للسلة.
            </p>

            <Link
              href="/handmade"
              className="mt-7 inline-block rounded-xl bg-[#211f1c] px-7 py-4 font-black text-white transition hover:bg-[#b87333]"
            >
              تصفح المنتجات
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            {/* ITEMS */}
            <div className="space-y-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-3xl border bg-white p-4 sm:flex-row sm:items-center"
                >
                  {/* IMAGE */}
                  <div className="h-28 w-full shrink-0 overflow-hidden rounded-2xl bg-[#eee6dc] sm:w-28">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-5xl">
                        🧶
                      </div>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="min-w-0 flex-1">
                    <h2 className="font-black">
                      {item.name}
                    </h2>

                    <p className="mt-2 text-sm font-black text-[#b87333]">
                      {Number(
                        item.price
                      ).toLocaleString(
                        "ar-EG"
                      )}{" "}
                      ج.م
                    </p>

                    {/* QUANTITY */}
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border font-black"
                      >
                        −
                      </button>

                      <span className="min-w-8 text-center font-black">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border font-black"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* ITEM TOTAL */}
                  <div className="flex items-center justify-between gap-4 sm:block sm:text-left">
                    <div>
                      <p className="text-xs text-gray-400">
                        الإجمالي
                      </p>

                      <p className="mt-1 font-black">
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toLocaleString(
                          "ar-EG"
                        )}{" "}
                        ج.م
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(item.id)
                      }
                      className="mt-3 text-sm font-black text-red-500"
                    >
                      حذف
                    </button>
                  </div>
                </article>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="rounded-xl border bg-white px-5 py-3 text-sm font-black text-red-500"
              >
                إفراغ السلة
              </button>
            </div>

            {/* SUMMARY */}
            <aside className="h-fit rounded-3xl border bg-white p-6 lg:sticky lg:top-24">
              <p className="text-xs font-black text-[#b87333]">
                ORDER SUMMARY
              </p>

              <h2 className="mt-2 text-2xl font-black">
                ملخص الطلب
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    عدد المنتجات
                  </span>

                  <span className="font-black">
                    {items.reduce(
                      (sum, item) =>
                        sum +
                        Number(
                          item.quantity
                        ),
                      0
                    )}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">
                      الإجمالي
                    </span>

                    <span className="text-xl font-black text-[#b87333]">
                      {total.toLocaleString(
                        "ar-EG"
                      )}{" "}
                      ج.م
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 block rounded-xl bg-[#211f1c] px-5 py-4 text-center font-black text-white transition hover:bg-[#b87333]"
              >
                إتمام الطلب ←
              </Link>

              <Link
                href="/handmade"
                className="mt-3 block rounded-xl border px-5 py-4 text-center text-sm font-black"
              >
                متابعة التسوق
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}