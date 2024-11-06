import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Previsione Gol Fantacalcio | Fantamind.ai",
  description: "Scopri quanti gol segnerà un giocatore con il nostro modello di AI che analizza statistiche storiche e performance attuali",
  keywords: "previsione gol, fantacalcio, statistiche attaccanti, machine learning calcio, predizione reti",
  openGraph: {
    title: "Previsione Gol | Fantamind.ai",
    description: "Predici i gol dei tuoi attaccanti con l'intelligenza artificiale",
    type: "website",
    locale: "it_IT",
    url: "https://fantamind.ai/predGol",
    // images: [
    //   {
    //     url: "/goals-og.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Previsione Gol Fantacalcio"
    //   }
    // ]
  },
//   twitter: {
//     card: "summary_large_image",
//     title: "Previsione Gol | Fantamind.ai",
//     description: "Predici i gol dei tuoi attaccanti con l'intelligenza artificiale",
//     images: ["/goals-twitter.jpg"]
//   }
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
          //     "name": "Predizione Gol Fantacalcio",
          //     "applicationCategory": "SportsApplication",
          //     "description": "Previsione gol per giocatori del Fantacalcio",
          //     "url": "https://fantamind-ai.vercel.app/predGol",
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
