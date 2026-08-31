"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Service = {
  id: string;
  title: string;
  price: number;
  provider_id: string;

  deposit_required: boolean;
  deposit_amount: number;
  deposit_payment_method: string | null;

  provider?: {
    business_name: string;
    city: string | null;
  } | null;
};

const ORANGE_CASH_NUMBERS = [
  "01208338744",
  "01208338919",
];

const isUuid = (value: string) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
};

export default function BookingPage() {
  const [service, setService] = useState<Service | null>(
    null
  );

  const [specialService, setSpecialService] =
    useState<"video" | "drone" | null>(null);

  const [quality, setQuality] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("");
  const [notes, setNotes] = useState("");

  const [walletNumber, setWalletNumber] = useState("");
  const [paymentReference, setPaymentReference] =
    useState("");

  useEffect(() => {
    async function loadService() {
      const params = new URLSearchParams(
        window.location.search
      );

      const serviceId = params.get("service");
      const requestedQuality = params.get("quality");

      setQuality(requestedQuality || "");

      if (!serviceId) {
        setMessage("لم يتم تحديد الخدمة.");
        setLoading(false);
        return;
      }

      /*
       * Video / Drone
       *
       * دول مش UUIDs.
       * لذلك لا نرسلهم إلى Supabase كـ id.
       */
      if (
        serviceId === "video" ||
        serviceId === "drone"
      ) {
        setSpecialService(serviceId);
        setLoading(false);
        return;
      }

      /*
       * أي خدمة عادية لازم تكون UUID
       */
      if (!isUuid(serviceId)) {
        setMessage("معرف الخدمة غير صحيح.");
        setLoading(false);
        return;
      }

      const url =
        process.env.NEXT_PUBLIC_SUPABASE_URL;

      const key =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setMessage(
          "إعدادات Supabase غير موجودة."
        );
        setLoading(false);
        return;
      }

      const supabase = createClient(url, key);

      const { data, error } = await supabase
        .from("services")
        .select(`
          id,
          title,
          price,
          provider_id,
          deposit_required,
          deposit_amount,
          deposit_payment_method,
          provider:providers (
            business_name,
            city
          )
        `)
        .eq("id", serviceId)
        .eq("is_active", true)
        .single();

      if (error) {
        setMessage(
          "لم نتمكن من تحميل الخدمة: " +
            error.message
        );
      } else {
        setService(
          data as unknown as Service
        );
      }

      setLoading(false);
    }

    loadService();
  }, []);

  async function handleBooking(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setMessage("");
    setSuccess(false);

    if (
      !name.trim() ||
      !phone.trim() ||
      !date ||
      !time ||
      !location.trim() ||
      !eventType
    ) {
      setMessage(
        "من فضلك املأ جميع البيانات المطلوبة."
      );
      return;
    }

    /*
     * الخدمة العادية
     */
    const servicePrice = service
      ? Number(service.price || 0)
      : 0;

    const depositAmount = service
      ? service.deposit_required
        ? Number(service.deposit_amount || 0)
        : 0
      : 0;

    /*
     * Video / Drone
     * لسه مفيش Service UUID محدد لهم.
     */
    if (specialService) {
      setSending(true);

      const url =
        process.env.NEXT_PUBLIC_SUPABASE_URL;

      const key =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setMessage(
          "إعدادات Supabase غير موجودة."
        );
        setSending(false);
        return;
      }

      const supabase = createClient(url, key);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage(
          "يجب تسجيل الدخول أولًا لإرسال الحجز."
        );
        setSending(false);
        return;
      }

      /*
       * نحاول العثور على خدمة Video / Drone
       * من جدول services.
       */
      const searchWords =
        specialService === "video"
          ? ["video", "فيديو"]
          : ["drone", "درون"];

      let foundService: Service | null = null;

      for (const word of searchWords) {
        const { data } = await supabase
          .from("services")
          .select(`
            id,
            title,
            price,
            provider_id,
            deposit_required,
            deposit_amount,
            deposit_payment_method,
            provider:providers (
              business_name,
              city
            )
          `)
          .eq("is_active", true)
          .ilike("title", `%${word}%`)
          .limit(1)
          .maybeSingle();

        if (data) {
          foundService =
            data as unknown as Service;
          break;
        }
      }

      /*
       * لو لقينا الخدمة، نستخدم UUID الحقيقي.
       */
      if (foundService) {
        const finalDeposit =
          foundService.deposit_required
            ? Number(
                foundService.deposit_amount || 0
              )
            : 0;

        if (finalDeposit > 0) {
          if (!walletNumber.trim()) {
            setMessage(
              "من فضلك اكتب رقم المحفظة التي دفعت منها."
            );
            setSending(false);
            return;
          }

          if (!paymentReference.trim()) {
            setMessage(
              "من فضلك اكتب رقم عملية التحويل."
            );
            setSending(false);
            return;
          }
        }

        const bookingCode =
          "TM-" +
          Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();

        const { error } = await supabase
          .from("bookings")
          .insert({
            booking_code: bookingCode,

            customer_id: user.id,

            provider_id:
              foundService.provider_id,

            service_id:
              foundService.id,

            booking_date: date,
            booking_time: time,

            customer_name:
              name.trim(),

            phone: phone.trim(),

            location:
              location.trim(),

            event_type: eventType,

            notes:
              [
                specialService === "video"
                  ? "تصوير فيديو"
                  : "تصوير Drone",
                quality
                  ? `الجودة: ${quality}`
                  : "",
                notes.trim(),
              ]
                .filter(Boolean)
                .join(" — ") || null,

            deposit_amount:
              finalDeposit,

            deposit_status:
              finalDeposit > 0
                ? "pending"
                : "cancelled",

            deposit_payment_method:
              finalDeposit > 0
                ? "orange_cash"
                : null,

            payment_wallet_number:
              finalDeposit > 0
                ? walletNumber.trim()
                : null,

            payment_reference:
              finalDeposit > 0
                ? paymentReference.trim()
                : null,

            payment_note:
              finalDeposit > 0
                ? "تحويل Orange Cash - في انتظار مراجعة الدفع"
                : null,
          });

        if (error) {
          setMessage(
            "حدث خطأ أثناء إرسال الحجز: " +
              error.message
          );

          setSending(false);
          return;
        }

        setSuccess(true);

        setMessage(
          `تم إرسال طلب الحجز بنجاح ✅ رقم الحجز: ${bookingCode}`
        );

        setSending(false);
        return;
      }

      /*
       * لو مفيش خدمة Video / Drone
       * لا نحاول إدخال service_id غلط.
       */
      setMessage(
        `تم استلام طلب ${specialService === "video" ? "تصوير الفيديو" : "تصوير Drone"}، لكن الخدمة غير مضافة حاليًا في قاعدة البيانات.`
      );

      setSending(false);
      return;
    }

    /*
     * الخدمة العادية
     */
    if (!service) {
      setMessage("الخدمة غير موجودة.");
      return;
    }

    if (depositAmount > 0) {
      if (!