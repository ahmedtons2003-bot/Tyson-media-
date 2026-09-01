"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

type Service = {
  id: string;
  title: string;
  price: number | null;
};

type PackageInfo = {
  category: string;
  packageName: string;
  price: string;
};

const photographyPackages: Record<
  string,
  {
    categoryName: string;
    packages: Record<string, string>;
  }
> = {
  wedding: {
    categoryName: "أفراح وخطوبة",
    packages: {
      "باكدج خطوبة": "1,500 ج.م",
      "باكدج فضي": "3,500 ج.م",
      "باكدج ذهبي": "6,000 ج.م",
    },
  },

  portrait: {
    categoryName: "جلسات تصوير شخصية",
    packages: {
      "Mini Session": "600 ج.م",
      "Standard Session": "1,000 ج.م",
      "Premium Session": "1,600 ج.م",
    },
  },

  events: {
    categoryName: "تصوير مناسبات",
    packages: {
      Basic: "يحدد مع مقدم الخدمة",
      Standard: "يحدد مع مقدم الخدمة",
      Premium: "يحدد مع مقدم الخدمة",
    },
  },

  video: {
    categoryName: "تصوير فيديو",
    packages: {
      "Basic Video": "يحدد مع مقدم الخدمة",
      Highlights: "يحدد مع مقدم الخدمة",
      "Premium Video": "يحدد مع مقدم الخدمة",
    },
  },

  commercial: {
    categoryName: "تصوير تجاري",
    packages: {
      Starter: "يحدد مع مقدم الخدمة",
      Business: "يحدد مع مقدم الخدمة",
      Premium: "يحدد مع مقدم الخدمة",
    },
  },
};

export default function BookingPage() {
  const searchParams = useSearchParams();

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

  const packageInfo = useMemo<PackageInfo | null>(() => {
    const category = searchParams.get("category");
    const packageName = searchParams.get("package");

    if (!category || !packageName) {
      return null;
    }

    const categoryData = photographyPackages[category];

    if (!categoryData) {
      return null;
    }

    const price = categoryData.packages[packageName];

    if (!price) {
      return null;
    }

    return {
      category: categoryData.categoryName,
      packageName,
      price,
    };
  }, [searchParams]);

  const minimumDate = useMemo(() => {
    const minimum = new Date();

    minimum.setHours(0, 0, 0, 0);
    minimum.setDate(minimum.getDate() + 30);

    const year = minimum.getFullYear();
    const month = String(minimum.getMonth() + 1).padStart(2, "0");
    const day = String(minimum.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }, []);

  useEffect(() => {
    async function loadServices() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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

      setServices((data || []) as Service[]);
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
      setMessage("من فضلك املأ البيانات الأساسية.");
      return;
    }

    if (date < minimumDate) {
      setMessage(
        "⚠️ عذرًا، يجب الحجز قبل موعد المناسبة بـ30 يومًا على الأقل."
      );
      return;
    }

    /*
      مهم:
      لو المستخدم داخل من باكدج التصوير،
      لا نطلب serviceId لأن الباكدج ثابتة في صفحة التصوير.
    */

    if (!packageInfo && !serviceId) {
      setMessage("من فضلك اختر الخدمة قبل إرسال الحجز.");
      return;
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      setMessage("إعدادات Supabase غير موجودة.");
      return;
    }

    const supabase = createClient(url, key);

    const bookingCode =
      "TM-" + Date.now().toString().slice(-8);

    const selectedService = services.find(
      (service) => service.id === serviceId
    );

    /*
      لو الحجز من باكدج التصوير:
      نحفظ اسم القسم + اسم الباكدج + السعر.

      لو حجز عادي:
      نحفظ اسم الخدمة الموجودة في Supabase.
    */

    const bookingService = packageInfo
      ? `${packageInfo.category} - ${packageInfo.packageName} - ${packageInfo.price}`
      : selectedService?.title || "خدمة غير محددة";

    const { error } = await supabase
      .from("bookings")
      .insert({
        booking_code: bookingCode,
        service: bookingService,
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
        "حدث خطأ أثناء إرسال الحجز: " + error.message
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

      {showNotice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white p-7 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setShowNotice(false)}
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
              <div className="text-xl font-black text-[#d6a66f]">
                الحجز قبل الموعد بـ30 يومًا
              </div>

              <p className="mt-3 text-sm leading-6 text-white/70">
                يجب أن يكون موعد المناسبة بعد
                30 يومًا على الأقل من تاريخ الحجز.
              </p>
            </div>

            <div className="mt-5 rounded-2xl bg-[#f7f3ee] p-4 text-right">
              <p className="text-sm font-bold leading-6 text-gray-600">
                ⚠️ لا يمكن إرسال طلب حجز لموعد أقرب
                من 30 يومًا.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowNotice(false)}
              className="mt-6 w-full rounded-xl bg-[#b87333] px-6 py-4 font-black text-white transition hover:bg-[#9d612c]"
            >
              فهمت، أريد المتابعة
            </button>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-[2rem] bg-[#211f1c] p-8 text-center text-white md:p-12">
          <div className="text-6xl">📅</div>

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

      {packageInfo && (
        <section className="mx-auto max-w-4xl px-4 pb-2">
          <div className="overflow-hidden rounded-[2rem] border-2 border-[#b87333] bg-white shadow-sm">
            <div className="bg-[#211f1c] px-6 py-4 text-center text-white">
              <p className="text-sm font-black text-[#d6a66f]">
                الباكدج المختار
              </p>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-3">
              <div className="rounded-2xl bg-[#f7f3ee] p-4 text-center">
                <div className="text-3xl">📸</div>

                <p className="mt-2 text-xs text-gray-500">
                  نوع التصوير
                </p>

                <p className="mt-1 font-black">
                  {packageInfo.category}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f7f3ee] p-4 text-center">
                <div className="text-3xl">📦</div>

                <p className="mt-2 text-xs text-gray-500">
                  الباكدج
                </p>

                <p className="mt-1 font-black">
                  {packageInfo.packageName}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f1e6da] p-4 text-center">
                <div className="text-3xl">💰</div>

                <p className="mt-2 text-xs text-gray-500">
                  السعر
                </p>

                <p className="mt-1 text-lg font-black text-[#b87333]">
                  {packageInfo.price}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-4 pb-16 pt-6">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border bg-white p-6 shadow-sm md:p-8"
        >
          <div className="mb-7 rounded-2xl border border-[#ead9c8] bg-[#fff9f3] p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🗓️</span>

              <div>
                <p className="font-black">
                  موعد الحجز
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  أول موعد متاح هو بعد 30 يومًا
                  من تاريخ اليوم.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-black">
                الاسم بالكامل *
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="اكتب اسمك بالكامل"
                className="w-full rounded-xl border p-4 outline-none transition focus:border-[#b87333]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-black">
                رقم الهاتف *
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="01xxxxxxxxx"
                className="w-full rounded-xl border p-4 outline-none transition focus:border-[#b87333]"
              />
            </div>
          </div>

          {!packageInfo && (
            <div className="mt-5">
              <label className="mb-2 block text-sm font-black">
                اختر الخدمة *
              </label>

              <select
                value={serviceId}
                onChange={(e) =>
                  setServiceId(e.target.value)
                }
                disabled={loading}
                className="w-full rounded-xl border bg-white p-4 outline-none transition focus:border-[#b87333]"
              >
                <option value="">
                  {loading
                    ? "جارٍ تحميل الخدمات..."
                    : "اختر الخدمة"}
                </option>

                {services.map((service) => (
                  <option
                    key={service.id}
                    value={service.id}
                  >
                    {service.title}
                    {service.price
                      ? ` - ${service.price} ج.م`
                      : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-black">
                تاريخ المناسبة *
              </label>

              <input
                type="date"
                value={date}
                min={minimumDate}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                className="w-full rounded-xl border p-4 outline-none transition focus:border-[#b87333]"
              />

              <p className="mt-2 text-xs text-gray-500">
                أقل تاريخ متاح: {minimumDate}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black">
                وقت المناسبة *
              </label>

              <input
                type="time"
                value={time}
                onChange={(e) =>
                  setTime(e.target.value)
                }
                className="w-full rounded-xl border p-4 outline-none transition focus:border-[#b87333]"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-black">
              مكان المناسبة
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              placeholder="مثال: الإسكندرية - سيدي بشر"
              className="w-full rounded-xl border p-4 outline-none transition focus:border-[#b87333]"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-black">
              نوع المناسبة
            </label>

            <input
              type="text"
              value={eventType}
              onChange={(e) =>
                setEventType(e.target.value)
              }
              placeholder="مثال: فرح، خطوبة، عيد ميلاد"
              className="w-full rounded-xl border p-4 outline-none transition focus:border-[#b87333]"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-black">
              ملاحظات إضافية
            </label>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              rows={5}
              placeholder="اكتب أي تفاصيل إضافية عن الحجز..."
              className="w-full resize-none rounded-xl border p-4 outline-none transition focus:border-[#b87333]"
            />
          </div>

          {message && (
            <div
              className={`mt-6 rounded-2xl p-4 text-center text-sm font-bold ${
                success
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-[#b87333] px-6 py-4 text-lg font-black text-white transition hover:bg-[#9d612c]"
          >
            {packageInfo
              ? `تأكيد حجز ${packageInfo.packageName}`
              : "تأكيد طلب الحجز"}
          </button>

          <p className="mt-4 text-center text-xs leading-6 text-gray-500">
            بإرسال الطلب، سيتم مراجعة الموعد
            والتواصل معك لتأكيد الحجز.
          </p>
        </form>
      </section>
    </main>
  );
}