"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

type Brand = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
};

type CarType = {
  id: string;
  brand_id: string;
  name: string;
  slug: string;
  image_url: string | null;
};

type EventCar = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
  city: string | null;
};

export default function CarsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [types, setTypes] = useState<CarType[]>([]);
  const [cars, setCars] = useState<EventCar[]>([]);

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedType, setSelectedType] = useState<CarType | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBrands();
  }, []);

  async function loadBrands() {
    if (!supabase) {
      setError("إعدادات Supabase غير موجودة في الموقع.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("car_brands")
      .select("id,name,slug,image_url")
      .eq("is_active", true)
      .order("name");

    if (error) {
      setError(error.message);
    } else {
      setBrands(data || []);
    }

    setLoading(false);
  }

  async function selectBrand(brand: Brand) {
    if (!supabase) return;

    setSelectedBrand(brand);
    setSelectedType(null);
    setCars([]);
    setError("");

    const { data, error } = await supabase
      .from("car_types")
      .select("id,brand_id,name,slug,image_url")
      .eq("brand_id", brand.id)
      .eq("is_active", true)
      .order("name");

    if (error) {
      setError(error.message);
    } else {
      setTypes(data || []);
    }
  }

  async function selectType(type: CarType) {
    if (!supabase || !selectedBrand) return;

    setSelectedType(type);
    setError("");

    const { data, error } = await supabase
      .from("event_cars")
      .select(
        "id,title,description,image_url,price,city"
      )
      .eq("brand_id", selectedBrand.id)
      .eq("car_type_id", type.id)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setCars(data || []);
    }
  }

  function resetSelection() {
    setSelectedBrand(null);
    setSelectedType(null);
    setTypes([]);
    setCars([]);
    setError("");
  }

  if (loading) {
    return (
      <main dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg">جاري تحميل السيارات...</p>
      </main>
    );
  }

  return (
    <main dir="rtl" className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-black text-white px-5 py-10">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={resetSelection}
            className="text-sm text-gray-300 mb-5"
          >
            ← سيارات المناسبات
          </button>

          <h1 className="text-3xl md:text-5xl font-bold">
            سيارات المناسبات
          </h1>

          <p className="mt-3 text-gray-300">
            اختار العربية المناسبة لمناسبتك
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 py-8">

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 text-red-700 p-4">
            {error}
          </div>
        )}

        {/* Brands */}
        {!selectedBrand && (
          <>
            <h2 className="text-2xl font-bold mb-6">
              اختر ماركة العربية
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => selectBrand(brand)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition text-right"
                >
                  <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center overflow-hidden">
                    {brand.image_url ? (
                      <img
                        src={brand.image_url}
                        alt={brand.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-500">
                        {brand.name}
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg">
                      {brand.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      شاهد السيارات
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Car Types */}
        {selectedBrand && !selectedType && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-500 text-sm">
                  الماركة المختارة
                </p>

                <h2 className="text-3xl font-bold">
                  {selectedBrand.name}
                </h2>
              </div>

              <button
                onClick={resetSelection}
                className="px-4 py-2 rounded-xl bg-white border"
              >
                تغيير الماركة
              </button>
            </div>

            <h3 className="text-xl font-bold mb-5">
              اختر نوع العربية
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => selectType(type)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
                >
                  <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center overflow-hidden">
                    {type.image_url ? (
                      <img
                        src={type.image_url}
                        alt={type.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-bold text-gray-500">
                        {type.name}
                      </span>
                    )}
                  </div>

                  <div className="p-4 text-right">
                    <h3 className="font-bold">
                      {type.name}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Cars */}
        {selectedBrand && selectedType && (
          <>
            <div className="mb-6">
              <p className="text-gray-500">
                {selectedBrand.name} / {selectedType.name}
              </p>

              <h2 className="text-3xl font-bold mt-1">
                السيارات المتاحة
              </h2>
            </div>

            {cars.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center">
                <p className="text-gray-500">
                  لا توجد سيارات مضافة لهذا النوع حاليًا.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <div
                    key={car.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                  >
                    <div className="aspect-[4/3] bg-gray-200">
                      {car.image_url ? (
                        <img
                          src={car.image_url}
                          alt={car.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          صورة السيارة
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold">
                        {car.title}
                      </h3>

                      {car.description && (
                        <p className="text-gray-500 mt-2">
                          {car.description}
                        </p>
                      )}

                      {car.city && (
                        <p className="text-sm text-gray-500 mt-3">
                          📍 {car.city}
                        </p>
                      )}

                      {car.price !== null && (
                        <p className="font-bold text-lg mt-3">
                          يبدأ من {car.price} جنيه
                        </p>
                      )}

                      <button
                        className="w-full mt-5 bg-black text-white py-3 rounded-xl font-bold hover:opacity-90"
                        onClick={() =>
                          alert("سيتم إضافة طلب السيارة للمناسبة هنا.")
                        }
                      >
                        اختيار السيارة
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => {
                setSelectedType(null);
                setCars([]);
              }}
              className="mt-8 px-5 py-3 rounded-xl bg-white border"
            >
              ← رجوع لأنواع السيارات
            </button>
          </>
        )}

      </div>
    </main>
  );
}