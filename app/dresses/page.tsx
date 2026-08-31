"use client";

import Link from "next/link";

const sections = [
{
title: "فساتين زفاف",
icon: "👰",
text: "فساتين للعروسة وحفلات الزفاف",
},
{
title: "فساتين خطوبة",
icon: "💍",
text: "تصميمات للخطوبة والمناسبات",
},
{
title: "فساتين سواريه",
icon: "✨",
text: "فساتين سهرة ومناسبات",
},
{
title: "تأجير فساتين",
icon: "👗",
text: "اختاري الفستان المناسب للإيجار",
},
];

export default function DressesPage() {
return (
<main
dir="rtl"
className="min-h-screen bg-[#f7f7f7] text-[#211f1c]"
>
<header className="sticky top-0 z-50 border-b bg-white">
<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
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

  <section className="mx-auto max-w-7xl px-4 py-6">
    <div className="rounded-[2rem] bg-[#211f1c] px-6 py-12 text-white md:px-12">
      <p className="text-sm font-black text-[#d6a66f]">
        TYSON MEDIA • DRESSES
      </p>

      <h1 className="mt-3 text-4xl font-black md:text-5xl">
        فساتين المناسبات 👗
      </h1>

      <p className="mt-4 max-w-2xl leading-7 text-white/65">
        اكتشفي فساتين الزفاف والخطوبة
        والسواريه والتأجير من مقدمي خدمات
        مختلفين.
      </p>
    </div>
  </section>

  <section className="mx-auto max-w-7xl px-4 pb-16">
    <div className="mb-6">
      <p className="text-sm font-black text-[#b87333]">
        CATEGORIES
      </p>

      <h2 className="mt-1 text-3xl font-black">
        اختاري القسم
      </h2>
    </div>

    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {sections.map((section) => (
        <button
          key={section.title}
          type="button"
          className="rounded-3xl border bg-white p-6 text-right transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eee6dc] text-4xl">
            {section.icon}
          </div>

          <h3 className="mt-5 text-lg font-black">
            {section.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {section.text}
          </p>

          <span className="mt-5 block font-black text-[#b87333]">
            استكشف ←
          </span>
        </button>
      ))}
    </div>
  </section>
</main>

);
}