import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Previsione Assist Fantacalcio | Fantamind.ai",
  description: "Calcola il potenziale di assist dei giocatori con il nostro algoritmo di AI che analizza creatività e opportunità di gioco",
  keywords: "previsione assist, fantacalcio, statistiche centrocampisti, machine learning calcio, predizione assist",
  openGraph: {
    title: "Previsione Assist | Fantamind.ai",
    description: "Predici gli assist dei tuoi centrocampisti con l'intelligenza artificiale",
    type: "website",
    locale: "it_IT",
    url: "https://fantamind.ai/predAssist",
    // images: [
    //   {
    //     url: "/assists-og.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Previsione Assist Fantacalcio"
    //   }
    // ]
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Previsione Assist | Fantamind.ai",
  //   description: "Predici gli assist dei tuoi centrocampisti con l'intelligenza artificiale",
  //   images: ["/assists-twitter.jpg"]
  // }
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
          //     "name": "Predizione Assist Fantacalcio",
          //     "applicationCategory": "SportsApplication",
          //     "description": "Previsione assist per giocatori del Fantacalcio",
          //     "url": "https://fantamind-ai.vercel.app/predAssist",
          //     "offers": {
          //       "@type": "Offer",
          //       "price": "0",
          //       "priceCurrency": "EUR"
          //     }
          //   })
          // }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}