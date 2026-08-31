
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Booking = {
  id: string;
  booking_code: string;
  booking_date: string;
  booking_time: string;
  customer_name: string;
  event_type: string;
  status?: string | null;
  service?: {
    title: string;
  } | null;
};

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setLoading(false);
        return;
      }

      const supabase = createClient(url, key);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      setUserEmail(user.email || "");

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id,
          booking_code,
          booking_date,
          booking_time,
          customer_name,
          event_type,
          status,
          service:services (
            title
          )
        `)
        .eq("customer_id", user.id)
        .order("booking_date", { ascending: true });

      if (!error && data) {
        setBookings(data as unknown as Booking[]);
      }

      setLoading(false);
    }

    loadDashboard();
  }, []);

  function statusText(status?: string | null) {
    switch (status) {
      case "confirmed":
        return "مؤكد";
      case "cancelled":
        return "ملغي";
      case "completed":
        return "مكتمل";
      default:
        return "قيد المراجعة";
    }
  }

  function statusClass(status?: string | null) {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }

  function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "ar-EG",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#fbfaf7]">
      <header className="border-b bg-white px-4 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-2xl font-black">
            Tyson <span className="text-[#b87333]">Media</span>
          </Link>

          <Link
            href="/"
            className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-bold text-white"
          >
            الرئيسية
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-3xl bg-[#211f1c] p-7 text-white">
          <p className="text-sm opacity-70">
            أهلاً بك 👋
          </p>

          <h1 className="mt-2 text-3xl font-black">
            لوحة التحكم
          </h1>

          <p className="mt-2 opacity-70">
            {userEmail || "تابع حجوزاتك وطلباتك من مكان واحد."}
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              الحجوزات
            </p>

            <p className="mt-2 text-3xl font-black">
              {loading ? "..." : bookings.length}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              الطلبات
            </p>

            <p className="mt-2 text-3xl font-black">
              0
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              المفضلة
            </p>

            <p className="mt-2 text-3xl font-black">
              0
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border bg-white p-6">
          <h2 className="text-xl font-black">
            📸 حجوزاتي
          </h2>

          {loading ? (
            <div className="mt-5 rounded-2xl bg-[#fbfaf7] p-6 text-center font-bold">
              جاري تحميل الحجوزات...
            </div>
          ) : bookings.length === 0 ? (
            <div className="mt-5 rounded-2xl bg-[#fbfaf7] p-6 text-center">
              <p className="font-bold">
                لا توجد حجوزات حتى الآن.
              </p>

              <Link
                href="/photography"
                className="mt-4 inline-block rounded-xl bg-[#211f1c] px-5 py-3 font-bold text-white"
              >
                استكشف خدمات التصوير
              </Link>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl bg-[#fbfaf7] p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-bold">
                        {booking.service?.title ||
                          "خدمة تصوير"}
                      </p>

                      <p className="mt-1 text-sm text-[#746f68]">
                        📅 {formatDate(booking.booking_date)}
                      </p>

                      <p className="mt-1 text-sm text-[#746f68]">
                        🕐 {booking.booking_time}
                      </p>

                      <p className="mt-1 text-xs text-[#746f68]">
                        رقم الحجز: {booking.booking_code}
                      </p>
                    </div>

                    <span
                      className={`h-fit w-fit rounded-full px-3 py-1 text-xs font-bold ${statusClass(
                        booking.status
                      )}`}
                    >
                      {statusText(booking.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/handmade"
          className="mt-8 block rounded-xl bg-[#b87333] px-6 py-4 text-center font-black text-white"
        >
          اكتشف المزيد من الخدمات والمنتجات
        </Link>
      </section>
    </main>
  );
}