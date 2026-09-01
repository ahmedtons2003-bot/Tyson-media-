"use client";

import { useState } from "react";
import Link from "next/link";

const wallets = [
  "01208338744",
  "01208338919",
];

export default function PaymentPage() {
  const [wallet, setWallet] = useState(wallets[0]);
  const [amount, setAmount] = useState("");
  const [senderName, setSenderName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!amount || !senderName || !transactionId) {
      setMessage("من فضلك أكمل بيانات الدفع.");
      return;
    }

    setMessage(
      "تم إرسال بيانات الدفع للمراجعة. لن يتم تأكيد الحجز إلا بعد مراجعة التحويل."
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#080808] text-white"
    >
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="text-xl font-black">
            TYSON{" "}
            <span className="text-[#c89b63]">
              MEDIA
            </span>
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-bold"
          >
            الرئيسية
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-5 pb-24 pt-36">
        <div className="mb-10 text-center">
          <p className="text-xs font-black tracking-[0.35em] text-[#c89b63]">
            TYSON MEDIA • PAYMENT
          </p>

          <h1 className="mt-5 text-4xl font-black md:text-6xl">
            تأكيد الدفع
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/50">
            حوّل المبلغ المطلوب إلى إحدى المحافظ
            المتاحة، ثم أدخل بيانات العملية.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-9">

          {/* WALLETS */}

          <div>
            <label className="mb-4 block text-sm font-black">
              اختر رقم المحفظة
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
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

                  <p className="mt-2 text-lg font-black tracking-wide">
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

          {/* PAYMENT INFO */}

          <div className="my-8 rounded-2xl border border-[#c89b63]/20 bg-[#c89b63]/5 p-5">
            <p className="text-sm font-black text-[#d4ad7b]">
              طريقة الدفع
            </p>

            <p className="mt-3 text-sm leading-7 text-white/60">
              1. اختر رقم المحفظة.
              <br />
              2. حوّل قيمة الحجز.
              <br />
              3. احتفظ برقم العملية.
              <br />
              4. أدخل بيانات التحويل هنا.
            </p>
          </div>

          {/* FORM */}

          <form onSubmit={handleSubmit} className="space-y-5">

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
                placeholder="مثال: 3000"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-[#c89b63]"
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
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-[#c89b63]"
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
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-[#c89b63]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                إثبات الدفع
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.02] px-5 py-10 text-center transition hover:border-[#c89b63]">
                <span className="text-3xl">📷</span>

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

            {message && (
              <div className="rounded-xl border border-[#c89b63]/20 bg-[#c89b63]/10 p-4 text-sm font-bold text-[#d4ad7b]">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#c89b63] px-6 py-5 font-black text-black transition hover:bg-white"
            >
              إرسال بيانات الدفع
            </button>

            <p className="text-center text-xs leading-6 text-white/30">
              الدفع لا يعني تأكيد الحجز تلقائيًا.
              سيتم مراجعة العملية وتأكيدها من الإدارة.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}