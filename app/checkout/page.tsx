"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "—";
  const phone = searchParams.get("phone") || "—";
  const date = searchParams.get("date") || "—";
  const time = searchParams.get("time") || "—";
  const location = searchParams.get("location") || "—";
  const category = searchParams.get("category") || "weddings";
  const packageName =
    searchParams.get("packageName") || "Gold";

  const priceText =
    searchParams.get("price") || "";

  const price = Number(
    priceText.replace(/[^\d.]/g, "")
  );

  const validPrice =
    Number.isFinite(price) && price > 0;

  const deposit = validPrice
    ? price * 0.5
    : 0;

  const remaining = validPrice
    ? price - deposit
    : 0;

  const serviceName =
    category === "engagement"
      ? "تصوير خطوبة"
      : category === "portrait"
        ? "Portrait"
        : category === "fashion"
          ? "Fashion"
          : category === "drone"
            ? "تصوير Drone"
            : "تصوير أفراح ومناسبات";

  const paymentParams = new URLSearchParams({
    name,
    phone,
    date,
    time,
    location,
    category,
    packageName,
    price: priceText,
  });

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
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-bold transition hover:border-[#c89b63]"
          >
            تعديل الحجز
          </Link>
        </div>
      </header>

      {/* HERO */}

      <section className="mx-auto max-w-5xl px-5 pb-10 pt-36">
        <div className="text-center">
          <p className="text-xs font-black tracking-[0.35em] text-[#c89b63]">
            TYSON MEDIA • CHECKOUT
          </p>

          <h1 className="mt-5 text-4xl font-black md:text-6xl">
            مراجعة الحجز
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/45">
            راجع كل بيانات الحجز قبل الانتقال إلى
            دفع العربون.
          </p>
        </div>
      </section>

      {/* CONTENT */}

      <section className="mx-auto max-w-5xl px-5 pb-24">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

          {/* BOOKING DETAILS */}

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-9">

            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                <p className="text-xs font-black tracking-[0.25em] text-[#c89b63]">
                  BOOKING DETAILS
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  تفاصيل الحجز
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c89b63]/30 bg-[#c89b63]/10">
                📋
              </div>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">

              <Info
                label="الاسم"
                value={name}
              />

              <Info
                label="رقم الهاتف"
                value={phone}
              />

              <Info
                label="الخدمة"
                value={serviceName}
              />

              <Info
                label="الباكدج"
                value={packageName}
              />

              <Info
                label="تاريخ المناسبة"
                value={date}
              />

              <Info
                label="وقت المناسبة"
                value={time}
              />

              <Info
                label="المكان"
                value={location}
              />

            </div>

            {/* POLICY */}

            <div className="mt-8 rounded-2xl border border-[#c89b63]/20 bg-[#c89b63]/5 p-5">

              <div className="flex gap-4">

                <div className="text-2xl">
                  📅
                </div>

                <div>
                  <p className="font-black text-[#d4ad7b]">
                    سياسة الحجز
                  </p>

                  <p className="mt-2 text-xs leading-6 text-white/45">
                    يجب أن يكون موعد المناسبة بعد
                    30 يومًا على الأقل من تاريخ
                    إرسال طلب الحجز.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* PRICE */}

          <aside className="h-fit rounded-[2rem] border border-white/10 bg-[#111] p-6 md:p-8">

            <p className="text-xs font-black tracking-[0.3em] text-[#c89b63]">
              PAYMENT SUMMARY
            </p>

            <h2 className="mt-4 text-2xl font-black">
              ملخص الدفع
            </h2>

            <div className="my-7 h-px bg-white/10" />

            {/* TOTAL */}

            <div className="flex items-center justify-between gap-4">

              <span className="text-sm text-white/45">
                إجمالي الباكدج
              </span>

              <span className="font-black">
                {validPrice
                  ? `${price.toLocaleString(
                      "ar-EG"
                    )} ج.م`
                  : "حسب الطلب"}
              </span>

            </div>

            {/* DEPOSIT */}

            <div className="mt-5 rounded-2xl border border-[#c89b63]/30 bg-[#c89b63]/10 p-5">

              <div className="flex items-center justify-between">

                <span className="text-sm font-bold">
                  العربون
                </span>

                <span className="text-xl font-black text-[#d4ad7b]">
                  {validPrice
                    ? `${deposit.toLocaleString(
                        "ar-EG"
                      )} ج.م`
                    : "حسب الطلب"}
                </span>

              </div>

              <p className="mt-2 text-xs text-white/40">
                50% من قيمة الباكدج
              </p>

            </div>

            {/* REMAINING */}

            <div className="mt-5 flex items-center justify-between gap-4">

              <span className="text-sm text-white/45">
                المتبقي بعد العربون
              </span>

              <span className="font-black">
                {validPrice
                  ? `${remaining.toLocaleString(
                      "ar-EG"
                    )} ج.م`
                  : "حسب الطلب"}
              </span>

            </div>

            {/* CONFIRM */}

            <Link
              href={`/payment?${paymentParams.toString()}`}
              className="mt-8 block w-full rounded-xl bg-[#c89b63] px-6 py-5 text-center font-black text-black transition hover:bg-white"
            >
              الانتقال إلى دفع العربون
            </Link>

            <p className="mt-4 text-center text-xs leading-6 text-white/30">
              سيتم دفع 50% من قيمة الباكدج
              كعربون، والباقي يتم سداده حسب
              الاتفاق.
            </p>

          </aside>

        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Tyson Media
      </footer>
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <p className="text-xs text-white/35">
        {label}
      </p>

      <p className="mt-2 break-words font-bold">
        {value}
      </p>
    </div>
  );
}