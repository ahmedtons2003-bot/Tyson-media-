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
  phone: string | null;
  location: string | null;
  event_type: string | null;
  notes: string | null;
  status: string | null;

  service?: {
    title: string;
    price: number | null;
  } | null;

  provider?: {
    business_name: string;
    phone: string | null;
  } | null;
};

const statusOptions = [
  { value: "pending", label: "قيد المراجعة" },
  { value: "confirmed", label: "مؤكد" },
  { value: "completed", label: "مكتمل" },
  { value: "cancelled", label: "ملغي" },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");

  async function loadBookings() {
    setLoading(true);
    setMessage("");

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      setMessage("إعدادات Supabase غير موجودة.");
      setLoading(false);
      return;
    }

    const supabase = createClient(url, key);

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
        service:services (
          title,
          price
        ),
        provider:providers (
          business_name,
          phone
        )
      `)
      .order("booking_date", {
        ascending: true,
      })
      .order("booking_time", {
        ascending: true,
      });

    if (error) {
      setMessage(
        "حدث خطأ أثناء تحميل الحجوزات: " +
          error.message
      );
      setBookings([]);
    } else {
      setBookings(
        (data || []) as unknown as Booking[]
      );
    }

    setLoading(false);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function updateStatus(
    bookingId: string,
    newStatus: string
  ) {
    setUpdating(bookingId);
    setMessage("");

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      setMessage("إعدادات Supabase غير موجودة.");
      setUpdating(null);
      return;
    }

    const supabase = createClient(url, key);

    const { error } = await supabase
      .from("bookings")
      .update({
        status: newStatus,
      })
      .eq("id", bookingId);

    if (error) {
      setMessage(
        "تعذر تحديث حالة الحجز: " +
          error.message
      );
    } else {
      setBookings((current) =>
        current.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                status: newStatus,
              }
            : booking
        )
      );

      setMessage("تم تحديث حالة الحجز بنجاح ✅");
    }

    setUpdating(null);
  }

  function statusText(status: string | null) {
    switch (status) {
      case "confirmed":
        return "مؤكد";

      case "completed":
        return "مكتمل";

      case "cancelled":
        return "ملغي";

      case "pending":
        return "قيد المراجعة";

      default:
        return "قيد المراجعة";
    }
  }

  function statusClass(status: string | null) {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }

  function eventTypeText(eventType: string | null) {
    switch (eventType) {
      case "wedding":
        return "فرح";

      case "engagement":
        return "خطوبة";

      case "birthday":
        return "عيد ميلاد";

      case "party":
        return "حفلة";

      case "portrait":
        return "جلسة تصوير";

      case "car":
        return "سيارة";

      case "dress":
        return "فستان";

      case "suit":
        return "بدلة";

      default:
        return eventType || "غير محدد";
    }
  }

  function formatDate(date: string) {
    if (!date) return "غير محدد";

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter(
          (booking) =>
            (booking.status || "pending") ===
            filter
        );

  const pendingCount = bookings.filter(
    (booking) =>
      !booking.status ||
      booking.status === "pending"
  ).length;

  const confirmedCount = bookings.filter(
    (booking) =>
      booking.status === "confirmed"
  ).length;

  const completedCount = bookings.filter(
    (booking) =>
      booking.status === "completed"
  ).length;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#fbfaf7]"
    >
      <header className="border-b bg-white px-4 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link
            href="/"
            className="text-2xl font-black"
          >
            Tyson{" "}
            <span className="text-[#b87333]">
              Media
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="rounded-xl border px-4 py-2 text-sm font-bold"
            >
              لوحة المستخدم
            </Link>

            <Link
              href="/"
              className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-bold text-white"
            >
              الرئيسية
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl bg-[#211f1c] p-7 text-white">
          <p className="text-sm text-white/60">
            🛠️ لوحة الإدارة
          </p>

          <h1 className="mt-2 text-3xl font-black">
            إدارة الحجوزات
          </h1>

          <p className="mt-2 text-white/60">
            تابع جميع طلبات الحجز وقم بتحديث حالتها.
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
              {loading ? "..." : pendingCount}