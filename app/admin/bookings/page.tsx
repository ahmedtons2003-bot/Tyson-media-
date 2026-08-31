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
  phone: string;
  location: string;
  event_type: string;
  notes: string | null;
  status: string | null;

  deposit_amount: number | null;
  deposit_status: string | null;
  deposit_payment_method: string | null;
  payment_wallet_number: string | null;
  payment_reference: string | null;
  payment_note: string | null;

  service?: {
    title: string;
    price: number | null;
  } | null;

  provider?: {
    business_name: string;
    city: string | null;
  } | null;
};

const ADMIN_EMAILS = [
  "ahmedtons2003@gmail.com",
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function getSupabase() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error("إعدادات Supabase غير موجودة.");
    }

    return createClient(url, key);
  }

  async function loadBookings() {
    try {
      setLoading(true);
      setErrorMessage("");

      const supabase = await getSupabase();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      if (
        user.email &&
        !ADMIN_EMAILS.includes(user.email)
      ) {
        setErrorMessage(
          "ليس لديك صلاحية الدخول إلى لوحة الإدارة."
        );
        setLoading(false);
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
          deposit_payment_method,
          payment_wallet_number,
          payment_reference,
          payment_note,
          service:services (
            title,
            price
          ),
          provider:providers (
            business_name,
            city
          )
        `)
        .order("booking_date", {
          ascending: true,
        });

      if (error) {
        throw new Error(error.message);
      }

      setBookings(
        (data || []) as unknown as Booking[]
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء تحميل الحجوزات."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function updateBookingStatus(
    bookingId: string,
    status: string
  ) {
    try {
      setUpdating(bookingId);
      setMessage("");
      setErrorMessage("");

      const supabase = await getSupabase();

      const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", bookingId);

      if (error) {
        throw new Error(error.message);
      }

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

      setMessage(
        status === "confirmed"
          ? "تم تأكيد الحجز بنجاح ✅"
          : status === "cancelled"
          ? "تم رفض الحجز."
          : "تم تحديث حالة الحجز."
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء تحديث الحجز."
      );
    } finally {
      setUpdating(null);
    }
  }

  async function updateDepositStatus(
    bookingId: string,
    depositStatus: string
  ) {
    try {
      setUpdating(bookingId);
      setMessage("");
      setErrorMessage("");

      const supabase = await getSupabase();

      const { error } = await supabase
        .from("bookings")
        .update({
          deposit_status: depositStatus,
        })
        .eq("id", bookingId);

      if (error) {
        throw new Error(error.message);
      }

      setBookings((current) =>
        current.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                deposit_status: depositStatus,
              }
            : booking
        )
      );

      setMessage(
        depositStatus === "paid"
          ? "تم تأكيد العربون بنجاح ✅"
          : "تم تحديث حالة العربون."
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء تحديث العربون."
      );
    } finally {
      setUpdating(null);
    }
  }

  function statusText(status: string | null) {
    switch (status) {
      case "confirmed":
        return "مؤكد";
      case "cancelled":
        return "ملغي";
      case "completed":
        return "مكتمل";
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
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }

  function depositText(status: string | null) {
    switch (status) {
      case "paid":
        return "تم الدفع";
      case "rejected":
        return "مرفوض";
      case "pending":
        return "في انتظار المراجعة";
      case "cancelled":
        return "غير مطلوب";
      default:
        return "غير محدد";
    }
  }

  function depositClass(status: string | null) {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-600";
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
      case "other":
        return "أخرى";
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

  const pendingBookings = bookings.filter(
    (booking) =>
      !booking.status ||
      booking.status === "pending"
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) =>
      booking.status === "confirmed"
  ).length;

  const pendingDeposits = bookings.filter(
    (booking) =>
      booking.deposit_status === "pending"
  ).length;

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#fbfaf7]"
      >
        <div className="rounded-3xl border bg-white p-8 text-center">
          <div className="text-4xl">⏳</div>

          <p className="mt-4 font-black">
            جاري تحميل لوحة الإدارة...
          </p>
        </div>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#fbfaf7] px-4"
      >
        <div className="w-full max-w-lg rounded-3xl border bg-white p-8 text-center">

          <div className="text-5xl">
            🔒
          </div>

          <h1 className="mt-4 text-2xl font-black">
            لوحة الإدارة
          </h1>

          <p className="mt-4 leading-7 font-bold text-red-600">
            {errorMessage}
          </p>

          <div className="mt-6 flex gap-3">

            <button
              onClick={loadBookings}
              className="flex-1 rounded-xl border px-5 py-3 font-black"
            >
              إعادة المحاولة
            </button>

            <Link
              href="/"
              className="flex-1 rounded-xl bg-[#211f1c] px-5 py-3 font-black text-white"
            >
              الرئيسية
            </Link>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#fbfaf7]"
    >

      {/* Header */}
      <header className="border-b bg-white px-4 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

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

            <button
              onClick={loadBookings}
              className="rounded-xl border px-4 py-2 text-sm font-bold"
            >
              تحديث
            </button>

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

        {/* Welcome */}
        <div className="rounded-3xl bg-[#211f1c] p-7 text-white">

          <p className="text-sm text-white/60">
            👑 لوحة الإدارة
          </p>

          <h1 className="mt-2 text-3xl font-black">
            إدارة الحجوزات
          </h1>

          <p className="mt-2 text-white/60">
            متابعة الحجوزات والعملاء ومراجعة العربون.
          </p>

        </div>

        {/* Messages */}
        {message && (
          <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-center font-bold text-green-700">
            {message}
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              إجمالي الحجوزات
            </p>

            <p className="mt-2 text-3xl font-black">
              {bookings.length}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              قيد المراجعة
            </p>

            <p className="mt-2 text-3xl font-black">
              {pendingBookings}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              الحجوزات المؤكدة
            </p>

            <p className="mt-2 text-3xl font-black">
              {confirmedBookings}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              عربون يحتاج مراجعة
            </p>

            <p className="mt-2 text-3xl font-black">
              {pendingDeposits}
            </p>
          </div>

        </div>

        {/* Bookings */}
        <div className="mt-8">

          <h2 className="mb-5 text-2xl font-black">
            📋 كل الحجوزات
          </h2>

          {bookings.length === 0 ? (
            <div className="rounded-3xl border bg-white p-10 text-center">

              <div className="text-5xl">
                📭
              </div>

              <p className="mt-4 text-lg font-black">
                لا توجد حجوزات حتى الآن.
              </p>

            </div>
          ) : (
            <div className="space-y-5">

              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-3xl border bg-white p-6 shadow-sm"
                >

                  {/* Booking Header */}
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="rounded-full bg-[#211f1c] px-4 py-2 text-xs font-black text-white">
                          {booking.booking_code}
                        </span>

                        <span
                          className={`rounded-full px-4 py-2 text-xs font-black ${statusClass(
                            booking.status
                          )}`}
                        >
                          {statusText(
                            booking.status
                          )}
                        </span>

                        {Number(
                          booking.deposit_amount || 0
                        ) > 0 && (
                          <span
                            className={`rounded-full px-4 py-2 text-xs font-black ${depositClass(
                              booking.deposit_status
                            )}`}
                          >
                            العربون:{" "}
                            {depositText(
                              booking.deposit_status
                            )}
                          </span>
                        )}

                      </div>

                      <h3 className="mt-4 text-xl font-black">
                        {booking.service?.title ||
                          "الخدمة"}
                      </h3>

                      <p className="mt-2 text-sm text-[#746f68]">
                        📸{" "}
                        {booking.provider?.business_name ||
                          "مقدم الخدمة"}
                      </p>

                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">

                      <button
                        type="button"
                        disabled={
                          updating === booking.id
                        }
                        onClick={() =>
                          updateBookingStatus(
                            booking.id,
                            "confirmed"
                          )
                        }
                        className="rounded-xl bg-green-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
                      >
                        تأكيد الحجز
                      </button>

                      <button
                        type="button"
                        disabled={
                          updating === booking.id
                        }
                        onClick={() =>
                          updateBookingStatus(
                            booking.id,
                            "cancelled"
                          )
                        }
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
                      >
                        رفض الحجز
                      </button>

                    </div>

                  </div>

                  {/* Customer Info */}
                  <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-2xl bg-[#fbfaf7] p-4">
                      <p className="text-xs text-[#746f68]">
                        العميل
                      </p>

                      <p className="mt-1 font-black">
                        {booking.customer_name}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#fbfaf7] p-4">
                      <p className="text-xs text-[#746f68]">
                        الهاتف
                      </p>

                      <p
                        dir="ltr"
                        className="mt-1 font-black"
                      >
                        {booking.phone}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#fbfaf7] p-4">
                      <p className="text-xs text-[#746f68]">
                        التاريخ
                      </p>

                      <p className="mt-1 font-black">
                        {formatDate(
                          booking.booking_date
                        )}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#fbfaf7] p-4">
                      <p className="text-xs text-[#746f68]">
                        الوقت
                      </p>

                      <p className="mt-1 font-black">
                        {booking.booking_time}
                      </p>
                    </div>

                  </div>

                  {/* Event Info */}
                  <div className="mt-4 grid gap-4 md:grid-cols-2">

                    <div className="rounded-2xl bg-[#fbfaf7] p-4">
                      <p className="text-xs text-[#746f68]">
                        نوع المناسبة
                      </p>

                      <p className="mt-1 font-black">
                        🎉{" "}
                        {eventTypeText(
                          booking.event_type
                        )}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#fbfaf7] p-4">
                      <p className="text-xs text-[#746f68]">
                        مكان المناسبة
                      </p>

                      <p className="mt-1 font-black">
                        📍 {booking.location}
                      </p>
                    </div>

                  </div>

                  {/* Payment */}
                  {Number(
                    booking.deposit_amount || 0
                  ) > 0 && (
                    <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 p-5">

                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                        <div className="min-w-0">

                          <h4 className="font-black text-orange-900">
                            🟠 مراجعة العربون
                          </h4>

                          <p className="mt-3 text-sm text-orange-800">
                            مبلغ العربون:{" "}
                            <strong>
                              {Number(
                                booking.deposit_amount
                              ).toLocaleString(
                                "ar-EG"
                              )}{" "}
                              ج.م
                            </strong>
                          </p>

                          <p className="mt-2 text-sm text-orange-800">
                            رقم المحفظة:{" "}
                            <strong>
                              {booking.payment_wallet_number ||
                                "غير مسجل"}
                            </strong>
                          </p>

                          <p className="mt-2 text-sm text-orange-800">
                            رقم العملية:{" "}
                            <strong>
                              {booking.payment_reference ||
                                "غير مسجل"}
   