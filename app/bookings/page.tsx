"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Service = {
  id: string;
  title: string;
  price: number | null;
};

export default function BookingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("");
  const [notes, setNotes] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showNotice, setShowNotice] = useState(true);

  const minimumDate = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 30);

    const year = date.getFullYear();
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }, []);

  useEffect(() => {
    async function loadServices() {
      const url =
        process.env.NEXT_PUBLIC_SUPABASE_URL;

      const key =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setLoading(false);
        return;
      }

      const supabase = createClient(url, key);

      const { data } = await supabase
        .from("services")
        .select("id, title, price")
        .eq("is_active", true)
        .order("created_at", {
          ascending: false,
        });

      setServices(
        (data || []) as Service[]
      );

      setLoading(false);
    }

    loadServices();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setMessage("");
    setSuccess(false);

    if (!name || !phone || !date || !time) {
      setMessage(
        "من فضلك املأ البيانات الأساسية."
      );
      return;
    }

    if (date < minimumDate) {
      setMessage(
        "الحجز متاح قبل الموعد بـ30 يومًا على الأقل."
      );
      return;
    }

    const url =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const key =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      setMessage(
        "إعدادات Supabase غير موجودة."
      );
      return;
    }

    const supabase = createClient(url, key);

    const bookingCode =
      "TM-" +
      Date.now()
        .toString()
        .slice(-8);

    const selectedService =
      services.find(
        (service) =>
          service.id === serviceId
      );

    const { error } = await supabase
      .from("bookings")
      .insert({
        booking_code: bookingCode,
        service:
          selectedService?.title ||
          "خدمة غير محددة",
        booking_date: date,
        booking_time: time,
        customer_name: name,
        phone,
        location,
        event_type: eventType,
        notes,
        status: "pending",
      });

    if (error) {
      setMessage(
        "حدث خطأ أثناء إرسال الحجز: " +
          error.message
      );
      return;
    }

    setSuccess(true);
    setMessage(
      `تم إرسال طلب الحجز بنجاح. رقم الحجز: ${bookingCode}`
    );

    setName("");
    setPhone("");
    setServiceId("");
    setDate("");
    setTime("");
    setLocation("");
    setEventType("");
    setNotes("");
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f5f2] text-[#211f1c]"
    >
      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
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

      {/* 30 DAYS NOTICE */}

      {showNotice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white p-7 text-center shadow-2xl">

            <button
              type="button"
              onClick={() =>
                setShowNotice(false)
              }
              className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f1ee] text-xl font-black text-gray-500 transition hover:bg-[#211f1c] hover:text-white"
            >
              ×
            </button>

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f1e6da] text-4xl">
              📅
            </div>

            <h1 className="mt-6 text-2xl font-black">
              تنبيه مهم قبل الحجز
            </h1>

            <div className="mt-5 overflow-hidden rounded-2xl bg-[#211f1c] px-5 py-6">
              <div className="animate-pulse text-xl font-black text-[#d6a66f]">
                الحجز قبل الموعد بـ30 يومًا
              </div>

              <p className="mt-3 text-sm leading-6 text-white/70">
                يجب أن يكون موعد المناسبة بعد
                30 يومًا على الأقل من تاريخ الحجز.
              </p>
            </div>

            <div className="mt-5 rounded-2xl bg-[#f7f3ee] p-4 text-right">
              <p className="text-sm font-bold leading-6 text-gray-600">
                ⚠️ لا يمكن إرسال طلب حجز لموعد
                أقرب من 30 يومًا.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowNotice(false)
              }
              className="mt-6 w-full rounded-xl bg-[#b87333] px-6 py-4 font-black text-white transition hover:bg-[#9d612c]"
            >
              فهمت، أريد المتابعة
            </button>
          </div>
        </div>
      )}

      {/* PAGE TITLE */}

      <section className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-[2rem] bg-[#211f1c] p-8 text-center text-white md:p-12">
          <div className="text-6xl">
            📅
          </div>

          <p className="mt-5 text-sm font-black text-[#d6a66f]">
            TYSON MEDIA • BOOKING
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            احجز خدمتك
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60">
            احجز موعد مناسبتك بسهولة من خلال
            Tyson Media.
          </p>
        </div>
      </section>

      {/* FORM */}

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border bg-white p-6 shadow-sm md:p-8"
        >
          <div className="mb-7 rounded-2xl border border-[#ead9c8] bg-[#fff9f3] p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                🗓️
              </span>

              <div>
                <p className="font-black">
                  آخر موعد متاح للحجز
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  يجب اختيار تاريخ لا يقل عن
                  30 يومًا من اليوم.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* NAME */}

            <div>
              <label className="mb-2 block text-sm font-black">
                الاسم بالكامل *
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(e