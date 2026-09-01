"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

type UserRole = {
  id: string;
  user_id: string;
  role: "owner" | "admin" | "provider" | "customer";
  created_at: string;
};

export default function AdminPage() {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    loadAdminData();
  }, []);

  async function loadAdminData() {
    setLoading(true);
    setMessage("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage("يجب تسجيل الدخول أولًا.");
      setLoading(false);
      return;
    }

    const { data: myRole, error: roleError } =
      await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

    if (roleError || myRole?.role !== "owner") {
      setMessage(
        "ليس لديك صلاحية الدخول إلى لوحة الإدارة."
      );
      setLoading(false);
      return;
    }

    setIsOwner(true);

    const { data, error } = await supabase
      .from("user_roles")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      setMessage(
        "حدث خطأ أثناء تحميل المستخدمين."
      );
      setLoading(false);
      return;
    }

    setRoles(data || []);
    setLoading(false);
  }

  async function changeRole(
    target: UserRole,
    newRole:
      | "admin"
      | "provider"
      | "customer"
  ) {
    if (target.role === "owner") {
      setMessage(
        "لا يمكن تعديل صلاحيات حساب الـOwner."
      );
      return;
    }

    setMessage("جاري تحديث الصلاحيات...");

    const { error } = await supabase
      .from("user_roles")
      .update({
        role: newRole,
      })
      .eq("id", target.id);

    if (error) {
      setMessage(
        "حدث خطأ أثناء تحديث الصلاحيات."
      );
      return;
    }

    setMessage(
      "تم تحديث صلاحيات المستخدم بنجاح ✅"
    );

    loadAdminData();
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#080808] text-white"
    >
      {/* HEADER */}

      <header className="border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
          <Link
            href="/"
            className="text-xl font-black"
          >
            TYSON{" "}
            <span className="text-[#c89b63]">
              MEDIA
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {isOwner && (
              <span className="rounded-full border border-[#c89b63]/30 bg-[#c89b63]/10 px-4 py-2 text-xs font-black text-[#d4ad7b]">
                👑 OWNER
              </span>
            )}

            <Link
              href="/"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-bold"
            >
              الرئيسية
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-10">
          <p className="text-xs font-black tracking-[0.35em] text-[#c89b63]">
            TYSON MEDIA • ADMIN PANEL
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            لوحة التحكم
          </h1>

          <p className="mt-4 text-sm text-white/50">
            إدارة صلاحيات المستخدمين في منصة Tyson Media.
          </p>
        </div>

        {/* MESSAGE */}

        {message && (
          <div className="mb-6 rounded-2xl border border-[#c89b63]/20 bg-[#c89b63]/10 p-5 text-sm font-bold text-[#d4ad7b]">
            {message}
          </div>
        )}

        {/* LOADING */}

        {loading ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-12 text-center text-white/50">
            جاري تحميل لوحة التحكم...
          </div>
        ) : !isOwner ? (
          <div className="rounded-[2rem] border border-red-500/20 bg-red-500/5 p-12 text-center">
            <h2 className="text-2xl font-black text-red-400">
              غير مصرح لك بالدخول
            </h2>

            <p className="mt-4 text-sm text-white/50">
              هذه الصفحة متاحة لصاحب المنصة فقط.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
            <div className="border-b border-white/10 p-6">
              <h2 className="text-xl font-black">
                المستخدمون والصلاحيات
              </h2>

              <p className="mt-2 text-sm text-white/40">
                يمكنك التحكم في صلاحيات الحسابات.
              </p>
            </div>

            <div className="divide-y divide-white/10">
              {roles.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div>
                    <p className="font-mono text-sm text-white/70">
                      {user.user_id}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          user.role === "owner"
                            ? "bg-[#c89b63]/15 text-[#d4ad7b]"
                            : user.role === "admin"
                              ? "bg-purple-500/15 text-purple-300"
                              : user.role === "provider"
                                ? "bg-blue-500/15 text-blue-300"
                                : "bg-white/10 text-white/50"
                        }`}
                      >
                        {user.role === "owner"
                          ? "👑 OWNER"
                          : user.role === "admin"
                            ? "🛡️ ADMIN"
                            : user.role === "provider"
                              ? "📸 PROVIDER"
                              : "👤 CUSTOMER"}
                      </span>

                      <span className="text-xs text-white/30">
                        {new Date(
                          user.created_at
                        ).toLocaleDateString("ar-EG")}
                      </span>
                    </div>
                  </div>

                  {user.role !== "owner" && (
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          changeRole(user, "admin")
                        }
                        className="rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-sm font-bold text-purple-300"
                      >
                        جعله Admin
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          changeRole(user, "provider")
                        }
                        className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm font-bold text-blue-300"
                      >
                        جعله Provider
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          changeRole(user, "customer")
                        }
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/60"
                      >
                        Customer
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {roles.length === 0 && (
                <div className="p-12 text-center text-white/40">
                  لا توجد حسابات مسجلة.
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}