import "./globals.css";
import Logo from "./logo";

export const metadata = {
    title: "Artist Maze",
    description: "Link 2 artists together by their common artists",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Logo />
                {children}
            </body>
        </html>
    );
}