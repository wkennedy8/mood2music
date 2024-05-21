import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { isAuthenticated } from "@/utils/isAuthenticated";

export default async function Home() {
  const session = await isAuthenticated();
  return (
    <main>
      {/* <Navigation /> */}
      <Hero />
      {session && <Main />}
      <Footer />
    </main>
  );
}
