import React from "react";

export default function PrayCard({ name, time }) {
  const names = {
    Fajr: "صبح",
    Sunrise: "طلوع",
    Dhuhr: "ظهر",
    Asr: "عصر",
    Sunset: "غروب",
    Maghrib: "مغرب",
    Isha: "عشاء",
    Midnight: "نیمه‌شب",
  };
  return (
    <li>
      <h3>{names[name]}</h3>
      <h3>{time.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d])}</h3>
    </li>
  );
}
