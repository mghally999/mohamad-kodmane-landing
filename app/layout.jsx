import "./globals.css";
import { LanguageProvider } from "@/app/components/LanguageProvider";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mohamadkodmani.ae";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mohamad Kodmani Real Estate | Dubai Luxury Property",
    template: "%s | Mohamad Kodmani",
  },
  description:
    "Book a private consultation for buying luxury property in Dubai. Personalized guidance for investors and end-users.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Mohamad Kodmani Real Estate | Dubai Luxury Property",
    description:
      "Book a private consultation for buying luxury property in Dubai.",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Mohamad Kodmani" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamad Kodmani Real Estate",
    description:
      "Book a private consultation for buying luxury property in Dubai.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0b0b0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  // JSON-LD (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Mohamad Kodmani Real Estate Brokerage",
    url: siteUrl,
    image: `${siteUrl}/og.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    sameAs: [
      "https://www.linkedin.com/company/mkrealestate-ae/",
      "https://www.instagram.com/mohamadkodmane/",
      "https://www.facebook.com/mo.kodmane",
      "https://www.youtube.com/@Mohamad.Kodmane",
    ],
  };

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Open Sans variable */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />

        {/* Optional Arabic font if you later switch RTL */}
        <link
          href="https://fonts.googleapis.com/css2?family=El+Messiri:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        {/* JSON-LD */}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics (optional) */}
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        ) : null}

        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
