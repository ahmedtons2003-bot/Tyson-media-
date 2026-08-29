export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="mt-16 border-t bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-10">

        <div className="grid gap-8 md:grid-cols-3">

          <div>
            <h2 className="text-2xl font-black">
              Tyson{" "}
              <span className="text-[#b87333]">
                Media
              </span>
            </h2>

            <p className="mt-3 leading-7 text-[#746f68]">
              منصة تجمع خدمات التصوير ومنتجات
              الهاند ميد في مكان واحد.
            </p>
          </div>

          <div>
            <h3 className="font-black">
              روابط سريعة
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-[#746f68]">
              <a href="/">الرئيسية</a>
              <a href="/photography">التصوير</a>
              <a href="/handmade">Handmade</a>
              <a href="/providers">مقدمو الخدمات</a>
            </div>
          </div>

          <div>
            <h3 className="font-black">
              تواصل معنا
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-[#746f68]">
              <p>📱 واتساب</p>
              <p>📷 Instagram</p>
              <p>📘 Facebook</p>
              <p>✉️ البريد الإلكتروني</p>
            </div>
          </div>

        </div>

        <div className="mt-10 border-t pt-5 text-center text-sm text-[#746f68]">
          © 2026 Tyson Media — جميع الحقوق محفوظة
        </div>

      </div>
    </footer>
  );
}