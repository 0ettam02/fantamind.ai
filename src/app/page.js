import Hero from "./components/heroComponent";
import Header from "./components/headerComponent";
import HomePage from "./components/homePageComponent";
export default function Home() {
  return (
    <>
      <div className="h-screen">
        <Header />
        <Hero />
        <HomePage />
      </div>
    </>
  );
}
