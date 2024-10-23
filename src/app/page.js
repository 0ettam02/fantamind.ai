import Hero from "./components/heroComponent";
import Header from "./components/headerComponent";
import HomePage from "./components/homePageComponent";
import Footer from "./components/footerComponent";

export default function Home() {
  return (
    <>
      <div className="md:h-screen">
        <Header />
        <Hero />

      </div>
      <div className="mt-[10em] md:mt-0">
        <HomePage />
        </div>
      <Footer />
        
    </>
  );
}
