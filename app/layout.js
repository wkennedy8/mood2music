import Navigation from "./components/Navigation";
import "./globals.css";
import NextAuthProvider from "./providers";

export const metadata = {
  title: "mood2music",
  description: "Discover music using AI",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="mytheme" className="bg-base-300">
      <body className="bg-base-300">
        <NextAuthProvider>
          <main className="min-h-screen w-full p-2 lg:p-6 mb-20 md:mb-24 max-w-4xl mx-auto bg-base-300">
            <Navigation />
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
