"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const wallets = [
  "01208338744",
  "01208338919",
];

const packagePrices: Record<string, string> = {
  SILVER: "3,500 ج.م",
  GOLD: "6,000 ج.م",
  PREMIUM: "حسب الطلب",
  PLATINUM: "حسب الطلب",
};

export default function PaymentPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "";
  const phone = searchParams.get("phone") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "weddings";
  const selectedPackage =
    searchParams.get("package") || "GOLD";

  const packageName =
    searchParams.get("packageName") ||
    selectedPackage;

  const price =
    searchParams.get("price") ||
    packagePrices[selectedPackage] ||
    "حسب الطلب";

  const [wallet, setWallet] = useState(wallets[0]);
  const [amount, setAmount] = useState(
    price === "3,500 ج.م"
      ? "3500"
      : price === "6,000 ج.م"
        ? "6000"
        : ""
  );

  const [senderName, setSenderName] = useState(name);
  const [transactionId, setTransactionId] =
    useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");
    setSuccess(false);

    if (!amount || !senderName || !transactionId) {
      setMessage("من فضلك أكمل بيانات الدفع.");
      return;
    }

    setSuccess(true);

    setMessage(
      "تم إرسال بيانات الدفع للمراجعة. سيتم تأكيد الحجز بعد مراجعة التحويل."
    );
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
            TYSON MEDIA • PAYMENT
          </p>

          <h1 className="mt-5 text-4xl font-black md:text-6xl">
            إتمام الدفع
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/50">
            راجع بيانات الحجز ثم قم بتحويل المبلغ
            إلى إحدى المحافظ المتاحة.
          </p>
        </div>
      </section>

      {/* BOOKING SUMMARY */}

      <section className="mx-auto max-w-5xl px-5 pb-6">
        <div className="rounded-[2rem] border border-[#c89b63]/20 bg-[#c89b63]/5 p-6 md:p-8">

          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-black tracking-widest text-[#c89b63]">
                BOOKING SUMMARY
              </p>

              <h2 className="mt-2 text-2xl font-black">
                تفاصيل الحجز
              </h2>
            </div>

            <div className="rounded-2xl bg-[#c89b63] px-5 py-3 text-center text-black">
              <p className="text-xs font-bold">
                الباكدج
              </p>

              <p className="font-black">
                {packageName}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-black/20 p-4">
              <p className="text-xs text-white/40">
                العميل
              </p>

              <p className="mt-2 font-bold">
                {name || "—"}
              </p>
            </div>

            <div className="rounded-xl bg-black/20 p-4">
              <p className="text-xs text-white/40">
                رقم الهاتف
              </p>

              <p className="mt-2 font-bold">
                {phone || "—"}
              </p>
            </div>

            <div className="rounded-xl bg-black/20 p-4">
              <p className="text-xs text-white/40">
                التاريخ
              </p>

              <p className="mt-2 font-bold">
                {date || "—"}
              </p>
            </div>

            <div className="rounded-xl bg-black/20 p-4">
              <p className="text-xs text-white/40">
                الوقت
              </p>

              <p className="mt-2 font-bold">
                {time || "—"}
              </p>
            </div>

            <div className="rounded-xl bg-black/20 p-4 sm:col-span-2">
              <p className="text-xs text-white/40">
                المكان
              </p>

              <p className="mt-2 font-bold">
                {location || "لم يتم تحديد المكان"}
              </p>
            </div>

            <div className="rounded-xl bg-black/20 p-4">
              <p className="text-xs text-white/40">
                نوع الخدمة
              </p>

              <p className="mt-2 font-bold">
                {category === "engagement"
                  ? "تصوير خطوبة"
                  : category === "portrait"
                    ? "Portrait"
                    : category === "fashion"
                      ? "Fashion"
                      : "أفراح ومناسبات"}
              </p>
            </div>

            <div className="rounded-xl bg-black/20 p-4">
              <p className="text-xs text-white/40">
                قيمة الباكدج
              </p>

              <p className="mt-2 font-black text-[#d4ad7b]">
                {price}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT */}

      <section className="mx-auto max-w-5xl px-5 pb-24">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-9">

          <div className="mb-8">
            <p className="text-xs font-black tracking-[0.3em] text-[#c89b63]">
              PAYMENT METHOD
            </p>

            <h2 className="mt-3 text-3xl font-black">
              الدفع بالمحفظة
            </h2>
          </div>

          {/* WALLETS */}

          <div>
            <label className="mb-4 block text-sm font-black">
              حوّل إلى أحد الأرقام التالية
            </label>

            <div className="grid gap-4 md:grid-cols-2">

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

                  <p className="mt-2 text-xl font-black tracking-wide">
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
          </div>

          {/* PAYMENT STEPS */}

          <div className="my-8 rounded-2xl border border-[#c89b63]/20 bg-[#c89b63]/5 p-6">
            <p className="font-black text-[#d4ad7b]">
              طريقة الدفع
            </p>

            <div className="mt-4 space-y-3 text-sm leading-7 text-white/60">
              <p>
                <span className="font-black text-[#c89b63]">
                  01
                </span>{" "}
                اختر رقم المحفظة.
              </p>

              <p>
                <span className="font-black text-[#c89b63]">
                  02
                </span>{" "}
                حوّل قيمة الحجز المطلوبة.
              </p>

              <p>
                <span className="font-black text-[#c89b63]">
                  03
                </span>{" "}
                احتفظ برقم العملية.
              </p>

              <p>
                <span className="font-black text-[#c89b63]">
                  04
                </span>{" "}
                أدخل بيانات التحويل واضغط إرسال.
              </p>
            </div>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* AMOUNT */}

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
                placeholder="اكتب المبلغ"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-[#c89b63]"
              />

              <p className="mt-2 text-xs text-white/30">
                قيمة الباكدج: {price}
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
                  setSenderName(e.target.value)
                }
                placeholder="الاسم كما يظهر في التحويل"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-[#c89b63]"
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
                  setTransactionId(e.target.value)
                }
                placeholder="أدخل رقم العملية"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-[#c89b63]"
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
                  ارفع صورة التحويل
                </span>

                <span className="mt-2 text-xs text-white/30">
                  JPG أو PNG
                </span>

                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
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
              className="w-full rounded-xl bg-[#c89b63] px-6 py-5 font-black text-black transition hover:bg-white"
            >
              إرسال بيانات الدفع
            </button>

            <p className="text-center text-xs leading-6 text-white/30">
              لن يتم اعتبار الحجز مؤكدًا إلا بعد
              مراجعة عملية الدفع من الإدارة.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Tyson Media
      </footer>
    </main>
  );
}