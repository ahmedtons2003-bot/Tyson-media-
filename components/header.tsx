import Link from "next/link";

export default function Header() {
  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-black">
          Tyson <span className="text-[#b87333]">Media</span>
        </Link>

        <nav className="hidden gap-6 md:flex">
          <Link href="/">الرئيسية</Link>
          <Link href="/photography">التصوير</Link>
          <Link href="/handmade">Handmade</Link>
          <Link href="/providers">مقدمو الخدمات</Link>
        </nav>

        <div className="flex gap-2">
          <Link
            href="/login"
            className="rounded-xl bg-[#f2eee8] px-4 py-2 text-sm font-bold"
          >
            دخول
          </Link>

          <Link
            href="/register"
            className="hidden rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-bold text-white sm:block"
          >
            حساب جديد
          </Link>
        </div>
      </div>
    </header>
  );
}