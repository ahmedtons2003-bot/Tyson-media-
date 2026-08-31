"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Service = {
  id: string;
  title: string;
  price: number;
  provider_id: string;
  deposit_required: boolean;
  deposit_amount: number;
  deposit_payment_method: string | null;
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
      const serviceId = new URLSearchParams(
        window.location.search
      ).get("service");

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
          deposit_required,
          deposit_amount,
          deposit_payment_method,
          provider:providers (
            business_name,
            city
          )
        `)
        .eq("id", serviceId)
        .eq("is_active", true)
        .single();

      if (error) {
        setMessage(
          "لم نتمكن من تحميل الخدمة: " + error.message
        );
      } else {
        setService(data as unknown as Service);
      }

      setLoading(false);
    }

    loadService();
  }, []);

  async function handleBooking(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!service) return;

    if (
      !name ||
      !phone ||
      !date ||
      !time ||
      !location ||
      !eventType
    ) {
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
      "TM-" +
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    const depositAmount = service.deposit_required
      ? Number(service.deposit_amount || 0)
      : 0;

    const depositStatus =
      depositAmount > 0 ? "pending" : "cancelled";

    const paymentMethod =
      depositAmount > 0
        ? service.deposit_payment_method || "wallet"
        : null;

    const { error } = await supabase
      .from("bookings")
      .insert({
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

        deposit_amount: depositAmount,
        deposit_status: depositStatus,
        deposit_payment_method: paymentMethod,
      });

    if (error) {
      setMessage(
        "حدث خطأ أثناء إرسال الحجز: " + error.message
      );
    } else {
      if (depositAmount > 0) {
        setMessage(
          `تم إنشاء طلب الحجز ✅ رقم الحجز: ${bookingCode} — العربون المطلوب ${depositAmount.toLocaleString(
            "ar-EG"
          )} ج.م. سيتم الانتقال للدفع بالمحفظة بعد ربط بوابة الدفع.`
        );
      } else {
        setMessage(
          `تم إرسال طلب الحجز بنجاح ✅ رقم الحجز: ${bookingCode}`
        );
      }

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
        <p className="font-bold">
          جاري تحميل الخدمة...
        </p>
      </main>
    );
  }

  if (!service) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#fbfaf7] px-4"
      >
        <div className="w-full max-w-md rounded-3xl border bg-white p-7 text-center">
          <p className="font-bold text-red-600">
            {message || "الخدمة غير موجودة."}
          </p>

          <Link
            href="/photography"
            className="mt-5 block rounded-xl bg-[#211f1c] px-4 py-3 font-bold text-white"
          >
            العودة لخدمات التصوير
          </Link>
        </div>
      </main>
    );
  }

  const depositAmount = service.deposit_required
    ? Number(service.deposit_amount || 0)
    : 0;

  const remainingAmount = Math.max(
    Number(service.price || 0) - depositAmount,
    0
  );

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#fbfaf7]"
    >
      <header className="border-b bg-white px-4 py-5">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
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
            href="/photography"
            className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-bold text-white"
          >
            الخدمات
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-3xl bg-[#211f1c] p-7 text-white">
          <p className="text-sm opacity-70">
            📸 حجز خدمة
          </p>

          <h1 className="mt-2 text-3xl font-black">
            {service.title}
          </h1>

          <p className="mt-3 text-white/70">
            {service.provider?.business_name ||
              "مقدم خدمة"}

            {service.provider?.city
              ? ` — ${service.provider.city}`
              : ""}
          </p>

          <div className="mt-5 rounded-2xl bg-white/10 p-5">
            <div className="flex items-center justify-between">
              <span className="text-white/70">
                سعر الخدمة
              </span>

              <span className="text-2xl font-black">
                {Number(service.price).toLocaleString(
                  "ar-EG"
                )}{" "}
                ج.م
              </span>
            </div>

            {depositAmount > 0 && (
              <>
                <div className="my-4 border-t border-white/10" />

                <div className="flex items-center justify-between">
                  <span className="text-white/70">
                    العربون المطلوب
                  </span>

                  <span className="text-xl font-black text-[#d99b63]">
                    {depositAmount.toLocaleString(
                      "ar-EG"
                    )}{" "}
                    ج.م
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-white/60">
                    المتبقي بعد دفع العربون
                  </span>

                  <span className="font-bold">
                    {remainingAmount.toLocaleString(
                      "ar-EG"
                    )}{" "}
                    ج.م
                  </span>
                </div>
              </>
            )}
          </div>

          {depositAmount > 0 && (
            <div className="mt-4 rounded-2xl border border-[#b87333]/40 bg-[#b87333]/10 p-4">
              <p className="font-black">
                💳 يوجد عربون لهذه الخدمة
              </p>

              <p className="mt-2 text-sm leading-6 text-white/70">
                سيتم دفع العربون عن طريق المحفظة
                الإلكترونية قبل تأكيد الحجز النهائي.
              </p>
            </div>
          )}
        </div>

        <form
          onSubmit={handleBooking}
          className="mt-6 rounded-3xl border bg-white p-6"
        >
          <h2 className="text-xl font-black">
            بيانات الحجز
          </h2>

          <label className="mt-6 block text-sm font-bold">
            الاسم *
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-[#b87333]"
            placeholder="اكتب اسمك"
          />

          <label className="mt-4 block text-sm font-bold">
            رقم الهاتف *
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-[#b87333]"
            placeholder="01xxxxxxxxx"
          />

          <label className="mt-4 block text-sm font-bold">
            تاريخ المناسبة *
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-[#b87333]"
          />

          <label className="mt-4 block text-sm font-bold">
            الوقت *
          </label>

          <input
            type="time"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
            className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-[#b87333]"
          />

          <label className="mt-4 block text-sm font-bold">
            مكان المناسبة *
          </label>

          <input
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-[#b87333]"
            placeholder="مثال: الإسكندرية"
          />

          <label className="mt-4 block text-sm font-bold">
            نوع المناسبة *
          </label>

          <select
            value={eventType}
            onChange={(e) =>
              setEventType(e.target.value)
            }
            className="mt-2 w-full rounded-xl border bg-white p-3 outline-none focus:border-[#b87333]"
          >
            <option value="">
              اختر نوع المناسبة
            </option>
            <option value="wedding">
              فرح
            </option>
            <option value="engagement">
              خطوبة
            </option>
            <option value="birthday">
              عيد ميلاد
            </option>
            <option value="party">
              حفلة
            </option>
            <option value="portrait">
              جلسة تصوير
            </option>
            <option value="other">
              أخرى
            </option>
          </select>

          <label className="mt-4 block text-sm font-bold">
            ملاحظات
          </label>

          <textarea
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            className="mt-2 min-h-28 w-full rounded-xl border p-3 outline-none focus:border-[#b87333]"
            placeholder="أي تفاصيل إضافية..."
          />

          {message && (
            <div className="mt-5 rounded-xl bg-[#fbfaf7] p-4 text-center text-sm font-bold leading-6">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={sending}
            className="mt-6 w-full rounded-xl bg-[#211f1c] px-4 py-4 font-black text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending
              ? "جاري إرسال الحجز..."
              : depositAmount > 0
              ? `متابعة دفع العربون — ${depositAmount.toLocaleString(
                  "ar-EG"
                )} ج.م`
              : "تأكيد طلب الحجز"}
          </button>
        </form>
      </section>
    </main>
  );
}