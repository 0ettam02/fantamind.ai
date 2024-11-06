import Hero from "./components/heroComponent";
import Header from "./components/headerComponent";
import HomePage from "./components/homePageComponent";
import Footer from "./components/footerComponent";

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section 
          className="lg:h-screen" 
          aria-label="Hero section"
        >
          <Hero />
        </section>

        {/* Main Content */}
        <section 
          className="mt-[10em] lg:mt-0"
          aria-label="Main content"
        >
          <HomePage />
        </section>
      </main>

      <Footer />
    </>
  );
}
