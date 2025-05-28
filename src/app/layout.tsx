import Footer from "./footer";
import "./globals.css";
import Nav from "./nav";
import Providers from "./providers";

export const metadata = {
  title: "Artist Maze",
  description: "Link 2 artists together by their common artists"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Nav />
        <main className="h-full">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
