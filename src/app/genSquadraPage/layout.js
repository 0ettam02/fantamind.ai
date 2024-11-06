import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Generatore Squadra Fantacalcio | Fantamind.ai",
  description: "Crea la squadra perfetta per il Fantacalcio con il nostro algoritmo di AI che analizza statistiche e performance",
  keywords: "generatore squadra, fantacalcio, creazione rosa, ottimizzazione squadra, AI",
  openGraph: {
    title: "Generatore Squadra | Fantamind.ai",
    description: "Crea la squadra perfetta per il Fantacalcio",
    type: "website",
    locale: "it_IT",
    url: "https://fantamind-ai.vercel.app/genSquadraPage",
    siteName: "Fantamind.ai",
    // images: [
    //   {
    //     url: "/team-og.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Generatore Squadra Fantamind.ai"
    //   }
    // ]
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Generatore Squadra | Fantamind.ai",
  //   description: "Crea la squadra perfetta per il Fantacalcio",
  //   images: ["/team-twitter.jpg"]
  // },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <head>
        <script
          type="application/ld+json"
          // dangerouslySetInnerHTML={{
          //   __html: JSON.stringify({
          //     "@context": "https://schema.org",
          //     "@type": "SoftwareApplication",
          //     "name": "Generatore Squadra Fantacalcio",
          //     "applicationCategory": "SportsApplication",
          //     "description": "Crea la squadra perfetta per il Fantacalcio con AI",
          //     "url": "https://fantamind-ai.vercel.app/genSquadraPage",
          //     "provider": {
          //       "@type": "Organization",
          //       "name": "Fantamind.ai"
          //     },
          //     "offers": {
          //       "@type": "Offer",
          //       "price": "0",
          //       "priceCurrency": "EUR"
          //     },
          //     "featureList": "Ottimizzazione rose, Analisi statistiche, Suggerimenti acquisti",
          //     "operatingSystem": "Web-based"
          //   })
          // }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
