"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const messages = [
  "احجز مناسبتك بدري ✨",
  "الحجز متاح قبل الموعد بـ 30 يومًا على الأقل 📅",
  "خطط لمناسبتك من بدري ❤️",
  "اختار موعدك المناسب وابدأ الحجز 🎉",
];

type BookingForm = {
  customer_name: string;
  phone: string;
  booking_date: string;
  booking_time: string;
  location: string;
  event_type: string;
  notes: string;
};

export default function BookingsPage() {
  const [showNotice, setShowNotice] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  const [form, setForm] = useState<BookingForm>({
    customer_name: "",
    phone: "",
    booking_date: "",
    booking_time: "",
    location: "",
    event_type: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((current) =>
        current === messages.length - 1 ? 0 : current + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /*
   * أقل تاريخ مسموح للحجز = بعد 30 يوم من اليوم
   */
  const minimumBookingDate = useMemo(() => {
    const date = new Date();

    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 30);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }, []);

  function updateField(
    field: keyof BookingForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  }

  function validateBookingDate() {
    if (!form.booking_date) {
      return "من فضلك اختر تاريخ المناسبة.";
    }

    if (form.booking_date < minimumBookingDate) {
      return "الحجز يجب أن يكون قبل موعد المناسبة بـ 30 يومًا على الأقل.";
    }

    return "";
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const dateError = validateBookingDate();

    if (dateError) {
      setErrorMessage(dateError);
      return;
    }

    if (!form.customer_name.trim()) {
      setErrorMessage("من فضلك اكتب اسم العميل.");
      return;
    }

    if (!form.phone.trim()) {
      setErrorMessage("من فضلك اكتب رقم الهاتف.");
      return;
    }

    if (!form.booking_time) {
      setErrorMessage("من فضلك اختر وقت المناسبة.");
      return;
    }

    if (!form.location.trim()) {
      setErrorMessage("من فضلك اكتب مكان المناسبة.");
      return;
    }

    if (!form.event_type.trim()) {
      setErrorMessage("من فضلك اختر نوع المناسبة.");
      return;
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      setErrorMessage(
        "إعدادات Supabase غير موجودة في المشروع."
      );
      return;
    }

    setSubmitting(true);

    try {
      const supabase = createClient(url, key);

      const bookingCode =
        `TM-${Date.now().toString().slice(-8)}`;

      const { error } = await supabase
        .from("bookings")
        .insert({
          booking_code: bookingCode,
          service: "طلب حجز من المنصة",
          booking_date: form.booking_date,
          booking_time: form.booking_time,
          customer_name: form.customer_name.trim(),
          phone: form.phone.trim(),
          location: form.location.trim(),
          event_type: form.event_type.trim(),
          notes: form.notes.trim() || null,
          status: "pending",
        });

      if (error) {
        setErrorMessage(
          "حدث خطأ أثناء إرسال الحجز: " +
            error.message
        );
        return;
      }

      setSuccessMessage(
        `تم إرسال طلب الحجز بنجاح ✅ رقم الحجز: ${bookingCode}`
      );

      setForm({
        customer_name: "",
        phone: "",
        booking_date: "",
        booking_time: "",
        location: "",
        event_type: "",
        notes: "",
      });
    } catch {
      setErrorMessage(
        "حدث خطأ غير متوقع. حاول مرة أخرى."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f6f3] text-[#211f1c]"
    >
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
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
            className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-black text-white"
          >
            الرئيسية
          </Link>
        </div>
      </header>

      {/* NOTICE */}
      {showNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="bg-[#211f1c] px-6 py-8 text-center text-white">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#b87333]/20 text-4xl">
                📅
              </div>

              <h2 className="mt-5 text-2xl font-black">
                تنبيه مهم قبل الحجز
              </h2>

              <div className="mt-5 min-h-[70px] overflow-hidden">
                <p
                  key={messageIndex}
                  className="animate-[fadeSlide_0.6s_ease-in-out] text-lg font-bold leading-8 text-[#e2b783]"
                >
                  {messages[messageIndex]}
                </p>
              </div>

              <div className="mt-3 flex justify-center gap-2">
                {messages.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === messageIndex
                        ? "w-7 bg-[#b87333]"
                        : "w-2 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-6 text-center">
              <div className="rounded-2xl bg-[#f5f0ea] p-5">
                <p className="text-sm font-black leading-7">
                  يجب أن يكون موعد المناسبة بعد
                  <span className="text-[#b87333]">
                    {" "}
                    30 يومًا على الأقل
                  </span>
                  .
                </p>

                <p className="mt-2 text-xs leading-6 text-gray-500">
                  لن يتم قبول أي حجز لموعد أقرب من
                  المدة المطلوبة.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowNotice(false)}
                className="mt-5 w-full rounded-xl bg-[#211f1c] px-6 py-4 font-black text-white transition hover:bg-[#b87333]"
              >
                فهمت، أريد اختيار الموعد
              </button>

              <Link
                href="/"
                className="mt-3 block text-sm font-bold text-gray-500"
              >
                الرجوع للرئيسية
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-[2rem] bg-[#211f1c] px-6 py-12 text-center text-white md:px-12">
          <div className="text-6xl">📅</div>

          <p className="mt-5 text-sm font-black text-[#d6a66f]">
            TYSON MEDIA • BOOKING
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-5xl">
            احجز خدمتك
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60">
            اختار تاريخ مناسبتك وأرسل طلب الحجز
            لمقدم الخدمة.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border bg-white p-6 shadow-sm md:p-8"
        >
          <div className="mb-7">
            <p className="text-sm font-black text-[#b87333]">
              BOOKING DETAILS
            </p>

            <h2 className="mt-1 text-2xl font-black">
              بيانات الحجز
            </h2>
          </div>

          {/* ALERTS */}
          {errorMessage && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-6 text-red-700">
              ⚠️ {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-bold leading-6 text-green-700">
              {successMessage}
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            {/* NAME */}
            <div>
              <label className="mb-2 block text-sm font-black">
                الاسم
              </label>

              <input
                type="text"
                value={form.customer_name}
                onChange={(e) =>
                  updateField(
                    "customer_name",
                    e.target.value
                  )
                }
                placeholder="اكتب اسمك"
                className="w-full rounded-xl border p-3 outline-none transition focus:border-[#b87333]"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="mb-2 block text-sm font-black">
                رقم الهاتف
              </label>

              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  updateField(
                    "phone",
                    e.target.value
                  )
                }
                placeholder="01xxxxxxxxx"
                className="w-full rounded-xl border p-3 outline-none transition focus:border-[#b87333]"
              />
            </div>

            {/* DATE */}
            <div>
              <label className="mb-2 block text-sm font-black">
                تاريخ المناسبة
              </label>

              <input
                type="date"
                min={minimumBookingDate}
                value={form.booking_date}
                onChange={(e) =>
                  updateField(
                    "booking_date",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border p-3 outline-none transition focus:border-[#b87333]"
              />

              <p className="mt-2 text-xs font-bold text-[#b87333]">
                📅 الحجز متاح قبل الموعد بـ30 يومًا
                على الأقل.
              </p>
            </div>

            {/* TIME */}
            <div>
              <label className="mb-2 block text-sm font-black">
                وقت المناسبة
              </label>

              <input
                type="time"
                value={form.booking_time}
                onChange={(e) =>
                  updateField(
                    "booking_time",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border p-3 outline-none transition focus:border-[#b87333]"
              />
            </div>

            {/* LOCATION */}
            <div>
              <label className="mb-2 block text-sm font-black">
                مكان المناسبة
              </label>

              <input
                type="text"
                value={form.location}
                onChange={(e) =>
                  updateField(
                    "location",
                    e.target.value
                  )
                }
                placeholder="مثال: قاعة / منزل / فندق"
                className="w-full rounded-xl border p-3 outline-none transition focus:border-[#b87333]"
              />
            </div>

            {/* EVENT TYPE */}
            <div>
              <label className="mb-2 block text-sm font-black">
                نوع المناسبة
              </label>

              <select
                value={form.event_type}
                onChange={(e) =>
                  updateField(
                    "event_type",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border bg-white p-3 outline-none transition focus:border-[#b87333]"
              >
                <option value="">
                  اختر نوع المناسبة
                </option>

                <option value="زفاف">
                  زفاف
                </option>

                <option value="خطوبة">
                  خطوبة
                </option>

                <option value="جلسة تصوير">
                  جلسة تصوير
                </option>

                <option value="حفلة">
                  حفلة
                </option>

                <option value="مناسبة">
                  مناسبة
                </option>

                <option value="أخرى">
                  أخرى
                </option>
              </select>
            </div>
          </div>

          {/* NOTES */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-black">
              ملاحظات إضافية
            </label>

            <textarea
              value={form.notes}
              onChange={(e) =>
                updateField(
                  "notes",
                  e.target.value
                )
              }
              placeholder="اكتب أي تفاصيل إضافية..."
              rows={5}
              className="w-full resize-none rounded-xl border p-3 outline-none transition focus:border-[#b87333]"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-7 w-full rounded-xl bg-[#211f1c] px-6 py-4 font-black text-white transition hover:bg-[#b87333] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "جاري إرسال طلب الحجز..."
              : "إرسال طلب الحجز 📅"}
          </button>
        </form>
      </section>

      <style jsx global>{`
        @keyframes fadeSlide {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}