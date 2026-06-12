"use client";
import { useEffect } from "react";

const PI = "+201055887184";
const PD = "0105 588 7184";
const WU = `https://wa.me/201055887184?text=${encodeURIComponent("مرحباً، لسه سجلت في جون سوديك — June SODIC وعايز أعرف التفاصيل")}`;

export default function ThankYou() {
  useEffect(() => {
    // ══════════════════════════════════════
    // TODO: Google Ads Conversion Tracking
    // ══════════════════════════════════════
    // if ((window as any).gtag) {
    //   (window as any).gtag("event", "conversion", {
    //     send_to: "AW-XXXXXXXXX/XXXXXXXXXXX",
    //     value: 1.0,
    //     currency: "USD",
    //   });
    // }
  }, []);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      padding: "40px 24px", fontFamily: "'IBM Plex Sans Arabic', sans-serif", textAlign: "center"
    }}>
      <div style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 28, fontWeight: 600, fontStyle: "italic",
        color: "#fff", marginBottom: 20, letterSpacing: 2,
      }}>JUNE SODIC</div>

      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        background: "rgba(194,65,12,.12)", border: "2px solid rgba(194,65,12,.25)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 40, marginBottom: 20,
      }}>✓</div>

      <h1 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(24px, 5vw, 40px)", fontWeight: 600,
        color: "#fff", marginBottom: 12,
      }}>
        شكراً! تم استلام طلبك
      </h1>

      <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", maxWidth: 460, lineHeight: 1.7, marginBottom: 6 }}>
        فريق مبيعات <strong style={{ color: "#ea580c" }}>جون سوديك — June SODIC</strong> هيتواصل معاك في أقرب وقت.
        ممكن كمان تكلمنا واتساب للرد الأسرع.
      </p>
      <p style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginBottom: 28 }}>
        جون سوديك الساحل الشمالي · June SODIC North Coast · سوديك — SODIC · رأس الحكمة
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
        <a href={WU} target="_blank" rel="noopener" style={{
          display: "flex", alignItems: "center", gap: 7, padding: "13px 26px",
          background: "#25d366", color: "#fff", borderRadius: 10,
          fontSize: 13, fontWeight: 700, textDecoration: "none",
        }}>💬 واتساب جون سوديك</a>
        <a href={`tel:${PI}`} style={{
          display: "flex", alignItems: "center", gap: 7, padding: "13px 26px",
          border: "1px solid rgba(194,65,12,.35)", color: "#ea580c",
          borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none", direction: "ltr",
        }}>📞 {PD}</a>
        <a href="/" style={{
          display: "flex", alignItems: "center", gap: 7, padding: "13px 26px",
          border: "1px solid rgba(255,255,255,.12)", color: "rgba(255,255,255,.6)",
          borderRadius: 10, fontSize: 12, fontWeight: 600, textDecoration: "none",
        }}>← العودة للموقع</a>
      </div>

      <div style={{
        display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center",
        background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.05)",
        borderRadius: 12, padding: "16px 22px", maxWidth: 460,
      }}>
        {[["٢٨٠ فدان","المساحة"],["٥٪","مقدم"],["١٠ سنوات","تقسيط"],["كيلو ١٩٣","رأس الحكمة"]].map(([v,l],i) => (
          <div key={i} style={{ textAlign: "center", minWidth: 70 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#ea580c" }}>{v}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.35)", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 8, color: "rgba(255,255,255,.15)", marginTop: 24 }}>
        © 2026 June SODIC · جون سوديك · SODIC Developments · أسعار استرشادية
      </p>
    </div>
  );
}
