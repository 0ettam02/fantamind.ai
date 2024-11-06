import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Previsione Prezzi Fantacalcio | Fantamind.ai",
  description: "Calcola il valore di mercato dei giocatori del Fantacalcio con il nostro modello di AI predittivo",
  keywords: "prezzi fantacalcio, valutazione giocatori, mercato fantacalcio, previsioni prezzi, AI",
  openGraph: {
    title: "Previsione Prezzi | Fantamind.ai",
    description: "Previsioni accurate sui prezzi dei giocatori",
    type: "website",
    locale: "it_IT",
    url: "https://fantamind-ai.vercel.app/predPrezzo",
    siteName: "Fantamind.ai",
    // images: [
    //   {
    //     url: "/prices-og.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Previsione Prezzi Fantamind.ai"
    //   }
    // ]
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Previsione Prezzi | Fantamind.ai",
  //   description: "Previsioni accurate sui prezzi dei giocatori",
  //   images: ["/prices-twitter.jpg"]
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
          //     "name": "Previsione Prezzi Fantacalcio",
          //     "applicationCategory": "SportsApplication",
          //     "description": "Calcola il valore di mercato dei giocatori del Fantacalcio",
          //     "url": "https://fantamind-ai.vercel.app/predPrezzo",
          //     "provider": {
          //       "@type": "Organization",
          //       "name": "Fantamind.ai"
          //     },
          //     "offers": {
          //       "@type": "Offer",
          //       "price": "0",
          //       "priceCurrency": "EUR"
          //     },
          //     "featureList": "Previsione prezzi giocatori, Analisi mercato, Valutazione rose"
          //   })
          // }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
