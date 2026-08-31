"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Service = {
  id: string;
  title: string;
  price: number;
  provider_id: string;
  provider?: {
    business_name: string;
    city: string | null;
  } | null;
};

export default function BookingPage() {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("");
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function loadService() {
      const serviceId = new URLSearchParams(window.location.search).get(
        "service"
      );

      if (!serviceId) {
        setMessage("لم يتم تحديد الخدمة.");
        setLoading(false);
        return;
      }

      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setMessage("إعدادات Supabase غير موجودة.");
        setLoading(false);
        return;
      }

      const supabase = createClient(url, key);

      const { data, error } = await supabase
        .from("services")
        .select(`
          id,
          title,
          price,
          provider_id,
          provider:providers (
            business_name,
            city
          )
        `)
        .eq("id", serviceId)
        .eq("is_active", true)
        .single();

      if (error) {
        setMessage("لم نتمكن من تحميل الخدمة.");
      } else {
        setService(data as unknown as Service);
      }

      setLoading(false);
    }

    loadService();
  }, []);

  async function handleBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!service) return;

    if (!name || !phone || !date || !time || !location || !eventType) {
      setMessage("من فضلك املأ جميع البيانات المطلوبة.");
      return;
    }

    setSending(true);
    setMessage("");

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      setMessage("إعدادات Supabase غير موجودة.");
      setSending(false);
      return;
    }

    const supabase = createClient(url, key);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("يجب تسجيل الدخول أولًا لإرسال الحجز.");
      setSending(false);
      return;
    }

    const bookingCode =
      "TM-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    const { error } = await supabase.from("bookings").insert({
      booking_code: bookingCode,
      customer_id: user.id,
      provider_id: service.provider_id,
      service_id: service.id,
      booking_date: date,
      booking_time: time,
      customer_name: name,
      phone,
      location,
      event_type: eventType,
      notes: notes || null,
    });

    if (error) {
      setMessage("حدث خطأ أثناء إرسال الحجز: " + error.message);
    } else {
      setMessage(
        `تم إرسال طلب الحجز بنجاح ✅ رقم الحجز: ${bookingCode}`
      );

      setName("");
      setPhone("");
      setDate("");
      setTime("");
      setLocation("");
      setEventType("");
      setNotes("");
    }

    setSending(false);
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#fbfaf7]"
      >
        <p className="font-bold">جاري تحميل الخدمة...</p>
      </main>
    );
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#fbfaf7]">
      <header className="border-b bg-white px-4 py-