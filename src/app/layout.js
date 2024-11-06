import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fantamind.ai | La tua intelligenza artificiale per il Fantacalcio",
  description: "Fantamind.ai utilizza l'intelligenza artificiale per aiutarti a vincere al Fantacalcio con previsioni accurate su gol, assist e prezzi dei giocatori",
  keywords: "fantacalcio, intelligenza artificiale, AI, previsioni calcio, fantasy football",
  openGraph: {
    title: "Fantamind.ai | AI per il Fantacalcio",
    description: "Usa l'AI per dominare il tuo Fantacalcio",
    type: "website",
    locale: "it_IT",
    url: "https://fantamind-ai.vercel.app",
    siteName: "Fantamind.ai",
  //   images: [
  //     {
  //       url: "/og-image.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "Fantamind.ai Preview"
  //     }
  //   ]
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Fantamind.ai | AI per il Fantacalcio",
  //   description: "Usa l'AI per dominare il tuo Fantacalcio",
  //   images: ["/twitter-image.jpg"]
  },
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
          //     "@type": "WebSite",
          //     "name": "Fantamind.ai",
          //     "url": "https://fantamind-ai.vercel.app",
          //     "description": "Intelligenza artificiale per il Fantacalcio",
          //     "potentialAction": {
          //       "@type": "SearchAction",
          //       "target": "https://fantamind-ai.vercel.app/search?q={search_term_string}",
          //       "query-input": "required name=search_term_string"
          //     }
          //   })
          // }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}