"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image_url?: string | null;
  quantity: number;
};

const CART_KEY = "tyson_media_cart";

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [governorate, setGovernorate] =
    useState("الإسكندرية");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] =
    useState("cash");

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(CART_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      setItems([]);
    }

    setLoading(false);
  }, []);

  const total = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum +
        Number(item.price) *
          Number(item.quantity),
      0
    );
  }, [items]);

  async function submitOrder(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!items.length) {
      setError("السلة فاضية.");
      return;
    }

    if (!name.trim()) {
      setError("اكتب الاسم.");
      return;
    }

    if (!phone.trim()) {
      setError("اكتب رقم الهاتف.");
      return;
    }

    if (!address.trim()) {
      setError("اكتب العنوان.");
      return;
    }

    const url =
      process.env
        .NEXT_PUBLIC_SUPABASE_URL;

    const key =
      process.env
        .NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      setError(
        "إعدادات Supabase غير موجودة في Vercel."
      );
      return;
    }

    setSubmitting(true);

    try {
      const supabase =
        createClient(url, key);

      /*
       * إنشاء رقم طلب بسيط.
       */
      const orderCode =
        `TM-${Date.now()
          .toString()
          .slice(-8)}`;

      /*
       * ملاحظة:
       * أسماء الأعمدة هنا مبنية على جدول orders
       * المتوقع في المشروع.
       *
       * لو جدول orders عندك مختلف،
       * نعدله بعد ظهور رسالة Supabase.
       */

      const { data: order, error: orderError } =
        await supabase
          .from("orders")
          .insert({
            order_code: orderCode,
            customer_name: name.trim(),
            phone: phone.trim(),
            governorate,
            address: address.trim(),
            notes: notes.trim() || null,
            payment_method: payment,
            total_amount: total,
            status: "pending",
          })
          .select("id")
          .single();

      if (orderError) {
        throw new Error(
          orderError.message
        );
      }

      const orderItems = items.map(
        (item) => ({
          order_id: order.id,
          product_id: item.id,
          product_name: item.name,
          price: Number(item.price),
          quantity: Number(
            item.quantity
          ),
        })
      );

      const { error: itemsError } =
        await supabase
          .from("order_items")
          .insert(orderItems);

      if (itemsError) {
        throw new Error(
          itemsError.message
        );
      }

      localStorage.removeItem(
        CART_KEY
      );

      setItems([]);

      setSuccess(
        `تم إرسال طلبك بنجاح 🎉 رقم الطلب: ${orderCode}`
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء إرسال الطلب."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#f6f5f3]"
      >
        <div className="text-center">
          <div className="text-5xl">
            🛒
          </div>

          <p className="mt-4 font-black">
            جاري التحميل...
          </p>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-[#f6f5f3] text-[#211f1c]"
      >
        <header className="border-b bg-white">
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
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-xl px-4 py-20">
          <div className="rounded-[2rem] border bg-white p-8 text-center md:p-12">
            <div className="text-7xl">
              ✅
            </div>

            <h1 className="mt-6 text-3xl font-black">
              تم استلام طلبك
            </h1>

            <p className="mt-4 leading-7 text-gray-500">
              {success}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                href="/"
                className="rounded-xl bg-[#211f1c] px-5 py-4 font-black text-white"
              >
                الرئيسية
              </Link>

              <Link
                href="/handmade"
                className="rounded-xl border px-5 py-4 font-black"
              >
                متابعة التسوق
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
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
              href="/cart"
              className="rounded-xl border px-4 py-2 text-sm font-black"
            >
              ← السلة
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="mb-8">
          <p className="text-sm font-black text-[#b87333]">
            TYSON MEDIA
          </p>

          <h1 className="mt-2 text-3xl font-black md:text-4xl">
            إتمام الطلب
          </h1>
        </div>

        {!items.length ? (
          <div className="rounded-[2rem] border bg-white p-12 text-center">
            <div className="text-6xl">
              🛒
            </div>

            <h2 className="mt-5 text-2xl font-black">
              مفيش منتجات في السلة
            </h2>

            <Link
              href="/handmade"
              className="mt-6 inline-block rounded-xl bg-[#211f1c] px-7 py-4 font-black text-white"
            >
              العودة للمتجر
            </Link>
          </div>
        ) : (
          <form
            onSubmit={submitOrder}
            className="grid gap-6 lg:grid-cols-[1fr_380px]"
          >
            {/* CUSTOMER DATA */}
            <div className="rounded-3xl border bg-white p-6 md:p-8">
              <h2 className="text-2xl font-black">
                بيانات العميل
              </h2>

              <div className="mt-6 grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-black">
                    الاسم بالكامل
                  </label>

                  <input
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="اكتب اسمك"
                    className="w-full rounded-xl border p-4 font-bold outline-none focus:border-[#b87333]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black">
                    رقم الهاتف
                  </label>

                  <input
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    className="w-full rounded-xl border p-4 font-bold outline-none focus:border-[#b87333]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black">
                    المحافظة
                  </label>

                  <select
                    value={governorate}
                    onChange={(e) =>
                      setGovernorate(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border bg-white p-4 font-bold outline-none focus:border-[#b87333]"
                  >
                    <option>
                      القاهرة
                    </option>
                    <option>
                      الإسكندرية
                    </option>
                    <option>
                      الجيزة
                    </option>
                    <option>
                      القليوبية
                    </option>
                    <option>
                      البحيرة
                    </option>
                    <option>
                      الدقهلية
                    </option>
                    <option>
                      الشرقية
                    </option>
                    <option>
                      الغربية
                    </option>
                    <option>
                      المنوفية
                    </option>
                    <option>
                      كفر الشيخ
                    </option>
                    <option>
                      دمياط
                    </option>
                    <option>
                      بورسعيد
                    </option>
                    <option>
                      الإسماعيلية
                    </option>
                    <option>
                      السويس
                    </option>
                    <option>
                      البحر الأحمر
                    </option>
                    <option>
                      مطروح
                    </option>
                    <option>
                      الفيوم
                    </option>
                    <option>
                      بني سويف
                    </option>
                    <option>
                      المنيا
                    </option>
                    <option>
                      أسيوط
                    </option>
                    <option>
                      سوهاج
                    </option>
                    <option>
                      قنا
                    </option>
                    <option>
                      الأقصر
                    </option>
                    <option>
                      أسوان
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black">
                    العنوان بالتفصيل
                  </label>

                  <textarea
                    value={address}
                    onChange={(e) =>
                      setAddress(
                        e.target.value
                      )
                    }
                    placeholder="المنطقة، الشارع، رقم العقار..."
                    rows={3}
                    className="w-full rounded-xl border p-4 font-bold outline-none focus:border-[#b87333]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black">
                    ملاحظات
                  </label>

                  <textarea
                    value={notes}
                    onChange={(e) =>
                      setNotes(
                        e.target.value
                      )
                    }
                    placeholder="أي ملاحظات على الطلب..."
                    rows={3}
                    className="w-full rounded-xl border p-4 font-bold outline-none focus:border-[#b87333]"
                  />
                </div>
              </div>

              {/* PAYMENT */}
              <div className="mt-8 border-t pt-8">
                <h2 className="text-xl font-black">
                  طريقة الدفع
                </h2>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label
                    className={`cursor-pointer rounded-2xl border p-4 ${
                      payment === "cash"
                        ? "border-[#211f1c] bg-[#f6f5f3]"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={
                        payment === "cash"
                      }
                      onChange={(e) =>
                        setPayment(
                          e.target.value
                        )
                      }
                      className="ml-2"
                    />

                    <span className="font-black">
                      💵 الدفع عند الاستلام
                    </span>
                  </label>

                  <label
                    className={`cursor-pointer rounded-2xl border p-4 ${
                      payment === "wallet"
                        ? "border-[#211f1c] bg-[#f6f5f3]"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="wallet"
                      checked={
                        payment === "wallet"
                      }
                      onChange={(e) =>
                        setPayment(
                          e.target.value
                        )
                      }
                      className="ml-2"
                    />

                    <span className="font-black">
                      📱 محفظة إلكترونية
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* SUMMARY */}
            <aside className="h-fit rounded-3xl border bg-white p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-black">
                ملخص الطلب
              </h2>

              <div className="mt-5 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-3 text-sm"
                  >
                    <span className="line-clamp-2 text-gray-600">
                      {item.name} ×{" "}
                      {item.quantity}
                    </span>

                    <span className="shrink-0 font-black">
                      {(
                        Number(
                          item.price
                        ) *
                        Number(
                          item.quantity
                        )
                      ).toLocaleString(
                        "ar-EG"
                      )}{" "}
                      ج.م
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t pt-5">
                <div className="flex items-center justify-between">
                  <span className="font-black">
                    الإجمالي
                  </span>

                  <span className="text-2xl font-black text-[#b87333]">
                    {total.toLocaleString(
                      "ar-EG"
                    )}{" "}
                    ج.م
                  </span>
                </div>
              </div>

              {error && (
                <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full rounded-xl bg-[#211f1c] px-5 py-4 font-black text-white transition hover:bg-[#b87333] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting
                  ? "جاري إرسال الطلب..."
                  : "تأكيد الطلب"}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                بالضغط على تأكيد الطلب، سيتم
                إرسال بيانات الطلب إلى Tyson
                Media.
              </p>
            </aside>
          </form>
        )}
      </section>
    </main>
  );
}