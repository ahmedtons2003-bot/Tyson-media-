"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const packages = {
  SILVER: {
    name: "Silver",
    price: "3,500 ج.م",
  },
  GOLD: {
    name: "Gold",
    price: "6,000 ج.م",
  },
  PREMIUM: {
    name: "Premium",
    price: "حسب الطلب",
  },
  PLATINUM: {
    name: "Platinum",
    price: "حسب الطلب",
  },
};

export default function BookingPage() {
  const searchParams = useSearchParams();

  const initialPackage =
    searchParams.get("package") || "GOLD";

  const category =
    searchParams.get("category") || "weddings";

  const [selectedPackage, setSelectedPackage] =
    useState(initialPackage);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const [notice, setNotice] = useState(true);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const minimumDate = useMemo(() => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() + 30);

    return today.toISOString().split("T")[0];
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setSuccess(false);

    if (!name || !phone || !date || !time) {
      setMessage("من فضلك املأ البيانات الأساسية.");
      return;
    }

    if (date < minimumDate) {
      setMessage(
        "لا يمكن الحجز. يجب أن يكون موعد المناسبة بعد 30 يومًا على الأقل."
      );
      return;
    }

    setSuccess(true);

    setMessage(
      "تم إرسال طلب الحجز بنجاح. سيتم التواصل معك لتأكيد الموعد."
    );
  }

  const currentPackage =
    packages[
      selectedPackage as keyof typeof packages
    ] || packages.GOLD;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#080808] text-white"
    >
      {/* HEADER */}

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
          <Link
            href="/"
            className="text-xl font-black"
          >
            TYSON{" "}
            <span className="text-[#c89b63]">
              MEDIA
            </span>
          </Link>

          <Link
            href="/photography"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-bold"
          >
            العودة للتصوير
          </Link>
        </div>
      </header>

      {/* 30 DAYS CINEMATIC NOTICE */}

      {notice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-5 backdrop-blur-md">
          <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-[#111] p-8 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setNotice(false)}
              className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-white hover:text-black"
            >
              ×
            </button>

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#c89b63]/40 bg-[#c89b63]/10 text-3xl">
              📅
            </div>

            <p className="mt-7 text-xs font-black tracking-[0.35em] text-[#c89b63]">
              BOOKING POLICY
            </p>

            <h1 className="mt-4 text-3xl font-black">
              الحجز قبل الموعد بـ30 يوم
            </h1>

            <p className="mt-5 text-sm leading-8 text-white/55">
              لضمان توفر المصور والموعد المناسب،
              يجب إرسال طلب الحجز قبل موعد المناسبة
              بـ30 يومًا على الأقل.
            </p>

            <div className="mt-7 rounded-2xl border border-[#c89b63]/20 bg-[#c89b63]/5 p-5">
              <p className="text-sm font-bold text-[#d4ad7b]">
                ⚠️ المواعيد الأقل من 30 يومًا
              </p>

              <p className="mt-2 text-xs leading-6 text-white/45">
                لن يتم قبولها من خلال نظام الحجز.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setNotice(false)}
              className="mt-7 w-full rounded-xl bg-[#c89b63] px-6 py-4 font-black text-black transition hover:bg-white"
            >
              فهمت، أريد المتابعة
            </button>
          </div>
        </div>
      )}

      {/* HERO */}

      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#4a351f,transparent_45%)] opacity-40" />

        <div className="relative mx-auto max-w-6xl px-5 py-20 text-center">
          <p className="text-xs font-black tracking-[0.4em] text-[#c89b63]">
            TYSON MEDIA • BOOKING
          </p>

          <h2 className="mt-5 text-5xl font-black md:text-7xl">
            احجز لحظتك
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/50">
            اختار الباكدج المناسبة وحدد موعد مناسبتك،
            وإحنا نتواصل معاك لتأكيد الحجز.
          </p>
        </div>
      </section>

      {/* FORM */}

      <section className="mx-auto max-w-5xl px-5 pb-24">
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
        >
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            {/* SUMMARY */}

            <aside className="bg-[#111] p-7 md:p-9">
              <p className="text-xs font-black tracking-[0.3em] text-[#c89b63]">
                YOUR PACKAGE
              </p>

              <h3 className="mt-4 text-3xl font-black">
                {currentPackage.name}
              </h3>

              <p className="mt-3 text-2xl font-black text-[#d4ad7b]">
                {currentPackage.price}
              </p>

              <div className="my-8 h-px bg-white/10" />

              <p className="text-sm text-white/40">
                نوع الخدمة
              </p>

              <p className="mt-2 font-bold">
                {category === "engagement"
                  ? "تصوير خطوبة"
                  : category === "portrait"
                    ? "Portrait"
                    : category === "fashion"
                      ? "Fashion"
                      : "تصوير أفراح ومناسبات"}
              </p>

              <div className="mt-8 rounded-2xl border border-[#c89b63]/20 bg-[#c89b63]/5 p-5">
                <p className="font-black text-[#d4ad7b]">
                  📅 سياسة الحجز
                </p>

                <p className="mt-2 text-xs leading-6 text-white/45">
                  يجب اختيار موعد بعد 30 يومًا
                  على الأقل.
                </p>
              </div>
            </aside>

            {/* FORM */}

            <div className="p-7 md:p-9">
              <div className="grid gap-5 md:grid-cols-2">
                {/* NAME */}

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    الاسم بالكامل *
                  </label>

                  <input
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="اكتب اسمك"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-[#c89b63]"
                  />
                </div>

                {/* PHONE */}

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    رقم الهاتف *
                  </label>

                  <input
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="01xxxxxxxxx"
                    inputMode="tel"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-[#c89b63]"
                  />
                </div>

                {/* PACKAGE */}

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    الباكدج *
                  </label>

                  <select
                    value={selectedPackage}
                    onChange={(e) =>
                      setSelectedPackage(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#151515] px-4 py-4 outline-none focus:border-[#c89b63]"
                  >
                    <option value="SILVER">
                      Silver
                    </option>

                    <option value="GOLD">
                      Gold
                    </option>

                    <option value="PREMIUM">
                      Premium
                    </option>

                    <option value="PLATINUM">
                      Platinum
                    </option>
                  </select>
                </div>

                {/* DATE */}

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    تاريخ المناسبة *
                  </label>

                  <input
                    type="date"
                    min={minimumDate}
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-[#c89b63]"
                  />

                  <p className="mt-2 text-xs text-[#c89b63]">
                    يجب الحجز قبل الموعد بـ30 يومًا على الأقل.
                  </p>
                </div>

                {/* TIME */}

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    وقت المناسبة *
                  </label>

                  <input
                    type="time"
                    value={time}
                    onChange={(e) =>
                      setTime(e.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-[#c89b63]"
                  />
                </div>

                {/* LOCATION */}

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    مكان المناسبة
                  </label>

                  <input
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    placeholder="المحافظة / المكان"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-[#c89b63]"
                  />
                </div>

                {/* NOTES */}

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-bold">
                    ملاحظات
                  </label>

                  <textarea
                    value={notes}
                    onChange={(e) =>
                      setNotes(e.target.value)
                    }
                    rows={4}
                    placeholder="أي تفاصيل إضافية..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-[#c89b63]"
                  />
                </div>
              </div>

              {/* MESSAGE */}

              {message && (
                <div
                  className={`mt-6 rounded-xl p-4 text-sm font-bold ${
                    success
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* SUBMIT */}

              <button
                type="submit"
                className="mt-7 w-full rounded-xl bg-[#c89b63] px-6 py-5 font-black text-black transition hover:bg-white"
              >
                إرسال طلب الحجز
              </button>

              <p className="mt-4 text-center text-xs text-white/30">
                إرسال الطلب لا يعني تأكيد الحجز
                النهائي. سيتم التواصل معك للتأكيد.
              </p>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}