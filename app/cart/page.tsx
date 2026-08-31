"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  quantity: number;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("tyson_cart") || "[]"
      );

      if (Array.isArray(saved)) {
        setItems(saved);
      }
    } catch {
      setItems([]);
    }

    setLoaded(true);
  }, []);

  function saveCart(nextItems: CartItem[]) {
    setItems(nextItems);
    localStorage.setItem(
      "tyson_cart",
      JSON.stringify(nextItems)
    );
  }

  function increase(id: string) {
    saveCart(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decrease(id: string) {
    saveCart(
      items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id: string) {
    saveCart(
      items.filter((item) => item.id !== id)
    );
  }

  function clearCart() {
    saveCart([]);
  }

  const subtotal = items.reduce(
    (total, item) =>
      total +
      Number(item.price) * item.quantity,
    0
  );

  const delivery = items.length > 0 ? 50 : 0;

  const total = subtotal + delivery;

  if (!loaded) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#f6f4f1]"
      >
        <p className="font-black">
          جاري تحميل السلة...
        </p>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f6f4f1] text-[#211f1c]"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
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
              className="rounded-xl bg-[#211f1c] px-4 py-3 text-sm font-black text-white"
            >
              🧶 متابعة التسوق
            </Link>
          </div>
        </div>
      </header>

      {/* Page */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-7">
          <p className="text-sm font-black text-[#b87333]">
            TYSON MEDIA • CART
          </p>

          <h1 className="mt-2 text-3xl font-black md:text-4xl">
            سلة المشتريات 🛒
          </h1>

          <p className="mt-2 text-gray-500">
            راجع منتجاتك قبل إتمام الطلب.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[2rem] border bg-white p-10 text-center shadow-sm">
            <div className="text-8xl">
              🛒
            </div>

            <h2 className="mt-5 text-2xl font-black">
              السلة فاضية
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">
              لسه مفيش منتجات في السلة.
              ارجع لمتجر الهاند ميد واختار
              المنتجات اللي عجبتك.
            </p>

            <Link
              href="/handmade"
              className="mt-7 inline-block rounded-2xl bg-[#211f1c] px-7 py-4 font-black text-white transition hover:bg-[#b87333]"
            >
              ابدأ التسوق 🧶
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Items */}
            <div className="space-y-4">
              <div className="rounded-3xl border bg-white p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black">
                    المنتجات
                  </h2>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-sm font-bold text-red-600 hover:underline"
                  >
                    حذف الكل
                  </button>
                </div>
              </div>

              {items.map((item) => {
                const itemTotal =
                  Number(item.price) *
                  item.quantity;

                return (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-3xl border bg-white shadow-sm"
                  >
                    <div className="flex flex-col gap-5 p-5 sm:flex-row">
                      {/* Image */}
                      <Link
                        href={`/handmade/${item.id}`}
                        className="shrink-0"
                      >
                        <div className="flex h-36 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#eee6dc] sm:h-36 sm:w-36">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-6xl">
                              🧶
                            </span>
                          )}
                        </div>
                      </Link>

                      {/* Details */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <span className="rounded-full bg-[#eee6dc] px-3 py-1 text-xs font-black">
                            Handmade
                          </span>

                          <Link
                            href={`/handmade/${item.id}`}
                            className="mt-3 block text-lg font-black hover:text-[#b87333]"
                          >
                            {item.name}
                          </Link>

                          <p className="mt-2 text-sm text-gray-500">
                            {Number(
                              item.price
                            ).toLocaleString(
                              "ar-EG"
                            )}{" "}
                            ج.م للقطعة
                          </p>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                          {/* Quantity */}
                          <div className="flex items-center overflow-hidden rounded-xl border">
                            <button
                              type="button"
                              onClick={() =>
                                decrease(
                                  item.id
                                )
                              }
                              className="px-4 py-2 text-lg font-black hover:bg-gray-100"
                            >
                              −
                            </button>

                            <span className="min-w-12 text-center font-black">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increase(
                                  item.id
                                )
                              }
                              className="px-4 py-2 text-lg font-black hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <strong className="text-xl font-black text-[#b87333]">
                            {itemTotal.toLocaleString(
                              "ar-EG"
                            )}{" "}
                            ج.م
                          </strong>

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(
                                item.id
                              )
                            }
                            className="text-sm font-bold text-red-600 hover:underline"
                          >
                            حذف
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Summary */}
            <aside className="h-fit rounded-3xl border bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-xl font-black">
                ملخص الطلب
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    المنتجات
                  </span>

                  <strong>
                    {subtotal.toLocaleString(
                      "ar-EG"
                    )}{" "}
                    ج.م
                  </strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    التوصيل
                  </span>

                  <strong>
                    {delivery.toLocaleString(
                      "ar-EG"
                    )}{" "}
                    ج.م
                  </strong>
                </div>

                <div className="border-t pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black">
                      الإجمالي
                    </span>

                    <strong className="text-2xl font-black text-[#b87333]">
                      {total.toLocaleString(
                        "ar-EG"
                      )}{" "}
                      ج.م
                    </strong>
                  </div>
                </div>
              </div>

              <Link
                href="/register"
                className="mt-7 block rounded-2xl bg-[#211f1c] px-5 py-4 text-center font-black text-white transition hover:bg-[#b87333]"
              >
                إتمام الطلب
              </Link>

              <Link
                href="/handmade"
                className="mt-3 block rounded-2xl border px-5 py-4 text-center font-black transition hover:bg-gray-50"
              >
                متابعة التسوق
              </Link>

              <div className="mt-6 rounded-2xl bg-[#f7f3ee] p-4">
                <p className="font-black">
                  🛡️ تسوق بأمان
                </p>

                <p className="mt-2 text-xs leading-6 text-gray-500">
                  يتم تأكيد تفاصيل الطلب
                  والتوصيل مع البائع.
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>

      {/* Footer CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-[2rem] bg-[#211f1c] p-8 text-center text-white">
          <div className="text-5xl">
            🧶
          </div>

          <h2 className="mt-4 text-2xl font-black">
            اكتشف المزيد من منتجات الهاند ميد
          </h2>

          <p className="mt-2 text-sm text-white/60">
            شنط، خواتم، انسيالات، سلاسل،
            إكسسوارات وهدايا.
          </p>

          <Link
            href="/handmade"
            className="mt-5 inline-block rounded-2xl bg-[#b87333] px-7 py-3 font-black text-white"
          >
            تصفح المتجر
          </Link>
        </div>
      </section>
    </main>
  );
}