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

const packagePrices: Record<string, string> = {
  SILVER: "3500",
  GOLD: "6000",
  PREMIUM: "",
  PLATINUM: "",
};

export default function PaymentPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "";
  const phone = searchParams.get("phone") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const location = searchParams.get("location") || "";
  const notes = searchParams.get("notes") || "";
  const category = searchParams.get("category") || "weddings";
  const selectedPackage = searchParams.get("package") || "GOLD";

  const packageName =
    searchParams.get("packageName") || selectedPackage;

  const price =
    searchParams.get("price") ||
    packagePrices[selectedPackage] ||
    "حسب الطلب";

  const [wallet, setWallet] = useState(wallets[0]);

  const [amount, setAmount] = useState(
    packagePrices[selectedPackage] || ""
  );

  const [senderName, setSenderName] = useState(name);
  const [transactionId, setTransactionId] = useState("");

  const [receipt, setReceipt] = useState<File | null>(null);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");
    setSuccess(false);

    if (!name || !phone || !date || !time) {
      setMessage("بيانات الحجز غير مكتملة.");
      return;
    }

    if (!amount || !senderName || !transactionId) {
      setMessage("من فضلك أكمل بيانات الدفع.");
      return;
    }

    setLoading(true);

    try {
      const bookingCode =
        "TM-" +
        Date.now().toString().slice(-8);

      let receiptUrl = "";

      /*
       * رفع صورة التحويل
       * يحتاج Bucket باسم payment-receipts
       */
      if (receipt) {
        const fileExt =
          receipt.name.split(".").pop() || "jpg";

        const fileName =
          `${bookingCode}-${Date.now()}.${fileExt}`;

        const { error: uploadError } =
          await supabase.storage
            .from("payment-receipts")
            .upload(fileName, receipt);

        if (uploadError) {
          throw uploadError;
        }

        const { data } =
          supabase.storage
            .from("payment-receipts")
            .getPublicUrl(fileName);

        receiptUrl = data.publicUrl;
      }

      const { error } = await supabase
        .from("bookings")
        .insert({
          booking_code: bookingCode,
          service: category,
          booking_date: date,
          booking_time: time,
          customer_name: name,
          phone: phone,
          location: location,
          event_type: packageName,
          notes: notes,

          status: "pending",

          wallet_number: wallet,
          payment_amount: Number(amount),
          sender_name: senderName,
          transaction_id: transactionId,
          payment_status: "pending",
          payment_receipt_url: receiptUrl,
        });

      if (error) {
        throw error;
      }

      setSuccess(true);

      setMessage(
        `تم إرسال طلب الحجز والدفع بنجاح. رقم الحجز: ${bookingCode}`
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

      <section className="mx-auto max-w-5xl px-5 pb-24 pt-36">

        <div className="mb-10 text-center">

          <p className="text-xs font-black tracking-[0.35em] text-[#c89b63]">
            TYSON MEDIA • PAYMENT
          </p>

          <h1 className="mt-5 text-4xl font-black md:text-6xl">
            إتمام الدفع
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/50">
            راجع بيانات الحجز ثم قم بتحويل المبلغ
            وإرسال بيانات العملية.
          </p>

        </div>

        {/* BOOKING */}

        <div className="mb-6 rounded-[2rem] border border-[#c89b63]/20 bg-[#c89b63]/5 p-6 md:p-8">

          <p className="text-xs font-black tracking-[0.3em] text-[#c89b63]">
            BOOKING SUMMARY
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div>
              <p className="text-xs text-white/40">
                الاسم
              </p>

              <p className="mt-1 font-bold">
                {name || "—"}
              </p>
            </div>

            <div>
              <p className="text-xs text-white/40">
                الهاتف
              </p>

              <p className="mt-1 font-bold">
                {phone || "—"}
              </p>
            </div>

            <div>
              <p className="text-xs text-white/40">
                التاريخ
              </p>

              <p className="mt-1 font-bold">
                {date || "—"}
              </p>
            </div>

            <div>
              <p className="text-xs text-white/40">
                الوقت
              </p>

              <p className="mt-1 font-bold">
                {time || "—"}
              </p>
            </div>

          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="rounded-xl bg-black/20 p-4">
              <p className="text-xs text-white/40">
                الباكدج
              </p>

              <p className="mt-1 text-lg font-black">
                {packageName}
              </p>
            </div>

            <div className="rounded-xl bg-black/20 p-4">
              <p className="text-xs text-white/40">
                قيمة الباكدج
              </p>

              <p className="mt-1 text-lg font-black text-[#d4ad7b]">
                {price}
              </p>
            </div>

            <div className="rounded-xl bg-black/20 p-4">
              <p className="text-xs text-white/40">
                المكان
              </p>

              <p className="mt-1 font-bold">
                {location || "—"}
              </p>
            </div>

          </div>

        </div>

        {/* PAYMENT */}

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-9">

          <h2 className="text-3xl font-black">
            الدفع بالمحفظة
          </h2>

          <p className="mt-2 text-sm text-white/40">
            اختر الرقم الذي قمت بالتحويل إليه.
          </p>

          {/* WALLETS */}

          <div className="mt-7 grid gap-4 md:grid-cols-2">

            {wallets.map((number) => (

              <button
                key={number}
                type="button"
                onClick={() => setWallet(number)}
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

            ))}

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <div>
              <label className="mb-2 block text-sm font-bold">
                المبلغ المحول *
              </label>

              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-[#c89b63]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                اسم صاحب التحويل *
              </label>

              <input
                type="text"
                value={senderName}
                onChange={(e) =>
                  setSenderName(e.target.value)
                }
                placeholder="الاسم كما يظهر في التحويل"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-[#c89b63]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                رقم العملية *
              </label>

              <input
                type="text"
                value={transactionId}
                onChange={(e) =>
                  setTransactionId(e.target.value)
                }
                placeholder="أدخل رقم العملية"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-[#c89b63]"
              />
            </div>

            {/* RECEIPT */}

            <div>

              <label className="mb-2 block text-sm font-bold">
                إثبات الدفع
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
                      e.target.files?.[0] || null
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

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#c89b63] px-6 py-5 font-black text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "جاري إرسال البيانات..."
                : "إرسال بيانات الدفع"}
            </button>

            <p className="text-center text-xs leading-6 text-white/30">
              الحجز يظل قيد المراجعة حتى يتم
              التحقق من عملية التحويل.
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