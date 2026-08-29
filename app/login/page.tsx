import Link from "next/link";

export default function LoginPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#fbfaf7]">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
        <div className="w-full rounded-3xl border bg-white p-7 shadow-sm">
          <Link
            href="/"
            className="text-2xl font-black"
          >
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
            className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-[#b87333]"
          />

          <label className="mt-4 block text-sm font-bold">
            كلمة المرور
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-[#b87333]"
          />

          <button className="mt-6 w-full rounded-xl bg-[#211f1c] px-4 py-3 font-bold text-white">
            تسجيل الدخول
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
        </div>
      </div>
    </main>
  );
}