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
      <Providers>
        <body className="flex min-h-screen flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
