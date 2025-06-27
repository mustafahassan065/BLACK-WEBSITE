
import Header from "./components/Header/Header";

import Hero from "./components/Hero/Hero";
import Experience from "./components/Experience/Experience";
import Integration from "./components/Integration/Integration";
import Features from "./components/Features/Features";
import Download from "./components/Download/Download";
import SignUp from "./components/SignUp/SignUp";

import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header/>
      <main>
        <div> 
          <Hero/>
          <Experience/>
          <Integration/>
          <Features/>
          <Download/>
          <SignUp/>
        </div>
      </main>
      <Footer/>
    </>
  );
}