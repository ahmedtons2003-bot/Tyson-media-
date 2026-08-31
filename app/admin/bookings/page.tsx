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
  deposit_amount: number | null;
  deposit_status: string | null;
  payment_wallet_number: string | null;
  payment_reference: string | null;

  service?: {
    title: string;
    price: number | null;
  } | null;

  provider?: {
    business_name: string;
    city: string | null;
  } | null;
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const [filter, setFilter] = useState<
    "all" | "pending" | "confirmed" | "cancelled" | "completed"
  >("all");

  useEffect(() => {
    loadBookings();
  }, []);

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

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

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
        deposit_amount,
        deposit_status,
        payment_wallet_number,
        payment_reference,
        service:services (
          title,
          price
        ),
        provider:providers (
          business_name,
          city
        )
      `)
      .order("created_at", {
        ascending: false,
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

  async function updateBookingStatus(
    bookingId: string,
    status: string
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
        status,
      })
      .eq("id", bookingId);

    if (error) {
      setMessage(
        "فشل تحديث حالة الحجز: " +
          error.message
      );
    } else {
      setBookings((current) =>
        current.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                status,
              }
            : booking
        )
      );
    }

    setUpdating(null);
  }

  async function updatePaymentStatus(
    bookingId: string,
    paymentStatus: string
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
        deposit_status: paymentStatus,
      })
      .eq("id", bookingId);

    if (error) {
      setMessage(
        "فشل تحديث حالة الدفع: " +
          error.message
      );
    } else {
      setBookings((current) =>
        current.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                deposit_status: paymentStatus,
              }
            : booking
        )
      );
    }

    setUpdating(null);
  }

  function statusText(
    status: string | null
  ) {
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

  function statusClass(
    status: string | null
  ) {
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

  function paymentStatusText(
    status: string | null
  ) {
    switch (status) {
      case "paid":
        return "تم الدفع";

      case "approved":
        return "الدفع مؤكد";

      case "rejected":
        return "الدفع مرفوض";

      case "pending":
        return "الدفع قيد المراجعة";

      default:
        return "لا يوجد عربون";
    }
  }

  function paymentStatusClass(
    status: string | null
  ) {
    switch (status) {
      case "paid":
      case "approved":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "pending":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  }

  function eventTypeText(
    eventType: string | null
  ) {
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
      : bookings.filter((booking) => {
          if (filter === "pending") {
            return (
              !booking.status ||
              booking.status === "pending"
            );
          }

          return booking.status === filter;
        });

  const pendingCount = bookings.filter(
    (booking) =>
      !booking.status ||
      booking.status === "pending"
  ).length;

  const confirmedCount = bookings.filter(
    (booking) =>
      booking.status === "confirmed"
  ).length;

  const cancelledCount = bookings.filter(
    (booking) =>
      booking.status === "cancelled"
  ).length;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#fbfaf7]"
    >
      <header className="border-b bg-white px-4 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-black"
          >
            Tyson{" "}
            <span className="text-[#b87333]">
              Media
            </span>
          </Link>

          <div className="flex gap-2">
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

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-3xl bg-[#211f1c] p-7 text-white">
          <p className="text-sm text-white/60">
            🛠️ الإدارة
          </p>

          <h1 className="mt-2 text-3xl font-black">
            إدارة الحجوزات
          </h1>

          <p className="mt-2 text-white/60">
            متابعة الحجوزات والمدفوعات وطلبات
            العملاء.
          </p>
        </div>

        {message && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-center font-bold text-red-700">
            {message}
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              إجمالي الحجوزات
            </p>

            <p className="mt-2 text-3xl font-black">
              {loading ? "..." : bookings.length}
            </p>
          </div>

          <div class