 "use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<"customer" | "provider">(
    "customer"
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        setMessage(
          "إعدادات Supabase غير موجودة في الموقع. تأكد من Environment Variables في Vercel."
        );
        return;
      }

      if (!name.trim() || !email.trim() || !password) {
        setMessage("من فضلك املأ جميع البيانات.");
        return;
      }

      if (password.length < 6) {
        setMessage("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            name: name.trim(),
            account_type: accountType,
          },
        },
      });

      if (error) {
        setMessage("خطأ: " + error.message);
        return;
      }

      if (!data.user) {
        setMessage("حدث خطأ ولم يتم إنشاء الحساب.");
        return;
      }

      setMessage("تم إنشاء الحساب بنجاح.");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? "خطأ: " + error.message
          : "حدث خطأ غير متوقع."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#fbfaf7]">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
        <form
          onSubmit={handleRegister}
          className="w-full rounded-3xl border bg-white p-7 shadow-sm"
        >
          <Link href="/" className="text-2xl font-black">
            Tyson <span className="text-[#b87333]">Media</span>
          </Link>

          <h1 className="mt-8 text-3xl font-black">إنشاء حساب</h1>

          <input
            className="mt-6 w-full rounded-xl border p-3"
            placeholder="الاسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />

          <input
            className="mt-3 w-full rounded-xl border p-3"
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <input
            className="mt-3 w-full rounded-xl border p-3"
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <p className="mt-5 font-bold">نوع الحساب</p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setAccountType("customer")}
              disabled={loading}
              className={`rounded-xl border p-3 font-bold ${
                accountType === "customer"
                  ? "border-[#b87333] bg-[#b87333]/10"
                  : ""
              }`}
            >
              👤 عميل
            </button>

            <button
              type="button"
              onClick={() => setAccountType("provider")}
              disabled={loading}
              className={`rounded-xl border p-3 font-bold ${
                accountType === "provider"
                  ? "border-[#b87333] bg-[#b87333]/10"
                  : ""
              }`}
            >
              🏪 مقدم خدمة
            </button>
          </div>

          {message && (
            <div className="mt-4 rounded-xl bg-gray-100 p-3 text-sm font-bold">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-xl bg-[#211f1c] p-3 font-bold text-white disabled:opacity-50"
          >
            {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
          </button>

          <p className="mt-5 text-center text-sm">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="font-bold text-[#b87333]">
              تسجيل الدخول
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}