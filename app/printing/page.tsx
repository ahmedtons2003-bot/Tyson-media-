"use client";

import { useState } from "react";
import Link from "next/link";

type Product = {
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
};

type Category = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  products: Product[];
};

const categories: Category[] = [
  {
    id: "mugs",
    title: "مجات",
    subtitle: "اطبع صورتك بطريقتك",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1800&q=85",
    products: [
      {
        name: "مج حراري",
        description: "مج يتغير شكله ويظهر التصميم مع السائل الساخن.",
        price: "يبدأ من 180 ج.م",
        image:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1000&q=85",
        badge: "HOT",
      },
      {
        name: "مج سحري",
        description: "التصميم يظهر بوضوح عند إضافة المية الساخنة.",
        price: "يبدأ من 200 ج.م",
        image:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1000&q=85",
        badge: "POPULAR",
      },
      {
        name: "مج طباعة ثابتة",
        description: "تصميمك مطبوع وثابت على المج بدون تأثير حراري.",
        price: "يبدأ من 150 ج.م",
        image:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1000&q=85",
      },
    ],
  },

  {
    id: "clothing",
    title: "ملابس",
    subtitle: "تصميمك على قطعة تلبسها",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1800&q=85",
    products: [
      {
        name: "تيشيرت",
        description: "تيشيرت مطبوع بصورة أو تصميم من اختيارك.",
        price: "يبدأ من 300 ج.م",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85",
      },
      {
        name: "هودي",
        description: "هودي بتصميم شخصي أو صورة.",
        price: "يبدأ من 550 ج.م",
        image:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85",
        badge: "POPULAR",
      },
      {
        name: "سويت شيرت",
        description: "سويت شيرت بتصميمك الخاص.",
        price: "يبدأ من 450 ج.م",
        image:
          "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1000&q=85",
      },
      {
        name: "كاب",
        description: "كاب مطبوع بتصميم أو اسم من اختيارك.",
        price: "يبدأ من 250 ج.م",
        image:
          "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1000&q=85",
      },
    ],
  },

  {
    id: "gifts",
    title: "هدايا بالصور",
    subtitle: "خلي الصورة ذكرى تعيش",
    image:
      "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=1800&q=85",
    products: [
      {
        name: "كفر موبايل",
        description: "صورتك أو تصميمك مطبوع على كفر الموبايل.",
        price: "يبدأ من 250 ج.م",
        image:
          "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=1000&q=85",
      },
      {
        name: "هدية شخصية",
        description: "تصميم مخصص بصورة أو اسم للمناسبات.",
        price: "حسب التصميم",
        image:
          "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=1000&q=85",
        badge: "CUSTOM",
      },
    ],
  },

  {
    id: "events",
    title: "مناسبات",
    subtitle: "تفاصيل مطبوعة تكمل مناسبتك",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85",
    products: [
      {
        name: "دعوات أفراح وخطوبة",
        description: "دعوات بتصميم أنيق ومخصص لمناسبتك.",
        price: "حسب الكمية والتصميم",
        image:
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85",
      },
      {
        name: "كروت مناسبات",
        description: "كروت مخصصة للمناسبات والاحتفالات.",
        price: "حسب الكمية",
        image:
          "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=85",
      },
      {
        name: "استيكرات",
        description: "استيكرات مخصصة للتوزيعات والهدايا.",
        price: "حسب الكمية",
        image:
          "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1000&q=85",
      },
      {
        name: "Tags وتوزيعات",
        description: "تفاصيل مطبوعة تضيف لمسة خاصة لمناسبتك.",
        price: "حسب الطلب",
        image:
          "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1000&q=85",
      },
    ],
  },

  {
    id: "photos",
    title: "طباعة الصور",
    subtitle: "صورك تستحق أكثر من شاشة الموبايل",
    image:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=1800&q=85",
    products: [
      {
        name: "طباعة صور",
        description: "طباعة صور فوتوغرافية بجودة عالية.",
        price: "يبدأ من 10 ج.م",
        image:
          "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=1000&q=85",
      },
      {
        name: "ألبومات صور",
        description: "ألبوم يجمع أجمل لحظاتك في مكان واحد.",
        price: "حسب المقاس والتصميم",
        image:
          "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1000&q=85",
        badge: "PREMIUM",
      },
      {
        name: "Canvas",
        description: "حوّل صورتك إلى لوحة بطابع فني.",
        price: "حسب المقاس",
        image:
          "https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=1000&q=85",
      },
      {
        name: "براويز صور",
        description: "صورة مطبوعة داخل برواز أنيق.",
        price: "حسب المقاس",
        image:
          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85",
      },
    ],
  },
];

export default function PrintingPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0a0a0a] text-white"
    >
      {/* HEADER */}

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
          <Link
            href="/"
            className="text-xl font-black tracking-tight"
          >
            TYSON <span className="text-[#c89b63]">MEDIA</span>
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-bold transition hover:bg-white hover:text-black"
          >
            الرئيسية
          </Link>
        </div>
      </header>

      {/* HERO */}

      <section className="relative min-h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 animate-[cinematicZoom_18s_ease-in-out_infinite] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=2200&q=90')",
          }}
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-black/50" />

        <div className="relative mx-auto flex min-h-[80vh] max-w-7xl items-end px-5 pb-20">
          <div className="max-w-4xl">
            <p className="text-xs font-black tracking-[0.4em] text-[#d4ad7b]">
              TYSON MEDIA • PRINTING
            </p>

            <h1 className="mt-5 text-5xl font-black leading-tight md:text-8xl">
              صورتك...
              <br />
              <span className="text-[#d4ad7b]">
                خليها منتج.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60">
              اطبع صورك وتصميماتك على المجات والملابس
              والهدايا ومنتجات المناسبات.
            </p>

            <a
              href="#products"
              className="mt-8 inline-block rounded-full bg-[#c89b63] px-8 py-4 font-black text-black transition hover:scale-105"
            >
              استكشف المنتجات
            </a>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="mx-auto max-w-7xl px-5 py-24">
        <p className="text-xs font-black tracking-[0.3em] text-[#c89b63]">
          PRINTING
        </p>

        <h2 className="mt-3 text-4xl font-black md:text-6xl">
          اختار نوع الطباعة
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category)}
              className={`group relative h-60 overflow-hidden rounded-[2rem] text-right transition ${
                activeCategory.id === category.id
                  ? "ring-2 ring-[#c89b63]"
                  : ""
              }`}
            >
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              <div className="absolute bottom-0 p-5">
                <h3 className="text-xl font-black">
                  {category.title}
                </h3>

                <p className="mt-2 text-xs text-white/60">
                  {category.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}

      <section
        id="products"
        className="mx-auto max-w-7xl px-5 pb-28"
      >
        <div className="mb-12 text-center">
          <p className="text-xs font-black tracking-[0.3em] text-[#c89b63]">
            {activeCategory.title.toUpperCase()}
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-6xl">
            {activeCategory.title}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/50">
            {activeCategory.subtitle}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activeCategory.products.map((product) => (
            <article
              key={product.name}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-2 hover:border-[#c89b63]/60"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {product.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-[#c89b63] px-3 py-1 text-[10px] font-black text-black">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-black">
                  {product.name}
                </h3>

                <p className="mt-3 min-h-12 text-sm leading-6 text-white/50">
                  {product.description}
                </p>

                <div className="mt-6 text-lg font-black text-[#d4ad7b]">
                  {product.price}
                </div>

                <Link
                  href={`/checkout?product=${encodeURIComponent(
                    product.name
                  )}`}
                  className="mt-6 block rounded-xl bg-white px-5 py-3 text-center text-sm font-black text-black transition hover:bg-[#c89b63]"
                >
                  اطلب الآن
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="border-t border-white/10 px-5 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black tracking-[0.3em] text-[#c89b63]">
            TYSON MEDIA
          </p>

          <h2 className="mt-5 text-4xl font-black md:text-6xl">
            اطبع ذكرياتك بطريقتك
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/50">
            اختار المنتج، ارفع التصميم أو الصورة،
            وكمل طلبك.
          </p>

          <Link
            href="#products"
            className="mt-8 inline-block rounded-full bg-[#c89b63] px-9 py-4 font-black text-black transition hover:scale-105"
          >
            شوف المنتجات
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Tyson Media
      </footer>
    </main>
  );
}