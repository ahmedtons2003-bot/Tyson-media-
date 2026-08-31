"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        setMessage(
          "إعدادات Supabase غير موجودة. تأكد من Environment Variables في Vercel."
        );
        return;
      }

      if (!email.trim() || !password) {
        setMessage("من فضلك اكتب البريد الإلكتروني وكلمة المرور.");
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setMessage("خطأ: " + error.message);
        return;
      }

      setMessage("تم تسجيل الدخول بنجاح ✅");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
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
          onSubmit={handleLogin}
          className="w-full rounded-3xl border bg-white p-7 shadow-sm"
        >
          <Link href="/" className="text-2xl font-black">
            Tyson <span className="text-[#b87333]">Media</span>
          </Link>

          <h1 className="mt-8 text-3xl font-black">
            تسجيل الدخول
          </h1>

          <p className="mt-2 text-[#746f68]">
            ادخل إلى حسابك على Tyson Media.
          </p>

          <label className="mt-7 block text-sm font-bold">
            البريد الإلكتروني
          </label>

          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-[#b87333]"
          />

          <label className="mt-4 block text-sm font-bold">
            كلمة المرور
          </label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-[#b87333]"
          />

          {message && (
            <div className="mt-4 rounded-xl bg-gray-100 p-3 text-sm font-bold">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-[#211f1c] px-4 py-3 font-bold text-white disabled:opacity-50"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>

          <p className="mt-6 text-center text-sm text-[#746f68]">
            ليس لديك حساب؟{" "}
            <Link
              href="/register"
              className="font-bold text-[#b87333]"
            >
              إنشاء حساب
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}