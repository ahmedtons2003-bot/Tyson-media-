import Link from "next/link";

export default function RegisterPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#fbfaf7]">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
        <div className="w-full rounded-3xl border bg-white p-7 shadow-sm">
          <Link href="/" className="text-2xl font-black">
            Tyson <span className="text-[#b87333]">Media</span>
          </Link>

          <h1 className="mt-8 text-3xl font-black">إنشاء حساب</h1>

          <input
            className="mt-6 w-full rounded-xl border p-3"
            placeholder="الاسم"
          />

          <input
            className="mt-3 w-full rounded-xl border p-3"
            type="email"
            placeholder="البريد الإلكتروني"
          />

          <input
            className="mt-3 w-full rounded-xl border p-3"
            type="password"
            placeholder="كلمة المرور"
          />

          <p className="mt-5 font-bold">نوع الحساب</p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <button className="rounded-xl border p-3 font-bold">
              👤 عميل
            </button>

            <button className="rounded-xl border p-3 font-bold">
              🏪 مقدم خدمة
            </button>
          </div>

          <button className="mt-5 w-full rounded-xl bg-[#211f1c] p-3 font-bold text-white">
            إنشاء الحساب
          </button>

          <p className="mt-5 text-center text-sm">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="font-bold text-[#b87333]">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}