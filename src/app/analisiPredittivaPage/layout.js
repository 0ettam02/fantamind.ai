import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Analisi Predittive Fantacalcio | Fantamind.ai",
  description: "Utilizza i nostri modelli di AI per prevedere gol, assist e prezzi dei giocatori del Fantacalcio con precisione",
  keywords: "previsioni fantacalcio, analisi predittive, statistiche calcio, AI fantacalcio, machine learning",
  openGraph: {
    title: "Analisi Predittive | Fantamind.ai",
    description: "Previsioni accurate per il tuo Fantacalcio",
    type: "website",
    locale: "it_IT",
    url: "https://fantamind-ai.vercel.app/analisiPredittivaPage",
    siteName: "Fantamind.ai",
    // images: [
    //   {
    //     url: "/predictions-og.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Analisi Predittive Fantamind.ai"
    //   }
    // ]
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Analisi Predittive | Fantamind.ai",
  //   description: "Previsioni accurate per il tuo Fantacalcio",
  //   images: ["/predictions-twitter.jpg"]
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
          //     "name": "Analisi Predittive Fantacalcio",
          //     "applicationCategory": "SportsApplication",
          //     "description": "Modelli predittivi per il Fantacalcio",
          //     "url": "https://fantamind-ai.vercel.app/analisiPredittivaPage",
          //     "provider": {
          //       "@type": "Organization",
          //       "name": "Fantamind.ai"
          //     }
          //   })
          // }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}