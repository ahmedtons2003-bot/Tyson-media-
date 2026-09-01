"use client";

import Link from "next/link";
import { useState } from "react";

const bookings = [
  {
    code: "TM-Y7Y0Z2",
    service: "تصوير أفراح ومناسبات",
    packageName: "Gold",
    date: "—",
    time: "—",
    status: "في انتظار التأكيد",
    payment: "العربون غير مؤكد",
  },
];

export default function DashboardPage() {
  const [active, setActive] = useState("bookings");

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#080808] text-white"
    >
      {/* HEADER */}

      <header className="border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
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
            href="/"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-bold transition hover:border-[#c89b63]"
          >
            الرئيسية
          </Link>
        </div>
      </header>

      {/* DASHBOARD */}

      <section className="mx-auto max-w-7xl px-5 py-10">

        {/* TITLE */}

        <div>
          <p className="text-xs font-black tracking-[0.35em] text-[#c89b63]">
            TYSON MEDIA • DASHBOARD
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            لوحة التحكم
          </h1>

          <p className="mt-4 text-sm text-white/40">
            تابع حجوزاتك وحالة العربون والطلبات.
          </p>
        </div>

        {/* STATS */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <Stat
            icon="📋"
            title="الحجوزات"
            value="1"
          />

          <Stat
            icon="⏳"
            title="قيد المراجعة"
            value="1"
          />

          <Stat
            icon="💰"
            title="العربون"
            value="50%"
          />

          <Stat
            icon="✅"
            title="المؤكدة"
            value="0"
          />

        </div>

        {/* NAV */}

        <div className="mt-10 flex flex-wrap gap-3 border-b border-white/10 pb-5">

          <button
            onClick={() =>
              setActive("bookings")
            }
            className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
              active === "bookings"
                ? "bg-[#c89b63] text-black"
                : "bg-white/5 text-white/60"
            }`}
          >
            حجوزاتي
          </button>

          <button
            onClick={() =>
              setActive("payments")
            }
            className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
              active === "payments"
                ? "bg-[#c89b63] text-black"
                : "bg-white/5 text-white/60"
            }`}
          >
            المدفوعات
          </button>

          <button
            onClick={() =>
              setActive("profile")
            }
            className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
              active === "profile"
                ? "bg-[#c89b63] text-black"
                : "bg-white/5 text-white/60"
            }`}
          >
            البيانات
          </button>

        </div>

        {/* BOOKINGS */}

        {active === "bookings" && (

          <div className="mt-7">

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-black">
                  حجوزاتي
                </h2>

                <p className="mt-1 text-xs text-white/35">
                  جميع طلبات الحجز الخاصة بك.
                </p>
              </div>

              <Link
                href="/bookings"
                className="rounded-xl bg-[#c89b63] px-5 py-3 text-sm font-black text-black"
              >
                حجز جديد
              </Link>

            </div>

            <div className="space-y-4">

              {bookings.map((booking) => (

                <div
                  key={booking.code}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
                >

                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    {/* INFO */}

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <span className="rounded-full border border-[#c89b63]/30 bg-[#c89b63]/10 px-3 py-1 text-xs font-black text-[#d4ad7b]">
                          {booking.code}
                        </span>

                        <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-400">
                          {booking.status}
                        </span>

                      </div>

                      <h3 className="mt-4 text-xl font-black">
                        {booking.service}
                      </h3>

                      <p className="mt-2 text-sm text-white/40">
                        باكدج {booking.packageName}
                      </p>

                    </div>

                    {/* DATE */}

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

                      <Info
                        label="التاريخ"
                        value={booking.date}
                      />

                      <Info
                        label="الوقت"
                        value={booking.time}
                      />

                      <Info
                        label="الدفع"
                        value={booking.payment}
                      />

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* PAYMENTS */}

        {active === "payments" && (

          <div className="mt-7 rounded-[2rem] border border-white/10 bg-white/[0.03] p-7">

            <h2 className="text-2xl font-black">
              المدفوعات
            </h2>

            <p className="mt-2 text-sm text-white/40">
              هنا ستظهر عمليات العربون والمدفوعات
              الخاصة بحجوزاتك.
            </p>

            <div className="mt-7 rounded-2xl border border-[#c89b63]/20 bg-[#c89b63]/5 p-6">

              <p className="font-black text-[#d4ad7b]">
                💰 العربون
              </p>

              <p className="mt-2 text-sm text-white/45">
                لم يتم تسجيل عملية دفع مؤكدة حتى الآن.
              </p>

            </div>

          </div>

        )}

        {/* PROFILE */}

        {active === "profile" && (

          <div className="mt-7 rounded-[2rem] border border-white/10 bg-white/[0.03] p-7">

            <h2 className="text-2xl font-black">
              بيانات العميل
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-2">

              <Info
                label="الاسم"
                value="—"
              />

              <Info
                label="رقم الهاتف"
                value="—"
              />

              <Info
                label="البريد الإلكتروني"
                value="—"
              />

              <Info
                label="الحالة"
                value="عميل"
              />

            </div>

          </div>

        )}

      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Tyson Media
      </footer>

    </main>
  );
}

function Stat({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">

      <div className="flex items-center justify-between">

        <span className="text-2xl">
          {icon}
        </span>

        <span className="text-3xl font-black text-[#d4ad7b]">
          {value}
        </span>

      </div>

      <p className="mt-4 text-sm font-bold text-white/50">
        {title}
      </p>

    </div>
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
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">

      <p className="text-xs text-white/30">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-bold">
        {value}
      </p>

    </div>
  );
}