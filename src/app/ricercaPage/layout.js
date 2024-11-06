import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ricerca e Sviluppo AI | Fantamind.ai",
  description: "Scopri come Fantamind.ai sviluppa modelli di intelligenza artificiale per analizzare e prevedere le performance nel Fantacalcio",
  keywords: "ricerca AI, machine learning, fantacalcio, sviluppo AI, previsioni calcio, intelligenza artificiale",
  openGraph: {
    title: "Ricerca AI | Fantamind.ai",
    description: "Innovazione nell'AI per il Fantacalcio",
    type: "website",
    locale: "it_IT",
    url: "https://fantamind-ai.vercel.app/ricercaPage",
    siteName: "Fantamind.ai",
    // images: [
    //   {
    //     url: "/research-og.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Ricerca AI Fantamind.ai"
    //   }
    // ]
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Ricerca AI | Fantamind.ai",
  //   description: "Innovazione nell'AI per il Fantacalcio",
  //   images: ["/research-twitter.jpg"]
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
          //     "@type": "ResearchProject",
          //     "name": "Ricerca AI Fantacalcio",
          //     "description": "Sviluppo di modelli di intelligenza artificiale per analisi Fantacalcio",
          //     "url": "https://fantamind-ai.vercel.app/ricercaPage",
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
