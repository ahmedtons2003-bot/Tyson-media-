"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

type Booking = {
  id: string;
  booking_code: string;
  booking_date: string;
  booking_time: string;
  customer_name: string;
  phone: string | null;
  location: string | null;
  event_type: string | null;
  notes: string | null;
  status: string | null;
  service?: { title: string; price: number | null } | null;
  provider?: { business_name: string } | null;
};

function supabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function statusName(status: string | null) {
  if (status === "confirmed") return "مؤكد";
  if (status === "completed") return "مكتمل";
  if (status === "cancelled") return "ملغي";
  return "قيد المراجعة";
}

function statusColor(status: string | null) {
  if (status === "confirmed") return "bg-green-100 text-green-700";
  if (status === "completed") return "bg-blue-100 text-blue-700";
  if (status === "cancelled") return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
}

function eventName(type: string | null) {
  const names: Record<string, string> = {
    wedding: "فرح",
    engagement: "خطوبة",
    birthday: "عيد ميلاد",
    party: "حفلة",
    portrait: "جلسة تصوير",
    car: "سيارة",
    dress: "فستان",
    suit: "بدلة",
  };

  return names[type || ""] || type || "غير محدد";
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadBookings() {
    setLoading(true);

    const supabase = supabaseClient();

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        id,
        booking_code,
        booking_date,
        booking_time,
        customer_name,
        phone,
        location,
        event_type,
        notes,
        status,
        service:services(title, price),
        provider:providers(business_name)
      `)
      .order("booking_date", { ascending: true });

    if (error) {
      setMessage("خطأ: " + error.message);
      setBookings([]);
    } else {
      setBookings((data || []) as unknown as Booking[]);
      setMessage("");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function changeStatus(
    id: string,
    status: string
  ) {
    const supabase = supabaseClient();

    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (error) {
      setMessage("خطأ في تحديث الحالة: " + error.message);
      return;
    }

    setBookings((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setMessage("تم تحديث حالة الحجز ✅");
  }

  const pending = bookings.filter(
    (b) => !b.status || b.status === "pending"
  ).length;

  const confirmed = bookings.filter(
    (b) => b.status === "confirmed"
  ).length;

  const completed = bookings.filter(
    (b) => b.status === "completed"
  ).length;

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
          <p className="text-sm text-white/60">
            🛠️ لوحة الإدارة
          </p>

          <h1 className="mt-2 text-3xl font-black">
            إدارة الحجوزات
          </h1>

          <p className="mt-2 text-white/60">
            متابعة وإدارة جميع طلبات الحجز
          </p>
        </div>

        {message && (
          <div className="mt-5 rounded-2xl border bg-white p-4 text-center font-bold">
            {message}
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-gray-500">
              كل الحجوزات
            </p>
            <p className="mt-2 text-3xl font-black">
              {loading ? "..." : bookings.length}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-gray-500">
              قيد المراجعة
            </p>
            <p className="mt-2 text-3xl font-black text-yellow-600">
              {loading ? "..." : pending}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-gray-500">
              مؤكدة
            </p>
            <p className="mt-2 text-3xl font-black text-green-600">
              {loading ? "..." : confirmed}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-gray-500">
              مكتملة
            </p>
            <p className="mt-2 text-3xl font-black text-blue-600">
              {loading ? "..." : completed}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">
              📋 الحجوزات
            </h2>

            <button
              onClick={loadBookings}
              className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-bold text-white"
            >
              تحديث
            </button>
          </div>

          {loading ? (
            <div className="mt-6 rounded-2xl bg-[#fbfaf7] p-8 text-center font-bold">
              جاري تحميل الحجوزات...
            </div>
          ) : bookings.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-[#fbfaf7] p-8 text-center font-bold">
              لا توجد حجوزات حتى الآن.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl border bg-[#fbfaf7] p-5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold">
                          {booking.booking_code}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black ${statusColor(
                            booking.status
                          )}`}
                        >
                          {statusName(booking.status)}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-black">
                        {booking.service?.title || "خدمة"}
                      </h3>

                      <div className="mt-3 space-y-2 text-sm text-gray-600">
                        <p>
                          👤 العميل: {booking.customer_name}
                        </p>

                        <p>
                          📞 الهاتف: {booking.phone || "غير موجود"}
                        </p>

                        <p>
                          📅 التاريخ: {booking.booking_date}
                        </p>

                        <p>
                          🕐 الوقت: {booking.booking_time}
                        </p>

                        <p>
                          📍 المكان: {booking.location || "غير محدد"}
                        </p>

                        <p>
                          🎉 المناسبة: {eventName(booking.event_type)}
                        </p>

                        <p>
                          📸 مقدم الخدمة:{" "}
                          {booking.provider?.business_name || "غير محدد"}
                        </p>

                        {booking.service?.price !== null &&
                          booking.service?.price !== undefined && (
                            <p>
                              💰 السعر:{" "}
                              {Number(booking.service.price).toLocaleString(
                                "ar-EG"
                              )}{" "}
                              ج.م
                            </p>
                          )}

                        {booking.notes && (
                          <p>
                            📝 الملاحظات: {booking.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-full lg:w-56">
                      <label className="text-sm font-bold">
                        حالة الحجز
                      </label>

                      <select
                        value={booking.status || "pending"}
                        onChange={(e) =>
                          changeStatus(
                            booking.id,
                            e.target.value
                          )
                        }
                        className="mt-2 w-full rounded-xl border bg-white p-3 font-bold"
                      >
                        <option value="pending">
                          قيد المراجعة
                        </option>

                        <option value="confirmed">
                          مؤكد
                        </option>

                        <option value="completed">
                          مكتمل
                        </option>

                        <option value="cancelled">
                          ملغي
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}