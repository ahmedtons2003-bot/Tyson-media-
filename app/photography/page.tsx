import Link from "next/link";

const categories = [
{
icon: "📸",
title: "التصوير الفوتوغرافي",
description: "أفراح، خطوبة، مناسبات وجلسات تصوير",
},
{
icon: "💍",
title: "Wedding Photography",
description: "تغطية كاملة للفرح والزفاف",
},
{
icon: "💐",
title: "Engagement Photography",
description: "تصوير الخطوبة والزفة",
},
{
icon: "👤",
title: "Portrait",
description: "جلسات بورتريه وشخصية",
},
{
icon: "👗",
title: "Fashion Photography",
description: "تصوير الفاشون والأزياء",
},
{
icon: "🎥",
title: "تصوير الفيديو",
description: "تغطية فيديو للمناسبات والأفراح",
},
{
icon: "🚁",
title: "تصوير Drone",
description: "تصوير جوي احترافي بالدرون",
},
{
icon: "📱",
title: "Reels & Social Media",
description: "فيديوهات قصيرة للسوشيال ميديا",
},
{
icon: "📦",
title: "تصوير المنتجات",
description: "تصوير المنتجات والإعلانات",
},
];

const videoQuality = [
{
title: "Full HD",
description: "تصوير فيديو بجودة Full HD",
},
{
title: "4K",
description: "تصوير فيديو احترافي بجودة 4K",
},
];

export default function PhotographyPage() {
return (
<main dir="rtl" className="min-h-screen bg-[#fbfaf7] text-[#211f1c]">

  {/* Header */}
  <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

      <Link href="/" className="text-2xl font-black">
        Tyson <span className="text-[#b87333]">Media</span>
      </Link>

      <Link
        href="/"
        className="rounded-xl bg-[#211f1c] px-4 py-2 text-sm font-bold text-white"
      >
        الرئيسية
      </Link>

    </div>
  </header>

  {/* Hero */}
  <section className="px-4 py-12 md:py-16">
    <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#211f1c] px-6 py-12 text-center text-white md:px-12">

      <div className="text-6xl">📸</div>

      <h1 className="mt-5 text-4xl font-black md:text-5xl">
        التصوير الاحترافي
      </h1>

      <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
        اختار نوع التصوير المناسب لمناسبتك،
        وشوف الخدمات المتاحة من مقدمي الخدمات على Tyson Media.
      </p>

    </div>
  </section>

  {/* Photography Categories */}
  <section className="mx-auto max-w-6xl px-4 py-8">

    <div className="mb-7">
      <p className="text-sm font-bold text-[#b87333]">
        اختر الخدمة
      </p>

      <h2 className="mt-2 text-3xl font-black">
        أنواع التصوير
      </h2>
    </div>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">

      {categories.map((category) => (
        <Link
          key={category.title}
          href="/providers"
          className="group rounded-3xl border bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
        >

          <div className="text-5xl">
            {category.icon}
          </div>

          <h3 className="mt-5 text-xl font-black">
            {category.title}
          </h3>

          <p className="mt-3 leading-7 text-[#746f68]">
            {category.description}
          </p>

          <span className="mt-5 inline-block font-black text-[#b87333]">
            اكتشف الخدمات ←
          </span>

        </Link>
      ))}

    </div>

  </section>

  {/* Video Quality */}
  <section className="mx-auto max-w-6xl px-4 py-12">

    <div className="rounded-[2rem] bg-[#eee6dc] p-7 md:p-10">

      <p className="text-sm font-bold text-[#b87333]">
        جودة الفيديو
      </p>

      <h2 className="mt-2 text-3xl font-black">
        اختار جودة تصوير الفيديو
      </h2>

      <p className="mt-3 text-[#746f68]">
        الجودة تكون اختيار داخل خدمة الفيديو وليست قسمًا منفصلًا.
      </p>

      <div className="mt-7 grid gap-5 md:grid-cols-2">

        {videoQuality.map((quality) => (
          <Link
            key={quality.title}
            href="/providers"
            className="rounded-2xl border bg-white p-6 transition hover:shadow-md"
          >

            <div className="text-4xl">🎥</div>

            <h3 className="mt-4 text-2xl font-black">
              {quality.title}
            </h3>

            <p className="mt-2 text-[#746f68]">
              {quality.description}
            </p>

            <span className="mt-5 inline-block font-bold text-[#b87333]">
              مشاهدة الخدمات ←
            </span>

          </Link>
        ))}

      </div>

    </div>

  </section>

  {/* Featured Services */}
  <section className="mx-auto max-w-6xl px-4 pb-16">

    <div className="mb-7">
      <p className="text-sm font-bold text-[#b87333]">
        Tyson Media
      </p>

      <h2 className="mt-2 text-3xl font-black">
        جهّز تغطية مناسبتك
      </h2>
    </div>

    <div className="grid gap-5 md:grid-cols-3">

      <div className="rounded-3xl border bg-white p-7">
        <div className="text-5xl">📸</div>

        <h3 className="mt-5 text-xl font-black">
          تصوير فوتوغرافي
        </h3>

        <p className="mt-3 leading-7 text-[#746f68]">
          صور احترافية للفرح والخطوبة والمناسبات والجلسات.
        </p>
      </div>

      <div className="rounded-3xl border bg-white p-7">
        <div className="text-5xl">🎥</div>

        <h3 className="mt-5 text-xl font-black">
          تصوير فيديو
        </h3>

        <p className="mt-3 leading-7 text-[#746f68]">
          تغطية فيديو كاملة، Highlights وفيديوهات سينمائية.
        </p>
      </div>

      <div className="rounded-3xl border bg-white p-7">
        <div className="text-5xl">🚁</div>

        <h3 className="mt-5 text-xl font-black">
          تصوير Drone
        </h3>

        <p className="mt-3 leading-7 text-[#746f68]">
          لقطات جوية مميزة للفرح والمكان والمناسبة.
        </p>
      </div>

    </div>

  </section>

  {/* Footer */}
  <footer className="border-t bg-white">
    <div className="mx-auto max-w-6xl px-4 py-8 text-center">

      <div className="text-xl font-black">
        Tyson <span className="text-[#b87333]">Media</span>
      </div>

      <p className="mt-2 text-sm text-[#746f68]">
        كل خدمات التصوير والمناسبات في مكان واحد.
      </p>

      <p className="mt-5 text-xs text-[#746f68]">
        © 2026 Tyson Media — جميع الحقوق محفوظة
      </p>

    </div>
  </footer>

</main>

);
}