import Hero from "@/components/custom/home/hero";
import About from "@/components/custom/home/about";
import Rooms from "@/components/custom/home/rooms";
import LogoCloud from "@/components/custom/home/logoCloud";
import Testimonials from "@/components/custom/home/testimonials";
import Contact from "@/components/custom/home/contact";
import Header from "./layout/header";
import Footer from "./layout/footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Rooms />
      <LogoCloud />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
