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
  deposit_wallet_number: string | null;
  deposit_transaction_id: string | null;
  service?: {
    title: string;
    price: number;
  } | null;
  provider?: {
    business_name: string;
  } | null;
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    setLoading(true);

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
        deposit_payment_method,
        deposit_wallet_number,
        deposit_transaction_id,
        service:services (
          title,
          price
        ),
        provider:providers (
          business_name
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage("حدث خطأ: " + error.message);
    } else {
      setBookings((data || []) as unknown as Booking[]);
    }

    setLoading(false);
  }

  async function updateDeposit(
    bookingId: string,
    status: "confirmed" | "rejected"
  ) {
    const ok = window.confirm(
      status === "confirmed"
        ? "هل أنت متأكد من تأكيد العربون؟"
        : "هل أنت متأكد من رفض العربون؟"
    );

    if (!ok) return;

    setUpdating(bookingId);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const updateData =
      status === "confirmed"
        ? {
            deposit_status: "confirmed",
            deposit_verified_at: new Date().toISOString(),
            deposit_verified_by: user.id,
            status: "confirmed",
          }
        : {
            deposit_status: "rejected",
            deposit_verified_at: new Date().toISOString(),
            deposit_verified_by: user.id,
            status: "cancelled",
          };

    const { error } = await supabase
      .from("bookings")
      .update(updateData)
      .eq("id", bookingId);

    if (error) {
      setMessage("حدث خطأ أثناء التحديث: " + error.message);
    } else {
      setMessage(
        status === "confirmed"
          ? "تم تأكيد العربون والحجز ✅"
          : "تم رفض العربون وإلغاء الحجز ❌"
      );

      await loadBookings();
    }

    setUpdating(null);
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

  function depositText(status: string | null) {
    if (status === "confirmed") return "مؤكد";
    if (status === "rejected") return "مرفوض";
    if (status === "pending") return "في انتظار المراجعة";
    return "لا يوجد";
  }

  function depositClass(status: string | null) {
    if (status === "confirmed")
      return "bg-green-100 text-green-700";

    if (status === "rejected")
      return "bg-red-100 text-red-700";

    if (status === "pending")
      return "bg-yellow-100 text-yellow-700";

    return "bg-gray-100 text-gray-600";
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#fbfaf7]"
    >
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

          <Link
            href="/"
            className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-bold text-white"
          >
            الرئيسية
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl bg-[#211f1c] p-7 text-white">
          <p className="text-sm text-white/60">
            Tyson Media
          </p>

          <h1 className="mt-2 text-3xl font-black">
            إدارة الحجوزات
          </h1>

          <p className="mt-2 text-white/60">
            مراجعة العربون وتأكيد الحجوزات.
          </p>
        </div>

        {message && (
          <div className="mt-5 rounded-2xl border bg-white p-4 text-center font-bold">
            {message}
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              إجمالي الحجوزات
            </p>

            <p className="mt-2 text-3xl font-black">
              {loading ? "..." : bookings.length}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              عربون قيد المراجعة
            </p>

            <p className="mt-2 text-3xl font-black">
              {loading
                ? "..."
                : bookings.filter(
                    (b) =>
                      b.deposit_status === "pending"
                  ).length}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-[#746f68]">
              حجوزات مؤكدة
            </p>

            <p className="mt-2 text-3xl font-black">
              {loading
                ? "..."
                : bookings.filter(
                    (b) => b.status === "confirmed"
                  ).length}
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          {loading ? (
            <div className="rounded-3xl border bg-white p-8 text-center font-bold">
              جاري تحميل الحجوزات...
            </div>
          ) : bookings.length === 0 ? (
            <div className="rounded-3xl border bg-white p-8 text-center font-bold">
              لا توجد حجوزات حتى الآن.
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="overflow-hidden rounded-3xl border bg-white"
              >
                <div className="bg-[#211f1c] p-5 text-white">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs text-white/50">
                        رقم الحجز
                      </p>

                      <p className="mt-1 text-xl font-black">
                        {booking.booking_code}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-4 py-2 text-xs font-black ${depositClass(
                        booking.deposit_status
                      )}`}
                    >
                      العربون:{" "}
                      {depositText(
                        booking.deposit_status
                      )}
                    </span>
                  </div>
                </div>

                <div className="grid gap-5 p-5 md:grid-cols-2">
                  <div>
                    <h2 className="font-black">
                      👤 بيانات العميل
                    </h2>

                    <div className="mt-3 space-y-2 text-sm">
                      <p>
                        <strong>الاسم:</strong>{" "}
                        {booking.customer_name}
                      </p>

                      <p>
                        <strong>الهاتف:</strong>{" "}
                        {booking.phone}
                      </p>

                      <p>
                        <strong>المكان:</strong>{" "}
                        {booking.location}
                      </p>

                      <p>
                        <strong>المناسبة:</strong>{" "}
                        {booking.event_type}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-black">
                      📸 تفاصيل الخدمة
                    </h2>

                    <div className="mt-3 space-y-2 text-sm">
                      <p>
                        <strong>الخدمة:</strong>{" "}
                        {booking.service?.title ||
                          "غير محددة"}
                      </p>

                      <p>
                        <strong>مقدم الخدمة:</strong>{" "}
                        {booking.provider?.business_name ||
                          "غير محدد"}
                      </p>

                      <p>
                        <strong>التاريخ:</strong>{" "}
                        {formatDate(
                          booking.booking_date
                        )}
                      </p>

                      <p>
                        <strong>الوقت:</strong>{" "}
                        {booking.booking_time}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#fbfaf7] p-5 md:col-span-2">
                    <h2 className="font-black">
                      💳 بيانات العربون
                    </h2>

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-[#746f68]">
                          قيمة العربون
                        </p>

                        <p className="mt-1 text-xl font-black text-[#b87333]">
                          {Number(
                            booking.deposit_amount || 0
                          ).toLocaleString("ar-EG")}{" "}
                          ج.م
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-[#746f68]">
                          طريقة الدفع
                        </p>

                        <p className="mt-1 font-bold">
                          {booking.deposit_payment_method ||
                            "محفظة إلكترونية"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-[#746f68]">
                          رقم المحفظة
                        </p>

                        <p className="mt-1 font-bold">
                          {booking.deposit_wallet_number ||
                            "غير مسجل"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border bg-white p-4">
                      <p className="text-xs text-[#746f68]">
                        رقم عملية التحويل
                      </p>

                      <p className="mt-1 text-lg font-black">
                        {booking.deposit_transaction_id ||
                          "لم يتم إدخال رقم العملية"}
                      </p>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="rounded-2xl border p-4 md:col-span-2">
                      <p className="font-black">
                        📝 ملاحظات
                      </p>

                      <p className="mt-2 text-sm leading-7 text-[#746f68]">
                        {booking.notes}
                      </p>
                    </div>
                  )}
                </div>

                {booking.deposit_status ===
                  "pending" && (
                  <div className="flex flex-col gap-3 border-t bg-[#fbfaf7] p-5 sm:flex-row">
                    <button
                      onClick={() =>
                        updateDeposit(
                          booking.id,
                          "confirmed"
                        )
                      }
                      disabled={
                        updating === booking.id
                      }
                      className="flex-1 rounded-xl bg-green-600 px-5 py-4 font-black text-white disabled:opacity-50"
                    >
                      {updating === booking.id
                        ? "جاري التحديث..."
                        : "✅ تأكيد العربون والحجز"}
                    </button>

                    <button
                      onClick={() =>
                        updateDeposit(
                          booking.id,
                          "rejected"
                        )
                      }
                      disabled={
                        updating === booking.id
                      }
                      className="flex-1 rounded-xl bg-red-600 px-5 py-4 font-black text-white disabled:opacity-50"
                    >
                      {updating === booking.id
                        ? "جاري التحديث..."
                        : "❌ رفض العربون"}
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}