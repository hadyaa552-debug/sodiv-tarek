import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "جون سوديك الساحل الشمالي — June SODIC North Coast | أسعار وتقسيط ٢٠٢٦",
  description:
    "جون سوديك الساحل الشمالي — June SODIC رأس الحكمة. ٢٨٠ فدان عند الكيلو ١٩٣، تصميم ميامي، ٥٪ مقدم وتقسيط حتى ١٠ سنوات. سوديك للتطوير العقاري — SODIC Developments.",
  keywords:
    "جون سوديك,June SODIC,سوديك,SODIC,جون سوديك الساحل الشمالي,June SODIC North Coast,شاليهات جون سوديك,فلل سوديك,رأس الحكمة,SODIC Developments",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        {/* ══════════════════════════════════════
            TODO: Google Ads Tag — أضف الكود هنا
            ══════════════════════════════════════ */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX" /> */}
        {/* <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-XXXXXXXXX');
        `}} /> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
