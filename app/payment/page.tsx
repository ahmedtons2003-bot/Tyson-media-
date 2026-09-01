"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const wallets = [
  "01208338744",
  "01208338919",
];

const packages: Record<
  string,
  {
    name: string;
    price: number | null;
  }
> = {
  SILVER: {
    name: "Silver",
    price: 3500,
  },
  GOLD: {
    name: "Gold",
    price: 6000,
  },
  PREMIUM: {
    name: "Premium",
    price: null,
  },
  PLATINUM: {
    name: "Platinum",
    price: null,
  },
};

export default function PaymentPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "";
  const phone = searchParams.get("phone") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "weddings";

  const packageKey =
    searchParams.get("package") || "GOLD";

  const selectedPackage =
    packages[packageKey] || packages.GOLD;

  const totalAmount =
    selectedPackage.price;

  const depositAmount =
    totalAmount !== null
      ? totalAmount * 0.5
      : null;

  const remainingAmount =
    totalAmount !== null
      ? totalAmount - depositAmount!
      : null;

  const [wallet, setWallet] =
    useState(wallets[0]);

  const [senderName, setSenderName] =
    useState(name);

  const [transactionId, setTransactionId] =
    useState("");

  const [receipt, setReceipt] =
    useState<File | null>(null);

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  function formatMoney(amount: number) {
    return new Intl.NumberFormat("ar-EG").format(
      amount
    );
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setMessage("");
    setSuccess(false);

    if (!name || !phone || !date || !time) {
      setMessage(
        "بيانات الحجز غير مكتملة."
      );
      return;
    }

    if (!senderName || !transactionId) {
      setMessage(
        "من فضلك أكمل بيانات التحويل."
      );
      return;
    }

    if (!depositAmount) {
      setMessage(
        "هذه الباكدج تحتاج تحديد السعر من الإدارة أولًا."
      );
      return;
    }

    if (!receipt) {
      setMessage(
        "من فضلك ارفع صورة إثبات التحويل."
      );
      return;
    }

    setLoading(true);

    try {
      const bookingCode =
        "TM-" +
        Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase();

      const fileExtension =
        receipt.name.split(".").pop() || "jpg";

      const fileName =
        `${bookingCode}-${Date.now()}.${fileExtension}`;

      const { error: uploadError } =
        await supabase.storage
          .from("payment-receipts")
          .upload(
            fileName,
            receipt
          );

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicData } =
        supabase.storage
          .from("payment-receipts")
          .getPublicUrl(fileName);

      const receiptUrl =
        publicData.publicUrl;

      const { error } =
        await supabase
          .from("bookings")
          .insert({
            booking_code:
              bookingCode,

            service:
              category,

            booking_date:
              date,

            booking_time:
              time,

            customer_name:
              name,

            phone:
              phone,

            location:
              location,

            event_type:
              selectedPackage.name,

            status:
              "pending",

            wallet_number:
              wallet,

            payment_amount:
              depositAmount,

            sender_name:
              senderName,

            transaction_id:
              transactionId,

            payment_status:
              "pending",

            payment_receipt_url:
              receiptUrl,

            total_amount:
              totalAmount,

            deposit_amount:
              depositAmount,

            remaining_amount:
              remainingAmount,

            deposit_status:
              "pending",
          });

      if (error) {
        throw error;
      }

      setSuccess(true);

      setMessage(
        `تم إرسال طلب الحجز والعربون بنجاح. رقم الحجز: ${bookingCode}`
      );

    } catch (error) {
      console.error(error);

      setMessage(
        "حدث خطأ أثناء إرسال البيانات. حاول مرة أخرى."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#080808] text-white"
    >

      {/* HEADER */}

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">

          <Link
            href="/"
            className="text-xl font-black"
          >
            TYSON{" "}
            <span className="text-[#c89b63]">
              MEDIA
            </span>
          </Link>

          <Link
            href="/bookings"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-bold"
          >
            العودة للحجز
          </Link>

        </div>

      </header>

      {/* HERO */}

      <section className="mx-auto max-w-5xl px-5 pb-10 pt-36">

        <div className="text-center">

          <p className="text-xs font-black tracking-[0.35em] text-[#c89b63]">
            TYSON MEDIA • BOOKING
          </p>

          <h1 className="mt-5 text-4xl font-black md:text-6xl">
            تأكيد الحجز
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/50">
            ادفع العربون فقط لتأكيد طلب الحجز،
            وسيتم مراجعة التحويل من الإدارة.
          </p>

        </div>

      </section>

      {/* BOOKING SUMMARY */}

      <section className="mx-auto max-w-5xl px-5 pb-6">

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">

          <p className="text-xs font-black tracking-[0.3em] text-[#c89b63]">
            BOOKING SUMMARY
          </p>

          <h2 className="mt-3 text-3xl font-black">
            تفاصيل الحجز
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-white/[0.03] p-4">
              <p className="text-xs text-white/40">
                العميل
              </p>

              <p className="mt-2 font-bold">
                {name || "—"}
              </p>
            </div>

            <div className="rounded-xl bg-white/[0.03] p-4">
              <p className="text-xs text-white/40">
                الهاتف
              </p>

              <p className="mt-2 font-bold">
                {phone || "—"}
              </p>
            </div>

            <div className="rounded-xl bg-white/[0.03] p-4">
              <p className="text-xs text-white/40">
                التاريخ
              </p>

              <p className="mt-2 font-bold">
                {date || "—"}
              </p>
            </div>

            <div className="rounded-xl bg-white/[0.03] p-4">
              <p className="text-xs text-white/40">
                الوقت
              </p>

              <p className="mt-2 font-bold">
                {time || "—"}
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* PACKAGE */}

      <section className="mx-auto max-w-5xl px-5 pb-6">

        <div className="rounded-[2rem] border border-[#c89b63]/30 bg-[#c89b63]/5 p-6 md:p-8">

          <p className="text-xs font-black tracking-[0.3em] text-[#c89b63]">
            SELECTED PACKAGE
          </p>

          <h2 className="mt-3 text-3xl font-black">
            {selectedPackage.name}
          </h2>

          {totalAmount !== null ? (

            <div className="mt-7 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl bg-black/30 p-5">

                <p className="text-xs text-white/40">
                  إجمالي الباكدج
                </p>

                <p className="mt-2 text-2xl font-black">
                  {formatMoney(
                    totalAmount
                  )}{" "}
                  ج.م
                </p>

              </div>

              <div className="rounded-2xl border border-[#c89b63]/40 bg-[#c89b63]/10 p-5">

                <p className="text-xs text-[#d4ad7b]">
                  العربون المطلوب 50%
                </p>

                <p className="mt-2 text-2xl font-black text-[#d4ad7b]">
                  {formatMoney(
                    depositAmount!
                  )}{" "}
                  ج.م
                </p>

              </div>

              <div className="rounded-2xl bg-black/30 p-5">

                <p className="text-xs text-white/40">
                  المتبقي
                </p>

                <p className="mt-2 text-2xl font-black">
                  {formatMoney(
                    remainingAmount!
                  )}{" "}
                  ج.م
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">

              <p className="font-bold text-yellow-400">
                سعر هذه الباكدج يحدد حسب الطلب.
              </p>

              <p className="mt-2 text-sm text-white/50">
                سيتم التواصل معك لتحديد السعر
                وقيمة العربون.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* PAYMENT */}

      <section className="mx-auto max-w-5xl px-5 pb-24">

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-9">

          <h2 className="text-3xl font-black">
            دفع العربون
          </h2>

          <p className="mt-2 text-sm text-white/40">
            العربون المطلوب هو 50% من قيمة الباكدج.
          </p>

          {/* WALLETS */}

          <div className="mt-7">

            <label className="mb-4 block text-sm font-black">
              اختر رقم المحفظة
            </label>

            <div className="grid gap-4 md:grid-cols-2">

              {wallets.map(
                (number) => (

                  <button
                    key={number}
                    type="button"
                    onClick={() =>
                      setWallet(number)
                    }
                    className={`rounded-2xl border p-5 text-right transition ${
                      wallet === number
                        ? "border-[#c89b63] bg-[#c89b63]/10"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >

                    <p className="text-xs text-white/40">
                      محفظة إلكترونية
                    </p>

                    <p className="mt-2 text-xl font-black">
                      {number}
                    </p>

                    {wallet === number && (
                      <p className="mt-2 text-xs font-bold text-[#c89b63]">
                        ✓ الرقم المختار
                      </p>
                    )}

                  </button>

                )
              )}

            </div>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* DEPOSIT */}

            <div className="rounded-2xl border border-[#c89b63]/30 bg-[#c89b63]/5 p-5">

              <p className="text-sm text-white/50">
                المطلوب تحويله
              </p>

              <p className="mt-2 text-3xl font-black text-[#d4ad7b]">

                {depositAmount !== null
                  ? `${formatMoney(
                      depositAmount
                    )} ج.م`
                  : "يحدد لاحقًا"}

              </p>

            </div>

            {/* SENDER */}

            <div>

              <label className="mb-2 block text-sm font-bold">
                اسم صاحب التحويل *
              </label>

              <input
                type="text"
                value={senderName}
                onChange={(e) =>
                  setSenderName(
                    e.target.value
                  )
                }
                placeholder="الاسم كما يظهر في التحويل"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-[#c89b63]"
              />

            </div>

            {/* TRANSACTION */}

            <div>

              <label className="mb-2 block text-sm font-bold">
                رقم العملية *
              </label>

              <input
                type="text"
                value={transactionId}
                onChange={(e) =>
                  setTransactionId(
                    e.target.value
                  )
                }
                placeholder="أدخل رقم العملية"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-[#c89b63]"
              />

            </div>

            {/* RECEIPT */}

            <div>

              <label className="mb-2 block text-sm font-bold">
                إثبات التحويل *
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.02] px-5 py-10 text-center transition hover:border-[#c89b63]">

                <span className="text-4xl">
                  📷
                </span>

                <span className="mt-3 text-sm font-bold">
                  {receipt
                    ? receipt.name
                    : "ارفع صورة التحويل"}
                </span>

                <span className="mt-2 text-xs text-white/30">
                  JPG أو PNG
                </span>

                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={(e) =>
                    setReceipt(
                      e.target.files?.[0] ||
                        null
                    )
                  }
                />

              </label>

            </div>

            {/* MESSAGE */}

            {message && (

              <div
                className={`rounded-xl border p-4 text-sm font-bold ${
                  success
                    ? "border-green-500/20 bg-green-500/10 text-green-400"
                    : "border-red-500/20 bg-red-500/10 text-red-400"
                }`}
              >
                {message}
              </div>

            )}

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={
                loading ||
                !depositAmount
              }
              className="w-full rounded-xl bg-[#c89b63] px-6 py-5 font-black text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "جاري إرسال الطلب..."
                : "إرسال العربون وتأكيد الطلب"}
            </button>

            <p className="text-center text-xs leading-6 text-white/30">
              إرسال العربون لا يعني التأكيد النهائي
              حتى تتم مراجعة التحويل من الإدارة.
            </p>

          </form>

        </div>

      </section>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Tyson Media
      </footer>

    </main>
  );
}